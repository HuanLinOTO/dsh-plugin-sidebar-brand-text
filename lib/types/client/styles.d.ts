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
export declare const CSS = "\n.sbbt-brand-name {\n  font-size: 17px;\n  letter-spacing: 0px;\n  white-space: nowrap;\n}\n\n.sbbt-build-revision {\n  display: inline-flex;\n  align-items: center;\n  height: 16px;\n  padding: 0 4px;\n  border-radius: 3px;\n  color: var(--dsw-alias-label-primary-inverted);\n  background: var(--dsw-alias-label-primary);\n  font-family: var(--ds-font-family-code);\n  font-size: 8px;\n  font-weight: 500;\n  line-height: 16px;\n}\n";
/**
 * Install the stylesheet and return its disposer.
 * @returns a cleanup function that removes the injected `<style>` tag.
 */
export declare function installStyles(): () => void;
