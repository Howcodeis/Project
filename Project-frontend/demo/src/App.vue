<template>
  <div id="app">
    <!-- ended 歌曲或视频结束调用函数 -->
    <audio :src=musicList() ref="music" loop></audio>
    <keep-alive include='music'>
      <router-view v-if="isRouterAlive">
      </router-view>
    </keep-alive>
  </div>
</template>

<script>
import { getSentence } from '@/utils/FamousSentence'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    const musicList = () => {
      return new URL('@/assets/music/Self Love.wav', import.meta.url).href
    }
    return {
      isRouterAlive: true,
      musicList
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => { this.isRouterAlive = true })
    },
    playMusic (data) {
      if (data) {
        this.$refs.music.play()
        this.$refs.music.volume = 0.1
      } else {
        this.$refs.music.pause()
      }
    },
  },
  mounted () {
    this.$bus.$on('toplay', this.playMusic)
    getSentence().then((result) => {
      const { hitokoto } = result.data
      this.$store.commit('SentenceAbout/setSentence', hitokoto)
    }).catch((err) => {
      console.log(err);
    });
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
}

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  min-width: 720px;
  min-height: 770px;
}

::-webkit-scrollbar {
  width: 1px;
}
::-webkit-scrollbar-thumb {
  background: #898989;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background: gray;
}
</style>
