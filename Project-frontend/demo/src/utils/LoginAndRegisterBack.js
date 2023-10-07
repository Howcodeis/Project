import AxiosInterceptor from './AxiosInterceptor'


export async function loginBack (username, password) {
  return AxiosInterceptor({
    method: 'get',
    url: '/login',
    params: {
      username: username,
      password: password
    }
  })
}
export function registerBack (username, password) {
  return AxiosInterceptor({
    method: 'post',
    url: '/register',
    params: {
      username: username,
      password: password
    }
  })
}