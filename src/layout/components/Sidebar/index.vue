<template>
  <div class="sidebar-container">
    <el-menu
      :default-active="$route.path"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :collapse-transition="false"
      mode="vertical"
      router
    >
      <!-- 首页菜单项 -->
      <el-menu-item index="/dashboard">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <!-- 动态菜单项 -->
      <sidebar-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './item'
import menuRoutes from '@/router/modules/menu'

export default {
  name: 'Sidebar',
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebarStatus'
    ]),
    menuRoutes() {
      return menuRoutes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.sidebarStatus
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100%;
  background-color: #304156;
  
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
    overflow: auto;
  }
}

.el-menu--collapse {
  width: 64px !important;
}
</style>
