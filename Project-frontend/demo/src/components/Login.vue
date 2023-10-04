<template>
  <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm" class="loginBox">
    <el-form-item prop="username">
      <el-input prefix-icon="el-icon-user" placeholder="请输入用户名称" v-model="loginForm.username" ref="usernametologin"
        clearable />
    </el-form-item>
    <el-form-item prop="password">
      <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.password" show-password />
    </el-form-item>
    <el-form-item>
      <el-button @click="login('loginForm')" type="primary" v-PreventReClick round>登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Message } from 'element-ui'
import { setUserInfo, setItem } from '../utils/SetUserInfo'
import { loginBack } from '../utils/Login_RegisterBack'
export default {
  name: "MyLogin",
  inject: ['reload'],
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginBack(this.loginForm.username, this.loginForm.password).then(async result => {
            const { msg, code } = result.data
            const { token, user } = result.data.data
            if (code == 20000) {
              Message.success({
                message: msg,
                duration: 2000
              })
              const { userId, username, permissionsId } = user
              setItem(JSON.stringify(setUserInfo(userId, username, permissionsId, token)))
              this.$store.state.userinfo = JSON.stringify(localStorage.getItem('userinfo'))
              await this.$router.replace('/todos')
              this.reload()
            } else {
              Message.warning({
                message: msg,
                duration: 2000
              })
            }
          })
            .catch(error => {
              console.log(error);
            })
        } else {
          console.log('erro login!');
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
.loginBox {
  margin-top: 10px;
}
.el-input {
  min-width: 120px;
}
</style>