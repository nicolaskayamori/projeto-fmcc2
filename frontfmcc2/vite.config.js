import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/projeto-fmcc2/', // <- ESSENCIAL para funcionar no GitHub Pages
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    open: true,
  },
})
