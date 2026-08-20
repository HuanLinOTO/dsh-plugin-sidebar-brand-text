window.__ModuleLoader__.load({ id: "@huanlin/dsh-plugin-sidebar-brand-text", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);
let __deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
__deepseek_ai_dsh_client_runtime_client = __toESM(__deepseek_ai_dsh_client_runtime_client);
let react = require("react");
react = __toESM(react);

//#region src/types.ts
/** Runtime defaults applied when no config arrives (defensive only). */
const DEFAULT_BRAND_TEXT_CONFIG = {
	name: "DSH Local Build",
	revision: ""
};

//#endregion
//#region src/client/BrandText.tsx
/**
* Render the configured brand name and optional revision badge.
*
* While loading or on error, falls back to the shell defaults.
* @param props - the `useSnapshot` inject face (plus the slot's runtime share, unused).
* @returns the brand-name span and optional revision-badge span.
*/
function BrandText({ useSnapshot }) {
	const state = useSnapshot((s) => s);
	const cfg = state.available ? state.draft : DEFAULT_BRAND_TEXT_CONFIG;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "sbbt-brand-name",
		children: cfg.name
	}), cfg.revision !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: "sbbt-build-revision",
		children: cfg.revision
	}) : null] });
}

//#endregion
//#region src/client/BrandTextCard.tsx
const cardStyle = {
	border: "1px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.22))",
	background: "var(--dsw-alias-bg-layer-3, transparent)",
	borderRadius: 12,
	listStyle: "none",
	transition: "border-color .16s, background .16s"
};
const headerStyle = {
	appearance: "none",
	width: "100%",
	font: "inherit",
	color: "inherit",
	textAlign: "left",
	cursor: "pointer",
	background: "transparent",
	border: 0,
	borderRadius: 12,
	alignItems: "center",
	gap: 12,
	padding: "14px 16px",
	display: "flex"
};
const headTextStyle = {
	flexDirection: "column",
	flex: 1,
	gap: 4,
	minWidth: 0,
	display: "flex"
};
const nameStyle = {
	color: "var(--dsw-alias-label-primary, inherit)",
	fontSize: 15,
	fontWeight: 600,
	lineHeight: 1.4
};
const descStyle = {
	color: "var(--dsw-alias-label-tertiary, rgba(128,128,128,0.7))",
	fontSize: 13,
	lineHeight: 1.5
};
const pendingStyle = {
	whiteSpace: "nowrap",
	background: "var(--dsw-alias-bg-module-platform, rgba(128,128,128,0.12))",
	color: "var(--dsw-alias-label-secondary, inherit)",
	borderRadius: 999,
	flex: "none",
	padding: "1px 8px",
	fontSize: 11,
	fontWeight: 500,
	lineHeight: "17px"
};
const chevronStyle = (open) => ({
	color: "var(--dsw-alias-label-tertiary, inherit)",
	flex: "none",
	transition: "transform .16s",
	display: "inline-flex",
	alignItems: "center",
	transform: open ? "rotate(180deg)" : "none"
});
const bodyStyle = {
	borderTop: "1px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.22))",
	margin: "0 16px",
	padding: "12px 0 4px"
};
const formStyle = {
	display: "flex",
	flexDirection: "column",
	gap: 12
};
const fieldStyle = {
	display: "flex",
	flexDirection: "column",
	gap: 4
};
const labelStyle = {
	display: "block",
	fontSize: 13,
	fontWeight: 500,
	color: "var(--dsw-alias-label-primary, inherit)"
};
const inputStyle = {
	width: "100%",
	padding: "6px 10px",
	fontSize: 13,
	borderRadius: 8,
	border: "1px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.3))",
	background: "var(--dsw-alias-bg-layer-3, transparent)",
	color: "var(--dsw-alias-label-primary, inherit)",
	boxSizing: "border-box",
	fontFamily: "inherit"
};
const hintStyle = {
	fontSize: 12,
	color: "var(--dsw-alias-label-tertiary, rgba(128,128,128,0.6))",
	margin: 0,
	lineHeight: 1.5
};
const footerStyle = {
	borderTop: "1px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.22))",
	justifyContent: "flex-end",
	alignItems: "center",
	gap: 8,
	padding: "12px 0 4px",
	display: "flex"
};
const btnBase = {
	appearance: "none",
	font: "inherit",
	cursor: "pointer",
	border: "1px solid transparent",
	borderRadius: 8,
	padding: "5px 14px",
	fontSize: 13,
	fontWeight: 500,
	lineHeight: "20px",
	color: "var(--dsw-alias-label-primary, inherit)",
	background: "var(--dsw-alias-bg-module-platform, rgba(128,128,128,0.12))",
	transition: "background .16s, opacity .16s"
};
const noticeStyle = {
	color: "var(--dsw-alias-label-tertiary, rgba(128,128,128,0.7))",
	margin: "0 0 8px",
	fontSize: 12,
	lineHeight: 1.5
};
const savedStyle = {
	color: "var(--dsw-alias-state-success-primary, #30d158)",
	margin: "0 0 12px",
	fontSize: 12,
	lineHeight: 1.5
};
const errorStyle = {
	color: "var(--dsw-alias-label-error, #ff453a)",
	margin: "0 0 12px",
	fontSize: 12,
	lineHeight: 1.5,
	minWidth: 0
};
const CHEVRON_SVG = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>";
/**
* Render the sidebar-brand-text settings card.
* @param props - locale + controller/useSnapshot inject.
* @returns a `<li>` card element.
*/
function BrandTextCard({ t, controller, useSnapshot }) {
	const state = useSnapshot((s) => s);
	if (state.status === "idle") controller.load();
	const degraded = state.status === "ready" && !state.available;
	const open = state._open || degraded;
	const applyState = state.applyState ?? { kind: "idle" };
	const saving = applyState.kind === "saving";
	const saved = applyState.kind === "saved";
	const errorText = applyState.kind === "error" ? applyState.message : void 0;
	const busy = !state.writable || saving;
	const header = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		type: "button",
		style: headerStyle,
		"aria-expanded": open,
		"aria-label": t("card.title"),
		onClick: () => {
			if (!degraded) controller.toggle();
		},
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				style: headTextStyle,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					style: nameStyle,
					children: t("card.title")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					style: descStyle,
					children: t("card.intro")
				})]
			}),
			state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: pendingStyle,
				children: t("card.unsaved")
			}) : null,
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: chevronStyle(open),
				dangerouslySetInnerHTML: { __html: CHEVRON_SVG }
			})
		]
	});
	let body = null;
	if (open) if (!state.available) body = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		style: bodyStyle,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
			style: noticeStyle,
			role: "status",
			children: t("card.unavailable")
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: footerStyle,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				style: btnBase,
				onClick: () => {
					controller.load();
				},
				children: t("card.retry")
			})
		})]
	});
	else body = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		style: bodyStyle,
		children: [
			saved ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				style: savedStyle,
				role: "status",
				children: t("card.saved")
			}) : null,
			errorText !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				style: errorStyle,
				role: "status",
				children: errorText
			}) : null,
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: formStyle,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: fieldStyle,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							style: labelStyle,
							htmlFor: "sbbt-name",
							children: t("field.name.label")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							id: "sbbt-name",
							type: "text",
							style: inputStyle,
							value: state.draft.name,
							placeholder: t("field.name.placeholder"),
							disabled: busy,
							onChange: (e) => controller.edit("name", e.target.value)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							style: hintStyle,
							children: t("field.name.hint")
						})
					]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: fieldStyle,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							style: labelStyle,
							htmlFor: "sbbt-revision",
							children: t("field.revision.label")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							id: "sbbt-revision",
							type: "text",
							style: inputStyle,
							value: state.draft.revision,
							placeholder: t("field.revision.placeholder"),
							disabled: busy,
							onChange: (e) => controller.edit("revision", e.target.value)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							style: hintStyle,
							children: t("field.revision.hint")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: footerStyle,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					style: {
						...btnBase,
						opacity: !state.dirty || saving ? .5 : 1
					},
					disabled: !state.dirty || saving,
					onClick: () => controller.discard(),
					children: t("card.discard")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					style: {
						...btnBase,
						background: "var(--dsw-alias-brand-primary, #0a84ff)",
						color: "var(--dsw-alias-bg-layer-1, #fff)",
						opacity: !state.dirty || saving ? .5 : 1
					},
					disabled: !state.dirty || saving,
					onClick: () => {
						controller.save();
					},
					children: saving ? t("card.saving") : t("card.save")
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
		style: cardStyle,
		children: [header, open ? body : null]
	});
}

