<template>
<!-- 有子菜单的情况 -->
  <el-submenu :index="resolvePath(item.path)" v-if="hasChildren(item)">
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
<!-- 没有子菜单的情况 -->
  <el-menu-item :index="resolvePath(item.path)" v-else>
    <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
    <span slot="title">{{ item.meta.title }}</span>
  </el-menu-item>
</template>

<script>
import path from "path";

export default {
  name: "SidebarItem",

  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },

  methods: {
    hasChildren(item) {
      const showingChildren = item.children?.filter((child) => !child.hidden);
      return showingChildren?.length > 0;
    },

    resolvePath(routePath) {
      // 如果是完整路径，直接返回
      if (routePath.startsWith("/")) {
        return routePath;
      } else if (this.basePath) {
        // 如果有basePath，拼接basePath和routePath
        return path.resolve(this.basePath, routePath);
      }
      // 否则直接返回
      return routePath;
    },
  },
};
</script>
