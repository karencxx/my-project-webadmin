<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <i class="el-icon-s-unfold" v-if="isActive"></i>
    <i class="el-icon-s-fold" v-else></i>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
.el-icon-s-fold,
.el-icon-s-unfold {
  font-size: 22px;
  vertical-align: middle;
  cursor: pointer;
  animation: icon-rotate 0.3s linear;
}

@keyframes icon-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(90deg);
  }
}
</style> 