//#endregion
//#region src/client/controller.ts
/** Initial state before the first load. */
function initialState() {
	return {
		status: "idle",
		available: false,
		writable: false,
		draft: { ...DEFAULT_BRAND_TEXT_CONFIG },
		dirty: false,
		applyState: { kind: "idle" },
		_open: false
	};
}
/**
* Controller managing the brand-text config lifecycle.
*
* Constructed once in the client `apply()` and shared between the
* `sidebar.brand.name` slot and the `settings.plugin.item` card.
*/
var BrandTextSettingsController = class {
	store;
	loaded = false;
	generation = 0;
	constructor() {
		this.store = (0, __deepseek_ai_dsh_client_runtime_client.createSnapshotStore)(initialState());
	}
	/** Fetch the config from `/sbbt/api/get` and update the store. */
	async load() {
		const gen = ++this.generation;
		this.store.update((s) => {
			s.status = "loading";
		});
		try {
			const res = await fetch("/sbbt/api/get", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: "{}"
			});
			if (!res.ok) {
				this.markUnavailable(gen);
				return;
			}
			const parsed = await res.json().catch(() => null);
			if (gen !== this.generation) return;
			if (!parsed || parsed.ok !== true || !parsed.value) {
				this.markUnavailable(gen);
				return;
			}
			const config = parsed.value.config;
			this.loaded = true;
			this.store.update((s) => {
				s.status = "ready";
				s.available = true;
				s.writable = true;
				if (config) s.draft = {
					name: config.name,
					revision: config.revision
				};
				s.dirty = false;
				s.applyState = { kind: "idle" };
			});
		} catch {
			this.markUnavailable(gen);
		}
	}
	/** Stage an edit to a field (does not save). */
	edit(field, value) {
		this.store.update((s) => {
			if (field === "name") s.draft.name = value;
			else s.draft.revision = value;
			s.dirty = true;
			s.applyState = { kind: "idle" };
		});
	}
	/** Discard staged edits and reload from the host. */
	discard() {
		this.load();
	}
	/** Save the staged draft via `/sbbt/api/set`. */
	async save() {
		const gen = ++this.generation;
		const snapshot = this.store.getSnapshot();
		if (!snapshot.dirty) return;
		this.store.update((s) => {
			s.applyState = { kind: "saving" };
		});
		try {
			const parsed = await (await fetch("/sbbt/api/set", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ patch: snapshot.draft })
			})).json().catch(() => null);
			if (gen !== this.generation) return;
			if (!parsed || parsed.ok !== true || !parsed.value) {
				const message = parsed?.error?.message ?? "Save failed";
				this.store.update((s) => {
					s.applyState = {
						kind: "error",
						message
					};
				});
				return;
			}
			const config = parsed.value.config;
			this.store.update((s) => {
				s.applyState = { kind: "saved" };
				if (config) s.draft = {
					name: config.name,
					revision: config.revision
				};
				s.dirty = false;
			});
		} catch (error) {
			if (gen !== this.generation) return;
			const message = error instanceof Error ? error.message : String(error);
			this.store.update((s) => {
				s.applyState = {
					kind: "error",
					message
				};
			});
		}
	}
	/** Toggle the card's expand state (mirrors ego-browser `controller.toggle()`). */
	toggle() {
		this.store.update((s) => {
			s._open = !s._open;
		});
	}
	/** Mark the store as unavailable (route unreachable or settings service absent). */
	markUnavailable(gen) {
		if (gen !== this.generation) return;
		this.store.update((s) => {
			s.status = "ready";
			s.available = false;
			s.writable = false;
		});
	}
};

