import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import Axiosinterceptor from './utils/Axiosinterceptor'
// 导入防止重复点击
import PreventReClick from './utils/PreventReClick'
Vue.prototype.$http = Axiosinterceptor
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(PreventReClick)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')

// 禁止浏览器前进后退
// window.addEventListener('popstate', function () {
//   this.window.history.pushState(null, null, this.document.URL)
// })
// 防止重复提交登陆注册
// Vue.directive('preventClick', {
//   inserted (el, binding) {
//     el.addEventListener('click', () => {
//       if (!el.disabled) {
//         el.disabled = true
//         setTimeout(() => {
//           el.disabled = false
//         }, binding.value || 5000);
//       }
//     })
//   }
// })