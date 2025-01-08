import request from '@/utils/request'
export const moduleList = [
  { label: "许愿祈福", value: 1 },
  { label: "寺庙文创", value: 2 },
]
// 获取随喜结缘列表
export function getRecommendList(params) {
  return request({
    url: '/recommend/list',
    method: 'post',
    data: params
  })
}

// 添加随喜结缘
export function addRecommend(data) {
  return request({
    url: '/recommend/add',
    method: 'post',
    data
  })
}

// 更新随喜结缘
export function updateRecommend(data) {
  return request({
    url: '/recommend/update',
    method: 'post',
    data
  })
}

// 更新随喜结缘状态
export function updateRecommendStatus(data) {
  return request({
    url: '/recommend/status',
    method: 'post',
    data
  })
}