<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productAttr" :rules="rules" ref="productAttrForm" label-width="150px">
      <el-form-item label="属性名称：" prop="name">
        <el-input v-model="productAttr.name"></el-input>
      </el-form-item>
      <el-form-item label="商品类型：">
        <el-select v-model="productAttr.productAttributeCategoryId" placeholder="请选择">
          <el-option
            v-for="item in productAttributeCategoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类筛选样式:">
        <el-radio-group v-model="productAttr.filterType">
          <el-radio :label="0">普通</el-radio>
          <el-radio :label="1">颜色</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="能否进行检索:">
        <el-radio-group v-model="productAttr.searchType">
          <el-radio :label="0">不需要检索</el-radio>
          <el-radio :label="1">关键字检索</el-radio>
          <el-radio :label="2">范围检索</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品属性关联:">
        <el-radio-group v-model="productAttr.relatedStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="属性是否可选:">
        <el-radio-group v-model="productAttr.selectType">
          <el-radio :label="0">唯一</el-radio>
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="属性值的录入方式:">
        <el-radio-group v-model="productAttr.inputType">
          <el-radio :label="0">手工录入</el-radio>
          <el-radio :label="1">从列表中选取</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="属性值可选值列表:">
        <el-input
          type="textarea"
          :autosize="true"
          placeholder="请输入内容"
          v-model="productAttr.inputList">
        </el-input>
      </el-form-item>
      <el-form-item label="排序属性：">
        <el-input v-model="productAttr.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productAttrForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('productAttrForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { fetchList as fetchProductAttributeCategoryList } from '@/api/productAttrCate'
import { createProductAttr, getProductAttr, updateProductAttr } from '@/api/productAttr'

const defaultProductAttr = {
  filterType: 0,
  handAddStatus: 0,
  inputList: '',
  inputType: 0,
  name: '',
  productAttributeCategoryId: 0,
  relatedStatus: 0,
  searchType: 0,
  selectType: 0,
  sort: 0,
  type: 0
}

export default {
  name: 'ProductAttrDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      productAttr: Object.assign({}, defaultProductAttr),
      productAttributeCategoryOptions: [],
      rules: {
        name: [
          { required: true, message: '请输入属性名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getProductAttributeCategoryList()
    if (this.isEdit) {
      getProductAttr(this.$route.query.id).then(response => {
        this.productAttr = response.data
      })
    }
  },
  methods: {
    getProductAttributeCategoryList() {
      fetchProductAttributeCategoryList({ pageSize: 100, pageNum: 1 }).then(response => {
        let list = response.data.list
        this.productAttributeCategoryOptions = []
        for (let i = 0; i < list.length; i++) {
          this.productAttributeCategoryOptions.push({ label: list[i].name, value: list[i].id })
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
              updateProductAttr(this.$route.query.id, this.productAttr).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.back()
              })
            } else {
              createProductAttr(this.productAttr).then(response => {
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                })
                this.resetForm('productAttrForm')
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
      this.productAttr = Object.assign({}, defaultProductAttr)
    }
  }
}
</script>

<style>
</style> 