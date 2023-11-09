<template>
  <div class="home-container">
    <!-- 音乐泡 -->
    <div class="music-control" @click="isShowMusicBox = true"></div>

    <transition name="music">
      <MusicList v-show="isShowMusicBox" :closeMusicBox="closeMusicBox"></MusicList>
    </transition>









    <!-- 顶部栏 -->
    <div class="top-container">
      <!-- 顶部左边栏 -->
      <div class="public-nav">
        <!-- <router-link class="client-item" :to="{ name: 'musiclist' }">
          <span>音乐</span>
        </router-link> -->
        <router-link class="client-item" :to="{ name: 'main' }">
          <span>主页</span>
        </router-link>

      </div>
      <!-- 顶部右边栏 -->
      <div class="client-nav">
        <router-link class="client-item" :to="{ name: 'todolist' }">
          <span>备忘录</span>
        </router-link>
        <router-link class="client-item" :to="{ name: 'userlist' }">
          <span>列表管理</span>
        </router-link>
        <div class="client-item">
          <!-- 登陆前 -->
          <a @click="toggleL_R" v-if="!isLogin">
            <span>去登陆</span>
          </a>
          <!-- 登陆后 -->
          <a v-if="isLogin">
            <span>{{ userinfo.username }}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="main-container">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view v-if="isChildrenRouterAlive"></router-view>
        </keep-alive>
      </transition>
    </div>
    <transition name="login">
      <WrapperPage v-show="isWrapper" :showWrapper="showWrapper"></WrapperPage>
    </transition>
  </div>
</template>

