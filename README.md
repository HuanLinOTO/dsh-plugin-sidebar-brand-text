<p align="center">
  <a href="https://dshfind.com/zh/plugins/huanlinoto/dsh-plugin-sidebar-brand-text"><img src="https://dshfind.com/api/card/huanlinoto/dsh-plugin-sidebar-brand-text?lang=zh" alt="dsh-plugin-sidebar-brand-text card"></a>
</p>

# dsh-plugin-sidebar-brand-text

替换侧边栏左上角的品牌名、构建徽标文案，以及浏览器标签页标题（`document.title`）。默认情况下，DSH 侧边栏在左上角显示 `DSH Local Build` 文字和 7 位 commit hash 徽标（构建期 `DSH_CLIENT_COMMIT_HASH`），浏览器标签页标题格式为 `<会话标题> — DSH Local Build`；本插件通过注册 `sidebar.brand.name` slot 占位者替换侧边栏文案，并订阅 `sessions.list` 覆写 `document.title` 让浏览器标签页也使用配置的品牌名，同时在 WebUI 设置 → 插件配置页提供一张可展开的配置卡。

```
替换前：                              替换后（name="My Build", revision="v1.0"）：
┌─────────────────────────┐          ┌─────────────────────────┐
│ 🐟 DSH Local Build ▎141eb6f │       │ 🐟 My Build ▎v1.0         │
└─────────────────────────┘          └─────────────────────────┘
浏览器标签：会话 — DSH Local Build    浏览器标签：会话 — My Build
```

mark（鱼形 logo）不动——本插件只替换 name 行的文字 + 徽标 + 浏览器标签页标题。若需同时替换 logo，另行安装 `@deepseek-ai/dsh-client-ui-brand-official` 或其他占用 `sidebar.brand.mark` 的插件。

## 工作原理

遵循 `plugin-settings-exposure.md` 文档的「自托管 HTTP 路由 + `settings.plugin.item` 卡片」模式（与 ego-browser / dsh-plugin-interpreters 同路）：

| 层 | 做法 |
|---|---|
| 存储层 | `ctx.settings.register(namespace, Schema, { base })` 注册 `sidebar-brand-text` namespace（享受 schema 校验、文件持久化） |
| 暴露层 | `ctx.webServer.register({ kind: 'prefix', path: '/sbbt/api' })` 自托管 HTTP 路由，handler 里 in-process 调 `settings.update(ns, patch)`——绕过 apiproxy 的 `WEB_SETTINGS_NAMESPACES` allowlist |
| UI 层 | Client 注册 `settings.plugin.item` keyed slot（`key: 'sidebar-brand-text'`）——出现在设置 → 插件配置页，与内置三张卡同列 |
| 读写层 | Client 用 `fetch('/sbbt/api/get')` / `fetch('/sbbt/api/set')` 读写，不 fetch 自开路由也不 `connection.rpc.call` |

**为什么不用 TypertRemoteService**：当前 dsh 快照的 SRC discovery 不 claim 插件拥有的服务端点（ego-browser gateway.js 注释明确记录了此问题）。自托管 HTTP 路由是已验证的合规路径。

### 实时刷新

BrandText 组件和 BrandTextCard 共享同一个 `BrandTextSettingsController`（内含 `createSnapshotStore`）。卡片的 Save 写入后，store 更新，BrandText 通过 `useSyncExternalStore` 自动重新渲染——无需 DOM 事件、无需 RPC 重取。

### 浏览器标签页标题（document.title）

DSH 的 `document.title` 由 `packages/client/ui-renderer/src/client/DocumentTitle.tsx` 的 `useEffect` 写入，格式 `<会话标题> — <productTitle>`，其中 `productTitle` 是**构建期** `process.env.DSH_CLIENT_TITLE` 字面量（fallback `'DSH Local Build'`），不是 slot、不是运行时 config——`ui-brand-official/README.md` 明确记载："The browser title is independent — `DSH_CLIENT_TITLE` selects title text at build time rather than through a UI slot."

本插件的 `titleWriter` 订阅**同一个** `sessions.list` feed 和共享的 `BrandTextSettingsController` store，在 `DocumentTitle` 的 `useEffect` 写完之后用 `queueMicrotask` 延迟覆写 `document.title` 为 `<会话标题> — <配置的品牌名>`，并用 `MutationObserver` 兜底防止 React 18 concurrent 重渲染覆盖。卸载插件后所有订阅和 observer 被清理，`DocumentTitle` 的 cleanup 恢复构建期标题。

## 配置

### WebUI 插件配置页（推荐）

安装插件后，在 DSH WebUI 的设置 → 插件配置页里会出现「侧边栏品牌文案」卡片，展开后含两个输入框：

| 字段 | 说明 |
|------|------|
| 品牌名称 | 侧边栏 logo 右侧显示的文案。替换默认的「DSH Local Build」。 |
| 版本徽标 | 品牌名右侧的小徽标文案。留空则不显示徽标。 |

修改后点「保存」即持久化到 `$DSH_HOME/settings.yaml`，侧边栏实时生效，无需重启。

### cordis.patch.yml（first-boot seed）

`cordis.patch.yml` 里的 `config` 块是 first-boot seed，仅在 settings.yaml 中无对应值时使用：

