<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger 
      class="hamburger-container" 
      :toggleClick="toggleSideBar" 
      :isActive="sidebar.opened"
    />
    
    <breadcrumb />
    
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar">
          <span class="user-name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="handleLogout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapState('user', ['name']),
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    ...mapActions('app', ['toggleSideBar']),
    ...mapActions('user', ['logout']),
    async handleLogout() {
      try {
        await this.logout()
        this.$router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0 !important;
  display: flex;
  justify-content: space-between;
  
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  
  .right-menu {
    float: right;
    height: 100%;
    
    .avatar-container {
      height: 50px;
      display: inline-block;
      margin-right: 35px;
      
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-right: 8px;
        }
        
        .user-name {
          color: #333;
          font-size: 14px;
        }
        
        .el-icon-caret-bottom {
          margin-left: 8px;
          font-size: 12px;
        }
      }
    }
  }
}

.user-dropdown {
  .inlineBlock {
    display: inline-block;
  }
}
</style> 