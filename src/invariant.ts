/** Package invariant companion for dsh-plugin-sidebar-brand-text. */
import type { Context } from '@deepseek-ai/cordis'
import type { InvariantInstaller } from '@deepseek-ai/dsh-invariants'

const PACKAGE_NAME = '@huanlin/dsh-plugin-sidebar-brand-text'

export const name = 'sidebar-brand-text-invariant'
export const inject = ['invariants']

/**
 * No runtime invariant: the single `sidebar.brand.name` slot registration
 * is a registry-owned contribution whose disposal is proven by the
 * declaration-aware `slots.inject()` rollback. The plugin retains no
 * mutable state beyond the config snapshot closed over by the inject
 * factory.
 */
const install: InvariantInstaller = () => {}

/**
 * Register this package's invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export const apply = (ctx: Context): Promise<() => void> =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install))
