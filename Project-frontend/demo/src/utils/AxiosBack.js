import AxiosInterceptor from './AxiosInterceptor'


export async function loginBack (username, password) {
  return await AxiosInterceptor({
    method: 'get',
    url: '/login',
    params: {
      username: username,
      password: password
    }
  })
}
export async function registerBack (username, password) {
  return await AxiosInterceptor({
    method: 'post',
    url: '/register',
    params: {
      username: username,
      password: password,
      date: new Date().toLocaleDateString()
    }
  })
}
export async function getUserList (permissionsId) {
  return await AxiosInterceptor({
    method: 'get',
    url: '/userlist',
    params: {
      permissionsId: permissionsId
    }
  })
}
export async function getPermissionsList () {
  return AxiosInterceptor({
    method: 'get',
    url: '/permission'
  })
}
export async function setUpdata (permissionsId, userId, username) {
  return AxiosInterceptor({
    method: 'post',
    url: '/update',
    params: {
      username: username,
      permissionsId: permissionsId,
      userId: userId
    }
  })
}
export async function delData (userId) {
  return AxiosInterceptor({
    method: 'post',
    url: '/delete',
    params: {
      userId: userId
    }
  })
}