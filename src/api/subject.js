import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/subject/list',
    method: 'get',
    params: params
  })
} 