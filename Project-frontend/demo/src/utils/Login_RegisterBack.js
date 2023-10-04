import Axiosinterceptor from './Axiosinterceptor'

export function loginBack (username, password) {
  return Axiosinterceptor({
    method: 'get',
    url: '/login',
    params: {
      username: username,
      password: password
    }
  })
}
export function registerBack (username, password) {
  return Axiosinterceptor({
    method: 'post',
    url: '/register',
    params: {
      username: username,
      password: password
    }
  })
}