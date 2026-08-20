/**
 * `BrandTextSettingsController` — client-side state store for the
 * sidebar-brand-text config.
 *
 * Loads the config from the host's `/sbbt/api/get` route, stages edits,
 * and saves via `/sbbt/api/set`. The `sidebar.brand.name` slot occupant
 * and the `settings.plugin.item` card both read from the same store via
 * `bindSnapshotSelector`, so a save is instantly reflected in the sidebar
 * without a DOM event or page reload.
 *
 * Mirrors the ego-browser `EgoBrowserSettingsController` pattern.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/client/controller
 */
import { createSnapshotStore, type SnapshotStore } from '@deepseek-ai/dsh-client-runtime/client'
import { DEFAULT_BRAND_TEXT_CONFIG, type BrandTextConfig } from '../types.ts'

/** The controller's snapshot state. */
export interface BrandTextState {
  /** 'idle' | 'loading' | 'ready' */
  status: 'idle' | 'loading' | 'ready'
  /** True after a successful `/sbbt/api/get`; false when the route is unreachable. */
  available: boolean
  /** False when the settings service is absent (read-only). */
  writable: boolean
  /** Current draft values (edited by the card, read by the brand slot). */
  draft: BrandTextConfig
  /** True when the draft differs from the last-saved config. */
  dirty: boolean
  /** Apply lifecycle: 'idle' | 'saving' | 'saved' | 'error'. */
  applyState: { kind: 'idle' } | { kind: 'saving' } | { kind: 'saved' } | { kind: 'error', message: string }
  /** Card expand state (toggled by the card header button). */
  _open: boolean
}

/** Initial state before the first load. */
function initialState(): BrandTextState {
  return {
    status: 'idle',
    available: false,
    writable: false,
    draft: { ...DEFAULT_BRAND_TEXT_CONFIG },
    dirty: false,
    applyState: { kind: 'idle' },
    _open: false,
  }
}

/**
 * Controller managing the brand-text config lifecycle.
 *
 * Constructed once in the client `apply()` and shared between the
 * `sidebar.brand.name` slot and the `settings.plugin.item` card.
 */
export class BrandTextSettingsController {
  readonly store: SnapshotStore<BrandTextState>
  loaded = false
  private generation = 0

  constructor() {
    this.store = createSnapshotStore<BrandTextState>(initialState())
  }

  /** Fetch the config from `/sbbt/api/get` and update the store. */
  async load(): Promise<void> {
    const gen = ++this.generation
    this.store.update((s) => { s.status = 'loading' })
    try {
      const res = await fetch('/sbbt/api/get', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{}',
      })
      if (!res.ok) {
        this.markUnavailable(gen)
        return
      }
      const parsed = await res.json().catch(() => null)
      if (gen !== this.generation) return
      if (!parsed || parsed.ok !== true || !parsed.value) {
        this.markUnavailable(gen)
        return
      }
      const config = parsed.value.config as BrandTextConfig | undefined
      this.loaded = true
      this.store.update((s) => {
        s.status = 'ready'
        s.available = true
        s.writable = true
        if (config) {
          s.draft = { name: config.name, revision: config.revision }
        }
        s.dirty = false
        s.applyState = { kind: 'idle' }
      })
    } catch {
      this.markUnavailable(gen)
    }
  }

  /** Stage an edit to a field (does not save). */
  edit(field: 'name' | 'revision', value: string): void {
    this.store.update((s) => {
      if (field === 'name') s.draft.name = value
      else s.draft.revision = value
      s.dirty = true
      s.applyState = { kind: 'idle' }
    })
  }

  /** Discard staged edits and reload from the host. */
  discard(): void {
    void this.load()
  }

  /** Save the staged draft via `/sbbt/api/set`. */
  async save(): Promise<void> {
    const gen = ++this.generation
    const snapshot = this.store.getSnapshot()
    if (!snapshot.dirty) return
    this.store.update((s) => { s.applyState = { kind: 'saving' } })
    try {
      const res = await fetch('/sbbt/api/set', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ patch: snapshot.draft }),
      })
      const parsed = await res.json().catch(() => null)
      if (gen !== this.generation) return
      if (!parsed || parsed.ok !== true || !parsed.value) {
        const message = parsed?.error?.message ?? 'Save failed'
        this.store.update((s) => { s.applyState = { kind: 'error', message } })
        return
      }
      const config = parsed.value.config as BrandTextConfig | undefined
      this.store.update((s) => {
        s.applyState = { kind: 'saved' }
        if (config) {
          s.draft = { name: config.name, revision: config.revision }
        }
        s.dirty = false
      })
    } catch (error) {
      if (gen !== this.generation) return
      const message = error instanceof Error ? error.message : String(error)
      this.store.update((s) => { s.applyState = { kind: 'error', message } })
    }
  }

  /** Toggle the card's expand state (mirrors ego-browser `controller.toggle()`). */
  toggle(): void {
    this.store.update((s) => { s._open = !s._open })
  }

  /** Mark the store as unavailable (route unreachable or settings service absent). */
  private markUnavailable(gen: number): void {
    if (gen !== this.generation) return
    this.store.update((s) => {
      s.status = 'ready'
      s.available = false
      s.writable = false
    })
  }
}
