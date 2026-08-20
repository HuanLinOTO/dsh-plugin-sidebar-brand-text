/**
 * Schemastery schema + resolver for the `sidebar-brand-text` config.
 *
 * The composition `Config` (cordis.patch.yml seed) and the settings namespace
 * schema share the same shape: `name` (brand text) + `revision` (badge text,
 * empty = hidden). `resolveConfig` applies defaults so a partially-populated
 * entry or settings layer still yields a complete value.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/config
 */
import z from '@deepseek-ai/schemastery';
import type { BrandTextConfig } from './types.ts';
/** Schemastery schema for the composition entry and the settings namespace. */
export declare const Config: z<BrandTextConfig>;
/**
 * Resolve a raw config object into a complete {@link BrandTextConfig}.
 *
 * Unknown keys are dropped; missing or wrong-typed keys fall back to
 * the defaults. This runs on every gateway read so the client always
 * sees a well-formed value.
 * @param config - raw config (entry source or settings layer).
 * @returns the resolved config with defaults applied.
 */
export declare function resolveConfig(config?: Record<string, unknown>): BrandTextConfig;
