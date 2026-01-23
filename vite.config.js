import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: true,          // allow network access
    port: 5173,
    strictPort: true,
    // allow ngrok host
    allowedHosts: ['cecal-subaxially-shonna.ngrok-free.dev']
  },
  base: mode === 'production' ? '/PolyNet/' : '/', // base only in prod
}))
