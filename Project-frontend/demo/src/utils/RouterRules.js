import routes from "../router";
import VueRouter from "vue-router";
import store from "../store";
import { Message } from "element-ui";
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

const router = new VueRouter({
  // 路径模式
  mode: 'history',
  // 禁止浏览器前进后退
  // scrollBehavior: () => {
  //   history.pushState(null, null, document.URL)
  // },
  routes
})
const whiteList = ['mask', 'login', 'register', 'home', 'todolist', 'musiclist']
// 拦截
router.beforeEach((to, from, next) => {
  const { permissionsId, token } = JSON.parse(localStorage.getItem('userinfo-save')) || ''
  NProgress.start()
  // hastoken
  if (token) {
    if (to.meta.permissionsId
      && permissionsId != 1
    ) {
      store.state.isPermission = 1
      next()
      NProgress.done()
    } else {
      store.state.isPermission = 0
      next()
      NProgress.done()
    }
  }
  // no token
  else {
    if (whiteList.indexOf(to.name) !== -1) {
      next()
      NProgress.done()
    } else {
      Message({
        type: 'error',
        message: '请登录',
        showClose: false,
        duration: 1500
      })
      next(`mask/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router