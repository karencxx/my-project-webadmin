<template>
  <div class="app-container">
    <!-- 搜索表单 -->
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="100px">
          <el-form-item label="模块：">
            <el-select v-model="listQuery.module" placeholder="请选择" clearable class="input-width">
              <el-option
                v-for="item in moduleOptions"
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
          <el-form-item label="标题：">
            <el-input v-model="listQuery.title" class="input-width" placeholder="文章标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSearchList()"
              size="small"
              icon="el-icon-search">
              查询结果
            </el-button>
            <router-link to="/article/edit" class="ml-10">
              <el-button
                type="success"
                size="small"
                icon="el-icon-plus">
                新增
              </el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- table -->
    <div class="table-container">
      <el-table
        ref="articleTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        size="small"
        border>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column label="主图" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.imageUrl" class="table-image">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column label="模块" align="center">
          <template slot-scope="scope">
            {{scope.row.module | moduleFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
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
import { getArticleList, updateArticleStatus } from '@/api/article'

export default {
  name: 'ArticleList',
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        module: undefined,
        status: undefined,
        title: undefined
      },
      moduleOptions: [
        { label: '了解寺庙', value: 0 },
        { label: '禅修活动', value: 1 }
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
    moduleFilter(value) {
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
        path: `/article/edit`,
        query: { id: row.id }
      })
    },
    handleStatusChange(row) {
      this.$confirm(`确认要${row.status ? '下架' : '上架'}该文章吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateArticleStatus({
          id: row.id,
          status: !row.status
        }).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
        })
      })
    },
    getList() {
      this.listLoading = true
      getArticleList(this.listQuery).then(response => {
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