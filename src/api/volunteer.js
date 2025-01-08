import request from '@/utils/request'

export function getVolunteerList(params) {
  return request({
    url: '/volunteer/list',
    method: 'post',
    data: params
  })
}

// 录用
export function volunteerAdopt(data) {
  return request({
    url: '/volunteer/adopt',
    method: 'post',
    data
  })
}