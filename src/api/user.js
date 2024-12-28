import request from '@/utils/request'

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/admin/user/list',
    method: 'post',
    data: params
  })
} 