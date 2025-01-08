import request from '@/utils/request'

// 获取Banner列表
export function getBannerList(params) {
  return request({
    url: '/banner/list',
    method: 'post',
    data: params
  })
}

// 添加Banner
export function addBanner(data) {
  return request({
    url: '/banner/add',
    method: 'post',
    data
  })
}

// 更新Banner
export function updateBanner(data) {
  return request({
    url: '/banner/update',
    method: 'post',
    data
  })
}

// 更新Banner状态
export function updateBannerStatus(data) {
  return request({
    url: '/banner/status',
    method: 'put',
    data
  })
}

// 上传图片
export function uploadImage(data) {
  return request({
    url: '/upload/image',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
} 