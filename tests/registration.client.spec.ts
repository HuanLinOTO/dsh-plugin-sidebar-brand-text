/** @vitest-environment jsdom */
import { describe, expect, it, beforeEach } from 'vitest'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import { apply } from '../src/client/index.ts'

interface StubSlot {
  name: string
  key?: string
  locale?: string
  inject: () => unknown
}

interface StubCtx {
  ctx: {
    effect: (fn: () => unknown, _reason: string) => void
    locale: {
      register: (ns: string, dict: unknown) => void
      bind: (ns: string) => (key: string) => string
    }
    slots: {
      inject: (name: string, factory: () => StubSlot | Generator<StubSlot>) => void
      register: (spec: Record<string, unknown>, _comp: unknown) => StubSlot
    }
  }
  effects: Array<() => unknown>
  registrations: StubSlot[]
  injectCalls: Array<{ name: string, factory: () => StubSlot | Generator<StubSlot> }>
}

function stubCtx(betterLocale: unknown = undefined): StubCtx {
  const effects: Array<() => unknown> = []
  const registrations: StubSlot[] = []
  const injectCalls: Array<{ name: string, factory: () => StubSlot | Generator<StubSlot> }> = []
  const dicts = new Map<string, Record<string, string>>()
  const ctx = {
    effect: (fn: () => unknown, _reason: string) => { effects.push(fn) },
    get: (_name: string) => betterLocale,
    locale: {
      register: (ns: string, dict: Record<string, string>) => { dicts.set(ns, dict) },
      bind: (ns: string) => (key: string) => dicts.get(ns)?.[key] ?? key,
      subscribe: (_fn: () => void) => () => {},
    },
    slots: {
      inject: (name: string, factory: () => StubSlot | Generator<StubSlot>) => {
        injectCalls.push({ name, factory })
      },
      register: (spec: Record<string, unknown>, _comp: unknown) => {
        const reg: StubSlot = {
          name: spec.name as string,
          inject: spec.inject as (() => unknown),
        }
        if (spec.key !== undefined) reg.key = spec.key as string
        if (spec.locale !== undefined) reg.locale = spec.locale as string
        registrations.push(reg)
        return reg
      },
    },
  }
  return { ctx, effects, registrations, injectCalls }
}

/** Drain a generator or call a plain factory. */
function drainFactory(factory: () => StubSlot | Generator<StubSlot>): StubSlot[] {
  const result = factory()
  if (result && typeof (result as Generator<StubSlot>).next === 'function') {
    const items: StubSlot[] = []
    for (const item of result as Generator<StubSlot>) items.push(item)
    return items
  }
  return [result as StubSlot]
}

describe('client apply', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
  })

  it('injects into sidebar.brand.name and settings.plugin.item slots', () => {
    const { ctx, injectCalls } = stubCtx()
    apply(ctx as unknown as ClientContext)

    expect(injectCalls.map(c => c.name)).toEqual(['sidebar.brand.name', 'settings.plugin.item'])
  })

  it('registers BrandText under sidebar.brand.name with useSnapshot inject', () => {
    const { ctx, registrations, injectCalls } = stubCtx()
    apply(ctx as unknown as ClientContext)

    for (const call of injectCalls) drainFactory(call.factory)
    const brandReg = registrations.find(r => r.name === 'sidebar.brand.name')
    expect(brandReg).toBeDefined()
    const injectFace = brandReg!.inject() as { useSnapshot: unknown }
    expect(injectFace.useSnapshot).toBeDefined()
  })

  it('registers BrandTextCard under settings.plugin.item with key sidebar-brand-text', () => {
    const { ctx, registrations, injectCalls } = stubCtx()
    apply(ctx as unknown as ClientContext)

    for (const call of injectCalls) drainFactory(call.factory)
    const cardReg = registrations.find(r => r.name === 'settings.plugin.item')
    expect(cardReg).toBeDefined()
    expect(cardReg!.key).toBe('sidebar-brand-text')
    expect(cardReg!.locale).toBe('dsh-plugin-sidebar-brand-text')
  })

  it('card inject provides controller and useSnapshot', () => {
    const { ctx, registrations, injectCalls } = stubCtx()
    apply(ctx as unknown as ClientContext)

    for (const call of injectCalls) drainFactory(call.factory)
    const cardReg = registrations.find(r => r.name === 'settings.plugin.item')
    const injectFace = cardReg!.inject() as { controller: unknown, useSnapshot: unknown }
    expect(injectFace.controller).toBeDefined()
    expect(injectFace.useSnapshot).toBeDefined()
  })

  it('installs the locale dictionary, better-locale sync, stylesheet, and title-writer effects', () => {
    const { ctx, effects } = stubCtx()
    apply(ctx as unknown as ClientContext)

    expect(effects.length).toBe(4)
    effects[2]!()
    const style = document.head.querySelector('style[data-sidebar-brand-text-style]')
    expect(style).not.toBeNull()
  })

  it('registers the better-locale override dicts when the store is present', () => {
    const registered: Array<{ ns: string, dicts: unknown }> = []
    const betterLocale = {
      register: (ns: string, dicts: unknown) => {
        registered.push({ ns, dicts })
        return () => {}
      },
    }
    const { ctx, effects } = stubCtx(betterLocale)
    apply(ctx as unknown as ClientContext)

    expect(effects.length).toBe(4)
    effects[1]!()
    expect(registered.length).toBe(1)
    expect(registered[0]!.ns).toBe('dsh-plugin-sidebar-brand-text')
    expect(Object.keys(registered[0]!.dicts as Record<string, unknown>)).toHaveLength(19)
  })

  it('skips the better-locale registration when the store is absent', () => {
    const { ctx, effects } = stubCtx()
    apply(ctx as unknown as ClientContext)

    // The sync effect is registered unconditionally (activation-order-safe,
    // 0.4.2); with the store absent its body is a no-op.
    expect(effects.length).toBe(4)
    expect(() => effects[1]!()).not.toThrow()
  })

  it('effect disposer removes the stylesheet', () => {
    const { ctx, effects } = stubCtx()
    apply(ctx as unknown as ClientContext)

    const dispose = effects[2]!() as () => void
    const style = document.head.querySelector('style[data-sidebar-brand-text-style]')
    expect(style).not.toBeNull()
    dispose()
    expect(document.head.querySelector('style[data-sidebar-brand-text-style]')).toBeNull()
  })
})
