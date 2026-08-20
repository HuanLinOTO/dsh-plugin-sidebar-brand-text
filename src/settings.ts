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
import type { Context } from '@deepseek-ai/cordis'
import { settingsNamespace, type SettingsScope } from '@deepseek-ai/dsh-settings'
import { Config } from './config.ts'
import type { BrandTextConfig } from './types.ts'

/** Settings namespace under which brand-text config persists. */
export const SETTINGS_NAMESPACE = settingsNamespace('sidebar-brand-text')

/**
 * Mirror of the dsh-settings internal `isUnloading` guard. The cordis const
 * enum for fiber state is erased at compile time, so the literal states are
 * matched numerically: 4 = DISPOSED, 5 = UNLOADING.
 */
function isUnloading(ctx: Context): boolean {
  const state = (ctx as unknown as { fiber?: { state?: number } }).fiber?.state
  return state === 4 || state === 5
}

/** Bridge returned by {@link installBrandTextSettings}. */
export interface BrandTextSettingsBridge {
  /** Read the current resolved config (entry source or settings layer). */
  source(): BrandTextConfig
  /** Subscribe to config changes (live re-registration follows every commit). */
  onChange(callback: () => void): () => void
}

/**
 * Install the `sidebar-brand-text` settings namespace and return the bridge.
 *
 * @param ctx - host context.
 * @param entry - raw composition-layer config seed.
 * @returns the settings bridge.
 */
export function installBrandTextSettings(ctx: Context, entry: BrandTextConfig): BrandTextSettingsBridge {
  const listeners = new Set<() => void>()
  let source = (): BrandTextConfig => entry
  const notify = (): void => {
    for (const listener of [...listeners]) listener()
  }

  ctx.inject(['settings'], (sctx) => {
    let scope: SettingsScope<BrandTextConfig> | undefined
    try {
      scope = sctx.settings.register(SETTINGS_NAMESPACE, Config, { base: entry })
    } catch (error) {
      if (!(error instanceof Error) || !error.message.includes('already registered')) throw error
      ctx.logger('sidebar-brand-text')?.debug('settings namespace already registered — entry-source fallback')
      return
    }
    source = () => scope!.get()
    sctx.effect(() => () => {
      if (isUnloading(ctx)) return
      source = () => entry
      notify()
    })
    notify()
    scope.watch(() => {
      if (isUnloading(ctx)) return
      notify()
    })
  })

  return {
    source: () => source(),
    onChange: (cb) => {
      listeners.add(cb)
      return () => { listeners.delete(cb) }
    },
  }
}
