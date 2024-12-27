<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" class="form-inner-container" size="small">
      <el-form-item label="商品分类：" prop="productCategoryId">
        <el-cascader
          v-model="selectProductCateValue"
          :options="productCateOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题：" prop="subTitle">
        <el-input v-model="value.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌：" prop="brandId">
        <el-select
          v-model="value.brandId"
          @change="handleBrandChange"
          placeholder="请选择品牌">
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品介绍：">
        <el-input
          :autoSize="true"
          v-model="value.description"
          type="textarea"
          placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商品货号：">
        <el-input v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="商品售价：">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价：">
        <el-input v-model="value.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品库存：">
        <el-input v-model="value.stock"></el-input>
      </el-form-item>
      <el-form-item label="计量单位：">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品重量：">
        <el-input v-model="value.weight" style="width: 300px"></el-input>
        <span style="margin-left: 10px">克</span>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="value.sort"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchList as fetchBrandList } from '@/api/brand'
import { fetchList as fetchProductCateList } from '@/api/productCate'

export default {
  name: 'ProductInfoDetail',
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //选中商品分类的值
      selectProductCateValue: [],
      //商品分类树形数据
      productCateOptions: [],
      //品牌列表
      brandOptions: [],
      //验证规则
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        subTitle: [
          { required: true, message: '请输入商品副标题', trigger: 'blur' }
        ],
        productCategoryId: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ],
        brandId: [
          { required: true, message: '请选择商品品牌', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getProductCateList()
    this.getBrandList()
  },
  watch: {
    selectProductCateValue: function(newValue) {
      if (newValue && newValue.length === 2) {
        this.value.productCategoryId = newValue[1]
        this.value.productCategoryName = this.getCateNameById(this.value.productCategoryId)
      } else {
        this.value.productCategoryId = null
        this.value.productCategoryName = null
      }
    }
  },
  methods: {
    //获取商品分类列表
    getProductCateList() {
      fetchProductCateList({ pageSize: 100, pageNum: 1 }).then(response => {
        let list = response.data.list
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
    //获取品牌列表
    getBrandList() {
      fetchBrandList({ pageNum: 1, pageSize: 100 }).then(response => {
        let brandList = response.data.list
        this.brandOptions = []
        for (let i = 0; i < brandList.length; i++) {
          this.brandOptions.push({
            label: brandList[i].name,
            value: brandList[i].id
          })
        }
      })
    },
    getCateNameById(id) {
      let name = null
      for (let i = 0; i < this.productCateOptions.length; i++) {
        for (let j = 0; j < this.productCateOptions[i].children.length; j++) {
          if (this.productCateOptions[i].children[j].value === id) {
            name = this.productCateOptions[i].children[j].label
            return name
          }
        }
      }
      return name
    },
    handleNext(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('nextStep')
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
    handleBrandChange(val) {
      let brandName = ''
      for (let i = 0; i < this.brandOptions.length; i++) {
        if (this.brandOptions[i].value === val) {
          brandName = this.brandOptions[i].label
          break
        }
      }
      this.value.brandName = brandName
    }
  }
}
</script>

<style>
</style> 