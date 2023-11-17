<template>
  <div class="home-container">
    <!-- 音乐泡 -->
    <div class="music-control" @click="isShowMusicBox = true">
      <img :src="musicImg">
    </div>

    <transition name="music">
      <MusicList v-show="isShowMusicBox" :closeMusicBox="closeMusicBox"></MusicList>
    </transition>

    <!-- 顶部栏 -->
    <div class="top-container">
      <div class="client-nav">
        <!-- <router-link class="client-item" :to="{ name: 'main' }">
          <span>主页</span>
        </router-link> -->
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
    <div class="main-container">
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
import MusicList from '@/components/MusicList.vue';
import WrapperPage from '@/layout/WrapperPage.vue'
import { MessageBack } from '@/utils/MessageBack';
import musicPlayStore from '../store/musicSetting';
import { mapWritableState } from 'pinia';

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
      isChildrenRouterAlive: true,
    };
  },
  components: { WrapperPage, MusicList },
  computed: {
    ...mapWritableState(musicPlayStore, {
      musicImg: 'musicImg',
      isShowMusicBox: 'isShowMusicBox'
    }
    )
  },
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
    closeMusicBox (data) {
      this.isShowMusicBox = data
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
  background: var(--white-gray);
}

.music-control {
  position: absolute;
  bottom: 20px;
  left: -10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  z-index: 55;
  overflow: hidden;
  transition: all .4s;

  & img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    left: 10px;
    transform: rotate(360deg) scale(2);
  }
}

.top-container {
  position: relative;
  width: 100%;
  height: 1rem;
  min-height: 64px;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: space-around;
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
  color: #474648;
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
  background: var(--deep-blue);
}

.client-item:hover::after {
  transform-origin: left;
  transform: scaleX(1);
}

.client-item.router-link-active::after {
  transform: scaleX(1);
  background-image: var(--white-gray);
}

.main-container {
  position: relative;
  width: 100%;
  height: 90%;
  overflow: auto;
  transition: all .4s;

}

.main-container::-webkit-scrollbar {
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

.music-enter-active,
.music-leave-active {
  transition: all .6s;
}

.music-enter,
.music-leave-to {
  transform: translateX(-500px);
  opacity: 0;
}
</style>