import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Netlify serves from the root; GitHub Pages sets VITE_BASE_PATH in its workflow.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4173,
  }
})
