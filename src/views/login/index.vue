<template>
  <div class="login-container">
    <el-row> <h1>寺庙祈福平台管理后台</h1></el-row>
    <el-row>
      <el-col :span="4"></el-col>
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
            <h3 class="mb-10">欢迎使用</h3>
            
            <!-- 用户名输入框 -->
            <el-form-item prop="username">
              <el-input
                v-model.trim="loginForm.username"
                name="username"
                type="text"
                clearable
                maxlength="50"
                placeholder="请输入用户名">
                <i slot="prefix" class="el-icon-user"></i>
              </el-input>
            </el-form-item>
            
            <!-- 密码输入框 -->
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
            
            <!-- 按钮区域 -->
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
import { isvalidUsername } from '@/utils/validate'
import { setSupport, setCookie, getCookie } from '@/utils/support'

export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 3) {
    //     callback(new Error('密码不能小于3位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
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
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.loading = false
              this.saveLoginInfo()
              this.$router.push({ path: '/dashboard' })
            })
            .catch(() => {
              this.loading = false
              this.$message.error('登录失败')
            })
        }
      })
    },
    initLoginForm() {
      this.loginForm.username = getCookie('username') || ''
      this.loginForm.password = getCookie('password') || ''
    },
    saveLoginInfo() {
      setCookie('username', this.loginForm.username, 15)
      setCookie('password', this.loginForm.password, 15)
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 50px;
}
.image-wrapper{
  width: 100%;
}
</style> 