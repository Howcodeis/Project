/*
 * @Author: Matbin
 * @Date: 2023-11-17 09:38:43
 * @Description: 音乐相关请求
 */
import MusciAxiosInterceptor from "../Interceptors/MusicAxiosInterceptor"

/**
   * 搜索歌曲
   * @param {object} keyword 
   * @returns {Promise}
   */
export function reqSearchMusic (keyword) {
  return MusciAxiosInterceptor.get(`/search?keywords=${keyword}`)
}

/**
 * 获取歌曲
 * @param {number} id 
 * @returns {Promise}
 */
export function reqSongUrl (id) {
  return MusciAxiosInterceptor.get(`/song/url/v1?id=${id}&level=exhigh`)
}


/**
 * 获取歌曲歌词
 * @param {number} id 
 * @param {number} timestamp 
 * @returns {Promise}
 */
export function reqSongLrc (id) {
  return MusciAxiosInterceptor.get(`/lyric?id=${id}`)

}

/**
 * 获取歌曲详情
 * @param {number} id 
 * @param {number} timestamp 
 * @returns {Promise}
 */
export function reqSongDetail (id) {
  return MusciAxiosInterceptor.get(`/song/detail?ids=${id}`)
}