```yaml
- insert:
    - id: sidebar-brand-text
      name: '@huanlin/dsh-plugin-sidebar-brand-text'
      config:
        name: 'DSH Local Build'
        revision: ''
```

用户在设置界面修改后，值持久化到 settings.yaml，覆盖 seed。

## 开发

前置：本插件适配 DSH `v0.1.2-rc.1`。alpha 版本未发 npm，`@deepseek-ai/dsh-*` 只作 peerDependencies 声明（`^0.1.2-alpha.1`，不安装）；dev 期类型用 tsconfig `paths` 指向本地 DSH 源码树（`~/.dsh/source/current`，需已 `pnpm run build`），并在 `node_modules/@deepseek-ai/` 下建 junction 指向对应包目录（同 `dsh-plugin-interpreters` 的做法）。仅 `@deepseek-ai/cordis`（`^4.0.1`）与 `@deepseek-ai/schemastery`（`^3.18.1`）已发 npm、保留在 devDependencies。

```sh
pnpm install            # 安装 registry 依赖（@deepseek-ai/dsh-* peers 不拉取）
pnpm run typecheck      # tsc --noEmit（类型经 tsconfig paths 解析到 DSH 源码树）
pnpm test               # vitest：注册形态 + 控制器 + 组件渲染（dsh-client-store 用本地测试替身）
pnpm run build          # tsdown + tsc → lib/index.js、lib/client.js、lib/types/
```

> 注：本插件不发布 `./invariant` 导出。唯一的 `sidebar.brand.name` slot 注册由声明感知的 `slots.inject()` 提供回滚，不存在独立可分歧的观察，不符合 DSH v0.1.2-rc.1 收紧后的 invariant 发布规则（禁止空 installer 与「服务存在性检查」式 invariant）。

预构建 `lib/` 策略：`lib/` 入库（不在 `.gitignore` 中），无 `prepare` 脚本。`github:` 安装开箱即用。

## 运行（挂载到 profile）

开发热更新（本地 clone，改源码重建 `lib/` 即生效）：

```sh
dsh plugin --profile web add link:D:\Projects\deepseek-harness\dsh-plugin-sidebar-brand-text
```

分发安装（二选一）：

```sh
dsh plugin --profile web add "github:huanlinoto/dsh-plugin-sidebar-brand-text"   # 源码分发
dsh plugin --profile web add "@huanlin/dsh-plugin-sidebar-brand-text"            # npm registry 分发
```

然后由人类重启 `dsh web` 进程并硬刷新浏览器（`Ctrl+Shift+R`）。

## 检查

- `pnpm run typecheck && pnpm test && pnpm run build` 全绿；
- `git -C <dsh checkout> status` 干净（零源码 patch）；
- 合规自检（`plugin-settings-exposure.md` §7）：
  - 零源码 patch：未改 apiproxy 的 `WEB_SETTINGS_NAMESPACES`
  - GW1：服务名 = settings namespace = RPC path 段（`sidebar-brand-text`）
  - GW3：`set()` 先用 Config schema 校验 patch 再写 settings 服务
  - GW5：多纤维去重——catch `"already registered"`
  - UI1：用 `settings.plugin.item` 槽位（不是 `settings.section`）
  - UI2：`import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'`
  - UI4：`dsh.client.inject` 含 `@deepseek-ai/dsh-client-ui-settings-plugins` + `@deepseek-ai/dsh-client-locale`
- 浏览器验证：
  - 左上角品牌行显示配置的 `name` 文案；
  - `revision` 非空时右侧显示徽标，为空时无徽标；
  - 浏览器标签页标题为 `<会话标题> — <配置的品牌名>`，切换会话实时更新；
  - 无会话时浏览器标签页仅显示配置的品牌名；
  - 卡片修改保存后侧边栏和浏览器标签页实时生效，无需重启；
  - mark（鱼形 logo）保持原样；
  - 卸载插件后恢复 `DSH Local Build` + commit hash 默认 fallback（侧边栏 + 浏览器标签页）。

## 边界行为

- mark slot 不受影响：本插件只注册 `sidebar.brand.name`，不碰 `sidebar.brand.mark`。
- 折叠态：侧边栏折叠到 56px 轨道时只显示 mark，不渲染 name slot，因此本插件在折叠态不可见。展开侧边栏后可见配置的文案。但浏览器标签页标题不受折叠态影响，始终生效。
- `revision` 为空白字符时仍渲染徽标（非空字符串判定）；需要隐藏徽标请设为空字符串。
- 配置变更实时生效：卡片 Save 后 `BrandTextSettingsController.store` 更新，BrandText 组件和 titleWriter 通过 `useSyncExternalStore` / `store.subscribe` 自动同步——侧边栏文案和浏览器标签页标题同时更新。
- HTTP 路由不可达时 BrandText 和 titleWriter 回退到默认配置（`DSH Local Build`），卡片显示「配置通道不可用」提示。
- titleWriter 与 DSH 内置 `DocumentTitle` 组件存在竞争：`DocumentTitle` 的 `useEffect` 会在 sessions 变化后覆写 `document.title` 回构建期值，本插件用 `queueMicrotask` 延迟到 useEffect 之后执行 + `MutationObserver` 兜底解决。极少数情况下（React 18 concurrent 模式的批次间隙）可能有 1 帧闪烁。
