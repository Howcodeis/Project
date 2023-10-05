const routes = [
  {
    path: "/",
    name: "home",
    redirect: '/todolist',
    component: () => import('@/components/HomeSet/HomePage.vue'),
    children: [
      {
        path: "mask",
        name: "mask",
        component: () => import('@/views/MaskSet/MaskPage.vue'),
        children: [

          {
            path: "login",
            name: "login",
            component: () => import('@/views/LoginSet/LoginPage.vue'),
            meta: { title: '登录' }
          },
          {
            path: "register",
            name: "register",
            component: () => import('@/views/RegisterSet/RegisterPage.vue'),
            meta: { title: '注册' }
          },
        ]
      },
      {
        path: "userlist",
        name: "userlist",
        meta: {
          title: '成员管理',
          permissionsId: 1,
        },
        component: () => import('@/views/UserListSet/UserList.vue')
      },

      {
        path: "todolist",
        name: "todolist",
        component: () => import('@/views/TodoListSet/TodoList.vue')
      },

      {
        path: "userinfo",
        name: "userinfo",
        meta: {
        },
        component: () => import('@/views/UserInfoSet/UserInfo.vue')
      },

      {
        path: "musiclist",
        name: "musiclist",
        component: () => import('@/views/MusicListSet/musicList.vue')
      },
    ]
  }
]
export default routes
