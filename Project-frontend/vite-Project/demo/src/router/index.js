import VueRouter from "vue-router";
import { Notification } from "element-ui";
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
          permissionsId: 1
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
          permissionsId: 1
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
// 拦截
router.beforeEach((to, from, next) => {
  const { permissionsId, token } = JSON.parse(localStorage.getItem('userinfo')) || ''
  if (to.name !== 'mask'
    && to.name !== 'login'
    && to.name !== 'register'
    && to.name !== 'home'
    && to.name !== 'todos'
    && !token) {
    Notification({
      type: 'error',
      message: '请登录',
      offset: 80,
      showClose: false,
      duration: 1500
    })
    next({ name: 'todos' })
  }
  if (to.meta.permissionsId
    && permissionsId != 1
    && permissionsId) {
    // Message.error("抱歉,您没有权限")
    next({ name: '404' })
  }
  else {
    next()
  }
})
export default router
