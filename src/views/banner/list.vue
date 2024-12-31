<template>
  <div class="app-container">
    <!-- 搜索表单 -->
    <el-card class="filter-container" shadow="never">
        <el-form :inline="true" :model="listQuery" size="small">
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
              size="small"
              icon="el-icon-search">
              查询结果
            </el-button>
            <router-link to="/banner/edit" class="ml-10">
              <el-button
                type="success"
                size="small"
                icon="el-icon-plus">
                新增
              </el-button>
            </router-link>
          </el-form-item>
        </el-form>
    </el-card>

    <div class="table-container">
      <el-table
        ref="bannerTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        size="small">
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.image" alt="banner" style="width: 50px; height: 20px;" :preview-src-list="[scope.row.image]"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="位置" align="center">
          <template slot-scope="scope">
            {{scope.row.position | positionFilter}}
          </template>
        </el-table-column>
        <el-table-column label="是否跳转" align="center">
          <template slot-scope="scope">
            {{scope.row.isJump ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column label="跳转模块" align="center">
          <template slot-scope="scope">
            {{scope.row.jumpModule | jumpModuleFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建人" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status">上架</el-tag>
            <el-tag type="danger" v-else>下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">
              修改
            </el-button>
            <el-button
              size="mini"
              :type="scope.row.status ? 'danger' : 'success'"
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
import { getBannerList, updateBannerStatus } from '@/api/banner'

export default {
  name: 'BannerList',
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        position: '',
        status: ''
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
  filters: {
    positionFilter(value) {
      const map = {
        0: '首页',
        1: '法物流通'
      }
      return map[value]
    },
    jumpModuleFilter(value) {
      const map = {
        0: '了解寺庙',
        1: '禅修活动'
      }
      return map[value]
    }
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
    handleEdit(row) {
      this.$store.dispatch('data/setTransferData', row)
      this.$router.push({
        path: `/banner/edit`,
        query: { id: row.id }
      })
    },
    handleStatusChange(row) {
      this.$confirm(`确认要${row.status ? '下架' : '上架'}该Banner吗?`, '提示', {
        type: 'warning'
      })
      .then(() => {
        updateBannerStatus({
          id: row.id,
          status: !row.status
        }).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
        })
      }).catch(() => {})
    },
    getList() {
      this.listLoading = true
      getBannerList(this.listQuery).then(response => {
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
  
  .el-form-item:last-child {
    margin-left: 20px;
    
    .el-button + .el-button {
      margin-left: 10px;
    }
  }
}
</style> 