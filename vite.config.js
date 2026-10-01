import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // This is a GitHub Pages project site, served from /swidwebsite/.
  base: '/swidwebsite/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4173,
  }
})
