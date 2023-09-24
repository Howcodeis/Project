<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
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
    return {
      isRouterAlive: true,
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
* {
  padding: 0;
  margin: 0;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: gray;
}
</style>
