<template>
  <!-- 注册页面 -->
  <el-form class="registerBox" status-icon :rules="rules" ref="registerForm" :model="registerForm">
    <el-form-item prop="username">
      <el-input prefix-icon="el-icon-user" placeholder="请输入你想要的用户名称" v-model="registerForm.username" clearable>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input prefix-icon="el-icon-unlock" placeholder="请输入用户密码" v-model="registerForm.password" show-password>
      </el-input>
    </el-form-item>
    <!-- <el-form-item prop="password">
      <el-input prefix-icon="el-icon-lock" placeholder="确认密码" v-model="ruleForm.password" show-password />
    </el-form-item> -->
    <el-form-item>
      <el-button @click="register('registerForm')" type="primary" :plain="true" v-PreventReClick round>注册
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Message } from 'element-ui';
import { registerBack } from '@/utils/LoginAndRegisterBack';
export default {
  name: "MyRegister",
  data () {
    return {
      registerForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在2~8个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在4~12个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          registerBack(this.registerForm.username, this.registerForm.password).then((result) => {
            const { msg, code } = result.data
            if (code == 20000) {
              Message.success({
                message: msg,
                duration: 2000
              })
              this.$router.replace({
                name: 'login',
              })
            } else {
              Message.error({
                message: msg,
                duration: 2000
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
}
</script>

<style scoped>
.registerBox {
  margin-top: 10px;
}

.el-input {
  min-width: 120px;
}
</style>