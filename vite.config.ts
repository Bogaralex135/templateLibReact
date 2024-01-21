import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// lib config

import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import dts from 'vite-plugin-dts'
// With css modules
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] }), libInjectCss()],

  build: {
    // Enable vite build in lib mode
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    // Avoid copy public folder in dist
    copyPublicDir: false,

    // Rollup config

    rollupOptions: {
      // External packages that should not be bundled
      external: ['react', 'react-dom', 'react/jsx-runtime'],

      input: Object.fromEntries(
        glob.sync('lib/**/*.{ts,tsx}').map(file => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative('lib', file.slice(0, file.length - extname(file).length)),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),

      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
