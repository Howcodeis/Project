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
    <transition name="login">
      <WrapperPage v-show="$store.state.isWrapper"></WrapperPage>
    </transition>
  </div>
</template>

<script>
import WrapperPage from '../Wrapper/WrapperPage.vue'
export default {
  name: 'MyHome',
  // provide & inject
  inject: ['reload'],
  data () {
    return {
      isLogin: true,
      userinfo: '',
    };
  },
  components: { WrapperPage },
  methods: {
    toggleL_R () {
      this.$store.state.isWrapper = true
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
        this.$message({
          message: '登出成功',
          type: 'success',
          duration: 1000
        });
        this.reload();
      }).catch(() => {
        this.$message({
          message: '取消登出',
          type: 'info',
          duration: 1000
        });
      });
    },
  },
  mounted () {
    // 读取userinfo
    if (!this.userinfo) {
      this.userinfo = JSON.parse(localStorage.getItem('userinfo-save')) || '';
      if (this.userinfo.token) {
        this.isLogin = false;
      }
    }
  },
}
</script>

<style scoped>
.bigBox {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  min-width: 600px;
  min-height: 720px;
  background-color: #303049;
}

.topContent {
  position: fixed;
  width: 85%;
  height: 10%;
  top: 0;
  z-index: 2;
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

.topNav .mainNav::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 3px;
  bottom: 0;
  border-radius: 5px;
  background: #6bc6dd;
  transition: transform .5s;
  transform: scaleX(0);
  transform-origin: right;
}

.topNav .mainNav:hover::after {
  transform-origin: left;
  transform: scaleX(1);
}

.topNav .mainNav.router-link-active::after {
  transform: scaleX(1);
  background: #1279d8;
}

.sideNav {
  position: fixed;
  top: 10%;
  width: 60px;
  height: 90%;
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

.nav_item:hover {
  background: #5d83dc;
  color: #ffff;
}

.nav_item::before {
  content: '';
  display: block;
  position: absolute;
  width: 3px;
  height: 86%;
  right: -5px;
  top: 5px;
  transform: scaleY(0);
  border-radius: 5px;
  background: #5d83dc;
  transform-origin: bottom;
  transition: transform .4s;
}

.nav_item:hover::before {
  transform-origin: top;
  transform: scaleY(1);
}

.action .nav_item.router-link-active::before,
.others .nav_item.router-link-active::before {
  transform: scale(1);
  background: #5d83dc;
}

.nav_item:hover i {
  transform: scale(1.1);
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
  position: absolute;
  display: block;
  background-color: #565765;
  width: 100%;
  height: 3px;
  bottom: -6px;
}

.rightContent {
  position: relative;
  top: 10%;
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

.login-enter-active,
.login-leave-active {
  transition: all .4s;
}

.login-enter-to,
.login-leave {
  transform: scale(1);
}

.login-enter,
.login-leave-to {
  transform: scale(0);
}
</style>