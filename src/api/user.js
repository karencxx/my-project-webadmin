import request from '@/utils/request'

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/admin/user/list',
    method: 'post',
    data: params
  })
} 


// 修改密码
export function updatePassword(data) {
  return request({
    url: '/admin/employee/password/update',
    method: 'post',
    data
  })
}

// 重置密码
export function resetPassword(data) {
  return request({
    url: '/admin/employee/password/reset',
    method: 'post',
    data
  })
} 