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
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    const musicList = () => {
      return new URL('./assets/music/Kiki.mp3', import.meta.url).href
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
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  width: 1px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: gray;
}
</style>
