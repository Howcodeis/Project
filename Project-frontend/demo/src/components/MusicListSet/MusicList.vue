<template>
  <div class="music-box">
    <!-- 关闭musicList -->
    <div class="close-musicBox" @click="closeMusicBox(false)"></div>

    <transition name="details">

      <div class="music-details" v-show="isShowDetails">
        <div class="big-image">
          <div class="img-details">
            <img :src="imgUrl || '默认图片路径'">
          </div>
        </div>
        <div class="big-lrc">
          <ul class="big-lrcDetails" ref="bigLrcUl" @scroll="artificiallyScroll($event)">
            <li v-for="(lrc, index) in  lrcArray " :key="index" ref="lrcLi" @dblclick="skipLrc(lrc)">
              <span :class="[currentLrcIndex === index ? 'highLight' : '']">
                {{ lrc.words ? lrc.words : '\xa0' }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </transition>


    <div class="client-container"></div>


    <div class="music-container">
      <div class="search-bar">
        <el-input type="text" v-model="keyword" @keydown.native.enter="getSearchMusicList">
        </el-input>
        <el-button circle icon="el-icon-search" @click="getSearchMusicList"></el-button>
      </div>
      <ul class="song-ul">
        <li v-for="single in searchMusicList" @dblclick="playaudio(single)" :key="single.id">{{ single.name }} -- {{
          single.artists[0].name }}</li>
      </ul>

    </div>

    <div class="control-bar">
      <div class="song-img">
        <div class="img-set" @click="isShowDetails = !isShowDetails">
          <img :src="imgUrl || '默认图片路劲'">
        </div>
        <div class="song-name">
          <div class="name-space">
            <span>{{ currentSong.name || '暂无歌曲' }}</span>
          </div>
          <div class="artist-space">
            <span>{{ currentSong.artists?.[0].name || '暂无歌手' }}</span>
          </div>
        </div>
      </div>
      <div class="progress-control">
        <div class="song-control">
          <div class="normal-set">
            <i class="iconfont icon-suijibofang" @click="changeStatus" v-show="status == 3" title="随机播放" />
            <i class="iconfont icon-danquxunhuan" @click="changeStatus" v-show="status == 2" title="单曲循环" />
            <i class="iconfont icon-danqubofang" @click="changeStatus" v-show="status == 1" title="列表循环" />
            <i class="iconfont icon-zuobofang" @click="handleBefore" title="上一首" />
            <i class="iconfont icon-tingzhi" v-show="isPlay" @click="handlePlay" title="暂停" />
            <i class="iconfont icon-bofang" v-show="!isPlay" @click="handlePlay" title="播放" />
            <i class="iconfont icon-youbofang" title="下一首" @click="handleNext" />
          </div>

          <div class="volume-control" @mouseenter="isShowVolume = true" @mouseleave="isShowVolume = false">
            <i class="iconfont icon-yinliang" v-show="isvolume" @click="stepCloseVolume" />
            <i class="iconfont icon-guanbiyinliang" v-show="!isvolume" @click="stepOpenVolume" />
            <!-- <el-slider v-show="isShowVolume" v-model="value" vertical height="50px">
            </el-slider> -->
            <input class="volume-set" type="range" v-show="isShowVolume" min="0" max="1" step="0.01"
              :title="currentSong ? volumeValue : '暂无歌曲'" v-model="volumeValue">
          </div>
        </div>
        <!-- 进度条包裹 -->
        <div class="progress-bar">
          <!-- 进度条 -->
          <div class="music-bar">
            <div class="c-time"><span>{{ fakeTime || '00:00' }}</span></div>
            <!-- <div class="show-bar" :style="`width: ${percent}%;`">
            </div> -->
            <input type="range" class="show-bar" @change="touchProgress" @input="changeProgress" min="0" max="100"
              v-model="percent" step="any">
            <div class="d-time"><span>{{ dTime || '00:00' }}</span></div>
          </div>
          <!-- 迷你歌词 -->
          <transition name="small">
            <div class="small-lrc" v-show="!isShowDetails">
              <ul class="lrc-ul" ref="smallLrcUl">
                <li v-for="(lrc, index) in  lrcArray " :key="index">
                  <span>
                    {{ lrc.words ? lrc.words : '\xa0' }}
                  </span>
                </li>
              </ul>
            </div>
          </transition>
        </div>

      </div>
      <div class="song-collection"></div>
      <audio id="music" ref="audioControls" autoplay :src="musicUrl" @timeupdate="findCurrentLrc"
        @ended="playNext(status)"></audio>
    </div>
  </div>
</template>

<script>
// const listLoop = this.timeOutbar(this.playaudio(this.searchMusicList[this.currentSongIndex + 1]), 1000)
// const singleLoop = this.timeOutbar(this.playaudio(this.searchMusicList[this.currentSongIndex]), 1000)
// const randomPlay = this.timeOutbar(this.playaudio(this.searchMusicList[id]), 1000)

// const playStyle = {
//   1: listLoop,
//   2: singleLoop,
//   3: randomPlay
// }
/**
 * 问题:
 * 1.列表更换后存在播放下一首参数索引问题   判断索引是否大于当前数组长度  排序后重新计算
 * 2.切换路由播放停止(已解决)
 * 3.歌词上移动后无法滑上去(已解决)  
 * 衍生问题：歌词自己滚动也会触发，我要的只是手动滚动出发(感觉可以通过滑动距离来判断)  (已解决)
 * 通过判断滚动的scrollTop与当前歌词的scrollTop 相差量来决定是否控制(已解决)
 * 4.歌手有的是多个(遍历数组)
 * 5.歌曲进度条展示(获取歌曲总时长duration  与 timeupdate结合 currentTime/duration 得到百分比) (已解决)
 * 6.歌曲进度条用 input的range属性来做(大致完成)
 * 7.歌曲播放可以缓存下来。下次播放无需再次发请求
 */
import { AxiosBack } from '@/utils/AxiosBack'
import { MessageBack } from '@/utils/MessageBack'
export default {
  name: 'myMusic',
  inject: ['childrenRouterRefresh'],
  props: { closeMusicBox: Function },
  data () {
    return {
      // 搜索关键字
      keyword: '',
      // audio元素的属性值
      musicUrl: '',
      // 展示当前歌曲
      currentSong: '',
      // 当前歌曲索引
      currentSongIndex: '',
      // 搜索列表
      searchMusicList: [],
      // 歌词数组
      lrcArray: [],
      // 当前歌词索引  高亮显示判断
      currentLrcIndex: '',
      // 是否播放
      isPlay: false,
      // 歌词滚动判断
      lrcCanMove: true,
      // 定时器
      timeOut: '',
      timeInter: '',
      // 滚动距离
      offset: '',
      // 进度条百分比
      percent: 0,
      // 音量数字
      volumeValue: 0.5,
      // 上次的音量数字
      beforeVolumeValue: '',
      // 歌曲总时长
      dTime: '',
      // 图片路径
      imgUrl: '',
      // 按钮状态值
      status: 1,
      // 音量状态值
      isvolume: true,
      // 歌词详情页面展示
      isShowDetails: '',
      // 假时间
      fakeTime: '',
      // 当前时间 进度条百分比计算
      curretTime: '',
      // 判断可否更新进度百分比
      isProgressMove: false,
      // 音量条显示
      isShowVolume: false,

    }
  },
  computed: {

  },
  methods: {

    // 当前时间分为 假时间 和 真时间 拖动进度条的时候动假时间  拖动完毕才修改真时间  假时间通过歌曲总时间(秒) / 进度条百分比
    // 拖动完毕执行
    touchProgress () {
      this.$refs.audioControls.currentTime = this.curretTime
      this.isProgressMove = false
    },
    // 拖动过程执行
    changeProgress () {
      this.isProgressMove = true
      this.curretTime = Math.floor((this.$refs.audioControls.duration * (this.percent / 100)))
      this.fakeTime = this.timeFormat(this.curretTime)
    },
    // touchVolume () {
    //   this.$refs.audioControls.volume = this.volumeValue
    // },

    changeStatus () {
      // 列表循环
      if (this.status == 1) {
        this.status = 2
        // 单曲循环
      } else if (this.status == 2) {
        this.status = 3
        // 随机播放
      } else {
        this.status = 1
      }
    },
    handleBefore () {
      if (this.status == 1) {
        if (this.currentSongIndex === 0) {
          this.currentSongIndex = this.searchMusicList.length - 1
          const beforeSong = this.searchMusicList[this.currentSongIndex]
          this.playaudio(beforeSong)
        } else {
          const beforeSong = this.searchMusicList[this.currentSongIndex - 1]
          this.playaudio(beforeSong)
        }
      } else if (this.status == 2) {
        this.playaudio(this.currentSong)
      } else {
        const id = this.randomSong()
        this.playaudio(this.searchMusicList[id])
      }

    },
    handleNext () {
      if (this.status == 1) {
        if (this.currentSongIndex === this.searchMusicList.length - 1) {
          this.currentSongIndex = 0
          const NextSong = this.searchMusicList[this.currentSongIndex]
          this.playaudio(NextSong)
        } else {
          const NextSong = this.searchMusicList[this.currentSongIndex + 1]
          this.playaudio(NextSong)
        }
      } else if (this.status == 2) {
        this.playaudio(this.currentSong)
      } else {
        const id = this.randomSong()
        this.playaudio(this.searchMusicList[id])
      }
    },
    handlePlay () {
      if (this.isPlay) {
        this.isPlay = !this.isPlay
        this.$refs.audioControls.pause()
      } else {
        this.isPlay = !this.isPlay
        this.$refs.audioControls.play()
      }
    },
    stepCloseVolume () {
      this.beforeVolumeValue = this.volumeValue
      this.volumeValue = 0
    },
    stepOpenVolume () {
      if (this.beforeVolumeValue == 0) {
        this.volumeValue = 0.5
      } else {
        this.volumeValue = this.beforeVolumeValue
      }
    },
    // 获取搜索歌曲集合
    async getSearchMusicList () {
      if (this.keyword) {
        await AxiosBack.searchMusic(this.keyword, Date.now())
          .then(
            result => {
              if (result.status === 200) {
                const { songs } = result.data.result
                // 测试  歌曲列表
                localStorage.setItem('searchList', JSON.stringify(songs))
                this.initSearchMusicList(songs)
                MessageBack.normalBack('success', "搜索成功")
              }
            })
          .catch(
            err => {
              MessageBack.normalBack('error', '网络太拥挤!')
              console.log(err);
            })
      } else {
        MessageBack.normalBack('error', "请输入关键字")
      }
    },
    // 将搜索的歌曲放在数组里
    initSearchMusicList (songs) {
      this.searchMusicList = JSON.parse(localStorage.getItem('searchList')) || songs
      // 测试  歌词
      // this.lrcArray = JSON.parse(localStorage.getItem('testlrc'))
    },

    // 传入song 通过song.id查询歌曲 再把歌曲url给html元素
    async playaudio (song) {
      const getSongUrl = AxiosBack.getSongUrl(song.id, Date.now())
        .then(
          result => {
            if (result.status === 200) {
              const { data } = result.data
              this.handleSong(song, data)
            }
          })
        .catch(
          err => {
            console.log(err);
            return MessageBack.normalBack('warning', "网络太拥挤!")
          })
      // 获取歌词
      const getSongLrc = AxiosBack.getSongLrc(song.id, Date.now())
        .then(
          result => {
            const { lyric } = result.data.lrc
            // 测试  歌词显示
            // localStorage.setItem('SongLrc', JSON.stringify(lyric))
            // 处理歌词
            this.handleLrc(lyric)
          })
        .catch(
          err => {
            MessageBack.normalBack('warning', "获取歌词异常!")
            console.log(err);
          })
      // 获取歌曲详情
      const getSongDetail = AxiosBack.getSongDetail(song.id, Date.now())
        .then(
          res => {
            const { picUrl } = res.data.songs[0].al
            this.imgUrl = picUrl
          })
        .catch(
          err => {
            MessageBack.normalBack('warning', "获取歌曲详情异常!")
            console.log(err);
          })

      await getSongUrl;
      await getSongLrc;
      await getSongDetail

    },
    handleSong (song, data) {
      this.musicUrl = data[0]?.url
      this.isPlay = true
      // 调用查询当前歌曲的函数
      this.currentSongIndex = this.searchMusicList.findIndex(item => item.id === song.id)
      // 当前歌曲
      this.currentSong = song
      // 歌词时长跟踪
      this.dTime = this.timeFormat((this.currentSong.duration / 1000))
    },
    // 处理歌词
    handleLrc (lyric) {
      // JSON.parse(localStorage.getItem('SongLrc'))
      const notParseLrc = lyric
      const parseLrc = notParseLrc.split('\n')
      // 判断歌词是否存在 以便替换歌词
      if (this.lrcArray != []) this.lrcArray = []
      parseLrc.forEach(element => {
        const lrcdetails = element.split(']')
        // 转换时间
        const time = lrcdetails[0].substring(1).split(':')
        // 将时间转化为秒单位 
        const parseTime = +time[0] * 60 + +time[1]
        const lrcobj = {
          time: parseTime,
          words: lrcdetails[1]
        }
        this.lrcArray.push(lrcobj)
        // 测试 格式化歌词
        // localStorage.setItem('testlrc', JSON.stringify(this.lrcArray))
      });
    },
    // 歌词时长跟踪
    timeFormat (time) {
      let minute = Math.floor(time / 60)
      let second = Math.floor(time) - minute * 60
      if (minute <= 9) minute = "0" + minute
      if (second <= 9) second = "0" + second
      return minute + ":" + second
    },
    // 根据当前播放时间 查找当前歌词索引
    findCurrentLrcIndex () {
      for (let i = 0; i < this.lrcArray.length; i++) {
        if (this.$refs.audioControls.currentTime < this.lrcArray[i].time) {
          return i - 1
        }
      }
      return this.lrcArray.length - 2
    },
    // 根据当前播放时间查找当前歌词 计算偏移量
    findCurrentLrc () {
      this.currentLrcIndex = this.findCurrentLrcIndex()
      if (!this.isProgressMove) {
        this.percent = Math.floor((this.$refs.audioControls.currentTime / (this.currentSong.duration / 1000)) * 100)
        this.fakeTime = this.timeFormat(this.$refs.audioControls.currentTime)
      }
      if (this.isShowDetails) {
        this.offset = this.$refs.bigLrcUl.children[0].clientHeight * this.currentLrcIndex
        if (this.lrcCanMove)
          this.$refs.bigLrcUl.scrollTo({ top: `${this.offset}`, behavior: 'smooth' })
      } else {
        this.offset = this.$refs.smallLrcUl.children[0].clientHeight * this.currentLrcIndex
        this.$refs.smallLrcUl.scrollTo({ top: `${this.offset}`, behavior: 'smooth' })
      }

    },
    // 播放完  切换下一首
    playNext (val) {

      // playStyle(val)
      // 列表循环
      if (val == 1) {
        this.timeOutbar(this.playaudio(this.searchMusicList[this.currentSongIndex + 1]), 1000)
        // 单曲循环
      } else if (val == 2) {
        this.timeOutbar(this.playaudio(this.searchMusicList[this.currentSongIndex]), 1000)
        // 随机播放
      } else {
        const id = this.randomSong()
        this.timeOutbar(this.playaudio(this.searchMusicList[id]), 1000)
      }
    },
    timeOutbar (Object, time) {
      setTimeout(() => {
        Object
      }, time);
    },
    // 随机播放处理
    randomSong () {
      return Math.floor(Math.random() * (this.searchMusicList.length + 1))
    },
    // 双击歌词跳转
    skipLrc (lrc) {
      this.$refs.audioControls.currentTime = lrc.time
    },
    // 滚动检测
    artificiallyScroll (e) {
      const distance = e.target.scrollTop - this.offset
      if (distance <= -120 || distance >= 120) {
        this.lrcCanMove = false
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
          this.lrcCanMove = true
        }, 2000);
      }
    },

  },
  watch: {
    volumeValue: {
      handler () {
        this.volumeValue == 0 ? this.isvolume = false : this.isvolume = true
        this.$refs.audioControls.volume = this.volumeValue
      }
    }
  },
  mounted () {
    this.initSearchMusicList()
  },
}
</script>

