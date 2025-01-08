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
.w100{
  width: 100%;
}
.mt-10{
  margin-top: 10px;
}
.ml-10{
  margin-left: 10px;
}
.mb-10{
  margin-bottom: 10px;
}
.text-center{
  text-align: center;
}
.text-right{
  text-align: right;
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-container{
  margin-top: 10px;
  .table-image{
    width: 80px;
    height: 40px;
  }
}
.filter-container{
  margin-bottom: 15px;
}
.input-width{
  width: 200px;
}
.pagination-container{
  margin-top: 10px;
  text-align: right;
}
.form-container{  
  .form-btn-footer{
    margin-top: 50px;
  }
}
</style>