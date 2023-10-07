import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import router from './utils/RouterRules'
import store from './store'
import Axiosinterceptor from './utils/AxiosInterceptor'
import PreventReClick from './utils/PreventReClick' // 导入防止重复点击
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

Vue.prototype.NProgress = NProgress
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