<template>
  <div class="login-container">
    <el-card class="login-form-layout">
      <el-form 
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        autoComplete="on"
        label-position="left">
        
        <!-- Logo -->
        <div class="logo-container">
          <svg-icon icon-class="login-mall" class="logo-icon"></svg-icon>
        </div>
        
        <!-- 标题 -->
        <h2 class="login-title color-main">mall-admin-web</h2>
        
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            autoComplete="on"
            placeholder="请输入用户名">
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :type="pwdType"
            name="password"
            autoComplete="on"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin">
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        
        <!-- 按钮区域 -->
        <el-form-item class="login-button-container">
          <el-button 
            :loading="loading"
            type="primary" 
            class="login-button"
            @click.native.prevent="handleLogin">
            登录
          </el-button>
          <el-button 
            type="primary"
            class="login-button"
            @click.native.prevent="handleTry">
            获取体验账号
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 背景图 -->
    <img :src="login_center_bg" class="login-center-layout">

    <!-- 二维码弹窗 -->
    <el-dialog
      title="公众号二维码"
      :visible.sync="dialogVisible"
      :show-close="false"
      :center="true"
      width="30%">
      <div class="qrcode-container">
        <span class="font-title-large">
          <span class="color-main font-extra-large">关注公众号</span>
          回复
          <span class="color-main font-extra-large">体验</span>
          获取体验账号
        </span>
        <img 
          src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/banner/qrcode_for_macrozheng_258.jpg" 
          class="qrcode-image">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support'
import login_center_bg from '@/assets/images/login_center_bg.png'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      login_center_bg,
      dialogVisible: false
    }
  },
  created() {
    this.initLoginForm()
  },
  methods: {
    ...mapActions('user', ['login']),
    showPwd() {
      this.pwdType = this.pwdType === 'password' ? '' : 'password'
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.login(this.loginForm)
            .then(() => {
              this.loading = false
              this.saveLoginInfo()
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    handleTry() {
      this.dialogVisible = true
    },
    dialogConfirm() {
      this.dialogVisible = false
      setSupport(true)
    },
    initLoginForm() {
      this.loginForm.username = getCookie('username') || 'admin'
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
}

.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409EFF;
}

.logo-container {
  text-align: center;
  .logo-icon {
    width: 56px;
    height: 56px;
    color: #409EFF;
  }
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409EFF;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}

.login-button-container {
  margin-bottom: 60px;
  text-align: center;
  .login-button {
    width: 45%;
  }
}

.qrcode-container {
  text-align: center;
  .qrcode-image {
    width: 160px;
    height: 160px;
    margin-top: 10px;
  }
}
</style> 