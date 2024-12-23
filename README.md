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

## 项目结构
```
temple-admin-v2/
├── public/                 # 静态资源目录
│   ├── favicon.ico        # 网站图标
│   └── index.html         # HTML 模板
├── src/
│   ├── api/               # API接口目录
│   │   ├── content.js     # 内容管理接口
│   │   ├── product.js     # 商品管理接口
│   │   ├── order.js       # 订单管理接口
│   │   └── user.js        # 用户管理接口
│   ├── assets/            # 资源文件目录
│   │   ├── images/        # 图片资源
│   │   └── icons/         # 图标资源
│   ├── components/        # 公共组件
│   │   ├── ImageUpload/   # 图片上传组件
│   │   ├── Editor/        # 富文本编辑器
│   │   └── Table/         # 表格组件
│   ├── layout/           # 布局组件
│   │   ├── components/   
│   │   │   ├── Navbar.vue # 顶部导航
│   │   │   └── Sidebar.vue # 侧边栏
│   │   └── index.vue      # 布局入口
│   ├── router/           # 路由配置
│   │   └── index.js      # 路由主文件
│   ├── store/            # Vuex状态管理
│   │   ├── modules/
│   │   │   ├── user.js   # 用户状态
│   │   │   └── app.js    # 应用状态
│   │   └── index.js      # store入口
│   ├── styles/           # 样式文件
│   │   ├── variables.less # 变量定义
│   │   ├── mixin.less    # 混入定义
│   │   └── index.less    # 主样式
│   ├── utils/            # 工具函数
│   │   ├── request.js    # axios封装
│   │   ├── auth.js       # 权限相关
│   │   └── validate.js   # 验证工具
│   ├── views/            # 页面组件
│   │   ├── login/        # 登录页
│   │   ├── dashboard/    # 首页
│   │   ├── content/      # 内容管理
│   │   │   ├── temple/   # 寺庙介绍
│   │   │   └── activity/ # 禅修活动
│   │   ├── product/      # 商品管理
│   │   │   ├── blessing/ # 祈福商品
│   │   │   └── dharma/   # 法物商品
│   │   ├── order/        # 订单管理
│   │   └── user/         # 用户管理
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── .env                  # 环境变量
├── .env.development     # 开发环境变量
├── .env.production      # 生产环境变量
├── .eslintrc.js         # ESLint配置
├── .prettierrc          # Prettier配置
├── vue.config.js        # Vue配置
└── package.json         # 项目依赖
```

## 注意事项
1. 本项目采用 Vue 2.6 + Element UI 开发，确保使用兼容的依赖版本
2. 开发时注意权限控制的实现
3. 注意数据的本地缓存处理
4. 图片上传需要注意大小限制，可以用TinyPng压缩图片
5. 富文本编辑器建议使用 Tinymce 或 wangEditor

## 开发规范
1. 组件命名采用大驼峰命名法（PascalCase）
2. API 接口统一管理，按模块拆分
3. 样式文件采用 LESS 预处理器，使用嵌套语法
4. 代码提交前需要进行 ESLint 检查
5. 组件和工具函数需要编写注释

## 权限控制
- 基于角色的访问控制（RBAC）
- 菜单权限
- 按钮权限
- 接口权限

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

# 预览构建结果
pnpm run preview
```

### 代码检查
```bash
# 运行 ESLint 检查
pnpm run lint

# 自动修复
pnpm run lint:fix
```

## 常见问题
1. 开发环境跨域问题处理
2. 生产环境打包优化
3. 图片上传大小限制调整
4. 富文本编辑器配置说明
5. 权限控制最佳实践

## 更新日志
- 2024.01: 项目初始化
- 2024.02: 计划完成基础功能开发
- 2024.03: 计划完成多租户支持

## 后续规划
1. 支持多租户模式
2. 完善数据统计功能
3. 优化系统性能
4. 添加更多自定义配置选项

## 功能模块

### 1. 登录模块
- 账号密码登录
- 登录状态维护
- 权限控制

### 2. 内容管理
- 寺庙介绍管理
  - 图文内容配置
  - 列表管理（CRUD）
- 禅修活动管理
  - 活动内容配置
  - 有效期管理
  - 状态管理

### 3. 祈福商品管理
- 祈福类型管理
- 商品配置
- 特殊类型配置
  - 放生祈福
  - 法事活动

### 4. 法物流通管理
- 商品分类管理
- 商品管理
  - 基本信息配置
  - SKU管理
  - 上下架管理

### 5. 订单管理
- 祈福订单管理
  - 订单查询与筛选
  - 祈福视频上传
- 商品订单管理
  - 订单状态管理
  - 物流信息管理

### 6. 用户管理
- 用户信息管理
- 收货地址管理

### 7. 数据统计
- 订单统计
- 用户数据统计
- 收入统计

### 8. 系统设置
- 基础配置
- 支付配置