<script>
import MusicList from '@/components/MusicList.vue';
import WrapperPage from '@/layout/WrapperPage.vue'
import { MessageBack } from '@/utils/MessageBack';
export default {
  name: 'MyHome',
  // provide & inject
  inject: ['reload'],
  provide () {
    return {
      childrenRouterRefresh: this.childrenRouterRefresh
    }
  },
  data () {
    return {
      isLogin: false,
      isWrapper: '',
      isChildrenRouterAlive: true,
      isShowMusicBox: false,


      //#region 
      // keyword: '',
      // musicUrl: '',
      // // 展示当前歌曲
      // currentSong: '',
      // currentSongIndex: '',
      // searchMusicList: [],
      // lrcArray: [],
      // // 展示当前歌词  高亮显示判断
      // currentLrcIndex: '',
      // isPlay: false,
      // lrcCanMove: true,
      // timeOut: '',
      // timeInter: '',
      // offset: '',
      // percent: '',
      // dTime: '',
      // cTime: '',
      // imgUrl: '',
      // status: 1,
      // isvolume: true,
      //#endregion
    };
  },
  components: { WrapperPage, MusicList },
  methods: {





    // changeStatus () {
    //   // 列表循环
    //   if (this.status == 1) {
    //     this.status = 2
    //     // 单曲循环
    //   } else if (this.status == 2) {
    //     this.status = 3
    //     // 随机播放
    //   } else {
    //     this.status = 1
    //   }
    // },
    // handleBefore () {
    //   if (this.status == 1) {
    //     if (this.currentSongIndex === 0) {
    //       this.currentSongIndex = this.searchMusicList.length - 1
    //       const beforeSong = this.searchMusicList[this.currentSongIndex]
    //       this.playaudio(beforeSong)
    //     } else {
    //       const beforeSong = this.searchMusicList[this.currentSongIndex - 1]
    //       this.playaudio(beforeSong)
    //     }
    //   } else if (this.status == 2) {
    //     this.playaudio(this.currentSong)
    //   } else {
    //     const id = this.randomSong()
    //     this.playaudio(this.searchMusicList[id])
    //   }

    // },
    // handleNext () {
    //   if (this.status == 1) {
    //     if (this.currentSongIndex === this.searchMusicList.length - 1) {
    //       this.currentSongIndex = 0
    //       const NextSong = this.searchMusicList[this.currentSongIndex]
    //       this.playaudio(NextSong)
    //     } else {
    //       const NextSong = this.searchMusicList[this.currentSongIndex + 1]
    //       this.playaudio(NextSong)
    //     }
    //   } else if (this.status == 2) {
    //     this.playaudio(this.currentSong)
    //   } else {
    //     const id = this.randomSong()
    //     this.playaudio(this.searchMusicList[id])
    //   }
    // },
    // handlePlay () {
    //   if (this.isPlay) {
    //     this.isPlay = !this.isPlay
    //     this.currentTime()
    //     this.$refs.audioControls.pause()
    //   } else {
    //     this.isPlay = !this.isPlay
    //     this.currentTime()
    //     this.$refs.audioControls.play()
    //   }
    // },
    // // 获取搜索歌曲集合
    // async getSearchMusicList () {
    //   if (this.keyword) {
    //     await AxiosBack.searchMusic(this.keyword, Date.now())
    //       .then(
    //         result => {
    //           if (result.status === 200) {
    //             const { songs } = result.data.result
    //             // 测试  歌曲列表
    //             localStorage.setItem('searchList', JSON.stringify(songs))
    //             this.initSearchMusicList(songs)
    //             MessageBack.normalBack('success', "搜索成功")
    //           }
    //         })
    //       .catch(
    //         err => {
    //           MessageBack.normalBack('error', '网络太拥挤!')
    //           console.log(err);
    //         })
    //   } else {
    //     MessageBack.normalBack('error', "请输入关键字")
    //   }
    // },
    // // 将搜索的歌曲放在数组里
    // initSearchMusicList (songs) {
    //   this.searchMusicList = JSON.parse(localStorage.getItem('searchList')) || songs
    //   // 测试  歌词
    //   this.lrcArray = JSON.parse(localStorage.getItem('testlrc'))
    // },

    // // 传入song 通过song.id查询歌曲 再把歌曲url给html元素
    // async playaudio (song) {
    //   await AxiosBack.getSongUrl(song.id, Date.now())
    //     .then(
    //       result => {
    //         if (result.status === 200) {
    //           const { data } = result.data
    //           this.musicUrl = data[0]?.url
    //           this.isPlay = true
    //           // 调节初始音量
    //           this.$refs.audioControls.volume = 0.2
    //           // 调用查询当前歌曲的函数
    //           this.currentSongIndex = this.searchMusicList.findIndex(item => item.id === song.id)
    //           // 当前歌曲
    //           this.currentSong = song
    //           // 歌词时长跟踪
    //           this.totalTime()
    //           // 歌曲进度时长处理
    //           this.currentTime()
    //         }
    //       })
    //     .catch(
    //       err => {
    //         console.log(err);
    //         MessageBack.normalBack('error', "网络太拥挤!")
    //       })
    //   // 获取歌词
    //   await AxiosBack.getSongLrc(song.id, Date.now())
    //     .then(
    //       result => {
    //         const { lyric } = result.data.lrc
    //         // 测试  歌词显示
    //         localStorage.setItem('SongLrc', JSON.stringify(lyric))
    //         // 处理歌词
    //         this.handleLrc(lyric)
    //       })
    //     .catch(
    //       err => {
    //         MessageBack.normalBack('warning', "获取歌词异常!")
    //         console.log(err);
    //       })
    //   // 获取歌曲详情
    //   await AxiosBack.getSongDetail(song.id, Date.now())
    //     .then(
    //       res => {
    //         console.log(res);
    //         const { picUrl } = res.data.songs[0].al
    //         this.imgUrl = picUrl
    //       }
    //     )
    //     .catch(
    //       err => {
    //         MessageBack.normalBack('warning', "获取歌曲详情异常!")
    //         console.log(err);
    //       }
    //     )
    // },
    // // 处理歌词
    // handleLrc (lyric) {
    //   const notParseLrc = JSON.parse(localStorage.getItem('SongLrc')) || lyric
    //   const parseLrc = notParseLrc.split('\n')
    //   // 判断歌词是否存在 以便替换歌词
    //   if (this.lrcArray != []) this.lrcArray = []
    //   parseLrc.forEach(element => {
    //     const lrcdetails = element.split(']')
    //     // 转换时间
    //     const time = lrcdetails[0].substring(1).split(':')
    //     // 将时间转化为秒单位 
    //     const parseTime = +time[0] * 60 + +time[1]
    //     const lrcobj = {
    //       time: parseTime,
    //       words: lrcdetails[1]
    //     }
    //     this.lrcArray.push(lrcobj)
    //     // 测试 格式化歌词
    //     localStorage.setItem('testlrc', JSON.stringify(this.lrcArray))
    //   });
    // },
    // // 歌词总时长处理
    // totalTime () {
    //   this.dTime = this.timeFormat((this.currentSong.duration / 1000))
    // },
    // // 歌曲进度时长处理
    // currentTime () {
    //   // 函数防抖  每一秒执行一次  否则使用timeupdate 太耗费性能
    //   if (this.isPlay) {
    //     clearInterval(this.timeInter)
    //     this.timeInter = setInterval(() => {
    //       this.cTime = this.timeFormat(this.$refs.audioControls.currentTime)
    //       this.percent = Math.floor((this.$refs.audioControls.currentTime / (this.currentSong.duration / 1000)) * 1000) / 10
    //     }, 1000);
    //   } else {
    //     clearInterval(this.timeInter)
    //   }
    // },
    // // 歌词时长跟踪
    // timeFormat (time) {
    //   let minute = Math.floor(time / 60)
    //   let second = Math.floor(time) - minute * 60
    //   if (minute <= 9) minute = "0" + minute
    //   if (second <= 9) second = "0" + second
    //   return minute + ":" + second
    // },
    // // 根据当前播放时间 查找当前歌词索引
    // findCurrentLrcIndex () {
    //   for (let i = 0; i < this.lrcArray.length; i++) {
    //     if (this.$refs.audioControls.currentTime < this.lrcArray[i].time) {
    //       return i - 1
    //     }
    //   }
    //   return this.lrcArray.length - 2
    // },
    // // 根据当前播放时间查找当前歌词 计算偏移量
    // findCurrentLrc () {
    //   this.currentLrcIndex = this.findCurrentLrcIndex()
    //   this.offset = this.$refs.lrcUl.children[0].clientHeight * this.currentLrcIndex
    //   if (this.lrcCanMove)
    //     this.$refs.lrcUl.scrollTo({ top: `${this.offset}`, behavior: 'smooth' })
    // },
    // // 播放完  切换下一首
    // playNext () {
    //   // 列表循环
    //   if (this.status == 1) {
    //     this.timeOutbar(this.playaudio(this.searchMusicList[this.currentSongIndex + 1]), 1000)
    //     // 单曲循环
    //   } else if (this.status == 2) {
    //     this.timeOutbar(this.playaudio(this.searchMusicList[this.currentSongIndex]), 1000)
    //     // 随机播放
    //   } else {
    //     const id = this.randomSong()
    //     this.timeOutbar(this.playaudio(this.searchMusicList[id]), 1000)
    //   }
    // },
    // timeOutbar (Object, time) {
    //   setTimeout(() => {
    //     Object
    //   }, time);
    // },
    // // 随机播放处理
    // randomSong () {
    //   return Math.floor(Math.random() * 31)
    // },
    // // 双击歌词跳转
    // skipLrc (lrc) {
    //   this.$refs.audioControls.currentTime = lrc.time
    // },
    // // 滚动检测
    // artificiallyScroll (e) {
    //   const distance = e.target.scrollTop - this.offset
    //   if (distance <= -120 || distance >= 120) {
    //     this.lrcCanMove = false
    //     clearTimeout(this.timeOut)
    //     this.timeOut = setTimeout(() => {
    //       this.lrcCanMove = true
    //     }, 2000);
    //   }
    // },















    toggleL_R () {
      this.isWrapper = true
    },
    toUserList () {
      this.$router.push('userlist');
    },
    logout () {
      //弹框确认
      this.$confirm('确定要登出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('userinfo-save');
        MessageBack.normalBack('success', '登出成功')
        this.reload();
      }).catch(() => {
        MessageBack.normalBack('info', '取消登出')
      });
    },
    showWrapper (data) {
      this.isWrapper = data
    },
    closeMusicBox (data) {
      this.isShowMusicBox = data
    },
    childrenRouterRefresh () {
      this.isChildrenRouterAlive = false
      this.$nextTick(() => { this.isChildrenRouterAlive = true })
    }
  },
  mounted () {
    // 读取userinfo
    if (!this.userinfo) {
      this.userinfo = JSON.parse(localStorage.getItem('userinfo-save')) || '';
      if (this.userinfo.token) {
        this.isLogin = true;
      }
    }
  },
}
</script>

