<template>
  <!-- 注册页面 -->
  <form>
    <h2>Register</h2>
    <div class="input-box">
      <span class="icon">
        <i class="el-icon-user" />
      </span>
      <input type="text" v-model="username" required />
      <label>请输入用户名</label>
    </div>
    <div class="input-box">
      <span class="icon">
        <i class="el-icon-lock" />
      </span>
      <input type="password" v-model="password" required />
      <label>请输入密码</label>
    </div>
    <button class="submitbtn" @click="register" v-PreventReClick>注册</button>
    <div class="toggle">
      <span>已有账号？点击这里
        <a @click="dataFn(true)">去登录</a>
      </span>
    </div>
  </form>
</template>

<script>
import { Message } from 'element-ui';
import { registerBack } from '@/utils/AxiosBack';
export default {
  name: "MyRegister",
  props: { dataFn: Function },
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    register () {
      registerBack(this.username, this.password).then((result) => {
        const { msg, code } = result.data
        if (code == 200) {
          Message.success({
            message: msg,
            duration: 2000
          })
          setTimeout(() => {
            // 方法暂未更新  !!!!
            this.$store.state.isToggle = true
          }, 1000)
        } else {
          Message.error({
            message: msg,
            duration: 2000
          })
        }
      }).catch(erro => {
        Message.error({
          message: '服务器断开',
          duration: 2000
        })
        this.NProgress.done()
      })
    },
  }
}
</script>

<style scoped>
@import "@/assets/css/login-register.css";
</style>