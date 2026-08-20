// @vitest-environment jsdom
/** Component spec: BrandText reads from the shared store and renders name + badge. */
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, describe, expect, it, beforeEach } from 'vitest'
import { createSnapshotStore, type SnapshotStore } from '@deepseek-ai/dsh-client-runtime/client'
import { BrandText } from '../src/client/BrandText.tsx'
import type { BrandTextState } from '../src/client/controller.ts'
import { DEFAULT_BRAND_TEXT_CONFIG } from '../src/types.ts'
import { bindSnapshotSelector } from '../src/client/bindSnapshotSelector.ts'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

function makeStore(overrides: Partial<BrandTextState> = {}): SnapshotStore<BrandTextState> {
  return createSnapshotStore<BrandTextState>({
    status: 'ready',
    available: true,
    writable: true,
    draft: { ...DEFAULT_BRAND_TEXT_CONFIG },
    dirty: false,
    applyState: { kind: 'idle' },
    ...overrides,
  })
}

function render(store: SnapshotStore<BrandTextState>): { container: HTMLDivElement, root: Root } {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  const useSnapshot = bindSnapshotSelector(store)
  act(() => {
    root.render(<BrandText useSnapshot={useSnapshot} />)
  })
  return { container, root }
}

function unmount(root: Root): void {
  act(() => { root.unmount() })
}

beforeEach(() => { document.body.innerHTML = '' })
afterEach(() => { document.body.innerHTML = '' })

describe('BrandText component', () => {
  it('renders the configured name', () => {
    const store = makeStore({ draft: { name: 'My Build', revision: '' } })
    const { container, root } = render(store)
    expect(container.innerHTML).toContain('sbbt-brand-name')
    expect(container.innerHTML).toContain('My Build')
    expect(container.innerHTML).not.toContain('sbbt-build-revision')
    unmount(root)
  })

  it('renders the revision badge when non-empty', () => {
    const store = makeStore({ draft: { name: 'DSH', revision: 'v1.0.0' } })
    const { container, root } = render(store)
    expect(container.innerHTML).toContain('sbbt-build-revision')
    expect(container.innerHTML).toContain('v1.0.0')
    unmount(root)
  })

  it('hides the revision badge when empty', () => {
    const store = makeStore({ draft: { name: 'DSH', revision: '' } })
    const { container, root } = render(store)
    expect(container.innerHTML).not.toContain('sbbt-build-revision')
    unmount(root)
  })

  it('name span comes before the revision span', () => {
    const store = makeStore({ draft: { name: 'Acme', revision: 'abc1234' } })
    const { container, root } = render(store)
    const html = container.innerHTML
    const nameIdx = html.indexOf('sbbt-brand-name')
    const revIdx = html.indexOf('sbbt-build-revision')
    expect(nameIdx).toBeLessThan(revIdx)
    expect(revIdx).toBeGreaterThan(-1)
    unmount(root)
  })

  it('falls back to defaults when not available', () => {
    const store = makeStore({ available: false, draft: { name: 'Should Not Show', revision: 'nope' } })
    const { container, root } = render(store)
    expect(container.innerHTML).toContain(DEFAULT_BRAND_TEXT_CONFIG.name)
    expect(container.innerHTML).not.toContain('Should Not Show')
    unmount(root)
  })

  it('reflects store updates live', () => {
    const store = makeStore({ draft: { name: 'First', revision: '' } })
    const { container, root } = render(store)
    expect(container.innerHTML).toContain('First')
    act(() => {
      store.update((s) => { s.draft.name = 'Second'; s.draft.revision = 'v2' })
    })
    expect(container.innerHTML).toContain('Second')
    expect(container.innerHTML).toContain('v2')
    unmount(root)
  })
})
