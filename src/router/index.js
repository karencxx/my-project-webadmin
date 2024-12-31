import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import { getToken, removeToken } from '@/utils/auth'
import menuRoutes from './modules/menu'


Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      },
      ...menuRoutes
    ]
  }
]

const router = new Router({
  mode: 'history',
  routes: constantRoutes
})

const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 已登录且要跳转的是登录页
      next({ path: '/dashboard' })
    } else {
      try {
        // 已登录访问其他页面
        next()
      } catch (error) {
        // 出错时清除令牌并重新登录
        removeToken()
        localStorage.removeItem('userId')
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    /* 没有token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // 其他没有访问权限的页面将重定向到登录页面
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router