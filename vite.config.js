import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ElNidoTrip/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'chart': ['chart.js', 'vue-chartjs'],
          'vue-vendor': ['vue', 'vue-router', 'vue-i18n'],
        }
      }
    }
  }
})
