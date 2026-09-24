import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { SnapshotSelectorHook } from '@deepseek-ai/dsh-client-ui-slots';
import type { BrandTextState } from './controller.ts';
/** Inject face: controller + selector hook. */
export interface BrandTextCardInjected {
    readonly controller: {
        readonly load: () => Promise<void>;
        readonly edit: (field: 'name' | 'revision', value: string) => void;
        readonly discard: () => void;
        readonly save: () => Promise<void>;
    };
    readonly useSnapshot: SnapshotSelectorHook<BrandTextState>;
}
/** Full props: the `plugins.row.config` owner share (view + form), locale seat, and inject. */
export type BrandTextCardProps = PropsRuntime<'plugins.row.config'> & PropsLocale<'dsh-plugin-sidebar-brand-text'> & BrandTextCardInjected;
/**
 * Render the sidebar-brand-text settings editor.
 * @param props - locale + controller/useSnapshot inject.
 * @returns a `<li>` card element with the always-expanded editor body.
 */
export declare function BrandTextCard({ view, t, controller, useSnapshot }: BrandTextCardProps): string | import("react").JSX.Element;
