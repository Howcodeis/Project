<template>
  <div class="musicbox">
    <div class="musicplay">
      <ul>
        <li>
          <el-button id="music" round size="medium" @click="controlMusic">{{ text || '点击播放' }}</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myMusic',
  data () {
    return {
      isPlay: false,
      text: null
    }
  },
  methods: {
    controlMusic () {
      this.isPlay = !this.isPlay
      this.isPlay ? this.text = "pause" : this.text = "play"
      this.$bus.$emit('toplay', this.isPlay)
    }
  },
}
</script>

<style scoped>
.musicbox {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.musicplay {
  position: relative;
}

li {
  list-style: none;
}
</style>