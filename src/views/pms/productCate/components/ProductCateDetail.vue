<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productCate" :rules="rules" ref="productCateForm" label-width="150px">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="productCate.name"></el-input>
      </el-form-item>
      <el-form-item label="上级分类：">
        <el-select v-model="productCate.parentId" placeholder="请选择分类">
          <el-option
            v-for="item in selectProductCateList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量单位：">
        <el-input v-model="productCate.productUnit"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="productCate.sort"></el-input>
      </el-form-item>
      <el-form-item label="图标：">
        <single-upload v-model="productCate.icon"></single-upload>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="productCate.description">
        </el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="productCate.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示在导航栏：">
        <el-radio-group v-model="productCate.navStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productCateForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('productCateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { fetchList, createProductCate, updateProductCate, getProductCate } from '@/api/productCate'
import SingleUpload from '@/components/Upload/singleUpload'

const defaultProductCate = {
  description: '',
  icon: '',
  keywords: '',
  name: '',
  navStatus: 0,
  parentId: 0,
  productUnit: '',
  showStatus: 0,
  sort: 0
}

export default {
  name: 'ProductCateDetail',
  components: { SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      productCate: Object.assign({}, defaultProductCate),
      selectProductCateList: [],
      rules: {
        name: [
          { required: true, message: '请输入品类名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getSelectProductCateList()
    if (this.isEdit) {
      getProductCate(this.$route.query.id).then(response => {
        this.productCate = response.data
      })
    }
  },
  methods: {
    getSelectProductCateList() {
      fetchList(0, { pageSize: 100, pageNum: 1 }).then(response => {
        let list = response.data.list
        this.selectProductCateList = []
        this.selectProductCateList.push({ value: 0, label: '无上级分类' })
        for (let i = 0; i < list.length; i++) {
          this.selectProductCateList.push({ value: list[i].id, label: list[i].name })
        }
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              updateProductCate(this.$route.query.id, this.productCate).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.back()
              })
            } else {
              createProductCate(this.productCate).then(response => {
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                })
                this.resetForm('productCateForm')
              })
            }
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.productCate = Object.assign({}, defaultProductCate)
    }
  }
}
</script>

<style>
.form-container {
  width: 800px;
}
</style> 