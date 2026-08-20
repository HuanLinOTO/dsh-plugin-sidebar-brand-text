/**
 * Host-side HTTP gateway exposing the `sidebar-brand-text` config to the
 * browser through a self-hosted `/sbbt/api` route.
 *
 * Mirrors the ego-browser / better-sidebar / dsh-plugin-interpreters pattern:
 * `ctx.webServer.register` claims a prefix route, the handler reads/writes
 * the settings seam in-process (no wire-layer allowlist gate), and the
 * browser reaches it through `fetch('/sbbt/api/<method>')`.
 *
 * Route shape:
 *   POST /sbbt/api/get  → { ok: true, value: { config } }
 *   POST /sbbt/api/set  body: { patch: { name?, revision? } }
 *                        → { ok: true, value: { config } }
 * Errors carry { ok: false, error: { code, message } }.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/gateway
 */
import type { Context } from '@deepseek-ai/cordis';
import { type BrandTextSettingsBridge } from './settings.ts';
import type { BrandTextConfig } from './types.ts';
/** Wire shape for `get` / `set` responses. */
export interface BrandTextGatewayResponse {
    config: BrandTextConfig;
}
/**
 * Register the `/sbbt/api` HTTP route on the host's web server.
 *
 * @param ctx - host context carrying `webServer`.
 * @param bridge - the settings bridge the route reads through.
 */
export declare function registerBrandTextGateway(ctx: Context, bridge: BrandTextSettingsBridge): void;
