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
      <!-- 登陆前 -->
      <button class="avatar" @click="toggleL_R" v-if="isLogin">
        <img src="../assets/logo.png" alt="error" />
        <br />
        <span style="text-align: center">请登录</span>
      </button>
      <!-- 登陆后 -->
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
  </div>
</template>

<script>
export default {
  name: 'MyHome',
  // provide & inject
  inject: ['reload'],
  data () {
    return {
      isLogin: true,
      userinfo: ''
    }
  },
  methods: {
    toggleL_R () {
      this.$router.push('mask').catch(err => {
        console.log(err);
      })
    }
    ,
    toUserConfig () {
      this.$router.push('userinfo')
    },

    logout () {
      localStorage.removeItem('userinfo')
      window.location.reload()
    },
  },
  mounted () {
    // 读取userinfo
    if (!this.userinfo) {
      this.userinfo = JSON.parse(localStorage.getItem('userinfo')) || ''
      if (this.userinfo.token) {
        this.isLogin = false
      }
    }
  },
}
</script>

<style scoped>
.BigBox {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  min-width: 600px;
  min-height: 600px;
  background-color: #303049;
}

.topcontent {
  position: relative;
  width: 85%;
  height: 10%;
  top: 0;
  left: 15%;
  user-select: none;
  display: flex;
}

.topnav {
  position: absolute;
  width: 30%;
  height: 60px;
  right: 60px;
  display: flex;
  align-items: center;
}

.topnav button {
  flex: 1;
  height: 100%;
  border: none;
  min-width: 60px;
  background: transparent;
  transition: all 0.3s;
}

.topnav button a:hover::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 2px;
  bottom: 0;
  background: #6bc6dd;
}

.topnav button a.router-link-active::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 2px;
  bottom: 0;
  background: #1279d8;
}

.topnav button a {
  height: 100%;
  color: rgb(150, 169, 168);
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.sidernav {
  position: absolute;
}

.rightcontent {
  position: relative;
  left: 15%;
  width: 80%;
  height: 90%;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease-out;
}

.fade-enter-to,
.fade-leave {
  visibility: visible;
}

.fade-enter {
  visibility: hidden;
  transform: scale(0);
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>