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
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-settings'
import { resolveConfig } from './config.ts'
import { SETTINGS_NAMESPACE, type BrandTextSettingsBridge } from './settings.ts'
import type { BrandTextConfig } from './types.ts'

/** HTTP route prefix owning every sidebar-brand-text API request. */
const API_PREFIX = '/sbbt/api'

/** Config keys the `set` endpoint accepts (allow-list; unknown keys are dropped). */
const ALLOWED_KEYS: ReadonlySet<string> = new Set(['name', 'revision'])

/** Minimal type for the host's webServer service. */
interface WebServerLike {
  register(options: {
    kind: 'prefix'
    path: string
    handler: (req: NodeRequest, res: NodeResponse) => Promise<void> | void
  }): () => void
}

/** Minimal type for the settings service (duck-typed from the settings face). */
interface SettingsLike {
  update(ns: unknown, patch: object): Promise<void>
}

interface NodeRequest {
  method?: string
  url?: string
  headers: Record<string, string | string[] | undefined>
  [Symbol.asyncIterator](): AsyncIterator<unknown>
}

interface NodeResponse {
  writeHead(status: number, headers?: Record<string, string>): void
  end(body: string): void
}

/** Wire shape for `get` / `set` responses. */
export interface BrandTextGatewayResponse {
  config: BrandTextConfig
}

/**
 * Register the `/sbbt/api` HTTP route on the host's web server.
 *
 * @param ctx - host context carrying `webServer`.
 * @param bridge - the settings bridge the route reads through.
 */
export function registerBrandTextGateway(ctx: Context, bridge: BrandTextSettingsBridge): void {
  let settings: SettingsLike | undefined

  ctx.inject(['settings'], (sctx) => {
    settings = sctx.settings as SettingsLike
    return () => { settings = undefined }
  })

  ctx.effect(() => {
    const webServer = (ctx as unknown as { webServer?: WebServerLike }).webServer
    if (!webServer || typeof webServer.register !== 'function') return () => {}
    return webServer.register({
      kind: 'prefix',
      path: API_PREFIX,
      handler: async (req, res) => {
        if ((req.method ?? '') !== 'POST') {
          writeJson(res, 405, envelopeError('method-not-allowed', 'POST only'))
          return
        }
        const origin = req.headers.origin
        if (typeof origin === 'string' && origin) {
          let originHost: string
          try { originHost = new URL(origin).host }
          catch {
            writeJson(res, 400, envelopeError('invalid-origin', 'invalid Origin header'))
            return
          }
          const reqHost = req.headers.host
          if (typeof reqHost === 'string' && originHost !== reqHost) {
            writeJson(res, 403, envelopeError('origin-not-allowed', 'same-origin requests only'))
            return
          }
        }
        const ct = String(req.headers['content-type'] ?? '').toLowerCase()
        if (!ct.startsWith('application/json')) {
          writeJson(res, 415, envelopeError('content-type-not-supported', 'application/json required'))
          return
        }
        const pathname = new URL(req.url ?? '/', 'http://dsh.internal').pathname
        const method = pathname.startsWith(`${API_PREFIX}/`)
          ? pathname.slice(`${API_PREFIX}/`.length)
          : undefined
        if (method === undefined || method.includes('/')) {
          writeJson(res, 404, envelopeError('not-found', 'unknown sidebar-brand-text API method'))
          return
        }
        try {
          const body = await readJsonBody(req)
          if (method === 'get') {
            const config = resolveConfig(bridge.source() as unknown as Record<string, unknown>)
            writeJson(res, 200, envelopeOk({ config }))
          } else if (method === 'set') {
            const result = await handleSet(body, settings, bridge)
            writeJson(res, 200, envelopeOk(result))
          } else {
            writeJson(res, 404, envelopeError('not-found', `unknown sidebar-brand-text API method "${method}"`))
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          writeJson(res, 500, envelopeError('internal', message))
        }
      },
    })
  }, 'sidebar-brand-text: /sbbt/api routes')
}

/** Handle the `set` method: validate patch, write user layer, return resolved config. */
async function handleSet(
  body: unknown,
  settings: SettingsLike | undefined,
  bridge: BrandTextSettingsBridge,
): Promise<BrandTextGatewayResponse> {
  const patch = extractPatch(body)
  if (Object.keys(patch).length === 0) {
    return { config: resolveConfig(bridge.source() as unknown as Record<string, unknown>) }
  }
  if (settings === undefined) {
    throw new Error('sidebar-brand-text: settings service is unavailable — configuration cannot be written')
  }
  await settings.update(SETTINGS_NAMESPACE, patch)
  return { config: resolveConfig(bridge.source() as unknown as Record<string, unknown>) }
}

/** Extract and validate the patch from the request body. */
function extractPatch(body: unknown): Partial<BrandTextConfig> {
  if (typeof body !== 'object' || body === null) return {}
  const raw = Reflect.get(body as object, 'patch')
  if (typeof raw !== 'object' || raw === null) return {}
  const normalized: Partial<BrandTextConfig> = {}
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!ALLOWED_KEYS.has(key)) continue
    if (value === null || value === undefined) continue
    if (typeof value === 'string') {
      if (key === 'name') normalized.name = value
      else if (key === 'revision') normalized.revision = value
    }
  }
  return normalized
}

/** Read and parse a JSON body from a node:http request. */
async function readJsonBody(req: NodeRequest, maxBytes = 8192): Promise<unknown> {
  const chunks: Buffer[] = []
  let bytes = 0
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as ArrayBuffer)
    bytes += buffer.length
    if (bytes > maxBytes) throw new Error('request body too large')
    chunks.push(buffer)
  }
  const text = Buffer.concat(chunks).toString('utf8')
  if (text === '') return {}
  return JSON.parse(text)
}

/** Write a JSON response envelope. */
function writeJson(res: NodeResponse, status: number, body: unknown): void {
  const json = JSON.stringify(body)
  res.writeHead(status, { 'content-type': 'application/json' })
  res.end(json)
}

/** Build a success envelope. */
function envelopeOk(value: BrandTextGatewayResponse): { ok: true, value: BrandTextGatewayResponse } {
  return { ok: true, value }
}

/** Build an error envelope. */
function envelopeError(code: string, message: string): { ok: false, error: { code: string, message: string } } {
  return { ok: false, error: { code, message } }
}
