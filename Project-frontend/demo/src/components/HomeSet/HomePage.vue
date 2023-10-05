<template>
  <div class="bigBox">
    <!-- 顶部栏 -->
    <div class="topContent">
      <div class="famousSentence">
        <div class="sentence">
          <p>{{ $store.state.sentence }}</p>
        </div>
      </div>
      <div class="topNav">
        <router-link class="mainNav" :to="{ name: 'todolist' }">
          <i class="el-icon-tickets">备忘录</i>
        </router-link>
        <router-link class="mainNav" :to="{ name: 'musiclist' }">
          <i class="el-icon-service">音乐</i>
        </router-link>
        <router-link class="mainNav" :to="{ name: 'userinfo' }">
          <i class="el-icon-user">用户</i>
        </router-link>
        <router-link class="mainNav" :to="{ name: 'userlist' }">
          <i class="el-icon-setting">用户信息</i>
        </router-link>
      </div>
    </div>
    <div class="sideNav">
      <!-- 头像部分 -->
      <div class="others">
        <!-- 登陆前 -->
        <a class="nav_item" @click="toggleL_R" v-if="isLogin"><i class="el-icon-user" /><span>去登陆</span></a>
        <!-- 登陆后 -->
        <a class="nav_item" v-if="!isLogin"><i class="el-icon-service" /><span>{{ userinfo.username
        }}</span></a>
        <router-link class="nav_item" :to="{ name: 'musiclist' }">
          <i class="el-icon-s-home" />
          <span>主页</span>
        </router-link>
        <router-link class="nav_item" :to="{ name: 'musiclist' }">
          <i class="el-icon-star-off" />
          <span>收藏</span>
        </router-link>
        <router-link class="nav_item" :to="{ name: 'musiclist' }">
          <i class="el-icon-brush" />
          <span>主题</span>
        </router-link>
        <router-link class="nav_item" :to="{ name: 'todolist' }">
          <i class="el-icon-tickets" />
          <span>随笔记</span>
        </router-link>
        <router-link class="nav_item" :to="{ name: 'musiclist' }">
          <i class="el-icon-watermelon" />
          <span>趣闻</span>
        </router-link>
      </div>
      <div class="action" v-show="!isLogin">
        <router-link class="nav_item" :to="{ name: 'userinfo' }">
          <i class="el-icon-setting" />
          <span>设置</span>
        </router-link>
        <a class="nav_item" @click="logout"><i class="el-icon-d-arrow-left" />
          <span>登出</span>
        </a>
      </div>
    </div>
    <div class="rightContent">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="test"></div>
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
      userinfo: '',
    }
  },
  methods: {
    toggleL_R () {
      this.$router.push('mask').catch(err => {
        console.log(err);
      })
    }
    ,
    toUserList () {
      this.$router.push('userlist')
    },

    logout () {
      //弹框确认
      this.$confirm('确定要登出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('userinfo-save')
        this.$message({
          message: '登出成功',
          type: 'success',
          duration: 1000
        })
        this.reload()
      }).catch(() => {
        this.$message({
          message: '取消登出',
          type: 'info',
          duration: 1000
        })
      });
    },
  },
  mounted () {
    // 读取userinfo
    if (!this.userinfo) {
      this.userinfo = JSON.parse(localStorage.getItem('userinfo-save')) || ''
      if (this.userinfo.token) {
        this.isLogin = false
      }
    }
  },
}
</script>

<style scoped>
.bigBox {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  min-width: 600px;
  min-height: 720px;
  background-color: #303049;
}

.topContent {
  position: relative;
  width: 85%;
  height: 10%;
  top: 0;
  left: 15%;
  display: flex;
}

.famousSentence {
  position: absolute;
  width: 60%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.topNav {
  position: absolute;
  width: 30%;
  height: 60px;
  right: 60px;
  display: flex;
  align-items: center;
}

.mainNav {
  flex: 1;
  height: 100%;
  border: none;
  border-radius: 5px;
  margin: 2px;
  color: rgb(150, 169, 168);
  min-width: 60px;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.topNav .mainNav:hover::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 2px;
  bottom: 0;
  background: #6bc6dd;
}

.topNav .mainNav.router-link-active::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 2px;
  bottom: 0;
  background: #1279d8;
}

.sideNav {
  width: 70px;
  height: 90%;
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  text-overflow: ellipsis;
  transition: all .3s;
  background: transparent;
}

.sideNav:hover {
  background: #35374d;
  width: 160px;
}

.sideNav:hover span {
  opacity: 1;
}

.others,
.action {
  position: relative;
  width: 100%;

}

.nav_item {
  display: block;
  position: relative;
  width: 90%;
  height: 70px;
  margin: 9px;
  border-radius: 6px;
  color: rgb(150, 169, 168);
  transition: all .3s;
}

.action .nav_item.router-link-active::before,
.others .nav_item.router-link-active::before {
  content: '';
  display: inline-block;
  position: absolute;
  height: 86%;
  width: 2px;
  right: 0;
  top: 5px;
  background: #5d83dc;
}

.nav_item:hover {
  background: #5d83dc;
  color: #ffff;
}

.nav_item i {
  font-size: 30px;
  position: absolute;
  margin: 20px 0 0 12px;
  transition: all .3s;
}

.nav_item span {
  position: relative;
  top: 22px;
  left: 60px;
  opacity: 0;
  font: 400 18px '';
  transition: all .3s;
}

.others .nav_item:nth-child(1)::after,
.others .nav_item:nth-child(6)::after {
  content: '';
  display: block;
  position: absolute;
  background-color: #565765;
  width: 100%;
  height: 2px;
  bottom: -6px;
}

.rightContent {
  position: relative;
  left: 15%;
  width: 80%;
  height: 90%;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  text-align: center;
  overflow: auto;
}

.rightContent::-webkit-scrollbar {
  width: 2px;
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