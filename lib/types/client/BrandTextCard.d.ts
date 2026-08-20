import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import type { SnapshotSelectorHook } from '@deepseek-ai/dsh-client-ui-slots';
import type { BrandTextState } from './controller.ts';
/** Inject face: controller + selector hook. */
export interface BrandTextCardInjected {
    readonly controller: {
        readonly load: () => Promise<void>;
        readonly edit: (field: 'name' | 'revision', value: string) => void;
        readonly discard: () => void;
        readonly save: () => Promise<void>;
        readonly toggle: () => void;
    };
    readonly useSnapshot: SnapshotSelectorHook<BrandTextState>;
}
/** Full props: locale seat + inject. */
export type BrandTextCardProps = PropsLocale<'dsh-plugin-sidebar-brand-text'> & BrandTextCardInjected;
/**
 * Render the sidebar-brand-text settings card.
 * @param props - locale + controller/useSnapshot inject.
 * @returns a `<li>` card element.
 */
export declare function BrandTextCard({ t, controller, useSnapshot }: BrandTextCardProps): import("react").JSX.Element;
