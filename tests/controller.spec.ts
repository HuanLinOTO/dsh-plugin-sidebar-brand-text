/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi, beforeEach } from 'vitest'
import { BrandTextSettingsController } from '../src/client/controller.ts'
import { DEFAULT_BRAND_TEXT_CONFIG } from '../src/types.ts'

function mockFetchOk(config: { name: string, revision: string }): typeof fetch {
  return vi.fn(async () =>
    new Response(JSON.stringify({ ok: true, value: { config } }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }),
  ) as unknown as typeof fetch
}

function mockFetchError(message: string): typeof fetch {
  return vi.fn(async () =>
    new Response(JSON.stringify({ ok: false, error: { code: 'internal', message } }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    }),
  ) as unknown as typeof fetch
}

function mockFetchNetworkError(): typeof fetch {
  return vi.fn(async () => {
    throw new Error('network error')
  }) as unknown as typeof fetch
}

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetchOk({ name: 'My Build', revision: 'v1.0' }))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

async function flush(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 0))
}

describe('BrandTextSettingsController', () => {
  it('starts with default config and idle status', () => {
    const ctrl = new BrandTextSettingsController()
    const snap = ctrl.store.getSnapshot()
    expect(snap.status).toBe('idle')
    expect(snap.draft).toEqual(DEFAULT_BRAND_TEXT_CONFIG)
    expect(snap.dirty).toBe(false)
  })

  it('loads config from /sbbt/api/get', async () => {
    const ctrl = new BrandTextSettingsController()
    await ctrl.load()
    const snap = ctrl.store.getSnapshot()
    expect(snap.status).toBe('ready')
    expect(snap.available).toBe(true)
    expect(snap.writable).toBe(true)
    expect(snap.draft.name).toBe('My Build')
    expect(snap.draft.revision).toBe('v1.0')
    expect(snap.dirty).toBe(false)
  })

  it('marks unavailable on fetch error response', async () => {
    vi.stubGlobal('fetch', mockFetchError('boom'))
    const ctrl = new BrandTextSettingsController()
    await ctrl.load()
    const snap = ctrl.store.getSnapshot()
    expect(snap.available).toBe(false)
    expect(snap.writable).toBe(false)
  })

  it('marks unavailable on network error', async () => {
    vi.stubGlobal('fetch', mockFetchNetworkError())
    const ctrl = new BrandTextSettingsController()
    await ctrl.load()
    const snap = ctrl.store.getSnapshot()
    expect(snap.available).toBe(false)
  })

  it('edit stages a field and marks dirty', () => {
    const ctrl = new BrandTextSettingsController()
    ctrl.edit('name', 'New Name')
    const snap = ctrl.store.getSnapshot()
    expect(snap.draft.name).toBe('New Name')
    expect(snap.dirty).toBe(true)
  })

  it('save sends patch and updates store on success', async () => {
    const fetchFn = vi.fn(async (_url: string, init?: RequestInit) =>
      new Response(JSON.stringify({
        ok: true,
        value: { config: { name: 'Saved', revision: 'v2.0' } },
      }), { status: 200, headers: { 'content-type': 'application/json' } }),
    ) as unknown as typeof fetch
    vi.stubGlobal('fetch', fetchFn)

    const ctrl = new BrandTextSettingsController()
    await ctrl.load()
    ctrl.edit('name', 'Saved')
    await ctrl.save()

    const snap = ctrl.store.getSnapshot()
    expect(snap.applyState.kind).toBe('saved')
    expect(snap.draft.name).toBe('Saved')
    expect(snap.draft.revision).toBe('v2.0')
    expect(snap.dirty).toBe(false)

    const calls = (fetchFn as unknown as ReturnType<typeof vi.fn>).mock.calls
    const setCall = calls.find(c => (c[0] as string).includes('/set'))
    expect(setCall).toBeDefined()
    const body = JSON.parse(setCall![1]!.body as string)
    expect(body.patch.name).toBe('Saved')
  })

  it('save shows error on failure response', async () => {
    const fetchFn = vi.fn(async (url: string) => {
      if (url.includes('/set')) {
        return new Response(JSON.stringify({
          ok: false, error: { code: 'internal', message: 'write denied' },
        }), { status: 500, headers: { 'content-type': 'application/json' } })
      }
      return new Response(JSON.stringify({
        ok: true, value: { config: { name: 'Old', revision: '' } },
      }), { status: 200, headers: { 'content-type': 'application/json' } })
    }) as unknown as typeof fetch
    vi.stubGlobal('fetch', fetchFn)

    const ctrl = new BrandTextSettingsController()
    await ctrl.load()
    ctrl.edit('name', 'New')
    await ctrl.save()

    const snap = ctrl.store.getSnapshot()
    expect(snap.applyState.kind).toBe('error')
    if (snap.applyState.kind === 'error') {
      expect(snap.applyState.message).toBe('write denied')
    }
    expect(snap.dirty).toBe(true)
  })

  it('discard reloads from host', async () => {
    let callCount = 0
    const fetchFn = vi.fn(async () => {
      callCount++
      return new Response(JSON.stringify({
        ok: true,
        value: { config: { name: `Build${callCount}`, revision: '' } },
      }), { status: 200, headers: { 'content-type': 'application/json' } })
    }) as unknown as typeof fetch
    vi.stubGlobal('fetch', fetchFn)

    const ctrl = new BrandTextSettingsController()
    await ctrl.load()
    expect(ctrl.store.getSnapshot().draft.name).toBe('Build1')
    ctrl.edit('name', 'Edited')
    expect(ctrl.store.getSnapshot().dirty).toBe(true)
    ctrl.discard()
    await flush()
    expect(ctrl.store.getSnapshot().draft.name).toBe('Build2')
    expect(ctrl.store.getSnapshot().dirty).toBe(false)
  })

  it('save is a no-op when not dirty', async () => {
    const fetchFn = mockFetchOk({ name: 'X', revision: '' })
    vi.stubGlobal('fetch', fetchFn)
    const ctrl = new BrandTextSettingsController()
    await ctrl.load()
    await ctrl.save()
    const setCalls = (fetchFn as unknown as ReturnType<typeof vi.fn>).mock.calls
      .filter(c => (c[0] as string).includes('/set'))
    expect(setCalls.length).toBe(0)
  })
})
