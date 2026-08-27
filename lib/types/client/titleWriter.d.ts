import type { BrandTextState } from './controller.ts';
import type { SnapshotStore } from '@deepseek-ai/dsh-client-store';
/** Minimal face of `sessions.list` we depend on (ISessions.list slice). */
interface SessionListSnapshot {
    current: string | undefined;
    byId: Record<string, {
        title?: string;
    } | undefined>;
}
/** Minimal face of the `sessions` service we depend on. */
interface SessionsLike {
    readonly list: {
        getSnapshot(): SessionListSnapshot;
        subscribe(fn: () => void): () => void;
    };
}
/** Disposer returned by {@link startTitleWriter}. */
export type TitleWriterDisposer = () => void;
/**
 * Start overriding `document.title` with the configured brand name.
 *
 * @param sessions - the cordis `sessions` service (read-only face).
 * @param store - the shared `BrandTextSettingsController` store; the title
 *   updates when the config changes (card save) as well as when the current
 *   session changes.
 * @returns a disposer that tears down all subscriptions and the observer.
 */
export declare function startTitleWriter(sessions: SessionsLike | undefined, store: SnapshotStore<BrandTextState>): TitleWriterDisposer;
export {};
