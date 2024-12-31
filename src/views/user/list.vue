<template>
  <div class="app-container">
    <!-- 统计数据 -->
    <el-row :gutter="8" class="statistics-container">
      <el-col :span="4">
        <el-statistic class="statistic-item" title="总用户数" :value="statistics.totalUsers" :value-style="{ color: '#409EFF', fontSize: '32px', fontWeight: 'bold' }"></el-statistic>
      </el-col>
      <el-col :span="4">
        <el-statistic class="statistic-item" title="本月新增用户" :value="statistics.newUsersThisMonth" :value-style="{ color: '#409EFF', fontSize: '32px', fontWeight: 'bold' }"></el-statistic>
      </el-col>
      <el-col :span="16">
        <el-card shadow="never">
            <el-form :inline="true" :model="listQuery" size="small" label-width="120px">
              <el-form-item label="手机号：">
                <el-input v-model.number="listQuery.phone" type="telephone" class="input-width" placeholder="手机号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="handleSearchList()"
                  size="small"
                  icon="el-icon-search">
                  查询
                </el-button>
              </el-form-item>
            </el-form>
        </el-card>
      </el-col>
    </el-row>

    <div class="table-container">
      <el-table
        ref="userTable"
        :data="list"
        style="width: 100%"
        size="small"
        v-loading="listLoading">
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="nickname" label="用户昵称" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.size"
        layout="total, prev, pager, next"
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
.statistic-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
  font-size: 28px;
  border: 1px solid #EBEEF5;
}
</style> 
