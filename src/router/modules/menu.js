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
  // 志愿者管理
  {
    path: '/volunteer',
    name: 'Volunteer',
    meta: { title: '寺庙义工', icon: 'el-icon-s-flag' },
    component: () => import('@/views/volunteer/list')
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
  // 寺庙文创
  {
    path: '/goods',
    name: 'Goods',
    component: page,
    meta: { title: '寺庙文创', icon: 'el-icon-goods' },
    children: [
      {
        path: 'category',
        name: 'GoodsCategory',
        meta: { title: '商品分类' },
        component: () => import('@/views/goods/category/index'),
      },
      {
        path: 'product',
        name: 'GoodsProduct',
        meta: { title: '商品档案' },
        component: () => import('@/views/goods/product/index'),
      },
      {
        path: 'order',
        name: 'GoodsOrder',
        meta: { title: '订单管理' },
        component: () => import('@/views/goods/order/index'),
      }
    ]
  },
  {
    path: '/practice',
    name: 'Practice',
    component: page,
    meta: { title: '精进', icon: 'el-icon-medal' },
    children: [
      {
        path: 'category',
        name: 'PracticeCategory',
        meta: { title: '精进分类' },
        component: () => import('@/views/practice/category/index'),
      },
      {
        path: 'content',
        name: 'PracticeContent',
        meta: { title: '精进内容' },
        component: () => import('@/views/practice/content/index'),
      }
    ]
  }
] 