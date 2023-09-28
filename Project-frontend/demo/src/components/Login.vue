<template>
  <div class="logincss">
    <el-input placeholder="请输入用户名称" v-model="username" ref="username" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-button @click="login" type="primary" :plain="true" v-PreventReClick round>登录</el-button>
  </div>
</template>

<script>
import { setUserInfo } from '../utils/userinfo'
import { setItem } from '../utils/localstorage'
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
      this.$http({
        method: 'get',
        url: '/login',
        params: {
          username: this.username,
          password: this.password
        }
      }).then(async result => {
        const { msg, code } = result.data
        const { token, user } = result.data.data
        if (code == 20000) {
          this.$message({
            message: msg,
            type: 'success',
            duration: 2000
          });
          const { userId, username, permissionsId } = user
          setItem(JSON.stringify(setUserInfo(userId, username, permissionsId, token)))
          this.$store.state.userinfo = JSON.stringify(localStorage.getItem('userinfo'))
          await this.$router.push('/todos')
          this.reload()
        } else {
          this.$message({
            message: msg,
            type: 'warning',
            duration: 2000
          })
        }
      })
        .catch(error => {
          console.log(error);
        })
    }
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
</style>