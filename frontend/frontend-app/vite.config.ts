import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Fixes some chunking issues for SPAs
      },
    },
  },
  server: {
    historyApiFallback: true, // Ensures proper routing in development
  },
})
