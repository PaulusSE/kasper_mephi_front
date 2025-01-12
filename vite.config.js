export default defineConfig(({ command, mode }) => ({
  plugins: [vue()],
  ...(command === 'serve' && {
    server: {
      watch: {
        usePolling: true,
      },
      host: true, // то же, что "0.0.0.0"
      strictPort: true,
      port: 80,
    },
  }),
}))