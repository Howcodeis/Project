import { createVuePlugin } from 'vite-plugin-vue2'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [
    createVuePlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'image': 'src/assets/image'
    }
  },
  server: {
    port: 8848
  }
})
