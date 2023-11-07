import routes from "../router";
import VueRouter from "vue-router";
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
const whiteList = ['todolist', 'main']
// 拦截
router.beforeEach((to, from, next) => {
  const { permissionsId, token } = JSON.parse(localStorage.getItem('userinfo-save')) || ''
  NProgress.start()
  // hastoken
  if (token) {
    next()
  }
  // no token
  else {
    if (whiteList.indexOf(to.name) !== -1) {
      next()
    } else {
      Message({
        type: 'error',
        message: '请登录',
        showClose: false,
        duration: 1500
      })
    }
  }
  NProgress.done()
})
router.afterEach(() => {
  NProgress.done()
})

export default router