import VueRouter from "vue-router";
import { Message, Notification } from "element-ui";
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('../components/Home.vue'),
    children: [
      {
        path: "/mask",
        name: "mask",
        component: () => import('../components/mask.vue'),
        children: [

          {
            path: "login",
            name: "login",
            component: () => import('../components/Login.vue'),
            meta: { title: '登录' }
          },
          {
            path: "register",
            name: "register",
            component: () => import('../components/Register.vue'),
            meta: { title: '注册' }
          },
        ]
      },
      {
        path: "userinfo",
        name: "userinfo",
        meta: {
          title: '成员管理',
          permissionsId: 1,
        },
        component: () => import('../views/userinfo.vue')
      },

      {
        path: "todos",
        name: "todos",
        component: () => import('../views/todos.vue')
      },

      {
        path: "user",
        name: "user",
        meta: {
        },
        component: () => import('../views/user.vue')
      },

      {
        path: "music",
        name: "music",
        component: () => import('../views/music.vue')
      },

      {
        path: "404",
        name: "404",
        component: () => import('../views/404.vue')
      },
    ]
  }
]
const router = new VueRouter({
  // 路径模式
  mode: 'history',
  // 禁止浏览器前进后退
  scrollBehavior: () => {
    history.pushState(null, null, document.URL)
  },
  routes
})
const whiteList = ['mask', 'login', 'register', 'home', 'todos', 'music']
// 拦截
router.beforeEach((to, from, next) => {
  const { permissionsId, token } = JSON.parse(localStorage.getItem('userinfo')) || ''
  NProgress.start()
  // hastoken
  if (token) {
    if (to.meta.permissionsId
      && permissionsId != 1
      && permissionsId) {
      // Message.error("抱歉,您没有权限")
      next({ name: '404' })
      NProgress.done()
    } else {
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
