import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

const router = new Router({
  routes: [
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
          meta: { title: 'Dashboard', icon: 'dashboard' }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const hasToken = localStorage.getItem('userId')
  
  if (to.path === '/login') {
    if (hasToken) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    if (hasToken) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router