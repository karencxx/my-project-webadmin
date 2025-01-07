<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        ref="permissionTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        size="small">
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="phone" label="权限管理" align="center"></el-table-column>
        <el-table-column prop="creator" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="creator" label="创建人" align="center"></el-table-column>
        <el-table-column label="操作" width="300" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">
              修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">
              删除
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleStatus(scope.row)">
              启用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    </div>
    <el-drawer
      title="修改权限"
      :show-close="false"
      :before-close="() => {drawer = false}"
      :visible.sync="drawer"
      size="40%">
      <el-form :model="permissionDetail" label-width="100px" size="small">
        <el-form-item label="角色名称" prop="name">
          {{ permissionDetail.name }}
        </el-form-item>
        <el-form-item label="权限管理" prop="role">
          <el-select v-model="permissionDetail.role" placeholder="请选择权限管理" size="small">
            <el-option v-for="item in permissionList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button style="width: 200px;" type="primary" @click="onSubmit()">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { getPermissionList, deletePermission, handlePermissionStatus, updatePermission } from '@/api/permission'

export default {
  name: 'PermissionList',
  data() {
    return {
      permissionList: [
        { label: '超级管理员', value: 1 },
        { label: '管理员', value: 2 },
        { label: '员工', value: 3 }
      ],
      listQuery: {
        page: 1,
        size: 10,
        name: '',
        organization: '',
        phone: null,
        status: ''
      },
      statusOptions: [
        { label: '正常', value: true },
        { label: '禁用', value: false }
      ],
      list: [],
      total: 0,
      listLoading: false,
      drawer: false,
      permissionDetail: {}
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
    handleEdit(row) {
      this.permissionDetail = row || { role: 1}
      this.drawer = true
    },
    handleDelete(row) {
      this.$confirm(`确认要删除该权限吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePermission({
          id: row.id,
        }).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
        })
      }).catch({})
    },
    handleStatus(row) {
      this.$confirm(`确认要启用该权限吗?`, '提示', {
        type: 'warning'
      }).then(() => {
        handlePermissionStatus({
          id: row.id,
          status: row.status
        }).then(response => { 
          this.$message.success('启用成功')
          this.getList()
        })
      }).catch({})
    },
    getList() {
      this.listLoading = true
      getPermissionList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      }).catch(() => {
        this.listLoading = false
        this.list = [{}]
      })
    },
    handleSubmitSuccess() {
      this.drawer = false
      this.getList()
    },
    onSubmit() {
      updatePermission(this.permissionDetail).then(response => {
        this.$message.success('修改成功')
        this.getList()
      })
    }
  }
}
</script>
