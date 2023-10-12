<template>
  <div class="bigBox">
    <!-- 顶部栏 -->
    <div class="topContent">
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
        <a class="nav_item" @click="toggleL_R" v-if="!isLogin"><i class="el-icon-user" /><span>去登陆</span></a>
        <!-- 登陆后 -->
        <a class="nav_item" v-if="isLogin"><i class="el-icon-service" /><span>{{ userinfo.username
        }}</span></a>
        <router-link class="nav_item" :to="{ name: 'main' }">
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
      <div class="action" v-show="isLogin">
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
        <keep-alive>
          <router-view v-if="isChildrenRouterAlive"></router-view>
        </keep-alive>
      </transition>
    </div>
    <transition name="login">
      <WrapperPage v-show="isWrapper" :showWrapper="showWrapper"></WrapperPage>
    </transition>
  </div>
</template>

<script>
import WrapperPage from '../Wrapper/WrapperPage.vue'
export default {
  name: 'MyHome',
  // provide & inject
  inject: ['reload'],
  provide () {
    return {
      childrenRouterRefresh: this.childrenRouterRefresh
    }
  },
  data () {
    return {
      isLogin: false,
      isWrapper: '',
      isChildrenRouterAlive: true
    };
  },
  components: { WrapperPage },
  methods: {
    toggleL_R () {
      this.isWrapper = true
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
    showWrapper (data) {
      this.isWrapper = data
    },
    childrenRouterRefresh () {
      this.isChildrenRouterAlive = false
      this.$nextTick(() => { this.isChildrenRouterAlive = true })
    }
  },
  mounted () {
    // 读取userinfo
    if (!this.userinfo) {
      this.userinfo = JSON.parse(localStorage.getItem('userinfo-save')) || '';
      if (this.userinfo.token) {
        this.isLogin = true;
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
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}

.topContent {
  position: absolute;
  width: 100%;
  height: 10%;
  min-height: 64px;
  top: 0;
  z-index: 2;
  display: flex;
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
  color: #736e79;
  min-width: 60px;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mainNav:hover {
  box-shadow: 0 0 3px 5px #7db9f5;
}

.topNav .mainNav::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 3px;
  bottom: 0;
  border-radius: 5px;
  transition: transform .5s;
  transform: scaleX(0);
  transform-origin: right;
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
}

.topNav .mainNav:hover::after {
  transform-origin: left;
  transform: scaleX(1);
}

.topNav .mainNav.router-link-active::after {
  transform: scaleX(1);
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}

.sideNav {
  position: absolute;
  top: 10%;
  width: 60px;
  min-width: 40px;
  height: 90%;
  display: flex;
  z-index: 2;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0 0 30px 5px #8ec5fc;
  text-overflow: ellipsis;
  transition: all .3s;
  background: linear-gradient(120deg, #8ec5fc 0%, #e0c3fc 100%);
}

.sideNav:hover {
  width: 130px;
  box-shadow: 0 0 50px 4px #4facfe;
}

.sideNav:hover span {
  opacity: 1;
}

.sideNav span {
  position: relative;
  opacity: 0;
  top: 22px;
  left: 50px;
  font: 400 18px '';
  transition: all .3s;
  pointer-events: none;
  color: #736e79;
}

.others,
.action {
  position: relative;
  width: inherit;

}

.nav_item {
  display: block;
  position: relative;
  width: 90%;
  height: 70px;
  margin: 9px;
  border-radius: 6px;
  color: #3b869b;
  transition: all .3s;
}

.nav_item:hover {
  box-shadow: 0 0 3px 3px #7db9f5;
}

.nav_item::before {
  content: '';
  display: inline-block;
  position: absolute;
  width: 3px;
  height: 86%;
  right: -5px;
  top: 5px;
  transform: scaleY(0);
  border-radius: 5px;
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
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
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}

.nav_item:hover i {
  transform: scale(1.1) rotateY(180deg);
}

.action .nav_item:hover i:nth-child(1) {
  transform: rotate(180deg);
}

.nav_item i {
  font-size: 30px;
  position: absolute;
  margin: 20px 0 0 5px;
  transition: all .3s;
  color: #736e79;
}

.others .nav_item:nth-child(1)::after,
.others .nav_item:nth-child(6)::after {
  content: '';
  position: absolute;
  display: block;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  width: 96%;
  height: 3px;
  bottom: -6px;
  left: -5px;
}

.rightContent {
  position: relative;
  top: 10%;
  left: 15%;
  width: 84%;
  height: 90%;
  overflow: auto;
  transition: all .4s;

}

.rightContent::-webkit-scrollbar {
  width: 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}


.login-enter-active,
.login-leave-active {
  transition: all .4s ease-in-out;
}

.login-enter,
.login-leave-to {
  transform: scale(0) skew(60deg, 20deg);
}
</style>