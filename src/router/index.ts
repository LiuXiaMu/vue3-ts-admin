import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getLocal } from '@/hooks/localstorage'
import domMessage from 'plugins/messageOnce.js' //处理el-message重复弹出问题
const messageOnce = new domMessage()
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: "goods", //默认显示goods页面
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta: {
          isShow: true,
          title: "商品列表"
        },
        component: () => import('components/Goods/goods.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          isShow: true,
          title: "用户列表"
        },
        component: () => import('components/User/user.vue')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          isShow: true,
          title: "角色列表"
        },
        component: () => import('components/Role/role.vue')
      },
      {
        path: 'authority',
        name: 'authority',
        meta: {
          isShow: false,
          title: "权限列表"
        },
        component: () => import('components/Authority/authority.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/Login.vue')
  },
  {
    path: "/:catchAll(.*)",
    name: '404',
    component: () => import('views/404.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token: any = getLocal('token')
  if (!token && to.path !== '/login') {
    messageOnce.warning({
      message: '登录已过期，请重新登录',
      type: 'warning'
    })
    next('/login')
  } else {
    next()
  }
})

export default router
