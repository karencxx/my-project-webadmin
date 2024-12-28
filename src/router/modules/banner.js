import Layout from '@/layout'

export default {
  path: '/banner',
  name: 'Banner',
  component: Layout,
  redirect: '/banner/list',
  meta: { title: 'Banner管理', icon: 'el-icon-picture' },
  children: [
    {
        path: 'list',
        name: 'BannerList',
        component: () => import('@/views/banner/list'),
        meta: { title: 'Banner列表', icon: 'list' }
      }
  ]
} 