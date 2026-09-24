/**
 * Host-side settings bridge for `sidebar-brand-text`.
 *
 * dsh 0.1.7-rc.1 moved plugin configuration into the profile-owned Cordis
 * `Config`: the fields are marked `.volatile()` (see `config.ts`), so the
 * loader commits live references without remounting. The namespace-registration API
 * is gone; a plugin only declares the presentation policy for its own page.
 *
 * This bridge exposes a `source()` thunk the `/sbbt/api` gateway reads
 * in-process. Each call reads the current volatile reference, so the gateway
 * always serves the latest accepted value. The value persists in the active
 * profile's `cordis.patch.yml` under the entry's `config` (the entry id is the
 * composition row id declared in `cordis.patch.yml`).
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/settings
 */
import type { Context } from '@deepseek-ai/cordis';
import type { BrandTextEntryConfig } from './config.ts';
import type { BrandTextConfig } from './types.ts';
/** The composition row id: the settings namespace / profile entry id. */
export declare const SETTINGS_NAMESPACE: "sidebar-brand-text";
/** Bridge returned by {@link installBrandTextSettings}. */
export interface BrandTextSettingsBridge {
    /** Read the current resolved config from the entry's volatile references. */
    source(): BrandTextConfig;
}
/**
 * Declare the plugin's settings presentation policy and return the bridge.
 *
 * `auto: false` suppresses a schema-generated page: this plugin ships its own
 * form through the `plugins.row.config` slot on the Plugins page.
 *
 * @param ctx - host context.
 * @param config - the entry's volatile Cordis config.
 * @returns the settings bridge.
 */
export declare function installBrandTextSettings(ctx: Context, config: BrandTextEntryConfig): BrandTextSettingsBridge;
