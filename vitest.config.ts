import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Point @deepseek-ai/dsh-client-store (the only client value import) at a
// local test double so specs never need the (private, host-provided) package
// installed. All other @deepseek-ai/* imports in src/client are type-only and
// erased before module resolution.
const stub = (name: string) => fileURLToPath(new URL(`./tests/stubs/${name}`, import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@deepseek-ai/dsh-client-store': stub('store.ts'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx'],
  },
})
