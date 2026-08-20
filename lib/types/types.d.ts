/** Shared config surface of the sidebar-brand-text plugin (host + client halves). */
/**
 * The plugin's user-facing settings, persisted through the settings seam
 * under the `sidebar-brand-text` namespace in `$DSH_HOME/settings.yaml`.
 * The browser half reads these via the `/sbbt/api/get` HTTP route.
 */
export interface BrandTextConfig {
    /**
     * Brand name text shown in the sidebar's top-left brand row, beside the
     * mark slot. Replaces the shell's "DSH Local Build" fallback.
     */
    name: string;
    /**
     * Revision badge text rendered beside the brand name. Empty string hides
     * the badge entirely. Replaces the shell's 7-character
     * `DSH_CLIENT_COMMIT_HASH` fallback.
     */
    revision: string;
}
/** Runtime defaults applied when no config arrives (defensive only). */
export declare const DEFAULT_BRAND_TEXT_CONFIG: BrandTextConfig;
