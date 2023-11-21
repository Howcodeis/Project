/*
 * @Author: Matbin
 * @Date: 2023-09-28 21:28:28
 * @Description: music store 配置
 */
import { defineStore } from "pinia";
import { MessageBack } from '@/utils/MessageBack'
import { getSongDetails, getSongList, getSongLyric, getSongUrl, getNextSong, PercentageOfProgress, TimeOfProgress } from "../components/Music/MusicTools";

const audio = new Audio()

const musicPlayStore = defineStore('musicPlay', {
  state: () => ({
    currentSong: '', // 当前歌曲
    musicUrl: '', // 音乐链接
    originLyric: '', // 歌词
    musicImg: '', // 音乐封面
    songList: [], // 音乐列表
    tempSongList: [], // 临时音乐列表
    currentLrcIndex: '', // 当前歌词索引
    currentSongIndex: '', // 当前歌曲索引
    currentTime: '', // 当前播放时间
    duration: '',
    isPlay: false, // 是否播放
    isShowDetails: false, // 是否进入音乐独播界面
    isShowMusicBox: '', // 是否进入播放界面
    isActive: true, // 是否切换歌单列表
    status: 1, // 播放顺序状态值
    fakeTime: '', // 当前播放时间格式化
    percent: 0, // 播放进度百分比
    volumeValue: 0.5, // 初始播放音量
    collectionList: [],
  }),
  getters: {
    getCurrentSongIndex () {
      return this.currentSongIndex
    },
    getcollectionList () {
      return this.collectionList
    },
  },
  actions: {
    // init () {
    //   audio.volume = this.volumeValue
    //   audio.loop = false
    //   audio.autoplay = true
    //   audio.preload = true

    //   audio.ontimeupdate = () => {
    //     if (audio.currentTime) {
    //       this.currentTime = audio.currentTime
    //     }
    //     if (this.isPlay != audio.paused) {
    //       this.isPlay = audio.paused
    //     }
    //     if (this.duration != audio.duration) {
    //       this.duration = audio.duration
    //     }
    //     if (audio.ended) {
    //       getNextSong()
    //     }
    //     this.percent = PercentageOfProgress(this.currentTime, this.duration)
    //     this.fakeTime = TimeOfProgress(this.currentTime)
    //     let index = this.originLyric.findIndex(item => item.time > audio.currentTime)
    //     this.currentLrcIndex = index - 1 || 0
    //   }
    // },

    async setSongInfo (song) {
      this.currentSong = song
      const detail = await getSongDetails(song.id)
      const url = await getSongUrl(song.id)
      const LyricList = await getSongLyric(song.id)
      // audio.src = url.url
      // audio.play()
      this.musicImg = detail[0].al.picUrl
      this.musicUrl = url.url
      this.originLyric = LyricList
    },

    async setMusicList (keyword) {
      if (!keyword) {
        MessageBack.normalBack('error', "请输入关键字")
        return
      } else {
        const songList = await getSongList(keyword)
        this.setCollectStaus(songList)
        this.changePlayModel('search')
        this.isActive = true
        this.songList = songList
        this.tempSongList = songList
      }
    },
    timeFormat (time) {
      let minute = Math.floor(time / 60),
        second = Math.floor(time) - minute * 60
      if (minute <= 9) minute = "0" + minute
      if (second <= 9) second = "0" + second
      return minute + ":" + second
    },
    setCollectList (type, song) {
      if (type == 'add') {
        this.collectionList.push(song)
      }
      else if (type == 'del') {
        let index = this.collectionList.findIndex(item => item.id == song.id)
        if (index != -1) this.collectionList.splice(index, 1)
      }
    },
    setCollectStaus (songs) {
      if (!this.collectionList) return
      songs.forEach(item => {
        item.active = this.isCollection(item.id)
      });
    },
    isCollection (id) {
      let index = this.collectionList.findIndex(item => item.id == id)
      if (index == -1) return false
      else return true
    },
    changePlayModel (type) {
      if (type == 'search') {
        this.songList = this.tempSongList
        this.setCollectStaus(this.songList)
        this.isActive = true
      } else if (type == 'collection') {
        this.songList = this.collectionList
        this.isActive = false
      }
    },
    setCurrentSongIndex () {
      let index = this.songList.findIndex(item => item.id == this.currentSong.id),
        newIndex = 0
      if (index == -1) {
        this.currentSongIndex = newIndex
      } else {
        this.currentSongIndex = index
      }
    }
  },
  persist: {
    storage: localStorage
  }
})

export default musicPlayStore