/**
 * `BrandTextSettingsController` — client-side state store for the
 * sidebar-brand-text config.
 *
 * Loads the config from the host's `/sbbt/api/get` route, stages edits,
 * and saves via `/sbbt/api/set`. The `sidebar.brand.name` slot occupant
 * and the `settings.plugin.item` card both read from the same store via
 * `bindSnapshotSelector`, so a save is instantly reflected in the sidebar
 * without a DOM event or page reload.
 *
 * Mirrors the ego-browser `EgoBrowserSettingsController` pattern.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/client/controller
 */
import { type SnapshotStore } from '@deepseek-ai/dsh-client-runtime/client';
import { type BrandTextConfig } from '../types.ts';
/** The controller's snapshot state. */
export interface BrandTextState {
    /** 'idle' | 'loading' | 'ready' */
    status: 'idle' | 'loading' | 'ready';
    /** True after a successful `/sbbt/api/get`; false when the route is unreachable. */
    available: boolean;
    /** False when the settings service is absent (read-only). */
    writable: boolean;
    /** Current draft values (edited by the card, read by the brand slot). */
    draft: BrandTextConfig;
    /** True when the draft differs from the last-saved config. */
    dirty: boolean;
    /** Apply lifecycle: 'idle' | 'saving' | 'saved' | 'error'. */
    applyState: {
        kind: 'idle';
    } | {
        kind: 'saving';
    } | {
        kind: 'saved';
    } | {
        kind: 'error';
        message: string;
    };
    /** Card expand state (toggled by the card header button). */
    _open: boolean;
}
/**
 * Controller managing the brand-text config lifecycle.
 *
 * Constructed once in the client `apply()` and shared between the
 * `sidebar.brand.name` slot and the `settings.plugin.item` card.
 */
export declare class BrandTextSettingsController {
    readonly store: SnapshotStore<BrandTextState>;
    loaded: boolean;
    private generation;
    constructor();
    /** Fetch the config from `/sbbt/api/get` and update the store. */
    load(): Promise<void>;
    /** Stage an edit to a field (does not save). */
    edit(field: 'name' | 'revision', value: string): void;
    /** Discard staged edits and reload from the host. */
    discard(): void;
    /** Save the staged draft via `/sbbt/api/set`. */
    save(): Promise<void>;
    /** Toggle the card's expand state (mirrors ego-browser `controller.toggle()`). */
    toggle(): void;
    /** Mark the store as unavailable (route unreachable or settings service absent). */
    private markUnavailable;
}
