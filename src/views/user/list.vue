<template>
  <div class="app-container">
    <!-- 统计数据 -->
    <el-row :gutter="20" class="statistics-container">
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="statistic-item">
            <div class="label">总用户数</div>
            <div class="value">{{ statistics.totalUsers }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="statistic-item">
            <div class="label">本月新增用户</div>
            <div class="value">{{ statistics.newUsersThisMonth }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 搜索表单 -->
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="手机号：">
            <el-input v-model="listQuery.phone" class="input-width" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSearchList()"
              size="small">
              查询结果
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 数据列表 -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>

    <div class="table-container">
      <el-table
        ref="userTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="nickname" label="用户昵称" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[5, 10, 15]"
        :page-size="listQuery.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'

export default {
  name: 'UserList',
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        phone: undefined
      },
      list: [],
      total: 0,
      listLoading: false,
      statistics: {
        totalUsers: 0,
        newUsersThisMonth: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSearchList() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      getUserList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
        this.statistics = response.data.statistics
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.statistics-container {
  margin-bottom: 20px;

  .statistic-item {
    text-align: center;
    padding: 20px 0;

    .label {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    }

    .value {
      font-size: 24px;
      font-weight: bold;
      color: #409EFF;
    }
  }
}

.filter-container {
  margin-bottom: 20px;
  
  .input-width {
    width: 200px;
  }
  
  .el-form-item:last-child {
    margin-left: 20px;
  }
}

.operate-container {
  margin-bottom: 20px;
}

.table-container {
  margin-top: 20px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style> 