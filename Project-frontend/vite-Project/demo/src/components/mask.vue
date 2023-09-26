<template>
  <div
    class="mask"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- 登陆页面 -->
    <div class="loginbox">
      <div class="leftarea"></div>
      <div class="rightarea">
        <div class="rightup">
          <el-button-group>
            <router-link :to="{name:'login'}">
              <el-button>去登陆</el-button>
            </router-link>
            <router-link :to="{name:'register'}">
              <el-button>去注册</el-button>
            </router-link>
          </el-button-group>
        </div>

        <div class="infobox">
          <transition name="loginappear">
            <router-view></router-view>
          </transition>
        </div>

        <div class="downright">
          <div class="other">
            <span class="line"></span>
            <span class="text">其他方式</span>
            <span class="line"></span>
          </div>
        </div>
        <div class="cancel" @click="canclemask">
          <i class="el-icon-back" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyMask",
  inject: ['reload'],
  data () {
    return {
      loading: true
    }
  },

  methods: {
    canclemask () {
      this.$router.push({ name: 'todos' })
    },

  },
  mounted () {
    this.$router.push('/mask/login').catch(error => {
      console.log(error);
    })
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 2000)


  },

}
</script>

<style scoped>
.logincss div:nth-child(1) {
  margin-top: 40px;
  margin-bottom: 10px;
}
.logincss div:nth-child(2) {
  margin-bottom: 20px;
}
.el-input {
  min-width: 120px;
}
.loginappear-enter-active {
  transition: all 0.3s ease-in;
  transition-delay: 0.3s;
}
.loginappear-leave-active {
  transition: all 0.3s ease-in;
}
.loginappear-enter,
.loginappear-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  background-color: transparent;
  background: url(../assets/image/nature-sunset.jpg) center no-repeat;
  background-size: cover;
}
.loginbox {
  position: relative;
  top: 100px;
  left: 15%;
  width: 70%;
  height: 600px;
  border: gray 1px solid;
  box-shadow: rgb(167, 152, 135) 3px 3px 20px;
  background: url("../assets/image/city.jpg") no-repeat;
  background-size: cover;
  min-width: 800px;
}
.infobox {
  width: 60%;
  height: 200px;
  position: absolute;
  bottom: 45%;
  right: 20%;
  text-align: center;
  vertical-align: middle;
  z-index: 2;
  user-select: none;
}

.leftarea {
  position: absolute;
  left: 0;
  height: 100%;
  width: 50%;
  border: none;
  border-right: 1px rgb(167, 152, 135) solid;
}
.rightarea {
  position: absolute;
  right: 0;
  height: 100%;
  width: 50%;
  border: none;
  text-align: center;
}
.line {
  width: 40%;
  height: 0px;
  flex-grow: 1;
  border-top: 1px solid #000;
}
.text {
  margin: 0 5px;
}
.other {
  position: absolute;
  top: 0;
  width: 100%;
  height: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}
.downright {
  position: absolute;
  top: 70%;
  right: 10%;
  width: 80%;
  height: 150px;
  border: none;
}
.rightup {
  position: absolute;
  top: 5%;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-bottom: rgb(167, 152, 135) 1px solid;
}
.cancel {
  position: absolute;
  top: 0;
  right: 0;
  width: 4%;
  height: 4%;
  user-select: none;
  transition: all 0.4s;
  cursor: pointer;
}
.cancel:hover {
  transform: scale(1.2);
}
.el-input {
  border: 0;
  outline: none;
  padding: 4px;
  width: 50%;
  min-width: 240px;
}
</style>