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
          <el-form-item label="位置：">
            <el-select v-model="listQuery.position" placeholder="请选择" clearable class="input-width">
              <el-option
                v-for="item in positionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
              新增
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
        ref="wishTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border>
        <el-table-column label="图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.imageUrl" style="height: 80px">
          </template>
        </el-table-column>
        <el-table-column label="位置" align="center">
          <template slot-scope="scope">
            {{scope.row.position | positionFilter}}
          </template>
        </el-table-column>
        <el-table-column label="是否跳转" align="center">
          <template slot-scope="scope">
            {{scope.row.hasLink ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column label="跳转模块" align="center">
          <template slot-scope="scope">
            {{scope.row.linkModule | moduleFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建人" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="handleStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleStatusChange(scope.row)">
              {{scope.row.status ? '下架' : '上架'}}
            </el-button>
          </template>
        </el-table-column>
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
import { getWishList, updateWishStatus } from '@/api/wish'

export default {
  name: 'WishList',
  filters: {
    positionFilter(value) {
      const map = {
        0: '首页',
        1: '法物流通'
      }
      return map[value]
    },
    moduleFilter(value) {
      if (!value) return '-'
      const map = {
        0: '了解寺庙',
        1: '禅修活动'
      }
      return map[value]
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        position: undefined,
        status: undefined
      },
      positionOptions: [
        { label: '首页', value: 0 },
        { label: '法物流通', value: 1 }
      ],
      statusOptions: [
        { label: '上架', value: true },
        { label: '下架', value: false }
      ],
      list: [],
      total: 0,
      listLoading: false
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
    handleAdd() {
      this.$router.push('/wish/add')
    },
    handleUpdate(row) {
      this.$router.push({
        path: `/wish/edit/${row.id}`,
        query: { wish: JSON.stringify(row) }
      })
    },
    handleStatusChange(row) {
      this.$confirm(`确认要${row.status ? '下架' : '上架'}该许愿祈福吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateWishStatus({
          id: row.id,
          status: !row.status
        }).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
        })
      }).catch(() => {
        this.$nextTick(() => {
          row.status = !row.status
        })
      })
    },
    getList() {
      this.listLoading = true
      getWishList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      }).catch(() => {
        this.listLoading = false
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