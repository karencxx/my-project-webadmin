<template>
  <div class="sidebar-item">
    
    <!-- 有子菜单的情况 -->
    <template v-if="hasChildren(item)">
      <el-submenu :index="resolvePath(item.path)" :popper-append-to-body="false">
        <template slot="title">
          <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(item.path)"
        />
      </el-submenu>
    </template>
    <!-- 没有子菜单的情况 -->
    <template v-else>
      <el-menu-item :index="resolvePath(item.path)">
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>

  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },

  methods: {
    hasChildren(item) {
      const showingChildren = item.children?.filter(child => !child.hidden)
      return showingChildren?.length > 0
    },

    resolvePath(routePath) {
      // 如果是完整路径，直接返回
      if (routePath.startsWith('/')) {
        return routePath
      } else if (this.basePath) {
      // 如果有basePath，拼接basePath和routePath
        return path.resolve(this.basePath, routePath)
      }
      // 否则直接返回
      return routePath
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-item {

  .el-menu-item {
    &:focus {
      background-color: #263445 !important;
    }
    
    &.is-active {
      background-color: #263445 !important;
    }
  }

  .el-submenu {
    &__title {
      &:hover {
        background-color: #263445 !important;
      }
    }
  }
  [class^="el-icon-"] {
    margin-right: 10px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>
