import { loadEnvFile } from 'node:process'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import viteReact from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  if (mode === 'development') {
    loadEnvFile('.env')
  } else if (mode === 'production') {
    loadEnvFile('.env.production')
  }

  console.log("MODE:", mode);
  return {
    server: {
      port: 3000,
    },
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tanstackStart(),
      viteReact(),
    ],
  }
})