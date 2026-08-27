/** Test double for @deepseek-ai/dsh-client-store (see vitest.config.ts alias).
 *  Provides createSnapshotStore + types used by the controller. */
import { vi } from 'vitest'

export interface ObservableSnapshot<T> {
  getSnapshot(): T
  subscribe(fn: () => void): () => void
}

export interface SnapshotStore<T> extends ObservableSnapshot<T> {
  update(mutator: (draft: T) => void): void
  set(next: T): void
}

export function createSnapshotStore<T>(init: T): SnapshotStore<T> {
  let state = init
  const listeners = new Set<() => void>()
  return {
    getSnapshot: () => state,
    subscribe: (fn: () => void) => {
      listeners.add(fn)
      return () => { listeners.delete(fn) }
    },
    update: (mutator: (draft: T) => void) => {
      const draft = structuredClone(state)
      mutator(draft)
      state = draft
      for (const fn of [...listeners]) fn()
    },
    set: (next: T) => {
      state = next
      for (const fn of [...listeners]) fn()
    },
  }
}

export function shallowEqual(a: unknown, b: unknown): boolean {
  return a === b
}
