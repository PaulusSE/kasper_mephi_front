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
      port: 80, // Используйте стандартный порт разработки
    },
  }),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}))
