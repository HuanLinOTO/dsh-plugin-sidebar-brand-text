/**
 * Host-side settings bridge for `sidebar-brand-text`.
 *
 * Mirrors the ego-browser / dsh-plugin-interpreters pattern: a `source()`
 * thunk the HTTP gateway reads in-process, plus an `onChange()` subscription.
 * The settings service is reached through `ctx.inject(['settings'], ...)` so a
 * composition without a settings provider still loads (entry-source fallback,
 * no persistence). Multi-fiber dedupe is handled by catching the
 * `"already registered"` rejection.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/settings
 */
import type { Context } from '@deepseek-ai/cordis';
import type { BrandTextConfig } from './types.ts';
/** Settings namespace under which brand-text config persists. */
export declare const SETTINGS_NAMESPACE: "sidebar-brand-text";
/** Bridge returned by {@link installBrandTextSettings}. */
export interface BrandTextSettingsBridge {
    /** Read the current resolved config (entry source or settings layer). */
    source(): BrandTextConfig;
    /** Subscribe to config changes (live re-registration follows every commit). */
    onChange(callback: () => void): () => void;
}
/**
 * Install the `sidebar-brand-text` settings namespace and return the bridge.
 *
 * @param ctx - host context.
 * @param entry - raw composition-layer config seed.
 * @returns the settings bridge.
 */
export declare function installBrandTextSettings(ctx: Context, entry: BrandTextConfig): BrandTextSettingsBridge;
