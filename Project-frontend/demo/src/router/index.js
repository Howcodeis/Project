const routes = [
  {
    path: '/',
    name: 'main',
    meta: {
      menu: '主页',
    },
    component: () => import('@/views/MainPage.vue')
  },
  {
    path: "/userlist",
    name: "userlist",
    meta: {
      menu: '成员管理',
      permissionsId: 1,
    },
    component: () => import('@/views/UserList.vue')
  },

  {
    path: "/todolist",
    name: "todolist",
    component: () => import('@/views/TodoList.vue')
  },

  {
    path: "/userinfo",
    name: "userinfo",
    meta: {
    },
    component: () => import('@/views/UserInfo.vue')
  },

]
export default routes
