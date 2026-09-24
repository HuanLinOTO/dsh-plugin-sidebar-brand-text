/**
 * Overrides `document.title` so the configured brand name replaces the
 * build-time `DSH_CLIENT_TITLE` literal that `DocumentTitle.tsx` writes.
 *
 * DSH's built-in `DocumentTitle` component (ui-renderer) subscribes to
 * `sessions.list` and writes `<session title> — <productTitle>` where
 * `productTitle` is the build-time `process.env.DSH_CLIENT_TITLE` literal
 * (fallback `'DSH Local Build'`). That literal is baked into the bundle at
 * build time, so no slot or runtime config can touch it — see
 * `ui-brand-official/README.md` ("The browser title is independent").
 *
 * This writer subscribes to the **same** `sessions.list` feed and to the
 * shared `BrandTextSettingsController` store. After `DocumentTitle`'s
 * `useEffect` writes the title, this writer's `queueMicrotask` callback
 * overwrites it with `<session title> — <configured brand>`. A
 * `MutationObserver` on `<title>` is the backstop for React 18 concurrent
 * re-renders that may run after the microtask.
 *
 * On dispose, all subscriptions and the observer are torn down, and
 * `DocumentTitle`'s own `useEffect` cleanup restores the build-time title.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/client/titleWriter
 */
import type { BrandTextConfig } from '../types.ts'
import { DEFAULT_BRAND_TEXT_CONFIG } from '../types.ts'
import type { BrandTextState } from './controller.ts'
import type { SnapshotStore } from '@deepseek-ai/dsh-client-store'

/** Minimal face of `sessions.list` we depend on.
 *
 * rc.1's `ISessions.list` snapshot (`SessionListState`) carries `byId` only:
 * the selected-session id moved out of the sessions domain. `current` is kept
 * optional so the writer still accepts the rc.1 snapshot; when it is absent the
 * title falls back to the brand name alone. */
interface SessionListSnapshot {
  current?: string | undefined
  byId: Record<string, { title?: string } | undefined>
}

/** Minimal face of the `sessions` service we depend on. */
interface SessionsLike {
  readonly list: {
    getSnapshot(): SessionListSnapshot
    subscribe(fn: () => void): () => void
  }
}

/** Disposer returned by {@link startTitleWriter}. */
export type TitleWriterDisposer = () => void

/**
 * Start overriding `document.title` with the configured brand name.
 *
 * @param sessions - the cordis `sessions` service (read-only face).
 * @param store - the shared `BrandTextSettingsController` store; the title
 *   updates when the config changes (card save) as well as when the current
 *   session changes.
 * @returns a disposer that tears down all subscriptions and the observer.
 */
export function startTitleWriter(
  sessions: SessionsLike | undefined,
  store: SnapshotStore<BrandTextState>,
): TitleWriterDisposer {
  if (sessions === undefined) return () => {}
  if (typeof document === 'undefined') return () => {}

  /** Compute the title we want, from the current session + brand config. */
  const computeTitle = (): string => {
    const state = store.getSnapshot()
    const cfg: BrandTextConfig = state.available ? state.draft : DEFAULT_BRAND_TEXT_CONFIG
    const list = sessions.list.getSnapshot()
    const id = list.current
    const sessionTitle = id === undefined ? undefined : list.byId[id]?.title
    return sessionTitle === undefined || sessionTitle === ''
      ? cfg.name
      : `${sessionTitle} — ${cfg.name}`
  }

  /** Write the computed title if it differs (avoids spurious observer fires). */
  const applyTitle = (): void => {
    const expected = computeTitle()
    if (document.title !== expected) document.title = expected
  }

  /** Deferred writer: runs after React's useEffect via microtask. */
  const deferredApply = (): void => { queueMicrotask(applyTitle) }

  const stopSessionSub = sessions.list.subscribe(deferredApply)
  const stopStoreSub = store.subscribe(deferredApply)

  let observer: MutationObserver | null = null
  const titleEl = document.querySelector('title')
  if (titleEl !== null) {
    observer = new MutationObserver(applyTitle)
    observer.observe(titleEl, { childList: true, subtree: true, characterData: true })
  }

  queueMicrotask(applyTitle)

  return () => {
    stopSessionSub()
    stopStoreSub()
    observer?.disconnect()
    observer = null
  }
}
