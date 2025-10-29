import { lingui } from '@lingui/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  if (mode === 'development') {
    loadEnv(mode,'.env')
  } else if (mode === 'production') {
    loadEnv(mode,'.env.production')
  }

  console.log('MODE:', mode)
  return {
    server: {
      port: Number(process.env.PORT ?? 3000),
    },
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tanstackStart(),
      viteReact({
        babel: {
          plugins: ['@lingui/babel-plugin-lingui-macro'],
        },
      }),
      lingui(),
    ],
  }
})
