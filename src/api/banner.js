import request from '@/utils/request'

// 获取Banner列表
export function getBannerList(params) {
  return request({
    url: '/admin/banner/list',
    method: 'post',
    data: params
  })
}

// 添加Banner
export function addBanner(data) {
  return request({
    url: '/admin/banner/add',
    method: 'post',
    data
  })
}

// 更新Banner
export function updateBanner(data) {
  return request({
    url: '/admin/banner/update',
    method: 'put',
    data
  })
}

// 更新Banner状态
export function updateBannerStatus(data) {
  return request({
    url: '/admin/banner/status',
    method: 'put',
    data
  })
}

// 上传图片
export function uploadImage(data) {
  return request({
    url: '/admin/upload/image',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
} 