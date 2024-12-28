import Layout from '@/layout'

export default {
  path: '/user',
  name: 'User',
  component: Layout,
  redirect: '/user/list',
  meta: { title: '用户管理', icon: 'el-icon-user' },
  children: [
    {
      path: 'list',
      name: 'UserList',
      component: () => import('@/views/user/list'),
      meta: { title: '用户列表', icon: 'list' }
    }
  ]
} 