<style scoped>
/* .music-box {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 66;
  background-color: #00f2fe;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.music-container {
  position: absolute;
  width: 88%;
  height: 85%;
  right: 0;
  display: flex;
  justify-content: space-around;
}

.song-ul {
  position: relative;
  width: 40%;
  height: 100%;
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

.lrc-ul {
  position: relative;
  width: 60%;
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
    font-size: 1em;
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

.highLight {
  transform: scale(1.2);
  color: rgb(255, 255, 255);
}

.top-bar {
  position: relative;
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.search-bar {
  position: relative;
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & .el-input {
    width: 100%;
    position: relative;

    & input {
      height: 30px;
    }
  }

  & .el-button {
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

.control-bar {
  position: absolute;
  bottom: 0;
  background: #ffffff;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;

  .song-img {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    .img-set {
      width: 14%;
      height: 100%;
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
    background: #a35b5b;
  }

  .progress-control {
    display: flex;
    width: 40%;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .song-control {
      position: relative;
      width: 100%;
      height: 60%;
      display: flex;
      justify-content: center;

      & i {
        cursor: pointer;
        margin: 8px;
        user-select: none;
        transition: .5s;

        &:nth-child(5),
        &:nth-child(6) {
          font-size: 1.3em;
          transform: scale(1.4);
        }

        &:not(:nth-child(5), :nth-child(6)) {
          font-size: 1.2em;
          transform: scale(1.2);
        }
      }

      & i:hover {
        transform: scale(1.6);
      }
    }

    .progress-bar {
      position: relative;
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      user-select: none;

      .music-bar {
        width: 80%;
        height: 5px;
        border-radius: 25px;
        background: #c7d8df;
        cursor: pointer;

        .show-bar {
          width: 0;
          height: 100%;
          border-radius: 25px;
          background: #36b1e6;
        }
      }

      .c-time,
      .d-time {
        position: relative;
      }
    }
  }

  & audio {
    width: 100%;
    height: 100%;
  }
} */









