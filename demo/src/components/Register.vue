<template>
  <!-- 注册页面 -->
  <div class="registercss">
    <el-input placeholder="请输入你想要的用户名称"
              v-model="username"
              clearable>
    </el-input>
    <el-input placeholder="请输入用户密码"
              v-model="password"
              show-password>
    </el-input>
    <el-button @click="register"
               type="primary"
               :plain="true"
               v-PreventReClick
               round>注册
    </el-button>
  </div>

</template>

<script>
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
      if (this.username.length < 2 || this.password.length > 6) {
        this.$message({
          message: "用户名格式不符合",
          type: 'warning',
          duration: 2000
        });
      } else if (this.password.length < 4 || this.password.length > 8) {
        this.$message({
          message: "密码格式不符合",
          type: 'warning',
          duration: 2000
        });
      } else {
        this.$http({
          method: 'post',
          url: '/register',
          params: {
            username: this.username,
            password: this.password
          }
        })
          .then((result) => {
            const { msg, code } = result.data
            if (code == 20000) {
              this.$message({
                message: msg,
                type: 'success',
                duration: 2000
              });
              this.$router.replace({
                name: 'login',
              })
            } else {
              this.$message({
                message: msg,
                type: 'warning',
                duration: 2000
              })
            }
          })
      }
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