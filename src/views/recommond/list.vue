<template>
  <div class="app-container">
    <div class="table-container">
      <div class="filter-container">
        <el-button
          style="width: 100px"
          size="small"
          type="success"
          @click="drawer = true"
          icon="el-icon-plus"
          >新增</el-button
        >
      </div>
      <el-table
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        size="small"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="模块" align="center" />
        <el-table-column prop="linkObject" label="链接对象" align="center">
          <template slot-scope="scope">
            {{ scope.row.linkObject }}
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column prop="status" label="状态" align="center" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 1">上架</el-tag>
            <el-tag type="danger" v-else>下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="default"
              @click="handleEdit(scope.row)"
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleStatus(scope.row)"
            >
              下架
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
    <!-- 新增/编辑商品 -->
    <el-drawer
      title="新增/编辑"
      :visible.sync="drawer"
      with-header
      size="40%"
      :before-close="handleClose"
    >
      <el-form
        :model="detailData"
        label-width="80px"
        :rules="detailFormRules"
        size="small"
        ref="detailForm"
        @submit.native.prevent
      >
        <el-form-item label="模块" prop="name">
          <el-select v-model="detailData.name" class="input-width">
            <el-option
              v-for="item in moduleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接" prop="linkObject">
          <el-select v-model="detailData.linkObject" class="input-width">
            <el-option
              v-for="item in linkTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="detailData.sort" class="input-width" />
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="handleSubmit" style="width: 100px"
            >保 存</el-button
          >
          <el-button @click="handleClose" style="width: 100px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { getRecommondList } from "@/api/recommond";
import { types } from "@/api/wish";
const moduleList = [
  { label: "许愿祈福", value: 1 },
  { label: "寺庙文创", value: 2 },
];
export default {
  name: "RecommondList",
  data() {
    return {
      moduleList,
      listQuery: {
        page: 1,
        size: 10,
      },
      list: [],
      total: 0,
      listLoading: false,
      drawer: false,
      detailData: {
        id: null,
        name: "",
        linkObject: "",
        sort: "",
      },
      detailFormRules: {
        name: [{ required: true, message: "请输入模块", trigger: "blur" }],
        linkObject: [
          { required: true, message: "请输入链接对象", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  computed: {
    linkTypes() {
      return this.detailData.name === 1 ? types : []; // 寺庙文创暂时没有
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      getRecommondList(this.listQuery)
        .then((response) => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    handleEdit(row) {
      this.detailData = row;
      this.drawer = true;
    },
    handleStatus(row) {
      this.$confirm("确定要下架吗？", "提示", {
        type: "warning",
      }).then(() => {
        console.log(row);
      });
    },
    handleSubmit() {
      this.$refs.detailForm.validate((valid) => {
        if (valid) {
          console.log(this.detailData);
          this.handleClose();
        }
      });
    },
    handleClose() {
      this.detailData = {
        id: null,
        name: "",
        linkObject: "",
        sort: "",
      };
      this.$refs.detailForm.resetFields();
      this.drawer = false;
    },
  },
};
</script>
<style lang="less" scoped>
.filter-container {
  padding: 10px;
  background-color: #fff;
  text-align: right;
}
</style>
