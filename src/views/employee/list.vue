<template>
  <div class="app-container">
    <!-- 搜索表单 -->
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
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
              size="small">
              查询结果
            </el-button>
            <el-button
              type="success"
              @click="handleAdd()"
              size="small">
              添加员工
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
        ref="employeeTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border>
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
              @click="handleUpdate(scope.row)">
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[5,10,15]"
        :page-size="listQuery.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getEmployeeList, updateEmployeeStatus } from '@/api/employee'

export default {
  name: 'EmployeeList',
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        name: undefined,
        organization: undefined,
        phone: undefined,
        status: undefined
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
      multipleSelection: []
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
      this.$router.push('/employee/add')
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleUpdate(row) {
      this.$router.push({
        path: `/employee/edit/${row.id}`,
        query: { employee: JSON.stringify(row) }
      })
    },
    handleStatusChange(row) {
      this.$confirm('是否要修改该员工状态?', '提示', {
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
          row.status = !row.status
        })
      })
    },
    getList() {
      this.listLoading = true
      getEmployeeList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      })
    }
  }
}
</script>

<style lang="less" scoped>
.filter-container {
  margin-bottom: 20px;
  
  .input-width {
    width: 200px;
  }
  
  .el-form-item:last-child {
    margin-left: 20px;
    
    .el-button + .el-button {
      margin-left: 10px;
    }
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