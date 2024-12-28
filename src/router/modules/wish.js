import Layout from '@/layout'

export default {
  path: '/wish',
  name: 'Wish',
  component: Layout,
  redirect: '/wish/list',
  meta: { title: '许愿祈福', icon: 'el-icon-magic-stick' },
  children: [
    {
      path: 'list',
      name: 'WishList',
      component: () => import('@/views/wish/list'),
      meta: { title: '许愿祈福列表', icon: 'list' }
    }
  ]
} 