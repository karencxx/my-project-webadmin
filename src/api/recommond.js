import request from '@/utils/request'

// 获取随喜结缘列表
export function getRecommondList(params) {
  return request({
    url: '/admin/recommond/list',
    method: 'post',
    data: params
  })
}
