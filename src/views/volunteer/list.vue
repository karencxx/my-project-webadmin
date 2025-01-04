<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        ref="volunteerTable"
        :data="list"
        style="width: 100%"
        size="small"
        v-loading="listLoading">
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope"> 
            <el-tag v-if="scope.row.status === 1" type="success" size="small">已录用</el-tag>
            <el-tag v-else type="warning" size="small">未录用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleStatus(scope.row, 1)">
              录用
            </el-button>
            <el-button size="mini" type="text" @click="handleStatus(scope.row, 0)">离开</el-button>
          </template>
        </el-table-column>
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
import { getVolunteerList, volunteerAdopt } from '@/api/volunteer'

export default {
  name: 'VolunteerList',
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        phone: null,
        status: 0,
        name: '',

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
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      getVolunteerList(this.listQuery).then(response => {
        console.log(response)
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleStatus(row, status) {
      this.$confirm(`确定要${status === 1 ? '录用' : '离开'}吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        volunteerAdopt({ id: row.id, status }).then(response => {
          this.$message.success('操作成功')
          this.getList()
        }).catch(() => {
        })
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
