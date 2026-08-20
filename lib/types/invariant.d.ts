/** Package invariant companion for dsh-plugin-sidebar-brand-text. */
import type { Context } from '@deepseek-ai/cordis';
export declare const name = "sidebar-brand-text-invariant";
export declare const inject: string[];
/**
 * Register this package's invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export declare const apply: (ctx: Context) => Promise<() => void>;
