<template>
  <div class="app-container">
    <!-- 搜索表单 -->
    <el-card class="filter-container" shadow="never">
        <el-form
          ref="topAdsForm"
          :model="topAds"
          size="small"
          label-width="100px"
          :rules="topAdsRules">
          <el-form-item label="推广位：" prop="type">
            <el-select
              v-model="topAds.type"
              placeholder="请选择推广位">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片：" prop="imageUrl">
            <Upload 
              v-model="topAds.imageUrl" 
              size="230*690" 
              @uploadSuccess="handleUploadSuccess"/>
          </el-form-item>
          <el-form-item label=" ">
            <el-button style="width: 100px" type="primary" @click="saveTopAds">保 存</el-button>
          </el-form-item>
        </el-form>
    </el-card>

    <div class="table-container">
      <el-table :data="list" style="width: 100%" v-loading="listLoading" size="small">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="祈福类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="祈福性质"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="goDetail(scope.row)">
              详情
            </el-button>
            <el-button size="mini" type="text" @click="goGoods(scope.row)">
              商品
            </el-button>
            <el-button size="mini" type="text" @click="goActivity(scope.row)">
              活动列表
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
        :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getWishList, types } from "@/api/wish";
import Upload from "@/components/Upload/singleUpload.vue";

export default {
  name: "WishList",
  components: {
    Upload,
  },
  filters: {
    typeFilter(value) {
      return types[value];
    },
  },
  data() {
    return {
      types,
      listQuery: {
        page: 1,
        size: 10,
      },
      list: [],
      total: 0,
      listLoading: false,
      topAds: {
        type: null,
        imageUrl: "",
      },
      topAdsRules: {
        type: [{ required: true, message: '请选择祈福类型', trigger: 'change' }],
        imageUrl: [{ required: true, message: '请上传图片', trigger: 'change' }],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSearchList() {
      this.listQuery.page = 1;
      this.getList();
    },
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
    goDetail(row) {
      const { id, type = '丝带祈福', property = '祈福' } = row
      this.$router.push({
        path: '/wish/type/detail',
        query: {
          id,
          type,
          property
        }
      });
    },
    goGoods(row) {
      this.$router.push({
        path: '/wish/type/goodList',
        query: {
          id: row.id
        }
      })
    },
    goActivity(row) {
      this.$router.push({
        path: '/wish/type/activityList',
        query: {
          id: row.id
        }
      })
    },
    handleUploadSuccess(res) {
      this.topAds.imageUrl = res.data;
    },
    saveTopAds() {
      console.log(this.topAds);
      this.$refs.topAdsForm.validate((valid) => {
        if (valid) {
          // addWish(this.topAds).then((res) => {
          //   this.$message.success('保存成功');
          // });
        }
      });
    }
  },
};
</script>
