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
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import { type BrandTextKey } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** The settings card labels. */
        'dsh-plugin-sidebar-brand-text': BrandTextKey;
    }
}
/** Required services: slots + locale + sessions (sessions drives the title writer). */
export declare const inject: string[];
/**
 * Client plugin body: register the brand-name slot occupant, the settings
 * card, the locale dictionary, and the stylesheet.
 *
 * A single `BrandTextSettingsController` is shared between the card and
 * the brand text so a save is instantly reflected in the sidebar.
 * @param ctx - client root context.
 */
export declare function apply(ctx: ClientContext): void;
