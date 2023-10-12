<template>
  <form>
    <h2>Login</h2>
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
    <div class="treaty">
      <el-checkbox v-model="isAgree" />
      <span>是否同意相关责任事项
        <a href="" style="color: #37709c;">
          协议书
        </a>
      </span>
    </div>
    <button :disabled="!isAgree" class="submitbtn" @click="login" v-PreventReClick>登录</button>
    <div class="toggle">
      <span>没有账号？点击这里
        <a @click="dataFn(false)">立即注册</a>
      </span>
    </div>
  </form>
</template>

<script>
import { loginBack } from '@/utils/AxiosBack'
import { Message } from 'element-ui'
import { setUserData, setItem } from '@/utils/setUserInfo'
export default {
  name: "MyLogin",
  inject: ['reload'],
  props: { dataFn: Function },
  data () {
    return {
      username: '',
      password: '',
      isAgree: false
    }
  },
  methods: {
    login () {
      loginBack(this.username, this.password).then((result) => {
        console.log(result);
        const { msg, code } = result.data
        if (code == 200) {
          Message.success({
            message: msg,
            duration: 2000
          })
          const { token, user } = result.data.data
          const { userId, username, permissionsId } = user
          setItem(JSON.stringify(setUserData(userId, username, permissionsId, token)))
          this.reload()
        }
        else {
          Message.warning({
            message: msg,
            duration: 2000
          })
        }
      }).catch((err) => {
        Message.error({
          message: '服务器断开',
          duration: 2000
        })
        this.NProgress.done()
      });
    }
  },
}
</script>

<style scoped>
@import "@/assets/css/login-register.css";
</style>