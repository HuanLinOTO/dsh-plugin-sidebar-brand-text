/**
 * sidebar-brand-text — browser half.
 *
 * Two registrations:
 *   - `settings.plugin.item` keyed slot (key `sidebar-brand-text`) — a card
 *     in the Plugin Config page with two text inputs (name + revision).
 *     Reads/writes through the `/sbbt/api` HTTP route via the shared
 *     `BrandTextSettingsController`.
 *   - `sidebar.brand.name` single slot — renders the configured brand name
 *     text and optional revision badge. Reads from the same controller
 *     store via `useSnapshot`, so a save in the card is instantly
 *     reflected in the sidebar.
 *
 * The mark slot (`sidebar.brand.mark`) is deliberately NOT registered:
 * the fish logo stays in place unless another plugin (e.g.
 * `ui-brand-official`) replaces it.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/client
 */

import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'
import { BrandText, type BrandTextInjected } from './BrandText.tsx'
import { BrandTextCard, type BrandTextCardInjected } from './BrandTextCard.tsx'
import { BrandTextSettingsController } from './controller.ts'
import { bindSnapshotSelector } from './bindSnapshotSelector.ts'
import { en, NS, zh, type BrandTextKey } from './locales.ts'
import { installStyles } from './styles.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The settings card labels. */
    'dsh-plugin-sidebar-brand-text': BrandTextKey
  }
}

/** Required services: slots + locale. */
export const inject = ['slots', 'locale']

/**
 * Client plugin body: register the brand-name slot occupant, the settings
 * card, the locale dictionary, and the stylesheet.
 *
 * A single `BrandTextSettingsController` is shared between the card and
 * the brand text so a save is instantly reflected in the sidebar.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'sidebar-brand-text: dictionaries')
  ctx.effect(installStyles, 'sidebar-brand-text: styles')

  const controller = new BrandTextSettingsController()
  const useSnapshot = bindSnapshotSelector(controller.store)

  void controller.load()

  const brandInjected = (): BrandTextInjected => ({ useSnapshot })
  ctx.slots.inject('sidebar.brand.name', () =>
    ctx.slots.register(
      {
        name: 'sidebar.brand.name',
        inject: brandInjected,
      },
      BrandText,
    ),
  )

  const cardInjected = (): BrandTextCardInjected => ({ controller, useSnapshot })
  ctx.slots.inject('settings.plugin.item', function* () {
    yield ctx.slots.register(
      {
        name: 'settings.plugin.item',
        key: 'sidebar-brand-text',
        locale: NS,
        inject: cardInjected,
      },
      BrandTextCard,
    )
  })
}
