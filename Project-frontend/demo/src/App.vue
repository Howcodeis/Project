<template>
  <div id="app">
    <HomePage>
      <router-view v-if="isRouterAlive">
      </router-view>
    </HomePage>
  </div>
</template>

<script>
// import { getSentence } from '@/utils/FamousSentence'
import HomePage from './components/HomePage.vue'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  components: { HomePage },
  data () {
    const musicList = () => {
      return new URL('@/assets/music/Self Love.wav', import.meta.url).href
    }
    return {
      isRouterAlive: true,
      musicList,
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => { this.isRouterAlive = true })
    },
  },
}
</script>

<style>
@import url("./assets/iconfont/iconfont.css");

:root {
  --white-gray: linear-gradient(to top, #6a85b6 0%, #bac8e0 100%);
  --deep-blue: linear-gradient(to top, #a3bded 0%, #6991c7 100%);
}

* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
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
