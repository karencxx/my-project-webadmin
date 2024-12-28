import request from '@/utils/request'

// 获取员工列表
export function getEmployeeList(params) {
  return request({
    url: '/admin/employee/list',
    method: 'post',
    data: params
  })
}

// 添加员工
export function addEmployee(data) {
  return request({
    url: '/admin/employee/add',
    method: 'post',
    data
  })
}

// 更新员工信息
export function updateEmployee(data) {
  return request({
    url: '/admin/employee/update',
    method: 'put',
    data
  })
}

// 更新员工状态
export function updateEmployeeStatus(data) {
  return request({
    url: '/admin/employee/status',
    method: 'put',
    data
  })
} 