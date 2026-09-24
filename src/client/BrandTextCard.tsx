/**
 * BrandTextCard — the `plugins.row.config` slot occupant.
 *
 * An expandable card (mirrors the ego-browser `EgoBrowserCard` pattern)
 * with two text inputs: brand name and revision badge. Reads/writes
 * through the shared `BrandTextSettingsController` which uses
 * `fetch('/sbbt/api/get')` and `fetch('/sbbt/api/set')`.
 *
 * Registered under the `plugins.row.config` keyed slot with
 * `key: '@huanlin/dsh-plugin-sidebar-brand-text#sidebar-brand-text'` — the
 * plugin's configuration page on the Plugins page.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/client/BrandTextCard
 */
import type { CSSProperties } from 'react'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { SnapshotSelectorHook } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-plugin-manager/client'
import type { BrandTextState } from './controller.ts'

/** Inject face: controller + selector hook. */
export interface BrandTextCardInjected {
  readonly controller: {
    readonly load: () => Promise<void>
    readonly edit: (field: 'name' | 'revision', value: string) => void
    readonly discard: () => void
    readonly save: () => Promise<void>
    readonly toggle: () => void
  }
  readonly useSnapshot: SnapshotSelectorHook<BrandTextState>
}

/** Full props: the `plugins.row.config` owner share (view + form), locale seat, and inject. */
export type BrandTextCardProps =
  PropsRuntime<'plugins.row.config'>
  & PropsLocale<'dsh-plugin-sidebar-brand-text'>
  & BrandTextCardInjected

const cardStyle: CSSProperties = {
  border: '1px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.22))',
  background: 'var(--dsw-alias-bg-layer-3, transparent)',
  borderRadius: 12,
  listStyle: 'none',
  transition: 'border-color .16s, background .16s',
}

const headerStyle: CSSProperties = {
  appearance: 'none',
  width: '100%',
  font: 'inherit',
  color: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  background: 'transparent',
  border: 0,
  borderRadius: 12,
  alignItems: 'center',
  gap: 12,
  padding: '14px 16px',
  display: 'flex',
}

const headTextStyle: CSSProperties = {
  flexDirection: 'column',
  flex: 1,
  gap: 4,
  minWidth: 0,
  display: 'flex',
}

const nameStyle: CSSProperties = {
  color: 'var(--dsw-alias-label-primary, inherit)',
  fontSize: 15,
  fontWeight: 600,
  lineHeight: 1.4,
}

const descStyle: CSSProperties = {
  color: 'var(--dsw-alias-label-tertiary, rgba(128,128,128,0.7))',
  fontSize: 13,
  lineHeight: 1.5,
}

const pendingStyle: CSSProperties = {
  whiteSpace: 'nowrap',
  background: 'var(--dsw-alias-bg-module-platform, rgba(128,128,128,0.12))',
  color: 'var(--dsw-alias-label-secondary, inherit)',
  borderRadius: 999,
  flex: 'none',
  padding: '1px 8px',
  fontSize: 11,
  fontWeight: 500,
  lineHeight: '17px',
}

const chevronStyle = (open: boolean): CSSProperties => ({
  color: 'var(--dsw-alias-label-tertiary, inherit)',
  flex: 'none',
  transition: 'transform .16s',
  display: 'inline-flex',
  alignItems: 'center',
  transform: open ? 'rotate(180deg)' : 'none',
})

const bodyStyle: CSSProperties = {
  borderTop: '1px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.22))',
  margin: '0 16px',
  padding: '12px 0 4px',
}

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}

const fieldStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}

const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 500,
  color: 'var(--dsw-alias-label-primary, inherit)',
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '6px 10px',
  fontSize: 13,
  borderRadius: 8,
  border: '1px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.3))',
  background: 'var(--dsw-alias-bg-layer-3, transparent)',
  color: 'var(--dsw-alias-label-primary, inherit)',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

const hintStyle: CSSProperties = {
  fontSize: 12,
  color: 'var(--dsw-alias-label-tertiary, rgba(128,128,128,0.6))',
  margin: 0,
  lineHeight: 1.5,
}

const footerStyle: CSSProperties = {
  borderTop: '1px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.22))',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 8,
  padding: '12px 0 4px',
  display: 'flex',
}

const btnBase: CSSProperties = {
  appearance: 'none',
  font: 'inherit',
  cursor: 'pointer',
  border: '1px solid transparent',
  borderRadius: 8,
  padding: '5px 14px',
  fontSize: 13,
  fontWeight: 500,
  lineHeight: '20px',
  color: 'var(--dsw-alias-label-primary, inherit)',
  background: 'var(--dsw-alias-bg-module-platform, rgba(128,128,128,0.12))',
  transition: 'background .16s, opacity .16s',
}

