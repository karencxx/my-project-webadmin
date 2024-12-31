<template>
  <div class="app-container">
    <!-- 搜索表单 -->
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="100px">
          <el-form-item label="员工姓名：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="员工姓名"></el-input>
          </el-form-item>
          <el-form-item label="所属组织：">
            <el-select v-model="listQuery.organization" placeholder="请选择" clearable class="input-width">
              <el-option
                v-for="item in organizationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="listQuery.phone" class="input-width" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="listQuery.status" placeholder="请选择" clearable class="input-width">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSearchList()"
              size="small"
              icon="el-icon-search">
              查询
            </el-button>
            <el-button
              type="success"
              @click="handleAdd()"
              size="small"
              icon="el-icon-plus">
              添加员工
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    
    <div class="table-container">
      <el-table
        ref="employeeTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        size="small">
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="员工姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column label="所属组织" align="center">
          <template slot-scope="scope">
            {{scope.row.organization | organizationFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色" align="center"></el-table-column>
        <el-table-column prop="creator" label="创建人" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status ? 'success' : 'danger'">
              {{scope.row.status ? '正常' : '禁用'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              :type="scope.row.status ? 'danger' : 'success'"
              @click="handleStatusChange(scope.row)">
              {{scope.row.status ? '禁用' : '启用'}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        background
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-size="listQuery.size"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
      <!-- :page-sizes="[5,10,15]" -->
    </div>
    <el-drawer
      title="新增员工"
      :show-close="false"
      :before-close="handleClose"
      :visible.sync="drawer"
      size="40%">
      <employee-detail
        ref="employeeForm"
        :data="employeeDetail"
        :organization-options="organizationOptions"
        @submit-success="handleSubmitSuccess"
        @cancel="handleClose">
      </employee-detail>
    </el-drawer>
  </div>
</template>

<script>
import { getEmployeeList, updateEmployeeStatus } from '@/api/employee'
import EmployeeDetail from './components/EmployeeDetail'

export default {
  name: 'EmployeeList',
  components: { EmployeeDetail },
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        name: '',
        organization: '',
        phone: null,
        status: ''
      },
      organizationOptions: [
        { label: '流量团队', value: 0 },
        { label: '管理层', value: 1 }
      ],
      statusOptions: [
        { label: '正常', value: true },
        { label: '禁用', value: false }
      ],
      list: [],
      total: 0,
      listLoading: false,
      multipleSelection: [],
      drawer: false,
      employeeDetail: {}
    }
  },
  created() {
    this.getList()
  },
  filters: {
    organizationFilter(value) {
      const map = {
        0: '流量团队',
        1: '管理层'
      }
      return map[value]
    }
  },
  methods: {
    handleSearchList() {
      this.listQuery.page = 1
      this.getList()
    },
    handleAdd() {
      this.drawer = true
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleEdit(row) {
      this.employeeDetail = row
      this.drawer = true
    },
    handleStatusChange(row) {
      this.$confirm(`确认要${row.status ? '禁用' : '启用'}该员工吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateEmployeeStatus({
          id: row.id,
          status: !row.status
        }).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
        })
      }).catch({})
    },
    getList() {
      this.listLoading = true
      getEmployeeList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    handleClose() {
      this.drawer = false
      this.$refs.employeeForm.resetForm()
    },
    handleSubmitSuccess() {
      this.drawer = false
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>

</style> 
