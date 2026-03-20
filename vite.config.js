import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  // Em build para GitHub Pages, publica em /Website/.
  base: command === 'build' ? '/Website-test/' : '/',
  plugins: [react(), tailwindcss()],
}))
