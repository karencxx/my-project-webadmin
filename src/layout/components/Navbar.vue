<template>
  <div class="navbar">
    <div class="left-menu">
      <!-- <i 
        class="el-icon-s-fold toggle-button"
        @click="toggleSideBar"
      /> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ genBreadcrumb() }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="right-menu">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { loginOut } from '@/api/base'
export default {
  name: 'Navbar',
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    ...mapActions('app', ['toggleSideBar']),
    ...mapActions('user', ['logout']),
    async handleLogout() {
      await loginOut({ userId: '111' })
      localStorage.removeItem('userId')
      this.$router.push('/login')
    },
    genBreadcrumb() {
      return this.$route.meta.title
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  
  .toggle-button {
    font-size: 20px;
    cursor: pointer;
  }
  
  .right-menu {
    .el-dropdown-link {
      cursor: pointer;
      color: #333;
    }
  }
}
</style> 