import request from '@/utils/request'

export const types = [
  { label: '丝带祈福', value: 1 },
  { label: '福牌祈福', value: 2 },
  { label: '供灯祈福', value: 3 },
  { label: '放生祈福', value: 4 },
  { label: '法物流通', value: 5 },
  { label: '供奉佛像', value: 6 },
]

// 获取许愿祈福列表
export function getWishList(params) {
  return request({
    url: '/wish/list',
    method: 'post',
    data: params
  })
}

// 添加许愿祈福
export function addWish(data) {
  return request({
    url: '/wish/add',
    method: 'post',
    data
  })
}

// 更新许愿祈福
export function updateWish(data) {
  return request({
    url: '/wish/update',
    method: 'put',
    data
  })
}

// 更新许愿祈福状态
export function updateWishStatus(data) {
  return request({
    url: '/wish/status',
    method: 'put',
    data
  })
}

// 获取祈福订单列表
export function getWishOrders(data) {
  return request({
    url: '/wish/orders',
    method: 'post',
    data
  })
}

// 获取祈福订单详情
export function getWishOrderDetail(data) {
  return request({
    url: '/wish/order/detail',
    method: 'post',
    data
  })
}

// 上传祈福视频
export function uploadWishVideo(data) {
  return request({
    url: '/wish/upload/video',
    method: 'post',
    data
  })
} 