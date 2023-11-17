import { defineStore } from "pinia";
import { reqSearchMusic, reqSongDetail, reqSongUrl, reqSongLrc } from "../api/requestMusic";
import { MessageBack } from '@/utils/MessageBack'

const musicPlayStore = defineStore('musicPlay', {
  state: () => ({
    currentSong: '',
    musicUrl: '',
    originLyric: '',
    musicImg: '',
    musicList: [],
    currentLrcIndex: '',
    currentTime: '',
    isPlay: false,
    status: 1,
    fakeTime: '',
    isShowDetails: false,
    percent: 0,
    volumeValue: 0.5,
    isShowMusicBox: ''
  }),
  getters: {
    formatLrc (state) {
      const formatLrc = []
      const notParseLrc = state.originLyric
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
    currentSongIndex (state) {
      return state.musicList.findIndex(item => item.id === state.currentSong.id)
    },
  },
  actions: {
    async getSongDetail (song) {
      try {
        await reqSongDetail(song.id).then(res => {
          this.musicImg = res.data.songs[0].al.picUrl
          this.getSongUrl(song)
          this.getSongLrc(song)
        })
      } catch (error) {
        MessageBack.normalBack('warning', "获取歌曲信息失败!")
        return error
      }
    },
    async getSongUrl (song) {
      try {
        await reqSongUrl(song.id).then(res => {
          this.musicUrl = res.data.data[0]?.url
          this.currentSong = song
        })
      } catch (error) {
        MessageBack.normalBack('warning', "获取歌曲失败!")
        return error
      }
    },
    async getSongLrc (song) {
      try {
        await reqSongLrc(song.id).then(res => {
          this.originLyric = res.data.lrc.lyric
        })
      } catch (error) {
        MessageBack.normalBack('warning', "获取歌词失败!")
        return error
      }
    },
    async getMusicList (keyword) {
      if (keyword)
        try {
          const res = await reqSearchMusic(keyword)
          this.musicList = res.data.result.songs
          MessageBack.normalBack('success', "搜索成功")
        } catch (error) {
          MessageBack.normalBack('warning', "搜索失败,请检查网络!")
          return error
        }
      else MessageBack.normalBack('error', "请输入关键字")
    },
    timeFormat (time) {
      let minute = Math.floor(time / 60),
        second = Math.floor(time) - minute * 60
      if (minute <= 9) minute = "0" + minute
      if (second <= 9) second = "0" + second
      return minute + ":" + second
    },
  },
  persist: {
    storage: localStorage
  }
})

export default musicPlayStore