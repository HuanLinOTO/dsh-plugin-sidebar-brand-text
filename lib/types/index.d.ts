/**
 * sidebar-brand-text — host plugin entry.
 *
 * Registers a `sidebar-brand-text` settings namespace (persisted to
 * `$DSH_HOME/settings.yaml`) and a self-hosted `/sbbt/api` HTTP route
 * (`get` / `set`). The browser half's settings card reads/writes the
 * brand name and revision badge through this route; the browser half's
 * `sidebar.brand.name` slot occupant reads the same values from the
 * shared `BrandTextSettingsController` store.
 *
 * The cordis.yml `config` block is the composition `base` (first-boot
 * seed); user edits live in settings.yaml under the `sidebar-brand-text`
 * namespace and take effect on the next gateway read — no restart needed.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text
 */
import type { Context } from '@deepseek-ai/cordis';
import { Config } from './config.ts';
import type { BrandTextEntryConfig } from './config.ts';
export declare const name = "sidebar-brand-text";
/** `webServer` is required for the HTTP gateway that backs the settings card. */
export declare const inject: string[];
export type { BrandTextConfig } from './types.ts';
/** Re-export the schemastery schema for cordis's composition loader. */
export { Config };
/**
 * Plugin body: install the settings bridge and register the HTTP gateway.
 *
 * @param ctx - host context carrying `webServer`.
 * @param config - the entry's volatile Cordis config.
 */
export declare function apply(ctx: Context, config: BrandTextEntryConfig): void;
