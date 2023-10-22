<template>
  <div class="home-container">
    <!-- 顶部栏 -->
    <div class="top-container">
      <!-- 顶部左边栏 -->
      <div class="public-nav">
        <router-link class="client-item" :to="{ name: 'musiclist' }">
          <span>音乐</span>
        </router-link>
        <router-link class="client-item" :to="{ name: 'main' }">
          <span>主页</span>
        </router-link>

      </div>
      <!-- 顶部右边栏 -->
      <div class="client-nav">
        <router-link class="client-item" :to="{ name: 'todolist' }">
          <span>备忘录</span>
        </router-link>
        <router-link class="client-item" :to="{ name: 'userlist' }">
          <span>列表管理</span>
        </router-link>
        <div class="client-item">
          <!-- 登陆前 -->
          <a @click="toggleL_R" v-if="!isLogin">
            <span>去登陆</span>
          </a>
          <!-- 登陆后 -->
          <a v-if="isLogin">
            <span>{{ userinfo.username }}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="right-container">
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
import { MessageBack } from '../../utils/MessageBack';
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
        MessageBack.normalBack('success', '登出成功')
        this.reload();
      }).catch(() => {
        MessageBack.normalBack('info', '取消登出')
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
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}

.top-container {
  position: relative;
  width: 100%;
  height: 10%;
  min-height: 64px;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: space-around;
  background: linear-gradient(120deg, #8ec5fc 0%, #e0c3fc 100%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.client-nav {
  position: absolute;
  width: 40%;
  height: 100%;
  right: 60px;
  display: flex;
  align-items: center;
}

.client-item {
  position: relative;
  width: 100px;
  height: 100%;
  border: none;
  border-radius: 5px;
  margin: 6px;
  color: #736e79;
  min-width: 60px;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.client-item:hover {
  box-shadow: 0 0 3px 5px #7db9f5;
}

.client-item::after {
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

.client-item:hover::after {
  transform-origin: left;
  transform: scaleX(1);
}

.client-item.router-link-active::after {
  transform: scaleX(1);
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}

.public-nav {
  position: absolute;
  width: 40%;
  height: 100%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* position: absolute;
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
  background: linear-gradient(120deg, #8ec5fc 0%, #e0c3fc 100%); */
}

/* 
.public-nav:hover {
  width: 130px;
  box-shadow: 0 0 50px 4px #4facfe;
}

.public-nav:hover span {
  opacity: 1;
}

.avatar,
.actions {
  position: relative;
  width: inherit;

}

.nav-item {
  display: block;
  position: relative;
  width: 90%;
  height: 70px;
  margin: 9px;
  border-radius: 6px;
  color: #3b869b;
  transition: all .3s;
}

.nav-item:hover {
  box-shadow: 0 0 3px 3px #7db9f5;
}

.nav-item::before {
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

.nav-item:hover::before {
  transform-origin: top;
  transform: scaleY(1);
}

.actions .nav-item.router-link-active::before,
.avatar .nav-item.router-link-active::before {
  transform: scale(1);
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}

.nav-item:hover i {
  transform: scale(1.1) rotateY(180deg);
}

.actions .nav-item:hover i:nth-child(1) {
  transform: rotate(180deg);
}

.nav-item i {
  font-size: 30px;
  position: absolute;
  margin: 20px 0 0 5px;
  transition: all .3s;
  color: #736e79;
}

.avatar .nav-item:nth-child(1)::after,
.avatar .nav-item:nth-child(6)::after {
  content: '';
  position: absolute;
  display: block;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  width: 96%;
  height: 3px;
  bottom: -6px;
  left: -5px;
} */

.right-container {
  position: relative;
  width: 100%;
  height: 90%;
  overflow: auto;
  transition: all .4s;

}

.right-container::-webkit-scrollbar {
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