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
  return new Promise((resolve, reject) => {
    MusciAxiosInterceptor.get(`/search?keywords=${keyword}`)
      .then(res => { resolve(res) })
  })
}

/**
 * 获取歌曲
 * @param {number} id 
 * @returns {Promise}
 */
export function reqSongUrl (id) {
  return new Promise((resolve, reject) => {
    MusciAxiosInterceptor.get(`/song/url/v1?id=${id}&level=exhigh`)
      .then(res => { resolve(res) })
  })
}

/**
 * 获取歌曲歌词
 * @param {number} id 
 * @param {number} timestamp 
 * @returns {Promise}
 */
export function reqSongLrc (id) {
  return new Promise((resolve, reject) => {
    MusciAxiosInterceptor.get(`/lyric?id=${id}`)
      .then(res => { resolve(res) })
  })
}

/**
 * 获取歌曲详情
 * @param {number} id 
 * @param {number} timestamp 
 * @returns {Promise}
 */
export function reqSongDetail (id) {
  return new Promise((resolve, reject) => {
    MusciAxiosInterceptor.get(`/song/detail?ids=${id}`)
      .then(res => { resolve(res) })
  })
}