import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
} 

export function getUserInfo() {
  return JSON.parse(localStorage.getItem('userInfo'))
}

export function setUserInfo(userInfo) {
  return localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

export function removeUserInfo() {
  return localStorage.removeItem('userInfo')
}
