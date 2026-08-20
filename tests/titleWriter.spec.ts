/** @vitest-environment jsdom */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BrandTextSettingsController } from '../src/client/controller.ts'
import { startTitleWriter } from '../src/client/titleWriter.ts'

interface SessionListSnapshot {
  current: string | undefined
  byId: Record<string, { title?: string } | undefined>
}

function makeSessions(initial: SessionListSnapshot): {
  sessions: {
    list: {
      getSnapshot(): SessionListSnapshot
      subscribe(fn: () => void): () => void
      __notify(): void
      __set(snapshot: SessionListSnapshot): void
    }
  }
} {
  let snapshot = initial
  const listeners = new Set<() => void>()
  return {
    sessions: {
      list: {
        getSnapshot: () => snapshot,
        subscribe: (fn: () => void) => {
          listeners.add(fn)
          return () => { listeners.delete(fn) }
        },
        __notify: () => { for (const fn of [...listeners]) fn() },
        __set: (next: SessionListSnapshot) => { snapshot = next; for (const fn of [...listeners]) fn() },
      },
    },
  }
}

function mockFetchOk(config: { name: string, revision: string }): typeof fetch {
  return vi.fn(async () =>
    new Response(JSON.stringify({ ok: true, value: { config } }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }),
  ) as unknown as typeof fetch
}

async function flushMicrotasks(): Promise<void> {
  await Promise.resolve()
  await Promise.resolve()
}

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetchOk({ name: 'My Brand', revision: '' }))
  document.title = 'Stale Title'
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('startTitleWriter', () => {
  it('overrides document.title with brand name when no current session', async () => {
    const { sessions } = makeSessions({ current: undefined, byId: {} })
    const controller = new BrandTextSettingsController()
    await controller.load()
    const dispose = startTitleWriter(sessions, controller.store)
    await flushMicrotasks()
    expect(document.title).toBe('My Brand')
    dispose()
  })

  it('composes "<session> — <brand>" when a session is selected', async () => {
    const { sessions } = makeSessions({
      current: 's1',
      byId: { s1: { title: 'Hello World' } },
    })
    const controller = new BrandTextSettingsController()
    await controller.load()
    const dispose = startTitleWriter(sessions, controller.store)
    await flushMicrotasks()
    expect(document.title).toBe('Hello World — My Brand')
    dispose()
  })

  it('falls back to brand name alone when session title is empty', async () => {
    const { sessions } = makeSessions({
      current: 's1',
      byId: { s1: { title: '' } },
    })
    const controller = new BrandTextSettingsController()
    await controller.load()
    const dispose = startTitleWriter(sessions, controller.store)
    await flushMicrotasks()
    expect(document.title).toBe('My Brand')
    dispose()
  })

  it('falls back to default brand when config unavailable', async () => {
    const { sessions } = makeSessions({ current: undefined, byId: {} })
    const controller = new BrandTextSettingsController()
    const dispose = startTitleWriter(sessions, controller.store)
    await flushMicrotasks()
    expect(document.title).toBe('DSH Local Build')
    dispose()
  })

  it('updates title when session changes', async () => {
    const { sessions } = makeSessions({
      current: 's1',
      byId: { s1: { title: 'First' } },
    })
    const controller = new BrandTextSettingsController()
    await controller.load()
    const dispose = startTitleWriter(sessions, controller.store)
    await flushMicrotasks()
    expect(document.title).toBe('First — My Brand')

    sessions.list.__set({
      current: 's2',
      byId: { s2: { title: 'Second' } },
    })
    await flushMicrotasks()
    expect(document.title).toBe('Second — My Brand')
    dispose()
  })

  it('updates title when brand config changes (save)', async () => {
    const { sessions } = makeSessions({
      current: 's1',
      byId: { s1: { title: 'Session' } },
    })
    const controller = new BrandTextSettingsController()
    await controller.load()
    const dispose = startTitleWriter(sessions, controller.store)
    await flushMicrotasks()
    expect(document.title).toBe('Session — My Brand')

    controller.edit('name', 'New Brand')
    await flushMicrotasks()
    expect(document.title).toBe('Session — New Brand')
    dispose()
  })

  it('is a no-op when sessions is undefined', async () => {
    const controller = new BrandTextSettingsController()
    await controller.load()
    const dispose = startTitleWriter(undefined, controller.store)
    await flushMicrotasks()
    expect(document.title).toBe('Stale Title')
    dispose()
  })

  it('stops overriding after dispose', async () => {
    const { sessions } = makeSessions({ current: undefined, byId: {} })
    const controller = new BrandTextSettingsController()
    await controller.load()
    const dispose = startTitleWriter(sessions, controller.store)
    await flushMicrotasks()
    expect(document.title).toBe('My Brand')

    dispose()
    document.title = 'After Dispose'
    sessions.list.__set({ current: 's1', byId: { s1: { title: 'X' } } })
    await flushMicrotasks()
    expect(document.title).toBe('After Dispose')
  })

  it('re-overrides when <title> is mutated externally (MutationObserver backstop)', async () => {
    const { sessions } = makeSessions({ current: undefined, byId: {} })
    const controller = new BrandTextSettingsController()
    await controller.load()
    const dispose = startTitleWriter(sessions, controller.store)
    await flushMicrotasks()
    expect(document.title).toBe('My Brand')

    document.title = 'External Override'
    await flushMicrotasks()
    expect(document.title).toBe('My Brand')
    dispose()
  })
})
