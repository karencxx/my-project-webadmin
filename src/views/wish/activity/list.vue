<template>
  <div class="app-container">
    <div class="table-container">
      <el-table :data="list" style="width: 100%" v-loading="listLoading" size="small">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column prop="imageUrl" label="活动时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }} - {{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="活动状态" align="center" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 1">待开始</el-tag>
            <el-tag type="success" v-if="scope.row.status === 2">进行中</el-tag>
            <el-tag type="danger" v-else>已结束</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="default"
              @click="handleDetail(scope.row)">
              详情
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
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getWishList } from "@/api/wish";
export default {
  name: "WishActivityList",
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
      },
      list: [],
      total: 0,
      listLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      getWishList(this.listQuery)
        .then((response) => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    handleDetail(row) {
      this.$router.push({
        path: '/wish/type/detail',
        query: {
          id: row.id
        }
      });
    },
  },
};
</script>

