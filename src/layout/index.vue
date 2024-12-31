<template>
  <div class="app-wrapper" :class="{ 'hide-sidebar': !sidebarOpened }">
    <div class="sidebar-wrapper">
      <sidebar />
    </div>
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    ...mapGetters(['sidebarOpened'])
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  
  .sidebar-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 180px;
    transition: width .3s;
    background-color: #304156;
    z-index: 1001;
    overflow: hidden;
  }
  
  .main-container {
    min-height: 100%;
    margin-left: 180px;
    position: relative;
    transition: margin-left .3s;
  }
  
  &.hide-sidebar {
    .sidebar-wrapper {
      width: 64px;
    }
    
    .main-container {
      margin-left: 64px;
    }
  }
}
</style> 