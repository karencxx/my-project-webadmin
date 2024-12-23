<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// 重置样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// 滚动条样式
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #909399;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #606266;
}

// 全局过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// 页面切换动画
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-20px, 0, 0);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-20px, 0, 0);
}
</style>
