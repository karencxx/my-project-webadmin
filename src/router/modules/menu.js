import page from '@/views/page'

export default [
  // 内容管理
  {
    path: '/content',
    name: 'Content',
    component: page,
    meta: { title: '内容管理', icon: 'el-icon-document', resource: '/content' },
    children: [
      {
        path: 'temple',
        name: 'Temple',
        meta: { title: '寺庙介绍管理' },
        component: () => import('@/views/content/temple/index')
      },
      {
        path: 'activity',
        name: 'Activity',
        meta: { title: '禅修活动管理' },
        component: () => import('@/views/content/activity/index'),
      }
    ]
  },
  // 祈福商品管理
  {
    path: '/blessing',
    name: 'Blessing',
    component: page,
    meta: { title: '祈福商品管理', icon: 'el-icon-present' },
    children: [
      {
        path: 'type',
        name: 'BlessingType',
        meta: { title: '祈福类型管理' },
        component: () => import('@/views/blessing/type/index'),
      },
      {
        path: 'product',
        name: 'BlessingProduct',
        meta: { title: '祈福商品配置' },
        component: () => import('@/views/blessing/product/index'),
      },
      {
        path: 'release',
        name: 'Release',
        meta: { title: '放生祈福配置' },
        component: () => import('@/views/blessing/release/index'),
      },
      {
        path: 'ritual',
        name: 'Ritual',
        meta: { title: '法事活动配置' },
        component: () => import('@/views/blessing/ritual/index'),
      }
    ]
  },
  // 法物流通管理
  {
    path: '/dharma',
    name: 'Dharma',
    component: page,
    meta: { title: '法物流通管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'category',
        name: 'Category',
        meta: { title: '商品分类管理' },
        component: () => import('@/views/dharma/category/index'),
      },
      {
        path: 'product',
        name: 'DharmaProduct',
        meta: { title: '商品管理' },
        component: () => import('@/views/dharma/product/index'),
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    name: 'Order',
    component: page,
    meta: { title: '订单管理', icon: 'el-icon-s-order' },
    children: [
      {
        path: 'blessing',
        name: 'BlessingOrder',
        meta: { title: '祈福订单管理' },
        component: () => import('@/views/order/blessing/index'),
      },
      {
        path: 'dharma',
        name: 'DharmaOrder',
        meta: { title: '商品订单管理' },
        component: () => import('@/views/order/dharma/index'),
      }
    ]
  },
  // 用户管理
  {
    path: '/user',
    name: 'User',
    component: page,
    meta: { title: '用户管理', icon: 'el-icon-user' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        meta: { title: '用户信息管理' },
        component: () => import('@/views/user/list/index'),
      },
      {
        path: 'address',
        name: 'UserAddress',
        meta: { title: '收货地址管理' },
        component: () => import('@/views/user/address/index'),
      }
    ]
  },
  // 数据统计
  {
    path: '/statistics',
    name: 'Statistics',
    component: page,
    meta: { title: '数据统计', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'order',
        name: 'OrderStatistics',
        meta: { title: '订单统计' },
        component: () => import('@/views/statistics/order/index'),
      },
      {
        path: 'user',
        name: 'UserStatistics',
        meta: { title: '用户统计' },
        component: () => import('@/views/statistics/user/index'),
      },
      {
        path: 'income',
        name: 'IncomeStatistics',
        meta: { title: '收入统计' },
        component: () => import('@/views/statistics/income/index'),
      }
    ]
  },
  // 系统设置
  {
    path: '/setting',
    name: 'Setting',
    component: page,
    meta: { title: '系统设置', icon: 'el-icon-setting' },
    children: [
      {
        path: 'basic',
        name: 'BasicSetting',
        meta: { title: '基础配置' },
        component: () => import('@/views/setting/basic/index'),
      },
      {
        path: 'payment',
        name: 'PaymentSetting',
        meta: { title: '支付配置' },
        component: () => import('@/views/setting/payment/index'),
      }
    ]
  }
] 