<style scoped>
.music-box {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 66;
  background: rgb(54, 54, 59);
}

.client-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 20%;
  height: 90%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgb(29, 29, 29);
}

.close-musicBox {
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: #000;
}


.music-details {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 67;
  background-color: rgb(29, 29, 29);
  background-size: cover;

  .close-musicDetails {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    background: #000;
  }

  .big-lrc {
    position: absolute;
    top: 5%;
    right: 5%;
    width: 45%;
    height: 80%;
    overflow: scroll;
    background: rgb(43, 43, 43);
    color: #ffffff;

    &::-webkit-scrollbar {
      width: 0;
    }

    .big-lrcDetails {
      position: relative;
      width: 100%;
      height: 100%;
      user-select: none;
      text-align: center;
      transition: all .5s;
      overflow-y: scroll;

      & li:nth-child(1) {
        margin-top: 300px;
      }

      & li {
        height: 60px;
        line-height: 60px;
        transition: all .5s;
        overflow: hidden;
        font-size: 0.8em;
        font-weight: 600;
        font-style: italic;

        & span {
          display: block;
          transition: all .5s;
        }

      }

      &::-webkit-scrollbar {
        width: 0
      }
    }
  }

  .big-image {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 45%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;

    .img-details {
      width: 60%;
      height: 60%;
      border-radius: 50%;
      overflow: hidden;

      & img {
        width: 100%;
        height: 100%;
      }
    }
  }

}

