/**
 * Override dictionaries for the `dsh-plugin-sidebar-brand-text` namespace,
 * registered with the better-locale override store (`ctx.betterLocale`)
 * when that plugin is installed. Keyed by locale id; every dictionary
 * covers the same keys as the native zh/en copy in `locales.ts`.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/client/dictionaries
 */
import type { BrandTextKey } from './locales.ts';
/**
 * Locale-id keyed override dictionaries, one full copy per language.
 * The dict shape matches `BetterLocaleStore.register(ns, dicts)` where
 * `dicts` is `Record<localeId, Record<key, string>>`.
 */
export declare const dicts: Record<string, Record<BrandTextKey, string>>;
