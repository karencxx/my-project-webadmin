<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productAttrForm" label-width="120px" class="form-inner-container" size="small">
      <el-form-item label="属性类型：">
        <el-select v-model="value.productAttributeCategoryId"
                   placeholder="请选择属性类型"
                   @change="handleProductAttrChange">
          <el-option
            v-for="item in productAttributeCategoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格：">
        <el-card shadow="never" class="cardBg">
          <div v-for="(productAttr,idx) in selectProductAttr" :key="productAttr.id">
            {{productAttr.name}}：
            <el-checkbox-group v-if="productAttr.handAddStatus===0" v-model="selectProductAttr[idx].values">
              <el-checkbox v-for="item in getInputListArr(productAttr.inputList)" :label="item" :key="item"
                           class="littleMarginLeft"></el-checkbox>
            </el-checkbox-group>
            <div v-else>
              <el-checkbox-group v-model="selectProductAttr[idx].values">
                <div v-for="(item,index) in selectProductAttr[idx].options" 
                     :key="item"
                     style="display: inline-block"
                     class="littleMarginLeft">
                  <el-checkbox :label="item" :key="item"></el-checkbox>
                  <el-button type="text" class="littleMarginLeft" @click="handleRemoveProductAttrValue(idx,index)">删除
                  </el-button>
                </div>
              </el-checkbox-group>
              <el-input v-model="addProductAttrValue" style="width: 160px;margin-left: 10px" clearable></el-input>
              <el-button class="littleMarginLeft" @click="handleAddProductAttrValue(idx)">增加</el-button>
            </div>
          </div>
        </el-card>
        <el-table style="width: 100%;margin-top: 20px"
                  :data="value.skuStockList"
                  border>
          <el-table-column
            v-for="(item,index) in selectProductAttr"
            :label="item.name"
            :key="item.id"
            align="center">
            <template slot-scope="scope">
              {{getProductSkuSp(scope.row,index)}}
            </template>
          </el-table-column>
          <el-table-column
            label="销售价格"
            width="100"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="商品库存"
            width="80"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.stock"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="库存预警值"
            width="80"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.lowStock"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="SKU编号"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.skuCode"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
            align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleRemoveProductSku(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          style="margin-top: 20px"
          @click="handleRefreshProductSkuList()">刷新列表
        </el-button>
      </el-form-item>
      <el-form-item label="商品参数：">
        <el-card shadow="never" class="cardBg">
          <div v-for="(item,index) in selectProductParam" :key="item.id">
            {{item.name}}：
            <el-select v-if="item.inputType===1" v-model="selectProductParam[index].value">
              <el-option
                v-for="item in getParamInputList(item.inputList)"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-input v-else
                      v-model="selectProductParam[index].value"
                      style="width: 300px;"></el-input>
          </div>
        </el-card>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写商品促销</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步，选择商品关��</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchList as fetchProductAttrCateList } from '@/api/productAttrCate'
import { fetchList as fetchProductAttrList } from '@/api/productAttr'
import { getProductAttrInfo } from '@/api/productAttr'

export default {
  name: 'ProductAttrDetail',
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //商品属性分类下拉选项
      productAttributeCategoryOptions: [],
      //选中的商品属性
      selectProductAttr: [],
      //选中的商品参数
      selectProductParam: [],
      //新增的商品属性值
      addProductAttrValue: null,
      //商品属性表格数据
      productAttrCateList: []
    }
  },
  created() {
    this.getProductAttrCateList()
    if(this.isEdit) {
      if(this.value.productAttributeCategoryId!=null){
        this.handleProductAttrChange(this.value.productAttributeCategoryId)
      }
    }
  },
  methods: {
    handleProductAttrChange(value) {
      this.getProductAttrList(value)
    },
    getProductAttrList(value) {
      fetchProductAttrList(value).then(response => {
        let list = response.data.list
        this.selectProductAttr = []
        this.selectProductParam = []
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.type === 0) {
            if(this.isEdit){
              item.values = this.getEditAttrValues(item)
            }else{
              item.values = []
            }
            this.selectProductAttr.push(item)
          } else if (item.type === 1) {
            if(this.isEdit){
              item.value = this.getEditParamValue(item)
            }else{
              item.value = ''
            }
            this.selectProductParam.push(item)
          }
        }
      })
    },
    getProductAttrCateList() {
      let listQuery = {pageNum: 1, pageSize: 100}
      fetchProductAttrCateList(listQuery).then(response => {
        this.productAttributeCategoryOptions = []
        let list = response.data.list
        for (let i = 0; i < list.length; i++) {
          this.productAttributeCategoryOptions.push({
            label: list[i].name,
            value: list[i].id
          })
        }
      })
    },
    getInputListArr(inputList) {
      return inputList.split(',')
    },
    handleRefreshProductSkuList() {
      this.$confirm('刷新列表将导致sku信息重新生成，是否要刷新', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.refreshProductAttrPics()
        this.refreshProductSkuList()
      })
    },
    handleRemoveProductSku(index, row) {
      let list = this.value.skuStockList
      if (list.length === 1) {
        list.pop()
      } else {
        list.splice(index, 1)
      }
    },
    getParamInputList(inputList) {
      return inputList.split(',')
    },
    handlePrev() {
      this.$emit('prevStep')
    },
    handleNext() {
      this.mergeProductAttrValue()
      this.$emit('nextStep')
    },
    mergeProductAttrValue() {
      this.value.productAttributeValueList = []
      for (let i = 0; i < this.selectProductAttr.length; i++) {
        let attr = this.selectProductAttr[i]
        if (attr.values && attr.values.length > 0) {
          this.value.productAttributeValueList.push({
            productAttributeId: attr.id,
            value: this.getProductSkuSp(attr.values)
          })
        }
      }
      for (let i = 0; i < this.selectProductParam.length; i++) {
        let param = this.selectProductParam[i]
        this.value.productAttributeValueList.push({
          productAttributeId: param.id,
          value: param.value
        })
      }
    }
  }
}
</script>

<style scoped>
.littleMarginLeft {
  margin-left: 10px;
}

.littleMarginTop {
  margin-top: 10px;
}

.paramInput {
  width: 250px;
}

.paramInputLabel {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 10px;
}

.cardBg {
  background: #F8F9FC;
}
</style> 