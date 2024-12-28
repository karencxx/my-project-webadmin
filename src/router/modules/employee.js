import Layout from '@/layout'

export default {
  path: '/employee',
  component: Layout,
  redirect: '/employee/list',
  name: 'Employee',
  meta: { 
    title: '员工管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'list',
      name: 'EmployeeList',
      component: () => import('@/views/employee/list'),
      meta: { title: '员工列表', icon: 'list' }
    },
    {
      path: 'add',
      name: 'AddEmployee',
      component: () => import('@/views/employee/add'),
      meta: { title: '添加员工' },
      hidden: true
    },
    {
      path: 'edit/:id',
      name: 'EditEmployee',
      component: () => import('@/views/employee/edit'),
      meta: { title: '编辑员工' },
      hidden: true
    }
  ]
} 