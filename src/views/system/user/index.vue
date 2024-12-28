<template>
  <div class="user-container">
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <div class="filter-container">
        <el-input
          v-model="listQuery.keyword"
          placeholder="用户名/姓名"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">
          添加
        </el-button>
      </div>

      <!-- 表格区域 -->
      <el-table
        :data="list"
        border
        style="width: 100%"
        v-loading="listLoading">
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      list: [], // 用户列表
      listLoading: false,
      listQuery: {
        keyword: ''
      }
    }
  },
  created() {
    // 初始化时加载数据
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      // TODO: 调用API获取用户列表
      setTimeout(() => {
        this.list = [
          {
            username: 'admin',
            name: '管理员',
            role: '超级管理员'
          },
          {
            username: 'test',
            name: '测试用户',
            role: '普通用户'
          }
        ]
        this.listLoading = false
      }, 1000)
    },
    handleFilter() {
      this.getList()
    },
    handleCreate() {
      // TODO: 实现添加用户功能
      this.$message.info('添加用���功能待实现')
    },
    handleEdit(row) {
      // TODO: 实现编辑用户功能
      this.$message.info('编辑用户功能待实现')
    },
    handleDelete(row) {
      // TODO: 实现删除用户功能
      this.$message.info('删除用户功能待实现')
    }
  }
}
</script>

<style lang="less" scoped>
.user-container {
  padding: 20px;

  .filter-container {
    padding-bottom: 10px;
    .filter-item {
      margin-right: 10px;
    }
  }
}
</style> 