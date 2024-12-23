<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header">
        <Navbar />
      </div>
      <div class="app-main">
        <transition name="fade" mode="out-in" appear>
          <keep-alive>
            <router-view :key="$route.path"/>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar/index'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  display: flex;
  height: 100vh;
  
  .sidebar-container {
    width: 210px;
    height: 100%;
    background-color: #304156;
  }
  
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .header {
      height: 50px;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }
    
    .app-main {
      flex: 1;
      padding: 20px;
      background: #f0f2f5;
      overflow: auto;
    }
  }
}
</style> 