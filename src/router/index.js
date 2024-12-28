import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import { getToken, removeToken } from '@/utils/auth'
import employeeRouter from './modules/employee'
import bannerRouter from './modules/banner'

Vue.use(Router)

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
      }
    ]
  },
  // 添加其他路由
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: { title: '系统管理', icon: 'system' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
      // 其他子路由...
    ]
  },
  employeeRouter,
  bannerRouter,
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    meta: { title: '商品管理', icon: 'product' },
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/pms/product/index'),
        meta: { title: '商品列表', icon: 'list' }
      },
      {
        path: 'addProduct',
        name: 'AddProduct',
        component: () => import('@/views/pms/product/add'),
        meta: { title: '添加商品' },
        hidden: true
      },
      {
        path: 'updateProduct',
        name: 'UpdateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: { title: '修改商品' },
        hidden: true
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/pms/productCate/index'),
        meta: { title: '商品分类', icon: 'category' }
      },
      {
        path: 'brand',
        name: 'Brand',
        component: () => import('@/views/pms/brand/index'),
        meta: { title: '品牌管理', icon: 'brand' }
      },
      {
        path: 'addBrand',
        name: 'AddBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: { title: '添加品牌' },
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'UpdateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: { title: '编辑品牌' },
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'ProductAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta: { title: '商品属性', icon: 'attr' }
      },
      {
        path: 'productAttrList',
        name: 'ProductAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: { title: '属性列表' },
        hidden: true
      },
      {
        path: 'addProductAttr',
        name: 'AddProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: { title: '添加属性' },
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'UpdateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: { title: '编辑属性' },
        hidden: true
      },
      {
        path: 'productCate',
        name: 'ProductCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: { title: '商品分类', icon: 'cate' }
      },
      {
        path: 'addProductCate',
        name: 'AddProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: { title: '添加分类' },
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'UpdateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: { title: '修改商品分类' },
        hidden: true
      }
    ]
  },
  {
    path: '/employee/add',
    component: Layout,
    children: [{
      path: '',
      name: 'AddEmployee',
      component: () => import('@/views/employee/add'),
      meta: { title: '添加员工' },
      hidden: true
    }]
  },
  {
    path: '/employee/edit/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'EditEmployee',
      component: () => import('@/views/employee/edit'),
      meta: { title: '编辑员工' },
      hidden: true
    }]
  },
  {
    path: '/banner/add',
    component: Layout,
    children: [{
      path: '',
      name: 'AddBanner',
      component: () => import('@/views/banner/add'),
      meta: { title: '添加Banner' },
      hidden: true
    }]
  },
  {
    path: '/banner/edit/:id',
    component: Layout,
    children: [{
      path: '',
      name: 'EditBanner',
      component: () => import('@/views/banner/edit'),
      meta: { title: '编辑Banner' },
      hidden: true
    }]
  }
]

const router = new Router({
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