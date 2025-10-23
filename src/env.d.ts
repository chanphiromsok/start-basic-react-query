/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly SECRET_KEY: string;
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}