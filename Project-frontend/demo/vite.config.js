/*
 * @Author: Matbin
 * @Date: 2023-09-28 21:10:15
 * @Description: 
 */
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
    port: 8085,
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})
