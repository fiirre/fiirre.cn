<template>
  <div class="login-register">
    <div class="login-tab">登录</div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="50px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户" prop="userName">
        <el-input v-model.trim="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="ruleForm.password"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
export default {
  data() {
    type Rule = any
    type Value = string
    type Callback = (err?: Error) => void
    const checkUser = (rule: Rule, value: Value, callback: Callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      }
      setTimeout(() => {
        if (value.length < 5) {
          callback(new Error('长度不能小于5个字'))
        } else {
          if (value.length > 10) {
            callback(new Error('长度超过10个字'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    const validatePass = (rule: Rule, value: Value, callback: Callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        password: '',
        userName: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        userName: [{ validator: checkUser, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName: string) {
      ;(this.$refs[formName] as HTMLFormElement).validate((valid: boolean) => {
        if (valid) {
          console.log(valid)
          let { password, userName } = this.ruleForm
          axios
            .post('api/v1/user/login', {
              password,
              userName,
            })
            .then(() => {})
            .catch((err) => {
              console.log(err)
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" 
>
.login-register {
  width: 50%;
  min-width: 500px;
  margin: 0 auto;
  .login-tab {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>