<template>
  <div class="app-container">
    <div class="table-container">
      <div class="filter-container">
        <el-button
          style="width: 100px"
          size="small"
          type="success"
          @click="drawer = true"
          icon="el-icon-plus">
          新增
          </el-button>
      </div>
      <el-table
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        size="small">
        <el-table-column
          label="序号"
          prop="id"
          width="80"
          align="center"/>
        <el-table-column prop="type" label="模块" align="center">
          <template slot-scope="scope">
            {{ scope.row.type | moduleType }}
          </template>
        </el-table-column>
        <el-table-column prop="link" label="链接" align="center">
          <template slot-scope="scope">
            {{ scope.row.link | linkType }}
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag type="success" size="small" v-if="scope.row.status === 1">上架</el-tag>
            <el-tag type="danger" size="small" v-else>下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="default"
              @click="handleEdit(scope.row)">
              修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleStatus(scope.row)">
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
    <!-- 新增/编辑 -->
    <el-drawer
      title="新增/编辑"
      :visible.sync="drawer"
      with-header
      size="30%"
      :before-close="handleClose">
      <el-form
        :model="detailData"
        label-width="80px"
        :rules="detailFormRules"
        size="small"
        ref="detailForm"
        @submit.native.prevent>
        <el-form-item label="模块" prop="type">
          <el-select v-model="detailData.type" class="input-width">
            <el-option
              v-for="item in moduleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-select v-model="detailData.link" class="input-width">
            <el-option
              v-for="item in linkTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="detailData.sort" type="number" min="1" class="input-width" />
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="handleSubmit" style="width: 100px">保 存</el-button>
          <el-button @click="handleClose" style="width: 100px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { getRecommendList, moduleList, addRecommend, updateRecommend, updateRecommendStatus } from "@/api/recommend";
import { types } from "@/api/wish";

export default {
  name: "Recommend",
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
        type: null,
        link: null,
        sort: null,
      },
      detailFormRules: {
        type: [{ required: true, message: "请选择模块", trigger: "blur" }],
        link: [
          { required: true, message: "请选择链接", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      }
    };
  },
  created() {
    this.getList();
  },
  computed: {
    linkTypes() {
      return this.detailData.type === 1 ? types : []; // 寺庙文创暂时没有
    },
  },
  filters: {
    linkType(value) {
      return types.find(item => item.value === value)?.label;
    },
    moduleType(value) {
      return moduleList.find(item => item.value === value)?.label;
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      getRecommendList(this.listQuery)
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
        updateRecommendStatus(row).then(() => {
          this.$message.success("操作成功");
          this.getList();
        });
      });
    },
    handleSubmit() {
      this.$refs.detailForm.validate((valid) => {
        if (valid) {
          if (this.detailData.id) {
            updateRecommend(this.detailData).then(() => {
              this.$message.success("操作成功");
              this.getList();
            });
          } else {
            addRecommend(this.detailData).then(() => {
              this.$message.success("操作成功");
              this.getList();
            });
          }
          this.handleClose();
        }
      });
    },
    handleClose() {
      this.detailData = {
        id: null,
        type: null,
        link: null,
        sort: null,
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
