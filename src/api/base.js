import httpService from 'httpService'
// 基础请求参数处理
export const baseParams = () => {
    return {
        tenantId: localStorage.getItem('tenantId') || ''
    }
}

// 登录
export const login = (params) => {
    return httpService.post('/auth/login', {
        params
    })
}
// 退出登录
export const loginOut = (params) => {
    return httpService.post('/auth/loginout', {
        params
    })
}