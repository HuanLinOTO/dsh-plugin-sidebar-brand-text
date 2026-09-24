import z from "@deepseek-ai/schemastery";

//#region src/config.ts
/** Schemastery schema for the composition entry (live-editable via `.volatile()`). */
const Config = z.object({
	name: z.string().default("DSH Local Build").description("Brand name text shown in the sidebar next to the logo.").volatile(),
	revision: z.string().default("").description("Revision badge text shown beside the brand name. Empty string hides the badge.").volatile()
});
/**
* Resolve a raw config object into a complete {@link BrandTextConfig}.
*
* Unknown keys are dropped; missing or wrong-typed keys fall back to
* the defaults. This runs on every gateway read so the client always
* sees a well-formed value.
* @param config - raw config (entry source or settings layer).
* @returns the resolved config with defaults applied.
*/
function resolveConfig(config = {}) {
	return {
		name: typeof config.name === "string" ? config.name : DEFAULT.name,
		revision: typeof config.revision === "string" ? config.revision : DEFAULT.revision
	};
}
/** Defaults used when no config arrives (defensive only). */
const DEFAULT = {
	name: "DSH Local Build",
	revision: ""
};

//#endregion
//#region src/settings.ts
/** The composition row id: the settings namespace / profile entry id. */
const SETTINGS_NAMESPACE = "sidebar-brand-text";
/**
* Declare the plugin's settings presentation policy and return the bridge.
*
* `auto: false` suppresses a schema-generated page: this plugin ships its own
* form through the `plugins.row.config` slot on the Plugins page.
*
* @param ctx - host context.
* @param config - the entry's volatile Cordis config.
* @returns the settings bridge.
*/
function installBrandTextSettings(ctx, config) {
	ctx.inject(["settings"], (sctx) => {
		sctx.effect(() => sctx.settings.configure({ auto: false }, ctx.fiber));
	});
	return { source: () => resolveConfig({
		name: config.name.get(),
		revision: config.revision.get()
	}) };
}

//#endregion
//#region src/gateway.ts
/** HTTP route prefix owning every sidebar-brand-text API request. */
const API_PREFIX = "/sbbt/api";
/** Config keys the `set` endpoint accepts (allow-list; unknown keys are dropped). */
const ALLOWED_KEYS = new Set(["name", "revision"]);
/**
* Register the `/sbbt/api` HTTP route on the host's web server.
*
* @param ctx - host context carrying `webServer`.
* @param bridge - the settings bridge the route reads through.
*/
function registerBrandTextGateway(ctx, bridge) {
	let settings;
	ctx.inject(["settings"], (sctx) => {
		settings = sctx.settings;
		return () => {
			settings = void 0;
		};
	});
	ctx.effect(() => {
		const webServer = ctx.webServer;
		if (!webServer || typeof webServer.register !== "function") return () => {};
		return webServer.register({
			kind: "prefix",
			path: API_PREFIX,
			handler: async (req, res) => {
				if ((req.method ?? "") !== "POST") {
					writeJson(res, 405, envelopeError("method-not-allowed", "POST only"));
					return;
				}
				const origin = req.headers.origin;
				if (typeof origin === "string" && origin) {
					let originHost;
					try {
						originHost = new URL(origin).host;
					} catch {
						writeJson(res, 400, envelopeError("invalid-origin", "invalid Origin header"));
						return;
					}
					const reqHost = req.headers.host;
					if (typeof reqHost === "string" && originHost !== reqHost) {
						writeJson(res, 403, envelopeError("origin-not-allowed", "same-origin requests only"));
						return;
					}
				}
				if (!String(req.headers["content-type"] ?? "").toLowerCase().startsWith("application/json")) {
					writeJson(res, 415, envelopeError("content-type-not-supported", "application/json required"));
					return;
				}
				const pathname = new URL(req.url ?? "/", "http://dsh.internal").pathname;
				const method = pathname.startsWith(`${API_PREFIX}/`) ? pathname.slice(`${API_PREFIX}/`.length) : void 0;
				if (method === void 0 || method.includes("/")) {
					writeJson(res, 404, envelopeError("not-found", "unknown sidebar-brand-text API method"));
					return;
				}
				try {
					const body = await readJsonBody(req);
					if (method === "get") writeJson(res, 200, envelopeOk({ config: resolveConfig(bridge.source()) }));
					else if (method === "set") writeJson(res, 200, envelopeOk(await handleSet(body, settings, bridge)));
					else writeJson(res, 404, envelopeError("not-found", `unknown sidebar-brand-text API method "${method}"`));
				} catch (error) {
					writeJson(res, 500, envelopeError("internal", error instanceof Error ? error.message : String(error)));
				}
			}
		});
	}, "sidebar-brand-text: /sbbt/api routes");
}
/** Handle the `set` method: validate patch, write user layer, return resolved config. */
async function handleSet(body, settings, bridge) {
	const patch = extractPatch(body);
	if (Object.keys(patch).length === 0) return { config: resolveConfig(bridge.source()) };
	if (settings === void 0) throw new Error("sidebar-brand-text: settings service is unavailable — configuration cannot be written");
	await settings.update(SETTINGS_NAMESPACE, patch);
	return { config: resolveConfig(bridge.source()) };
}
/** Extract and validate the patch from the request body. */
function extractPatch(body) {
	if (typeof body !== "object" || body === null) return {};
	const raw = Reflect.get(body, "patch");
	if (typeof raw !== "object" || raw === null) return {};
	const normalized = {};
	for (const [key, value] of Object.entries(raw)) {
		if (!ALLOWED_KEYS.has(key)) continue;
		if (value === null || value === void 0) continue;
		if (typeof value === "string") {
			if (key === "name") normalized.name = value;
			else if (key === "revision") normalized.revision = value;
		}
	}
	return normalized;
}
/** Read and parse a JSON body from a node:http request. */
async function readJsonBody(req, maxBytes = 8192) {
	const chunks = [];
	let bytes = 0;
	for await (const chunk of req) {
		const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
		bytes += buffer.length;
		if (bytes > maxBytes) throw new Error("request body too large");
		chunks.push(buffer);
	}
	const text = Buffer.concat(chunks).toString("utf8");
	if (text === "") return {};
	return JSON.parse(text);
}
/** Write a JSON response envelope. */
function writeJson(res, status, body) {
	const json = JSON.stringify(body);
	res.writeHead(status, { "content-type": "application/json" });
	res.end(json);
}
/** Build a success envelope. */
function envelopeOk(value) {
	return {
		ok: true,
		value
	};
}
/** Build an error envelope. */
function envelopeError(code, message) {
	return {
		ok: false,
		error: {
			code,
			message
		}
	};
}

//#endregion
//#region src/index.ts
const name = "sidebar-brand-text";
/** `webServer` is required for the HTTP gateway that backs the settings card. */
const inject = ["webServer"];
/**
* Plugin body: install the settings bridge and register the HTTP gateway.
*
* @param ctx - host context carrying `webServer`.
* @param config - the entry's volatile Cordis config.
*/
function apply(ctx, config) {
	registerBrandTextGateway(ctx, installBrandTextSettings(ctx, config));
}

//#endregion
export { Config, apply, inject, name };