.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}

.music-control {
  position: absolute;
  inset: 50% 0 0 -20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(194, 216, 232, 1);
  z-index: 55;
}

.top-container {
  position: relative;
  width: 100%;
  height: 10%;
  min-height: 64px;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: space-around;
  background: linear-gradient(120deg, #8ec5fc 0%, #e0c3fc 100%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.client-nav {
  position: absolute;
  width: 40%;
  height: 100%;
  right: 60px;
  display: flex;
  align-items: center;
}

.client-item {
  position: relative;
  width: 100px;
  height: 100%;
  border: none;
  border-radius: 5px;
  margin: 6px;
  color: #736e79;
  min-width: 60px;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.client-item:hover {
  box-shadow: 0 0 3px 5px #7db9f5;
}

.client-item::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 3px;
  bottom: 0;
  border-radius: 5px;
  transition: transform .5s;
  transform: scaleX(0);
  transform-origin: right;
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
}

.client-item:hover::after {
  transform-origin: left;
  transform: scaleX(1);
}

.client-item.router-link-active::after {
  transform: scaleX(1);
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}

.public-nav {
  position: absolute;
  width: 40%;
  height: 100%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* position: absolute;
  top: 10%;
  width: 60px;
  min-width: 40px;
  height: 90%;
  display: flex;
  z-index: 2;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0 0 30px 5px #8ec5fc;
  text-overflow: ellipsis;
  transition: all .3s;
  background: linear-gradient(120deg, #8ec5fc 0%, #e0c3fc 100%); */
}

/* 
.public-nav:hover {
  width: 130px;
  box-shadow: 0 0 50px 4px #4facfe;
}

.public-nav:hover span {
  opacity: 1;
}

.avatar,
.actions {
  position: relative;
  width: inherit;

}

.nav-item {
  display: block;
  position: relative;
  width: 90%;
  height: 70px;
  margin: 9px;
  border-radius: 6px;
  color: #3b869b;
  transition: all .3s;
}

.nav-item:hover {
  box-shadow: 0 0 3px 3px #7db9f5;
}

.nav-item::before {
  content: '';
  display: inline-block;
  position: absolute;
  width: 3px;
  height: 86%;
  right: -5px;
  top: 5px;
  transform: scaleY(0);
  border-radius: 5px;
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  transform-origin: bottom;
  transition: transform .4s;
}

.nav-item:hover::before {
  transform-origin: top;
  transform: scaleY(1);
}

.actions .nav-item.router-link-active::before,
.avatar .nav-item.router-link-active::before {
  transform: scale(1);
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}

.nav-item:hover i {
  transform: scale(1.1) rotateY(180deg);
}

.actions .nav-item:hover i:nth-child(1) {
  transform: rotate(180deg);
}

.nav-item i {
  font-size: 30px;
  position: absolute;
  margin: 20px 0 0 5px;
  transition: all .3s;
  color: #736e79;
}

.avatar .nav-item:nth-child(1)::after,
.avatar .nav-item:nth-child(6)::after {
  content: '';
  position: absolute;
  display: block;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  width: 96%;
  height: 3px;
  bottom: -6px;
  left: -5px;
} */

.main-container {
  position: relative;
  width: 100%;
  height: 90%;
  overflow: auto;
  transition: all .4s;

}

.main-container::-webkit-scrollbar {
  width: 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}


.login-enter-active,
.login-leave-active {
  transition: all .4s ease-in-out;
}

.login-enter,
.login-leave-to {
  transform: scale(0) skew(60deg, 20deg);
}

.music-enter-active,
.music-leave-active {
  transition: all .6s;
}

.music-enter,
.music-leave-to {
  transform: translateX(-500px);
  opacity: 0;
}
</style>