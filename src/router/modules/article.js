import Layout from '@/layout'

export default {
  path: '/article',
  name: 'Article',
  component: Layout,
  redirect: '/article/list',
  meta: { title: '文章管理', icon: 'el-icon-document' },
  children: [
    {
      path: 'list',
      name: 'ArticleList',
      component: () => import('@/views/article/list'),
      meta: { title: '文章列表', icon: 'list' }
    }
  ]
} 