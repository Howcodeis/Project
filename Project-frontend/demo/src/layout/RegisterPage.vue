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
    <div class="gender">
      <span>性别:</span>
      <el-switch style="display: block" v-model="switchState" active-color="blue" inactive-color="red" active-text="男"
        inactive-text="女">
      </el-switch>
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
import { AxiosBack } from '@/api/requestUser';
import { MessageBack } from '@/utils/MessageBack';
export default {
  name: "MyRegister",
  props: { dataFn: Function },
  data () {
    return {
      username: '',
      password: '',
      switchState: false,
      gender: ''
    }
  },
  methods: {
    register () {
      AxiosBack.registerBack(this.username, this.password, this.gender).then((result) => {
        const { msg, code } = result.data
        if (code == 200) {
          MessageBack.normalBack('success', msg)
          setTimeout(() => {
            this.dataFn(true)
          }, 1000)
        } else {
          MessageBack.normalBack('error', msg)
        }
      }).catch(erro => {
        MessageBack.serverErrorBack()
      })
    },
  },
  watch: {
    switchState: {
      immediate: true,
      handler () {
        this.switchState ? this.gender = "男" : this.gender = "女"
      },
    }
  }
}
</script>

<style scoped>
@import "@/assets/css/login-register.css";

.gender {
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  user-select: none;
}
</style>