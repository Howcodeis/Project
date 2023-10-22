<template>
  <div class="music-container">
    <div class="control-bar">
      <div class="song-img"></div>
      <div class="song-control">
        <div class="progress-bar"></div>
        <div class="progress-control">
          <el-button size="small" circle @click="handleBefore">
            <i class="el-icon-d-arrow-left"></i>
          </el-button>
          <el-button v-show="isPlay" size="small" circle @click="handlePlay">
            <i class="el-icon-video-pause"></i>
          </el-button>
          <el-button v-show="!isPlay" size="small" circle @click="handlePlay">
            <i class="el-icon-video-play"></i>
          </el-button>

          <el-button size="small" circle @click="handleNext">
            <i class="el-icon-d-arrow-right"></i>
          </el-button>
        </div>
      </div>
      <div class="song-collection"></div>
      <audio id="music" ref="audioControls" autoplay :src="musicUrl" @timeupdate="lrcMove" @ended="playNext"></audio>
    </div>

    <div class="top-bar">
      <p>当前歌词: {{ lrcArray[currentLrcIndex]?.words }}</p>
      <div class="client bar">
        <el-button>当前歌曲: {{ currentSong.name }}</el-button>
      </div>

      <div class="search-bar">
        <el-input type="text" v-model="keyword" @keydown.native.enter="getSearchMusicList">
        </el-input>
        <el-button circle icon="el-icon-search" @click="getSearchMusicList"></el-button>
      </div>


    </div>

    <div class="music-list">
      <ul class="song-ul">
        <li v-for="single in searchMusicList" @dblclick="playaudio(single)" :key="single.id">{{ single.name }} -- {{
          single.artists[0].name }}</li>
      </ul>
      <div class="lrc-ul-container">
        <ul class="lrc-ul" ref="lrcUl">
          <li v-for="(lrc, index) in  lrcArray " :key="index" ref="lrcLi">
            <span :class="[currentLrcIndex === index ? 'highLight' : '']">
              {{ lrc.words ? lrc.words : '\xa0' }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 问题:
 * 1.列表更换后存在播放下一首参数索引问题   判断索引是否大于当前数组长度  排序后重新计算
 * 2.切换路由播放停止
 * 3.歌词上移动后无法滑上去
 * 4.歌手有的是多个
 * 
 */
import { AxiosBack } from '@/utils/AxiosBack'
import { MessageBack } from '@/utils/MessageBack'
export default {
  name: 'myMusic',
  inject: ['childrenRouterRefresh'],
  data () {
    return {
      keyword: '',
      musicUrl: '',
      // 展示当前歌曲
      currentSong: '',
      currentSongIndex: '',
      searchMusicList: [],
      lrcArray: [],
      // 展示当前歌词  高亮显示判断
      currentLrcIndex: '',
      isPlay: false
    }
  },
  methods: {
    handleBefore () {
      if (this.currentSongIndex === 0) {
        this.currentSongIndex = this.searchMusicList.length - 1
        const beforeSong = this.searchMusicList[this.currentSongIndex]
        this.playaudio(beforeSong)
      } else {
        const beforeSong = this.searchMusicList[this.currentSongIndex - 1]
        this.playaudio(beforeSong)
      }
    },
    handleNext () {
      if (this.currentSongIndex === this.searchMusicList.length - 1) {
        this.currentSongIndex = 0
        const NextSong = this.searchMusicList[this.currentSongIndex]
        this.playaudio(NextSong)
      } else {
        const NextSong = this.searchMusicList[this.currentSongIndex + 1]
        this.playaudio(NextSong)
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
    // 获取搜索歌曲集合
    getSearchMusicList () {
      if (this.keyword) {
        AxiosBack.searchMusic(this.keyword, Date.now()).then((result) => {
          if (result.status === 200) {
            const { songs } = result.data.result
            // 测试  歌曲列表
            localStorage.setItem('searchList', JSON.stringify(songs))
            this.initSearchMusicList(songs)
            MessageBack.normalBack('success', "搜索成功")
          }
        }).catch(() => {
          MessageBack.normalBack('error', '网络太拥挤!')
        });
      } else {
        MessageBack.normalBack('error', "请输入关键字")
      }
    },
    // 将搜索的歌曲放在数组里
    initSearchMusicList (songs) {
      this.searchMusicList = JSON.parse(localStorage.getItem('searchList')) || songs
      // 测试  歌词
      this.lrcArray = JSON.parse(localStorage.getItem('testlrc'))
    },

    // 传入song 通过song.id查询歌曲 再把歌曲url给html元素
    playaudio (song) {
      AxiosBack.getSongUrl(song.id, Date.now()).then((result) => {
        if (result.status === 200) {
          const { data } = result.data
          this.musicUrl = data[0].url
          this.isPlay = true
          // 调节初始音量
          this.$refs.audioControls.volume = 0.2
          // 调用查询当前歌曲的函数
          this.findCurrentSongIndex(song.id)
          // 获取歌词
          this.findSongLrc(song.id)
          // 当前歌曲
          this.currentSong = song
        }
      }).catch((err) => {
        console.log(err);
        MessageBack.normalBack('error', "网络太拥挤!")
      });
    },
    // 查询歌曲歌词
    findSongLrc (id) {
      AxiosBack.getSongLrc(id, Date.now()).then((result) => {
        const { lyric } = result.data.lrc
        // 测试  歌词显示
        localStorage.setItem('SongLrc', JSON.stringify(lyric))
        // 处理歌词
        this.handleLrc(lyric)
      }).catch((err) => {
        MessageBack.normalBack('warning', "服务器异常!")
        console.log(err);
      });
    },
    // 处理歌词
    handleLrc (lyric) {
      const notParseLrc = JSON.parse(localStorage.getItem('SongLrc')) || lyric
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
        localStorage.setItem('testlrc', JSON.stringify(this.lrcArray))
      });
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
      let offset = this.$refs.lrcUl.children[0].clientHeight * this.currentLrcIndex
      // let startOffset = 5 * this.$refs.lrcUl.children[0].clientHeight
      // let lrcOffset = offset - startOffset
      // if (offset = startOffset)
      this.$refs.lrcUl.scrollTo({ top: `${offset}`, behavior: 'smooth' })
    },
    lrcMove () {
      this.findCurrentLrc()
    },
    // 查找当前歌曲索引
    findCurrentSongIndex (id) {
      this.currentSongIndex = this.searchMusicList.findIndex(item => item.id === id)
      console.log(this.currentSongIndex);
    },
    // 播放完  切换下一首
    playNext () {
      setTimeout(() => {
        this.playaudio(this.searchMusicList[this.currentSongIndex + 1])
      }, 1000)
      MessageBack.normalBack('info', "播放完毕")
    }
  },
  mounted () {
    this.initSearchMusicList()
  },
}
</script>

<style scoped>
.music-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.music-list {
  position: absolute;
  width: 88%;
  height: 85%;
  right: 0;
  display: flex;

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

.lrc-ul-container {
  position: relative;
  width: 60%;
  height: 100%;

  .lrc-ul {
    height: 55%;
    padding-top: 300px;
    user-select: none;
    text-align: center;
    transition: all .5s;
    overflow: scroll;

    & li {
      height: 60px;
      line-height: 60px;
      transition: all .5s;
      overflow: hidden;
      font-size: 0.9em;

      & span {
        display: block;
        transition: all .5s;
      }

    }
  }
}

.highLight {
  /* font-size: 20px; */
  transform: scale(1.2);
  color: #8e28c9;
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

  .song-img,
  .song-collection {
    flex: 1;
    background: #a35b5b;
  }

  .song-control {
    flex: 4;

    .progress-control {
      display: flex;
      justify-content: center;

      .el-button:not(:nth-child(2)) {
        border: none;
      }

      & i {
        font-size: 16px;
      }
    }
  }

  & audio {
    width: 100%;
    height: 100%;
  }
}
</style>