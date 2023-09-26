<template>
  <div class="BigBox">
    <!-- 顶部栏 -->
    <div class="topcontent">
      <div class="topnav">
        <button>
          <router-link :to="{ name: 'todos' }">
            <i class="el-icon-tickets">备忘录</i>
          </router-link>
        </button>
        <button>
          <router-link :to="{ name: 'music' }">
            <i class="el-icon-service">音乐</i>
          </router-link>
        </button>
        <button>
          <router-link :to="{ name: 'user' }">
            <i class="el-icon-user">用户</i>
          </router-link>
        </button>
        <button>
          <router-link :to="{ name: 'userinfo' }">
            <i class="el-icon-setting">用户信息</i>
          </router-link>
        </button>
      </div>
    </div>
    <div class="sidernav">
      <!-- 头像部分 -->
      <button class="avatar" @click="tologinandregister" v-if="isLogin">
        <img src="../assets/logo.png" alt="error" />
        <br />
        <span style="text-align: center">请登录</span>
      </button>
      <button class="avatar-login" v-if="!isLogin">
        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="error" />
        <br />
        <span style="text-align: center">{{ userinfo.username }}</span>
        <div class="userinfo">
          <a href="#">setting</a>
        </div>
        <div class="logout" @click="logout">
          <a href="#">logout</a>
        </div>
      </button>
    </div>
    <div class="rightcontent">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="footercontent">
      <!-- ended 歌曲或视频结束调用函数 -->
      <audio :src="musicUrl" ref="playmusic" autoplay muted @ended="autofinished"></audio>
    </div>
  </div>
</template>

<script>
import todos from '@/views/todos.vue';
export default {
  components: { todos },
  name: 'MyHome',
  // provide & inject
  inject: ['reload'],
  data () {
    return {
      isLogin: true,
      isShowcont: false,
      bgmId: Math.floor(Math.random() * 5),
      musicList: [
        // require('@/assets/music/Kiki.mp3'),
        // require('@/assets/music/Moonlight.mp3'),
        // require("@/assets/music/You're My Everything.mp3"),
        // require("@/assets/music/That Summer.mp3"),
        // require("@/assets/music/Self Love伴奏.wav")
      ],
      userinfo: ''
    }
  },
  methods: {
    tologinandregister () {
      this.$router.push('mask').catch(err => {
        console.log(err);
      })
    },
    touserconfg () {
      this.$router.push('userinfo')
    },

    logout () {
      localStorage.removeItem('userinfo')
      window.location.reload()
    },
    autofinished () {
      this.bgmId = Math.floor(Math.random() * 5)
    },
  },
  computed: {
    musicUrl () {
      return this.musicList[this.bgmId]
    }
  },
  mounted () {
    // 全局总线事件
    // this.$bus.$on('login',token)
    this.$refs.playmusic.volume = 0.05
    // 读取userinfo
    this.userinfo = JSON.parse(localStorage.getItem('userinfo')) || ''
    if (this.userinfo.token) {
      this.isLogin = false
    }
  },
}
</script>

<style scoped>
.BigBox {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-size: cover;
  min-width: 600px;
  background-color: #303049;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 3s ease;
}

.fade-enter-to,
.fade-leave {
  visibility: visible;
  opacity: 1;
}

.fade-enter {
  visibility: hidden;
  opacity: 0;
}
.fade-leave-to {
  display: none;
}

.topnav {
  width: 60%;
  height: 100%;
  inset: 0 0 0 30%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topnav button {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  transition: all 0.3s;
}
.topnav button:hover {
  background: #b3bdcd;
  border-bottom: #2404f1 2px solid;
}

.topnav button a {
  height: 100%;
  color: rgb(96, 96, 94);
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

/* .LeftNav {
  position: absolute;
  top: 10%;
  width: 15%;
  height: 90%;
  user-select: none;
  transition: all 0.6s;
  overflow: hidden;
}
.LeftNav .nav:nth-child(1) {
  border-top: 1px rgb(211, 211, 211) solid;
}
.LeftNav:hover {
  user-select: none;
  opacity: 1;
  background: rgba(169, 166, 166, 0.2);
} */

.rightcontent {
  position: absolute;
  top: 10%;
  left: 16%;
  width: 80%;
  height: 90%;
  color: #ffffff;
}

.topcontent {
  position: relative;
  width: 85%;
  height: 10%;
  top: 0;
  left: 15%;
  user-select: none;
}
.footercontent {
  width: 100px;
}
</style>