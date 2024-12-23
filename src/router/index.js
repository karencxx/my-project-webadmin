import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import menuRoutes from './modules/menu'

Vue.use(VueRouter)

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
        meta: { title: '首页', icon: 'el-icon-s-home' }
      },
      ...menuRoutes // 所有功能模块作为Layout的子路由
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: constantRoutes,
  scrollBehavior: (to, from, savedPosition)=> {
    return {
      top: 0
    }
  },
  
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('userId'); // 获取 token

  // 如果访问的是登录页面，直接放行
  if (to.path === '/login') {
    return next();
  }

  // 如果没有 token，跳转到登录页面
  if (!token) {
    return next('/login');
  }

  // 如果有 token，放行
  next();
});


export default router