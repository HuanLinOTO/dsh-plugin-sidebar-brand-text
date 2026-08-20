import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Point the dsh runtime/sidebar/settings packages at local test
// doubles so specs never need the (private, host-provided) packages installed.
// Types still come from the npm-published devDependencies.
const stub = (name: string) => fileURLToPath(new URL(`./tests/stubs/${name}`, import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@deepseek-ai/dsh-client-runtime/client': stub('runtime.ts'),
      '@deepseek-ai/dsh-client-ui-sidebar/client': stub('sidebar.ts'),
      '@deepseek-ai/dsh-client-ui-settings-plugins/client': stub('settings-plugins.ts'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx'],
  },
})
