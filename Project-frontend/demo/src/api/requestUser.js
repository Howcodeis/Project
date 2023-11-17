import { AxiosHeaders } from 'axios'
import AxiosInterceptor from '../Interceptors/AxiosInterceptor'

export const AxiosBack = {
  /**
   * 登录反馈
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<any>} 这是一个Promise对象
   */
  loginBack (username, password) {
    return AxiosInterceptor({
      method: 'get',
      url: '/login',
      params: {
        username: username,
        password: password
      }
    })
  },

  /**
   * 注册反馈
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<any>} 这是一个Promise对象
   */
  registerBack (username, password, gender) {
    return AxiosInterceptor({
      method: 'post',
      url: '/register',
      params: {
        username: username,
        password: password,
        gender: gender,
        date: new Date().toLocaleDateString()
      }
    })
  },

  /**
   * 获取用户列表
   * @param {number} permissionsId 
   * @returns {Promise<any>} 这是一个Promise对象
   */
  getUserList (permissionsId) {
    return AxiosInterceptor({
      method: 'get',
      url: '/userlist',
      params: {
        permissionsId: permissionsId
      }
    })
  },
  /**
   * 获取权限列表
   * @returns {Promise<any>} 这是一个Promise对象
   */
  getPermissionsList () {
    return AxiosInterceptor({
      method: 'get',
      url: '/permission'
    })
  },

  /**
   * 
   * @param {number} permissionsId 
   * @param {number} userId 
   * @param {string} username 
   * @returns {Promise<any>} 这是一个Promise对象
   */
  setUpdate (permissionsId, userId, username) {
    return AxiosInterceptor({
      method: 'post',
      url: '/update',
      params: {
        username: username,
        permissionsId: permissionsId,
        userId: userId
      }
    })
  },

  /**
   * 
   * @param {number} userId 
   * @returns {Promise<any>} 这是一个Promise对象
   */
  delDate (userId) {
    return AxiosInterceptor({
      method: 'post',
      url: '/delete',
      params: {
        userId: userId
      }
    })
  },
}


