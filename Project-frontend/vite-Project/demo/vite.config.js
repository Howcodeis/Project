import { createVuePlugin } from 'vite-plugin-vue2'
import Vue from 'vue'

export default {
  plugins: [
    createVuePlugin(Vue),
  ]
}