//#endregion
//#region src/client/bindSnapshotSelector.ts
/**
* Bind a React selector hook to a {@link HostObservable} snapshot source.
* @param source - the observable snapshot store.
* @returns a `useSelector(sel, eq?)` hook.
*/
function bindSnapshotSelector(source) {
	const subscribe = (fn) => source.subscribe(fn);
	const getSnapshot = () => source.getSnapshot();
	return function useSelector(sel) {
		const snapshot = (0, react.useSyncExternalStore)(subscribe, getSnapshot);
		const prevSnapshotRef = (0, react.useRef)(void 0);
		const prevSelectedRef = (0, react.useRef)(void 0);
		if (prevSnapshotRef.current !== snapshot) {
			prevSnapshotRef.current = snapshot;
			prevSelectedRef.current = sel(snapshot);
		}
		return prevSelectedRef.current;
	};
}

//#endregion
//#region src/client/locales.ts
/** The locale namespace name; matches the `locale: NS` passed at slot register. */
const NS = "dsh-plugin-sidebar-brand-text";
/** English dictionary. */
const en = {
	"card.title": "Sidebar Brand Text",
	"card.intro": "Replace the sidebar brand name and revision badge with custom text.",
	"card.unsaved": "Unsaved",
	"card.saved": "Saved",
	"card.saving": "Saving…",
	"card.discard": "Discard",
	"card.save": "Save",
	"card.unavailable": "The sidebar-brand-text configuration channel is unavailable. Please retry later.",
	"card.retry": "Retry",
	"field.name.label": "Brand name",
	"field.name.placeholder": "DSH Local Build",
	"field.name.hint": "Text shown in the sidebar next to the logo. Replaces the default \"DSH Local Build\".",
	"field.revision.label": "Revision badge",
	"field.revision.placeholder": "e.g. v1.0.0 or abc1234",
	"field.revision.hint": "Small badge text beside the brand name. Leave empty to hide the badge."
};
/** Chinese dictionary. */
const zh = {
	"card.title": "侧边栏品牌文案",
	"card.intro": "替换侧边栏左上角的品牌名与构建徽标文案。",
	"card.unsaved": "未保存",
	"card.saved": "已保存",
	"card.saving": "保存中…",
	"card.discard": "放弃",
	"card.save": "保存",
	"card.unavailable": "侧边栏品牌文案配置通道不可用，请稍后重试。",
	"card.retry": "重试",
	"field.name.label": "品牌名称",
	"field.name.placeholder": "DSH Local Build",
	"field.name.hint": "侧边栏 logo 右侧显示的文案。替换默认的「DSH Local Build」。",
	"field.revision.label": "版本徽标",
	"field.revision.placeholder": "如 v1.0.0 或 abc1234",
	"field.revision.hint": "品牌名右侧的小徽标文案。留空则不显示徽标。"
};

