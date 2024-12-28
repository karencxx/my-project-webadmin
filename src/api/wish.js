import request from '@/utils/request'

// 获取许愿祈福列表
export function getWishList(params) {
  return request({
    url: '/admin/wish/list',
    method: 'post',
    data: params
  })
}

// 添加许愿祈福
export function addWish(data) {
  return request({
    url: '/admin/wish/add',
    method: 'post',
    data
  })
}

// 更新许愿祈福
export function updateWish(data) {
  return request({
    url: '/admin/wish/update',
    method: 'put',
    data
  })
}

// 更新许愿祈福状态
export function updateWishStatus(data) {
  return request({
    url: '/admin/wish/status',
    method: 'put',
    data
  })
} 