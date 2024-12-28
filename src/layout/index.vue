<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container"></sidebar>
    
    <div class="main-container">
      <navbar></navbar>
      
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  
  .sidebar-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 210px;
    overflow: hidden;
    background: #304156;
    transition: width 0.28s;
  }
  
  .main-container {
    min-height: 100%;
    margin-left: 210px;
    position: relative;
  }
}
</style> 