//#endregion
//#region src/client/styles.ts
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
const CSS = `
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
`;
/**
* Install the stylesheet and return its disposer.
* @returns a cleanup function that removes the injected `<style>` tag.
*/
function installStyles() {
	if (typeof document === "undefined") return () => {};
	const style = document.createElement("style");
	style.setAttribute("data-sidebar-brand-text-style", "");
	style.textContent = CSS;
	document.head.appendChild(style);
	return () => {
		style.remove();
	};
}

//#endregion
//#region src/client/index.ts
/** Required services: slots + locale. */
const inject = ["slots", "locale"];
/**
* Client plugin body: register the brand-name slot occupant, the settings
* card, the locale dictionary, and the stylesheet.
*
* A single `BrandTextSettingsController` is shared between the card and
* the brand text so a save is instantly reflected in the sidebar.
* @param ctx - client root context.
*/
function apply(ctx) {
	ctx.effect(() => ctx.locale.register(NS, {
		zh,
		en
	}), "sidebar-brand-text: dictionaries");
	ctx.effect(installStyles, "sidebar-brand-text: styles");
	const controller = new BrandTextSettingsController();
	const useSnapshot = bindSnapshotSelector(controller.store);
	controller.load();
	const brandInjected = () => ({ useSnapshot });
	ctx.slots.inject("sidebar.brand.name", () => ctx.slots.register({
		name: "sidebar.brand.name",
		inject: brandInjected
	}, BrandText));
	const cardInjected = () => ({
		controller,
		useSnapshot
	});
	ctx.slots.inject("settings.plugin.item", function* () {
		yield ctx.slots.register({
			name: "settings.plugin.item",
			key: "sidebar-brand-text",
			locale: NS,
			inject: cardInjected
		}, BrandTextCard);
	});
}

//#endregion
exports.apply = apply;
exports.inject = inject;
return module.exports; } });
//# sourceMappingURL=client.js.map