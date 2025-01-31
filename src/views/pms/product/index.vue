<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品货号：">
            <el-input style="width: 203px" v-model="listQuery.productSn" placeholder="商品货号"></el-input>
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-cascader
              clearable
              v-model="selectProductCateValue"
              :options="productCateOptions">
            </el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌：">
            <el-select v-model="listQuery.brandId" placeholder="请选择品牌" clearable>
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态：">
            <el-select v-model="listQuery.publishStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select v-model="listQuery.verifyStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in verifyStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddProduct()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="价格/货号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.price | moneyFilter}}/{{scope.row.productSn}}</template>
        </el-table-column>
        <el-table-column label="标签" width="140" align="center">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.publishStatus===1"
              style="margin-right: 10px"
              type="success">已上架</el-tag>
            <el-tag
              v-else
              style="margin-right: 10px"
              type="info">未上架</el-tag>
            <el-tag
              v-if="scope.row.newStatus===1"
              style="margin-right: 10px"
              type="success">新品</el-tag>
            <el-tag
              v-if="scope.row.recommandStatus===1"
              type="warning">推荐</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="SKU库存" width="100" align="center">
          <template slot-scope="scope">{{scope.row.stock}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              @click="handleShowProduct(scope.$index, scope.row)">查看
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchList, updateDeleteStatus, updateNewStatus, updatePublishStatus, updateRecommendStatus } from '@/api/product'
import { fetchList as fetchBrandList } from '@/api/brand'
import { fetchListWithChildren } from '@/api/productCate'

export default {
  name: 'productList',
  data() {
    return {
      operates: [
        {
          label: "上架",
          value: "publishOn"
        },
        {
          label: "下架",
          value: "publishOff"
        },
        {
          label: "推荐",
          value: "recommendOn"
        },
        {
          label: "不推荐",
          value: "recommendOff"
        },
        {
          label: "设为新品",
          value: "newOn"
        },
        {
          label: "不设为新品",
          value: "newOff"
        },
        {
          label: "转移到分类",
          value: "transferCategory"
        },
        {
          label: "移入回收站",
          value: "recycle"
        }
      ],
      operateType: null,
      listQuery: {
        keyword: null,
        pageNum: 1,
        pageSize: 5,
        publishStatus: null,
        verifyStatus: null,
        productSn: null,
        productCategoryId: null,
        brandId: null
      },
      list: null,
      total: null,
      listLoading: true,
      selectProductCateValue: [],
      multipleSelection: [],
      productCateOptions: [],
      brandOptions: [],
      publishStatusOptions: [{
        value: 1,
        label: '上架'
      }, {
        value: 0,
        label: '下架'
      }],
      verifyStatusOptions: [{
        value: 1,
        label: '审核通过'
      }, {
        value: 0,
        label: '未审核'
      }]
    }
  },
  created() {
    this.getList()
    this.getBrandList()
    this.getProductCateList()
  },
  watch: {
    selectProductCateValue: function (value) {
      if (value && value.length === 2) {
        this.listQuery.productCategoryId = value[1]
      } else {
        this.listQuery.productCategoryId = null
      }
    }
  },
  filters: {
    moneyFilter(value) {
      return '¥' + value.toFixed(2)
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    getBrandList() {
      fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
        this.brandOptions = []
        let brandList = response.data.list
        for (let i = 0; i < brandList.length; i++) {
          this.brandOptions.push({
            label: brandList[i].name,
            value: brandList[i].id
          })
        }
      })
    },
    getProductCateList() {
      fetchListWithChildren().then(response => {
        let list = response.data
        this.productCateOptions = []
        for (let i = 0; i < list.length; i++) {
          let children = []
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({
                label: list[i].children[j].name,
                value: list[i].children[j].id
              })
            }
          }
          this.productCateOptions.push({
            label: list[i].name,
            value: list[i].id,
            children: children
          })
        }
      })
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleAddProduct() {
      this.$router.push({path: '/pms/addProduct'})
    },
    handleBatchOperate() {
      if (this.operateType == null) {
        this.$message({
          message: '请选择操作类型',
          type: 'warning',
          duration: 1000
        })
        return
      }
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的商品',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.$confirm('是否要进行该批量操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id)
        }
        switch (this.operateType) {
          case 'publishOn':
            this.updatePublishStatus(1, ids)
            break
          case 'publishOff':
            this.updatePublishStatus(0, ids)
            break
          case 'recommendOn':
            this.updateRecommendStatus(1, ids)
            break
          case 'recommendOff':
            this.updateRecommendStatus(0, ids)
            break
          case 'newOn':
            this.updateNewStatus(1, ids)
            break
          case 'newOff':
            this.updateNewStatus(0, ids)
            break
          case 'transferCategory':
            break
          case 'recycle':
            this.updateDeleteStatus(1, ids)
            break
          default:
            break
        }
        this.getList()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleResetSearch() {
      this.selectProductCateValue = []
      this.listQuery = {
        keyword: null,
        pageNum: 1,
        pageSize: 5,
        publishStatus: null,
        verifyStatus: null,
        productSn: null,
        productCategoryId: null,
        brandId: null
      }
    },
    handleDelete(index, row) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        ids.push(row.id)
        this.updateDeleteStatus(1, ids)
      })
    },
    handleUpdateProduct(index, row) {
      this.$router.push({path: '/pms/updateProduct', query: {id: row.id}})
    },
    handleShowProduct(index, row) {
      console.log("handleShowProduct", row)
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    updatePublishStatus(publishStatus, ids) {
      let params = new URLSearchParams()
      params.append('ids', ids)
      params.append('publishStatus', publishStatus)
      updatePublishStatus(params).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    updateNewStatus(newStatus, ids) {
      let params = new URLSearchParams()
      params.append('ids', ids)
      params.append('newStatus', newStatus)
      updateNewStatus(params).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    updateRecommendStatus(recommendStatus, ids) {
      let params = new URLSearchParams()
      params.append('ids', ids)
      params.append('recommendStatus', recommendStatus)
      updateRecommendStatus(params).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    updateDeleteStatus(deleteStatus, ids) {
      let params = new URLSearchParams()
      params.append('ids', ids)
      params.append('deleteStatus', deleteStatus)
      updateDeleteStatus(params).then(response => {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1000
        })
      })
      this.getList()
    }
  }
}
</script>

<style scoped>
.filter-container {
  margin-bottom: 20px;
}

.operate-container {
  margin-bottom: 20px;
}

.btn-add {
  float: right;
  margin-right: 15px;
}

.batch-operate-container {
  display: inline-block;
  margin-top: 20px;
}

.pagination-container {
  display: inline-block;
  float: right;
  margin-top: 20px;
}
</style> 