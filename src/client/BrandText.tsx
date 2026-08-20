/**
 * The `sidebar.brand.name` slot occupant — renders the configured brand
 * name text and optional revision badge.
 *
 * Reads from the shared `BrandTextSettingsController` store via
 * `useSnapshot`, so a save in the settings card is instantly reflected
 * here without a DOM event or RPC re-fetch.
 *
 * Replaces the shell's fallback (`DSH Local Build` + 7-character
 * `DSH_CLIENT_COMMIT_HASH` badge). The mark slot (`sidebar.brand.mark`)
 * is untouched: the fish logo stays unless another plugin (e.g.
 * `ui-brand-official`) replaces it.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/client/BrandText
 */
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { SnapshotSelectorHook } from '@deepseek-ai/dsh-client-ui-slots'
import type { BrandTextConfig } from '../types.ts'
import { DEFAULT_BRAND_TEXT_CONFIG } from '../types.ts'

/** Inject face: the selector hook bound to the shared controller store. */
export interface BrandTextInjected {
  readonly useSnapshot: SnapshotSelectorHook<BrandTextStateShell>
}

/** The slice of state the brand component reads. */
export interface BrandTextStateShell {
  draft: BrandTextConfig
  available: boolean
}

/** Full props: the slot's runtime share plus the plugin's inject face. */
export type BrandTextProps = PropsRuntime<'sidebar.brand.name'> & BrandTextInjected

/**
 * Render the configured brand name and optional revision badge.
 *
 * While loading or on error, falls back to the shell defaults.
 * @param props - the `useSnapshot` inject face (plus the slot's runtime share, unused).
 * @returns the brand-name span and optional revision-badge span.
 */
export function BrandText({ useSnapshot }: BrandTextProps) {
  const state = useSnapshot((s) => s)
  const cfg: BrandTextConfig = state.available ? state.draft : DEFAULT_BRAND_TEXT_CONFIG

  return (
    <>
      <span className="sbbt-brand-name">{cfg.name}</span>
      {cfg.revision !== '' ? (
        <span className="sbbt-build-revision">{cfg.revision}</span>
      ) : null}
    </>
  )
}
