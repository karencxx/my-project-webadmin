# 寺庙管理系统后台

## 项目介绍
本项目是一个基于Vue 2 + Element UI开发的寺庙管理系统后台，用于管理寺庙相关的内容、商品、订单等信息。

## 技术栈
- Vue 2.6
- Vue Router 3.x
- Vuex 3.x
- Element UI 2.x
- Axios
- Less
- WangEditor

## 项目结构
```
temple-admin/
├── public/                 # 静态资源目录
│   ├── favicon.ico        # 网站图标
│   └── index.html         # HTML 模板
├── src/
│   ├── api/               # API接口目录
│   │   ├── login.js       # 登录相关接口
│   │   ├── employee.js    # 员工管理接口
│   │   ├── wish.js        # 祈福管理接口
│   │   └── user.js        # 用户管理接口
│   ├── assets/            # 资源文件目录
│   ├── components/        # 公共组件
│   │   ├── Breadcrumb/    # 面包屑导航
│   │   ├── Editor/        # 富文本编辑器
│   │   ├── Hamburger/     # 折叠按钮
│   │   ├── Password/      # 密码管理
│   │   └── Upload/        # 文件上传
│   ├── layout/           # 布局组件
│   │   ├── components/   
│   │   │   ├── Navbar.vue # 顶部导航
│   │   │   ├── Sidebar/   # 侧边栏
│   │   │   └── AppMain.vue # 主内容区
│   │   └── index.vue      # 布局入口
│   ├── router/           # 路由配置
│   │   ├── index.js      # 路由主文件
│   │   └── modules/      # 路由模块
│   ├── store/            # Vuex状态管理
│   │   ├── modules/      # 状态模块
│   │   │   ├── user.js   # 用户状态
│   │   │   ├── sidebar.js # 侧边栏状态
│   │   │   └── data.js   # 数据状态
│   │   └── index.js      # store入口
│   ├── styles/           # 样式文件
│   │   └── index.less    # 全局样式
│   ├── utils/            # 工具函数
│   │   ├── request.js    # axios封装
│   │   ├── auth.js       # 权限相关
│   │   └── support.js    # 辅助工具
│   ├── views/            # 页面组件
│   │   ├── login/        # 登录页
│   │   ├── employee/     # 员工管理
│   │   ├── permission/   # 权限管理
│   │   ├── banner/       # Banner管理
│   │   ├── article/      # 文章管理
│   │   ├── wish/         # 祈福管理
│   │   │   ├── type/     # 祈福类型
│   │   │   └── order/    # 祈福订单
│   │   └── user/         # 用户管理
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── .env                  # 环境变量
├── .eslintrc.js         # ESLint配置
└── package.json         # 项目依赖
```

## 功能模块

### 1. 权限管理
- 角色权限管理
- 员工权限配置

### 2. 员工管理
- 员工信息管理
- 员工状态管理
- 密码管理

### 3. Banner管理
- Banner列表
- Banner编辑

### 4. 随喜结缘
- 推荐商品管理

### 5. 文章管理
- 文章列表
- 文章编辑（富文本）

### 6. 用户管理
- 用户信息管理
- 用户状态管理

### 7. 许愿祈福
- 祈福类型管理
  - 丝带祈福
  - 福牌祈福
  - 供灯祈福
  - 放生祈福
  - 法物流通
  - 供奉佛像
- 祈福订单管理
  - 订单列表
  - 订单详情
  - 图片/视频上传

## 开发规范
1. 组件命名采用大驼峰命名法（PascalCase）
2. API 接口统一管理，按模块拆分
3. 样式文件采用 LESS 预处理器
4. 使用 ESLint 进行代码规范检查
5. 组件和工具函数需要编写注释

## 部署说明

### 开发环境
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run serve
```

### 生产环境
```bash
# 构建生产环境代码
pnpm run build
```

### 代码检查
```bash
# 运行 ESLint 检查
pnpm run lint
```

## 注意事项
1. 开发时注意权限控制的实现
2. 注意数据的本地缓存处理
3. 图片上传需要注意大小限制
4. 富文本编辑器使用 WangEditor
5. 注意多租户数据隔离