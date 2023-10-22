import AxiosInterceptor from '../Interceptors/AxiosInterceptor'
import MusciAxiosInterceptor from '../Interceptors/MusicAxiosInterceptor'


export const AxiosBack = {

  /**
   * 登录反馈
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<any>} 这是一个Promise对象
   */
  async loginBack (username, password) {
    return await AxiosInterceptor({
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
  async registerBack (username, password, gender) {
    return await AxiosInterceptor({
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
  async getUserList (permissionsId) {
    return await AxiosInterceptor({
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
  async getPermissionsList () {
    return await AxiosInterceptor({
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
  async setUpdate (permissionsId, userId, username) {
    return await AxiosInterceptor({
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
  async delDate (userId) {
    return await AxiosInterceptor({
      method: 'post',
      url: '/delete',
      params: {
        userId: userId
      }
    })
  },

  /**
   * 
   * @param {object} keyword 
   * @returns {Promise}
   */
  async searchMusic (keyword, timestamp) {
    return await MusciAxiosInterceptor({
      method: 'get',
      url: `/search?keywords=${keyword}&timestamp=${timestamp}`
    })
  },

  /**
   * 
   * @param {number} id 
   * @returns {Promise}
   */
  async getSongUrl (id, timestamp) {
    return await MusciAxiosInterceptor({
      method: 'get',
      url: `/song/url/v1?id=${id}&level=standard&timestamp=${timestamp}`
    })
  },

  async getSongLrc (id, timestamp) {
    return await MusciAxiosInterceptor({
      method: 'get',
      url: `/lyric?id=${id}&timestamp=${timestamp}`
    })
  }
}


