import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command, mode }) => ({
  plugins: [vue()],
  ...(command === 'serve' && {
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 5173,
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path,
          secure: false
        }
      }
    },
  }),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}))