.music-container {
  position: absolute;
  width: 80%;
  height: 90%;
  top: 0;
  right: 0;

  .search-bar {
    position: absolute;
    top: 1em;
    left: 1em;
    height: 5%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .el-input {
      width: 100%;

      & input {
        height: 25px;
      }
    }

    .el-button {
      position: absolute;
      width: 10px;
      height: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      right: 0;
      background: transparent;
      border: none;
    }
  }

  .song-ul {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 90%;
    user-select: none;
    text-align: center;
    overflow: scroll;

    & li {
      line-height: 60px;
    }

    &::-webkit-scrollbar {
      width: 0
    }
  }
}


.highLight {
  transform: scale(1.1);
  color: rgb(0, 0, 0);
}

.control-bar {
  position: absolute;
  bottom: 0;
  z-index: 67;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  background-color: rgb(29, 29, 29);

  .song-img {
    position: relative;
    left: 1em;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    .img-set {
      width: 4em;
      height: 90%;
      cursor: pointer;

      & img:not([src]) {
        opacity: 0;
      }

      & img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }

    .song-name {
      width: 86%;
      height: 100%;
      color: rgb(166, 166, 166);

      .name-space {
        width: 100%;
        height: 50%;
        margin-left: 5px;
        white-space: nowrap;
        overflow: hidden;
        font-size: 1.1em;
        font-weight: 600;
        font-style: italic;
      }

      .artist-space {
        width: 100%;
        height: 50%;
        margin-left: 5px;
        white-space: nowrap;
        overflow: hidden;
        font-size: 0.9em;
        font-weight: 550;
        font-style: italic;
      }
    }


  }

  .song-collection {
    width: 30%;
  }

  .progress-control {
    display: flex;
    width: 40%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: rgb(166, 166, 166);

    .song-control {
      position: relative;
      width: 100%;
      height: 40%;
      display: flex;
      justify-content: center;

      .normal-set {
        display: flex;
        align-items: center;
      }

      .volume-control {
        position: relative;
        display: flex;
        align-items: center;

        .volume-set {
          position: absolute;
          left: 2.2em;
          width: 6em;
          height: 0.4em;

        }
      }

      & i {
        cursor: pointer;
        margin: 2px 8px;
        user-select: none;
        transition: .5s;

        &:nth-child(5),
        &:nth-child(6) {
          font-size: 1.2em;
        }

        &:not(:nth-child(5), :nth-child(6)) {
          font-size: 1em;
          transform: scale(0.8);
        }
      }

      & i:hover {
        transform: scale(1.2);
      }
    }

    .progress-bar {
      position: relative;
      width: 100%;
      height: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      user-select: none;

      .music-bar {
        flex: 1;
        width: 80%;
        height: 1.2em;
        display: flex;
        align-items: center;

        .show-bar {
          width: 100%;
          height: 0.4em;
          border-radius: 25px;
          margin: 0 0.5em;
        }

        .c-time,
        .d-time {
          font-size: 0.8em;
        }
      }

      .small-lrc {
        flex: 1;
        width: 80%;
        height: 1.2em;
        text-align: center;

        .lrc-ul {
          font-size: 0.6em;
          line-height: 20px;
          height: 20px;
          transition: all .5s;
          overflow: hidden;
        }
      }
    }
  }
}

.details-enter-active,
.details-leave-active {
  transition: all .6s;
}

.details-enter,
.details-leave-to {
  transform: translatey(500px);
  opacity: 0;
}

.small-enter-active,
.small-leave-active {
  transition: all .6s;
}

.small-enter,
.small-leave-to {
  opacity: 0;
}
</style>