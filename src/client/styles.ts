/**
 * One scoped stylesheet injected for the lifetime of the client activation.
 *
 * The shell's `sidebar.brand.name` fallback renders two CSS-Module-hashed
 * spans (`.fallbackBrandName` + `.buildRevision`); those class names are
 * not stable across builds and not addressable from outside the sidebar
 * package. This plugin ships its own class names with the same visual
 * intent, all colors and typography drawn from the shared `--dsw-*`
 * tokens (never literals) so the badge tracks the active theme.
 *
 * The parent `.brandName` span (inline-flex, gap: 6px, font-size: 18px,
 * font-weight: 600) is owned by the sidebar shell and wraps whatever the
 * slot occupant returns, so this stylesheet only needs to style the two
 * child spans.
 */
export const CSS = `
.sbbt-brand-name {
  font-size: 17px;
  letter-spacing: 0px;
  white-space: nowrap;
}

.sbbt-build-revision {
  display: inline-flex;
  align-items: center;
  height: 16px;
  padding: 0 4px;
  border-radius: 3px;
  color: var(--dsw-alias-label-primary-inverted);
  background: var(--dsw-alias-label-primary);
  font-family: var(--ds-font-family-code);
  font-size: 8px;
  font-weight: 500;
  line-height: 16px;
}
`

/**
 * Install the stylesheet and return its disposer.
 * @returns a cleanup function that removes the injected `<style>` tag.
 */
export function installStyles(): () => void {
  if (typeof document === 'undefined') return () => {}
  const style = document.createElement('style')
  style.setAttribute('data-sidebar-brand-text-style', '')
  style.textContent = CSS
  document.head.appendChild(style)
  return () => { style.remove() }
}
