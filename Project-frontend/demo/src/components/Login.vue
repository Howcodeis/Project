<template>
  <div class="logincss">
    <el-input placeholder="请输入用户名称" v-model="username" ref="username" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-button @click="login" type="primary" :plain="true" v-PreventReClick round>登录</el-button>
  </div>
</template>

<script>
import { loginBack } from '../utils/Login_RegisterBack';
export default {
  name: "MyLogin",
  inject: ['reload'],
  data () {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    login () {
      loginBack(this.username, this.password, this.reload)
    },
  }
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
</style>