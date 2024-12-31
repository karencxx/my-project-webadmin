<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="100px"
        >
          <el-form-item label="祈福类型：">
            <el-select
              v-model="listQuery.type"
              placeholder="请选择"
              clearable
              style="width: 200px"
            >
              <el-option
                v-for="item in wishTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="祈福状态：">
            <el-select
              v-model="listQuery.status"
              placeholder="请选择"
              clearable
              style="width: 200px"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="祈福数量：">
            <el-input
              v-model.number="listQuery.count"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="祈福金额：">
            <el-input v-model.number="listQuery.amount" class="input-width">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input
              v-model.trim.number="listQuery.phone"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="祈福者：">
            <el-input
              v-model.trim="listQuery.name"
              class="input-width"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
            <el-button type="success" @click="handleBatchUpload"
              >批量上传</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-table
      v-loading="listLoading"
      :data="list"
      size="small"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column type="selection" width="55" fixed :selectable="row => row.status === 1"></el-table-column>
      <el-table-column type="index" label="序号" width="50" align="center" fixed></el-table-column>
      <el-table-column prop="type" label="祈福类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.type | wishTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户昵称" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="祈福时间" align="center" width="140">
      </el-table-column>
      <el-table-column prop="num" label="祈福数量" width="100" align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="祈福金额"
        width="100"
        align="center">
        <template slot-scope="scope"> ¥{{ scope.row.amount / 100 }} </template>
      </el-table-column>
      <el-table-column prop="wish" label="祈福者" align="center" width="140">
      </el-table-column>
      <el-table-column prop="status" label="祈福状态" align="center" fixed="right">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTypeFilter" size="small">
            {{ scope.row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 1"
            type="text"
            size="small"
            @click="handleUpload(scope.row)">
            上传
          </el-button>
          <el-button
            v-else
            type="text"
            size="small"
            @click="handleDetail(scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table> 

    <div class="pagination-container">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.pageSize"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-drawer
      :visible.sync="drawerVisible"
      :with-header="false"
      size="600px"
      :before-close="handleDrawerClose">
      <div class="drawer-header">
        <div class="title">当前选中id: {{ uploadOrderIds }}</div>
      </div>
      <wish-upload 
        :order-id="uploadOrderIds"
        @success="handleUploadSuccess">
      </wish-upload>
    </el-drawer>
  </div>
</template>

<script>
import { getWishOrders, types } from "@/api/wish";
import WishUpload from './detail-upload'

const statusTypes = [
  { label: "待祈福", value: 1 },
  { label: "已祈福", value: 2 }
];

export default {
  name: "WishOrder",
  components: {
    WishUpload
  },
  data() {
    return {
      drawerVisible: false,
      listQuery: {
        page: 1,
        pageSize: 10,
        count: null,
        amount: null,
        phone: "",
        name: "",
        type: null,
        status: null,
      },
      wishTypeOptions: types,
      statusOptions: statusTypes,
      list: [],
      total: 0,
      listLoading: false,
      currentOrder: {},
      selectedRows: [],
      uploadOrderIds: '',
    };
  },
  created() {
    this.getList();
  },
  filters: {
    wishTypeFilter(type) {
      return types.find(item => item.value === type).label;
    },
    statusFilter(status) {
      return statusTypes.find(item => item.value === status)?.label || '';
    },
    statusTypeFilter(status) {
      const map = {
        1: "warning",
        2: "success",
      };
      return map[status];
    },
  },
  methods: {
    getList() {
      this.listLoading = true;
      getWishOrders(this.listQuery)
        .then((response) => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    handleSearch() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        pageSize: 10,
        count: null,
        amount: null,
        phone: "",
        name: "",
        type: null,
        status: null,
      };
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleSelectionChange(rows) {
      this.selectedRows = rows
    },
    handleBatchUpload() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选择需要上传的订单')
        return
      }

      const invalidOrder = this.selectedRows.find(row => row.status !== 1)
      if (invalidOrder) {
        this.$message.warning('只能选择待祈福的订单进行上传')
        return
      }

      this.uploadOrderIds = this.selectedRows.map(row => row.id).join(',')
      this.drawerVisible = true
    },
    handleUpload(row) {
      this.selectedRows = [row]
      this.uploadOrderIds = row.id
      this.drawerVisible = true
    },
    handleDrawerClose(done) {
      this.selectedRows = []
      this.uploadOrderIds = ''
      done()
    },
    handleUploadSuccess() {
      this.drawerVisible = false
      this.getList()
    },
    handleDetail(row) {
      this.$store.dispatch('data/setTransferData', row)
      this.$router.push({
        path: '/wish/order/detail',
        query: {
          id: row.id
        }
      });
    }
  },
};
</script>
<style lang="less" scoped>
.drawer-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
</style>
