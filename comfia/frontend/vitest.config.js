import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,  // Esto permite usar describe, test, expect sin importarlos
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    css: true,
  }
})