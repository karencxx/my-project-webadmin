<template>
  <div>
    <div class="table-container">
      <el-dialog :title="title" :visible.sync="show" width="800px" :before-close="handleClose">
        <el-table :data="list" size="small" v-loading="listLoading">
          <el-table-column prop="id" width="50" label="序号" align="center"></el-table-column>
          <el-table-column
            prop="title"
            label="标题" />
          <el-table-column
            prop="module"
            label="模块">
            <template slot-scope="scope">
              {{ scope.row.module | articleFilter }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleSelect(scope.row)" v-if="selectData.id && selectData.id === scope.row.id">已选择</el-button>
                <el-button type="text" size="small" @click="handleSelect(scope.row)" v-else>选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            background
            size="small"
            @current-change="handleCurrentChange"
            :current-page.sync="params.page"
            :page-size="params.size"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getArticleList } from "@/api/article";
export default {
  props: {
    title: {
      type: String,
      default: "选择文章",
    },
    show: {
      type: Boolean,
      default: false,
    },
    selectData: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      params: {
        page: 1,
        size: 10,
        module: null,
        status: null,
        title: "",
      },
      listLoading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleClose() {
      this.$emit("update:show", false);
    },
    handleCurrentChange(page) {
      this.params.page = page;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      getArticleList(this.params).then((response) => {
        this.list = response.data.list;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleSelect(row) {
      this.$emit("select", row);
    }
  },
};
</script>