const noticeStyle: CSSProperties = {
  color: 'var(--dsw-alias-label-tertiary, rgba(128,128,128,0.7))',
  margin: '0 0 8px',
  fontSize: 12,
  lineHeight: 1.5,
}

const savedStyle: CSSProperties = {
  color: 'var(--dsw-alias-state-success-primary, #30d158)',
  margin: '0 0 12px',
  fontSize: 12,
  lineHeight: 1.5,
}

const errorStyle: CSSProperties = {
  color: 'var(--dsw-alias-label-error, #ff453a)',
  margin: '0 0 12px',
  fontSize: 12,
  lineHeight: 1.5,
  minWidth: 0,
}

const CHEVRON_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'

/**
 * Render the sidebar-brand-text settings card.
 * @param props - locale + controller/useSnapshot inject.
 * @returns a `<li>` card element.
 */
export function BrandTextCard({ view, t, controller, useSnapshot }: BrandTextCardProps) {
  const state = useSnapshot((s) => s)
  if (state.status === 'idle') void controller.load()

  // The row's detail page uses `summary` only when the package description is
  // absent; render the one-liner there and the interactive form otherwise.
  if (view === 'summary') return t('card.intro')

  const degraded = state.status === 'ready' && !state.available
  const open = state._open || degraded
  const applyState = state.applyState ?? { kind: 'idle' }
  const saving = applyState.kind === 'saving'
  const saved = applyState.kind === 'saved'
  const errorText = applyState.kind === 'error' ? applyState.message : undefined
  const busy = !state.writable || saving

  const header = (
    <button
      type="button"
      style={headerStyle}
      aria-expanded={open}
      aria-label={t('card.title')}
      onClick={() => { if (!degraded) controller.toggle() }}
    >
      <span style={headTextStyle}>
        <span style={nameStyle}>{t('card.title')}</span>
        <span style={descStyle}>{t('card.intro')}</span>
      </span>
      {state.dirty ? <span style={pendingStyle}>{t('card.unsaved')}</span> : null}
      <span style={chevronStyle(open)} dangerouslySetInnerHTML={{ __html: CHEVRON_SVG }} />
    </button>
  )

  let body: React.ReactNode = null
  if (open) {
    if (!state.available) {
      body = (
        <div style={bodyStyle}>
          <p style={noticeStyle} role="status">{t('card.unavailable')}</p>
          <div style={footerStyle}>
            <button
              type="button"
              style={btnBase}
              onClick={() => { void controller.load() }}
            >
              {t('card.retry')}
            </button>
          </div>
        </div>
      )
    } else {
      body = (
        <div style={bodyStyle}>
          {saved ? <p style={savedStyle} role="status">{t('card.saved')}</p> : null}
          {errorText !== undefined ? <p style={errorStyle} role="status">{errorText}</p> : null}
          <div style={formStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="sbbt-name">{t('field.name.label')}</label>
              <input
                id="sbbt-name"
                type="text"
                style={inputStyle}
                value={state.draft.name}
                placeholder={t('field.name.placeholder')}
                disabled={busy}
                onChange={(e) => controller.edit('name', e.target.value)}
              />
              <p style={hintStyle}>{t('field.name.hint')}</p>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="sbbt-revision">{t('field.revision.label')}</label>
              <input
                id="sbbt-revision"
                type="text"
                style={inputStyle}
                value={state.draft.revision}
                placeholder={t('field.revision.placeholder')}
                disabled={busy}
                onChange={(e) => controller.edit('revision', e.target.value)}
              />
              <p style={hintStyle}>{t('field.revision.hint')}</p>
            </div>
          </div>
          <div style={footerStyle}>
            <button
              type="button"
              style={{ ...btnBase, opacity: (!state.dirty || saving) ? 0.5 : 1 }}
              disabled={!state.dirty || saving}
              onClick={() => controller.discard()}
            >
              {t('card.discard')}
            </button>
            <button
              type="button"
              style={{
                ...btnBase,
                background: 'var(--dsw-alias-brand-primary, #0a84ff)',
                color: 'var(--dsw-alias-bg-layer-1, #fff)',
                opacity: (!state.dirty || saving) ? 0.5 : 1,
              }}
              disabled={!state.dirty || saving}
              onClick={() => { void controller.save() }}
            >
              {saving ? t('card.saving') : t('card.save')}
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <li style={cardStyle}>
      {header}
      {open ? body : null}
    </li>
  )
}
