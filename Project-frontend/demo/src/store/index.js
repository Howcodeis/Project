import { defineStore } from "pinia";
import { AxiosBack } from "../utils/AxiosBack";
import { MessageBack } from '@/utils/MessageBack'

const musicPlayStore = defineStore('musicPlay', {
  state: () => ({
    currentSong: '',
    musicUrl: '',
    lyric: '',
    musicImg: '',
    musicList: ''
  }),

  getters: {
    formatLrc (state) {
      const formatLrc = []
      const notParseLrc = state.lyric
      const parseLrc = notParseLrc.split('\n')
      parseLrc.forEach(item => {
        const lrcdetails = item.split(']')
        // 转换时间
        const time = lrcdetails[0].substring(1).split(':')
        // 将时间转化为秒单位 
        const parseTime = +time[0] * 60 + +time[1]
        const lrcobj = {
          time: parseTime,
          words: lrcdetails[1]
        }
        formatLrc.push(lrcobj)
      });
      return formatLrc
    },
    randomPlayId: (state) => Math.floor(Math.random() * (state.musicList.length + 1))
  },
  actions: {
    async getSongUrl (song) {
      try {
        const res = await AxiosBack.getSongUrl(song.id, Date.now())
        this.musicUrl = res.data.data[0]?.url
        this.currentSong = song
        this.getSongLrc(song.id)
      } catch (error) {
        MessageBack.normalBack('warning', "网络太拥挤!")
        return error
      }
    },
    async getSongLrc (id) {
      try {
        const res = await AxiosBack.getSongLrc(id, Date.now())
        this.lyric = res.data.lrc.lyric
        this.getSongDetails(id)
      } catch (error) {
        MessageBack.normalBack('warning', "获取歌词异常!")
        return error
      }
    },
    async getSongDetails (id) {
      try {
        const res = await AxiosBack.getSongDetail(id, Date.now())
        this.musicImg = res.data.songs[0].al.picUrl
      } catch (error) {
        MessageBack.normalBack('warning', "歌曲封面获取失败!")
        return error
      }
    },
    async getMusicList (keyword) {
      if (keyword)
        try {
          const res = await AxiosBack.searchMusic(keyword, Date.now())
          this.musicList = res.data.result.songs
          MessageBack.normalBack('success', "搜索成功")
        } catch (error) {
          MessageBack.normalBack('warning', "搜索失败,请检查网络!")
          return error
        }
      else MessageBack.normalBack('error', "请输入关键字")
    }
  }
})

















export default musicPlayStore