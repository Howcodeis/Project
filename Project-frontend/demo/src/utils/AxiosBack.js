import { AxiosHeaders } from 'axios'
import AxiosInterceptor from '../Interceptors/AxiosInterceptor'
import MusciAxiosInterceptor from '../Interceptors/MusicAxiosInterceptor'


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

  /**
   * 搜索歌曲
   * @param {object} keyword 
   * @returns {Promise}
   */
  searchMusic (keyword) {
    return MusciAxiosInterceptor({
      method: 'get',
      url: `/search?keywords=${keyword}`
    })
  },

  /**
   * 获取歌曲
   * @param {number} id 
   * @returns {Promise}
   */
  getSongUrl (id) {
    return MusciAxiosInterceptor({
      method: 'get',
      url: `/song/url/v1?id=${id}&level=standard`
    })
  },

  /**
   * 获取歌曲歌词
   * @param {number} id 
   * @param {number} timestamp 
   * @returns {Promise}
   */
  getSongLrc (id) {
    return MusciAxiosInterceptor({
      method: 'get',
      url: `/lyric?id=${id}`,
    })
  },

  /**
   * 获取歌曲详情
   * @param {number} id 
   * @param {number} timestamp 
   * @returns {Promise}
   */
  getSongDetail (id) {
    return MusciAxiosInterceptor({
      method: 'get',
      url: `/song/detail?ids=${id}`
    })
  }
}


