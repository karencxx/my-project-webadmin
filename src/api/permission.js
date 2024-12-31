import request from '@/utils/request'

export function getPermissionList(params) {
  return request({
    url: '/permission/list',
    method: 'post',
    params
  })
}

export function deletePermission(data) {
  return request({
    url: '/permission/delete',
    method: 'post',
    data
  })
}

export function handlePermissionStatus(data) {
  return request({
    url: '/permission/status',
    method: 'post',
    data
  })
}

export function updatePermission(data) {
  return request({
    url: '/permission/update',
    method: 'post',
    data
  })
}