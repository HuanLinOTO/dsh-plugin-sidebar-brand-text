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
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { SnapshotSelectorHook } from '@deepseek-ai/dsh-client-ui-slots';
import type { BrandTextConfig } from '../types.ts';
/** Inject face: the selector hook bound to the shared controller store. */
export interface BrandTextInjected {
    readonly useSnapshot: SnapshotSelectorHook<BrandTextStateShell>;
}
/** The slice of state the brand component reads. */
export interface BrandTextStateShell {
    draft: BrandTextConfig;
    available: boolean;
}
/** Full props: the slot's runtime share plus the plugin's inject face. */
export type BrandTextProps = PropsRuntime<'sidebar.brand.name'> & BrandTextInjected;
/**
 * Render the configured brand name and optional revision badge.
 *
 * While loading or on error, falls back to the shell defaults.
 * @param props - the `useSnapshot` inject face (plus the slot's runtime share, unused).
 * @returns the brand-name span and optional revision-badge span.
 */
export declare function BrandText({ useSnapshot }: BrandTextProps): import("react").JSX.Element;
