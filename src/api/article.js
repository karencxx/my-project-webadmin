import request from '@/utils/request'
export const moduleOptions = [
    { label: '了解寺庙', value: 2 },
    { label: '禅修活动', value: 1 }
]
export function genArticleLink({id, module}) {
    return `/pagesA/detail/index?id=${id}&type=${module}`
}
// 获取文章列表
export function getArticleList(params) {
  return request({
    url: '/article/list',
    method: 'post',
    data: params
  })
}

// 获取文章详情
export function getArticleDetail(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

// 添加文章
export function addArticle(data) {
  return request({
    url: '/article/add',
    method: 'post',
    data
  })
}

// 更新文章
export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'put',
    data
  })
}

// 更新文章状态
export function updateArticleStatus(data) {
  return request({
    url: '/article/status',
    method: 'put',
    data
  })
} 