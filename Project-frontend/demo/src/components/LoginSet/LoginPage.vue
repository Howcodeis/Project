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
    <button :disabled="!isAgree" class="loginbtn" @click="login" v-PreventReClick>登录</button>
    <div class="toregister">
      <span>没有账号？点击这里
        <a @click="toggle">立即注册</a>
      </span>
    </div>
  </form>
</template>

<script>
import { Message } from 'element-ui'
import { setUserData, setItem } from '@/utils/setUserInfo'
import { loginBack } from '@/utils/LoginAndRegisterBack'
export default {
  name: "MyLogin",
  inject: ['reload'],
  data () {
    return {
      username: '',
      password: '',
      isAgree: false
    }
  },
  methods: {
    toggle () {
      this.$bus.$emit('toggleback', false)
    },
    login () {
      loginBack(this.username, this.password).then(result => {
        const { msg, code } = result.data
        if (code == 200) {
          Message.success({
            message: msg,
            duration: 2000
          })
          const { token, user } = result.data.data
          const { userId, username, permissionsId } = user
          setItem(JSON.stringify(setUserData(userId, username, permissionsId, token)))
          this.$store.state.userinfo = JSON.stringify(localStorage.getItem('userinfo-save'))
          this.$store.state.isWrapper = false
          this.reload()
        }
        else {
          Message.warning({
            message: msg,
            duration: 2000
          })
        }
      })
        .catch(error => {
          Message.error({
            message: '服务器断开',
            duration: 2000
          })
          this.NProgress.done()
        })
    }
  },
}
</script>

<style scoped>
h2 {
  font-size: 2em;
  text-align: center;
  color: #37709c;
}

.input-box {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0 20px 0;
  border-bottom: 3px gray solid;
}

.loginbtn {
  width: 100%;
  height: 40px;
  background: #37709c;
  border: none;
  outline: none;
  border-radius: 6px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
}

.input-box input {
  position: relative;
  padding: 0 35px 0 5px;
  bottom: -10px;
  width: 90%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  font-weight: 600;
}

.input-box label {
  position: absolute;
  top: 50%;
  left: 0;
  font-weight: 500;
  font-size: 1em;
  pointer-events: none;
  transform: translateY(-50%);
  transition: .5s;
}

.input-box input:focus~label,
.input-box input:valid~label {
  top: -3px;
}

.input-box .icon {
  position: absolute;
  right: 2px;
  font-size: 1.2em;
  line-height: 60px
}

.treaty {
  position: relative;
  width: 100%;
  height: 20px;
  margin-bottom: 20px;
}

.treaty span {
  position: relative;
  left: 10px;
  font-size: 0.8em;
  font-weight: 600;
}

.toregister {
  position: relative;
  width: 100%;
  height: 100%;
  top: 20px;

}

.toregister a {
  cursor: pointer;
  color: #37709c;
  font-size: 1.1em;
  font-weight: 600;
}
</style>