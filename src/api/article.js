import request from '@/utils/request'

// 获取文章列表
export function getArticleList(params) {
  return request({
    url: '/admin/article/list',
    method: 'post',
    data: params
  })
}

// 获取文章详情
export function getArticleDetail(id) {
  return request({
    url: '/admin/article/detail',
    method: 'get',
    params: { id }
  })
}

// 添加文章
export function addArticle(data) {
  return request({
    url: '/admin/article/add',
    method: 'post',
    data
  })
}

// 更新文章
export function updateArticle(data) {
  return request({
    url: '/admin/article/update',
    method: 'put',
    data
  })
}

// 更新文章状态
export function updateArticleStatus(data) {
  return request({
    url: '/admin/article/status',
    method: 'put',
    data
  })
} 