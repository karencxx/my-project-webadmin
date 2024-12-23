<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-800">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="w-96 p-8 bg-white rounded-lg shadow-md"
    >
      <div class="text-center mb-8">
        <h3 class="text-2xl font-bold text-gray-800">寺庙管理系统</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model.trim="loginForm.username"
          placeholder="用户名"
          type="text"
          prefix-icon="el-icon-user"
          class="rounded-md"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model.trim="loginForm.password"
          placeholder="密码"
          :type="passwordVisible ? 'text' : 'password'"
          prefix-icon="el-icon-lock"
          class="rounded-md"
        >
          <i
            slot="suffix"
            :class="['el-input__icon', passwordVisible ? 'el-icon-view' : 'el-icon-hide']"
            @click="passwordVisible = !passwordVisible"
          />
        </el-input>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        class="w-full mb-4 rounded-md"
        @click.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { login } from '@/api/base.js'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '111',
        password: '111'
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false,
      passwordVisible: false
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.doLogin(this.loginForm)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    doLogin(params) {
      console.log(this.loginForm)
      this.$store.dispatch('user/login', params).then(() => {
        console.log(res)
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
  
  .login-form {
    width: 400px;
    padding: 30px;
    background: #fff;
    border-radius: 4px;
    
    .title-container {
      text-align: center;
      margin-bottom: 30px;
      
      .title {
        font-size: 26px;
        color: #333;
      }
    }
  }
}
</style> 