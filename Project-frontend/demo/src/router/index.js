const routes = [
  {
    path: "/",
    name: "home",
    redirect: '/main',
    component: () => import('@/components/HomeSet/HomePage.vue'),
    children: [
      {
        path: 'main',
        name: 'main',
        meta: {
          menu: '主页',
        },
        component: () => import('@/views/MainSet/MainPage.vue')
      },
      {
        path: "userlist",
        name: "userlist",
        meta: {
          menu: '成员管理',
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
