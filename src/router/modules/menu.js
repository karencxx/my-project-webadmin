import page from '@/views/page'

export default [
  // 权限管理
  {
    path: '/permission',
    name: 'Permission',
    meta: { title: '权限管理', icon: 'el-icon-s-tools' },
    component: () => import('@/views/permission/list')
  },
  // 员工管理
  {
    path: '/employee',
    name: 'Employee',
    meta: { title: '员工管理', icon: 'el-icon-s-custom' },
    component: () => import('@/views/employee/list')
  },
  // Banner管理
  {
    path: '/banner',
    name: 'Banner',
    redirect: '/banner/list',
    meta: { title: 'Banner管理', icon: 'el-icon-picture', expanded: false },
    component: page,
    children: [
      {
        path: '/banner/list',
        name: 'BannerList',
        meta: { title: '列表', parentPath: '/banner' },
        component: () => import('@/views/banner/list'),
        hidden: true
      },
      {
        path: '/banner/edit',
        name: 'EditBanner',
        meta: { title: '编辑', parentPath: '/banner' },
        component: () => import('@/views/banner/edit'),
        hidden: true
      }
    ]
  },
  // 随喜结缘
  {
    path: '/recommond',
    name: 'Recommond',
    meta: { title: '随喜结缘', icon: 'el-icon-present'},
    component: () => import('@/views/recommond/list')
  },
  // 文章管理
  {
    path: '/article',
    name: 'Article',
    component: page,
    redirect: '/article/list',
    meta: { title: '文章管理', icon: 'el-icon-document' },
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        meta: { title: '文章列表', parentPath: '/article' },
        hidden: true,
        component: () => import('@/views/article/list')
      },
      {
        path: '/article/edit',
        name: 'EditArticle',
        meta: { title: '编辑', parentPath: '/article' },
        component: () => import('@/views/article/edit'),
        hidden: true
      }
    ]
  },
  // 用户管理
  {
    path: '/user',
    name: 'User',
    meta: { title: '用户管理', icon: 'el-icon-user' },
    component: () => import('@/views/user/list')
  },
  // 许愿祈福
  {
    path: '/wish',
    name: 'Wish',
    component: page,
    meta: { title: '许愿祈福', icon: 'el-icon-magic-stick', disabledClick: true },
    children: [
      {
        path: 'type',
        redirect: '/wish/type/list',
        name: 'WishType',
        meta: { title: '祈福类型' },
        component: page,
        children: [
          {
            path: '/wish/type/list',
            name: 'WishTypeList',
            meta: { title: '列表', parentPath: '/wish/type' },
            component: () => import('@/views/wish/type/list'),
            hidden: true
          },
          {
            path: '/wish/type/detail',
            name: 'WishTypeDetail',
            meta: { title: '详情', parentPath: '/wish/type' },
            component: () => import('@/views/wish/type/detail'),
            hidden: true
          },
          {
            path: '/wish/type/goodList',
            name: 'WishGoodList',
            meta: { title: '祈福商品', parentPath: '/wish/type' },
            component: () => import('@/views/wish/type/goodList'),
            hidden: true
          },
          {
            path: '/wish/type/activityList',
            name: 'WishActivityList',
            meta: { title: '祈福活动', parentPath: '/wish/type' },
            component: () => import('@/views/wish/activity/list'),
            hidden: true
          }
        ]
      },
      {
        path: 'order',
        redirect: '/wish/order/list',
        name: 'WishOrder',
        meta: { title: '祈福订单' },
        component: page,
        children: [
          {
            path: '/wish/order/list',
            name: 'WishOrderList',
            meta: { title: '列表', parentPath: '/wish/order' },
            component: () => import('@/views/wish/order/list'),
            hidden: true
          },
          {
            path: '/wish/order/detail',
            name: 'WishOrderDetail',
            meta: { title: '详情', parentPath: '/wish/order' },
            component: () => import('@/views/wish/order/detail'),
            hidden: true
          }
        ]
      }
    ]
  },
  // 法物流通管理
  // {
  //   path: '/dharma',
  //   name: 'Dharma',
  //   component: page,
  //   meta: { title: '法物流通管理', icon: 'el-icon-goods' },
  //   children: [
  //     {
  //       path: 'category',
  //       name: 'Category',
  //       meta: { title: '商品分类管理' },
  //       component: () => import('@/views/dharma/category/index'),
  //     },
  //     {
  //       path: 'product',
  //       name: 'DharmaProduct',
  //       meta: { title: '商品管理' },
  //       component: () => import('@/views/dharma/product/index'),
  //     }
  //   ]
  // },
  // 数据统计
  // {
  //   path: '/statistics',
  //   name: 'Statistics',
  //   component: page,
  //   meta: { title: '数据统计', icon: 'el-icon-s-data' },
  //   children: [
  //     {
  //       path: 'order',
  //       name: 'OrderStatistics',
  //       meta: { title: '订单统计' },
  //       component: () => import('@/views/statistics/order/index'),
  //     },
  //     {
  //       path: 'user',
  //       name: 'UserStatistics',
  //       meta: { title: '用户统计' },
  //       component: () => import('@/views/statistics/user/index'),
  //     },
  //     {
  //       path: 'income',
  //       name: 'IncomeStatistics',
  //       meta: { title: '收入统计' },
  //       component: () => import('@/views/statistics/income/index'),
  //     }
  //   ]
  // },
  // 系统设置
  // {
  //   path: '/setting',
  //   name: 'Setting',
  //   component: page,
  //   meta: { title: '系统设置', icon: 'el-icon-setting' },
  //   children: [
  //     {
  //       path: 'basic',
  //       name: 'BasicSetting',
  //       meta: { title: '基础配置' },
  //       component: () => import('@/views/setting/basic/index'),
  //     },
  //     {
  //       path: 'payment',
  //       name: 'PaymentSetting',
  //       meta: { title: '支付配置' },
  //       component: () => import('@/views/setting/payment/index'),
  //     }
  //   ]
  // }
] 