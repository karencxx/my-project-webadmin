// 预留租户管理相关路由
export default {
  path: '/tenant',
  component: Layout,
  hidden: true, // 暂时隐藏
  children: [
    {
      path: 'list',
      name: 'TenantList',
      component: () => import('@/views/tenant/list'),
      meta: { title: '租户管理', icon: 'el-icon-office-building' }
    }
  ]
} 