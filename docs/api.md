# 寺庙管理系统接口文档

## 1. 用户认证

### 1.1 登录
- **接口**: `/api/auth/login`
- **方法**: POST
- **参数**: 
```json
{
  "username": "string", // 用户名
  "password": "string"  // 密码
}
```
- **响应**:
```json
{
  "code": 200,
  "data": {
    "token": "string",
    "userInfo": {
      "id": "number",
      "username": "string",
      "name": "string",
      "role": "string"
    }
  }
}
```

### 1.2 获取用户信息
- **接口**: `/api/auth/info`
- **方法**: POST
- **响应**:
```json
{
  "code": 200,
  "data": {
    "id": "number",
    "username": "string",
    "name": "string",
    "role": "string",
    "permissions": ["string"]
  }
}
```

## 2. 内容管理

### 2.1 寺庙介绍

#### 2.1.1 获取寺庙介绍列表
- **接口**: `/api/content/temple/list`
- **方法**: POST
- **参数**: 
```json
{
  "page": "number",     // 页码
  "size": "number",     // 每页条数
  "title": "string",    // 标题，可选
  "status": "number"    // 状态，可选
}
```
- **响应**:
```json
{
  "code": 200,
  "data": {
    "total": "number",
    "list": [{
      "id": "number",
      "title": "string",
      "content": "string",
      "coverUrl": "string",
      "author": "string",
      "status": "number",
      "createTime": "string"
    }]
  }
}
```

#### 2.1.2 创建寺庙介绍
- **接口**: `/api/content/temple/create`
- **方法**: POST
- **参数**: 
```json
{
  "title": "string",    // 标题
  "content": "string",  // 内容
  "coverUrl": "string", // 封面图
  "author": "string"    // 作者
}
```

#### 2.1.3 更新寺庙介绍
- **接口**: `/api/content/temple/update`
- **方法**: PUT
- **参数**: 
```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "coverUrl": "string",
  "author": "string"
}
```

#### 2.1.4 删除寺庙介绍
- **接口**: `/api/content/temple/delete/{id}`
- **方法**: DELETE

#### 2.1.5 修改状态
- **接口**: `/api/content/temple/status`
- **方法**: PUT
- **参数**: 
```json
{
  "id": "number",
  "status": "number"  // 0:草稿 1:已发布
}
```

### 2.2 禅修活动

#### 2.2.1 获取活动列表
- **接口**: `/api/content/activity/list`
- **方法**: POST
- **参数**: 
```json
{
  "page": "number",
  "size": "number",
  "title": "string",
  "status": "number",
  "startTime": "string",
  "endTime": "string"
}
```
- **响应**:
```json
{
  "code": 200,
  "data": {
    "total": "number",
    "list": [{
      "id": "number",
      "title": "string",
      "description": "string",
      "coverUrl": "string",
      "startTime": "string",
      "endTime": "string",
      "maxParticipants": "number",
      "currentParticipants": "number",
      "status": "number",
      "notes": "string"
    }]
  }
}
```

## 3. 商品管理

### 3.1 祈福商品

#### 3.1.1 获取商品列表
- **接口**: `/api/product/blessing/list`
- **方法**: POST
- **参数**: 
```json
{
  "page": "number",
  "size": "number",
  "name": "string",
  "type": "string",
  "status": "number"
}
```

#### 3.1.2 创建商品
- **接口**: `/api/product/blessing/create`
- **方法**: POST
- **参数**: 
```json
{
  "name": "string",
  "type": "string",     // 商品类型：丝带/福牌/供灯等
  "price": "number",
  "description": "string",
  "images": ["string"],
  "status": "number"    // 0:下架 1:上架
}
```

### 3.2 法物商品

#### 3.2.1 获取商品列表
- **接口**: `/api/product/dharma/list`
- **方法**: POST
- **参数**: 
```json
{
  "page": "number",
  "size": "number",
  "name": "string",
  "categoryId": "number",
  "status": "number"
}
```

## 4. 订单管理

### 4.1 祈福订单

#### 4.1.1 获取订单列表
- **接口**: `/api/order/blessing/list`
- **方法**: POST
- **参数**: 
```json
{
  "page": "number",
  "size": "number",
  "orderNo": "string",
  "status": "number",
  "type": "string",
  "startTime": "string",
  "endTime": "string"
}
```

#### 4.1.2 上传祈福视频
- **接口**: `/api/order/blessing/upload-video`
- **方法**: POST
- **参数**: 
```json
{
  "orderId": "number",
  "videoUrl": "string"
}
```

### 4.2 法物订单

#### 4.2.1 获取订单列表
- **接口**: `/api/order/dharma/list`
- **方法**: POST
- **参数**: 
```json
{
  "page": "number",
  "size": "number",
  "orderNo": "string",
  "status": "number",
  "startTime": "string",
  "endTime": "string"
}
```

#### 4.2.2 发货
- **接口**: `/api/order/dharma/ship`
- **方法**: POST
- **参数**: 
```json
{
  "orderId": "number",
  "expressNo": "string",
  "expressCompany": "string"
}
```

## 5. 用户管理

### 5.1 获取用户列表
- **接口**: `/api/user/list`
- **方法**: POST
- **参数**: 
```json
{
  "page": "number",
  "size": "number",
  "keyword": "string"  // 搜索关键词
}
```

## 6. 数据统计

### 6.1 获取订单统计
- **接口**: `/api/statistics/order`
- **方法**: POST
- **参数**: 
```json
{
  "startTime": "string",
  "endTime": "string",
  "type": "string"      // day/week/month/year
}
```

### 6.2 获取用户统计
- **接口**: `/api/statistics/user`
- **方法**: POST
- **参数**: 
```json
{
  "startTime": "string",
  "endTime": "string"
}
```

## 7. 系统设置

### 7.1 获取系统配置
- **接口**: `/api/setting/config`
- **方法**: POST

### 7.2 更新系统配置
- **接口**: `/api/setting/config`
- **方法**: POST
- **参数**: 
```json
{
  "siteName": "string",
  "logo": "string",
  "paymentConfig": {
    "provider": "string",
    "appId": "string",
    "appSecret": "string"
  }
}
```

## 8. 公共接口

### 8.1 文件上传
- **接口**: `/api/common/upload`
- **方法**: POST
- **参数**: FormData
- **响应**:
```json
{
  "code": 200,
  "data": {
    "url": "string"
  }
}
```

## 响应码说明

- 200: 成功
- 400: 请求参数错误
- 401: 未授权
- 403: 权限不足
- 404: 资源不存在
- 500: 服务器错误 