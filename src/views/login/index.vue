<template>
  <div class="login-container">
    <el-row><h1>寺庙祈福平台管理后台</h1></el-row>
    <el-row class="mt-50"> 
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <div class="image-wrapper">
          <!-- <el-image></el-image> -->
        </div>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-form 
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            autoComplete="on"
            label-position="left">
            <h3 class="mb-30">欢迎使用</h3>
            
            <el-form-item prop="username">
              <el-input
                v-model.trim="loginForm.username"
                name="username"
                type="text"
                clearable
                maxlength="50"
                placeholder="请输入账号">
                <i slot="prefix" class="el-icon-user"></i>
              </el-input>
            </el-form-item>
            
            <el-form-item prop="password">
              <el-input
                v-model.trim="loginForm.password"
                :type="pwdType"
                name="password"
                placeholder="请输入密码"
                clearable
                maxlength="50"
                @keyup.enter.native="handleLogin">
                <i slot="prefix" class="el-icon-lock"></i>
                <i slot="suffix" @click="showPwd" class="el-icon-view"></i>
              </el-input>
            </el-form-item>
            <el-form-item class="text-right">
              <el-checkbox v-model="rememberMe" class="remember-me">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button 
                :loading="loading"
                type="primary" 
                class="w100"
                @click.native.prevent="handleLogin">
                登 录
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rememberMe: false,
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }, { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password',
      dialogVisible: false
    }
  },
  created() {
    this.initLoginForm()
  },
  methods: {
    showPwd() {
      this.pwdType = this.pwdType === 'password' ? '' : 'password'
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', {
            ...this.loginForm,
            password: md5(this.loginForm.password)
          }).then(() => {
            this.loading = false
            this.saveLoginInfo()
            this.$router.push({ path: '/dashboard' })
          }).catch(() => {
            this.loading = false
            this.$message.error('登录失败, 请检查用户名和密码')
          })
        }
      })
    },
    initLoginForm() {
      if (localStorage.getItem('rememberMe') === 'true') {
        this.rememberMe = true
        this.loginForm.username = localStorage.getItem('username') || ''
        this.loginForm.password = localStorage.getItem('password') || ''
      }
    },
    saveLoginInfo() {
      if (this.rememberMe) {
        localStorage.setItem('rememberMe', this.rememberMe)
        localStorage.setItem('username', this.loginForm.username)
        localStorage.setItem('password', this.loginForm.password)
      } else {
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('username')
        localStorage.removeItem('password')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 50px 50px 20px;
}
.image-wrapper{
  width: 100%;
}
.mt-50{
  margin-top: 50px;
}
.mb-30{
  margin-bottom: 30px;
}
</style> 
