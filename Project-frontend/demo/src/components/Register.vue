<template>
  <!-- 注册页面 -->
  <div class="registercss">
    <el-input placeholder="请输入你想要的用户名称" v-model="username" clearable>
    </el-input>
    <el-input placeholder="请输入用户密码" v-model="password" show-password>
    </el-input>
    <el-button @click="register" type="primary" :plain="true" v-PreventReClick round>注册
    </el-button>
  </div>
</template>

<script>
import { registerBack } from '../utils/Login_RegisterBack';
export default {
  name: "MyRegister",
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register () {
      registerBack(this.username, this.password)
    }
  },
}
</script>

<style scoped>
.registercss div:nth-child(1) {
  margin-top: 40px;
  margin-bottom: 10px;
}

.registercss div:nth-child(2) {
  margin-bottom: 20px;
}

.el-input {
  min-width: 120px;
}
</style>