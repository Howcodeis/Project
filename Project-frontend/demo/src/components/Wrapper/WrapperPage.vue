<template>
  <div class="wrapper">
    <!-- 登陆页面 -->
    <div class="form-box">
      <span class="cancel" @click="cancel">
        <i class="el-icon-d-arrow-left" />
      </span>
      <transition name="toggle" mode="out-in">
        <LoginPage v-if="isToggle"></LoginPage>
        <RegisterPage v-else></RegisterPage>
      </transition>
    </div>
  </div>
</template>

<script>
import LoginPage from '../LoginSet/LoginPage.vue';
import RegisterPage from '../RegisterSet/RegisterPage.vue';
export default {
  name: "MyWrapper",
  inject: ['reload'],
  data () {
    return {
      isToggle: true
    };
  },
  components: { LoginPage, RegisterPage },
  methods: {
    cancel () {
      this.$store.state.isWrapper = false
    },
    changetoggle (data) {
      this.isToggle = data
    }
  },
  mounted () {
    this.$bus.$on('toggleback', this.changetoggle)
  },
}
</script>

<style scoped>
.el-input {
  min-width: 120px;
}

.wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: transparent;
  background-size: cover;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-box {
  position: relative;
  width: 400px;
  height: 540px;
  background-color: transparent;
  background-size: cover;
  display: flex;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, .5);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 30px rgba(0, 0, 0, .5);
  overflow: hidden;
}

.cancel {
  position: absolute;
  height: 40px;
  width: 40px;
  top: 0;
  right: 0;
  font-size: 2em;
  user-select: none;
  background: #393957;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 20px;
}

.toggle-enter-active,
.toggle-leave-active {
  transition: all .4s;
}

.toggle-enter {
  transform: translateX(-500px);
}

.toggle-leave-to {
  transform: translateX(500px);
}
</style>