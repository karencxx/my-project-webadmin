<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productSaleForm" label-width="120px" class="form-inner-container" size="small">
      <el-form-item label="赠送积分：">
        <el-input v-model="value.giftPoint"></el-input>
      </el-form-item>
      <el-form-item label="赠送成长值：">
        <el-input v-model="value.giftGrowth"></el-input>
      </el-form-item>
      <el-form-item label="积分购买限制：">
        <el-input v-model="value.usePointLimit"></el-input>
      </el-form-item>
      <el-form-item label="预告商品：">
        <el-switch
          v-model="value.previewStatus"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="商品上架：">
        <el-switch
          v-model="value.publishStatus"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="商品推荐：">
        <span style="margin-right: 10px">新品</span>
        <el-switch
          v-model="value.newStatus"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
        <span style="margin-left: 10px;margin-right: 10px">推荐</span>
        <el-switch
          v-model="value.recommandStatus"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="服务保证：">
        <el-checkbox-group v-model="selectServiceList">
          <el-checkbox :label="1">无忧退货</el-checkbox>
          <el-checkbox :label="2">快速退款</el-checkbox>
          <el-checkbox :label="3">免费包邮</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="详细页标题：">
        <el-input v-model="value.detailTitle"></el-input>
      </el-form-item>
      <el-form-item label="详细页描述：">
        <el-input v-model="value.detailDesc"></el-input>
      </el-form-item>
      <el-form-item label="商品关键字：">
        <el-input v-model="value.keywords"></el-input>
      </el-form-item>
      <el-form-item label="商品备注：">
        <el-input v-model="value.note"></el-input>
      </el-form-item>
      <el-form-item label="选择优惠方式：">
        <el-radio-group v-model="value.promotionType">
          <el-radio :label="0">无优惠</el-radio>
          <el-radio :label="1">特惠促销</el-radio>
          <el-radio :label="2">会员价格</el-radio>
          <el-radio :label="3">阶梯价格</el-radio>
          <el-radio :label="4">满减价格</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="value.promotionType===1">
        <div class="littleMargin">特惠促销</div>
        <div class="littleMargin">
          开始时间：
          <el-date-picker
            class="input-width"
            v-model="value.promotionStartTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择开始时间">
          </el-date-picker>
        </div>
        <div class="littleMargin">
          结束时间：
          <el-date-picker
            class="input-width"
            v-model="value.promotionEndTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择结束时间">
          </el-date-picker>
        </div>
        <div class="littleMargin">
          促销价格：
          <el-input class="input-width" v-model="value.promotionPrice" placeholder="输入促销价格"></el-input>
        </div>
      </el-form-item>
      <el-form-item v-if="value.promotionType===2">
        <div class="littleMargin">会员价格</div>
        <div v-for="(item, index) in value.memberPriceList" 
             :key="index" 
             class="littleMargin">
          {{item.memberLevelName}}：
          <el-input class="input-width" v-model="item.memberPrice"></el-input>
        </div>
      </el-form-item>
      <el-form-item v-if="value.promotionType===3">
        <div class="littleMargin">阶梯价格</div>
        <el-table style="width: 80%" 
                  :data="value.productLadderList"
                  border>
          <el-table-column
            label="数量"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.count"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="折扣"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.discount"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleRemoveProductLadder(scope.$index, scope.row)">删除
              </el-button>
              <el-button
                type="text"
                @click="handleAddProductLadder(scope.$index, scope.row)">添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-if="value.promotionType===4">
        <div class="littleMargin">满减价格</div>
        <el-table style="width: 80%" 
                  :data="value.productFullReductionList"
                  border>
          <el-table-column
            label="满"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fullPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="立减"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.reducePrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleRemoveFullReduction(scope.$index, scope.row)">删除
              </el-button>
              <el-button
                type="text"
                @click="handleAddFullReduction(scope.$index, scope.row)">添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写商品信息</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步，填写商品属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ProductSaleDetail',
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectServiceList: [],
      memberPriceList: []
    }
  },
  created() {
    if (this.value.serviceIds != null) {
      let serviceArr = this.value.serviceIds.split(',')
      this.selectServiceList = serviceArr.map(item => parseInt(item))
    }
  },
  watch: {
    selectServiceList: function(newValue) {
      let serviceIds = ''
      newValue.forEach(item => {
        serviceIds += item + ','
      })
      if (serviceIds.length > 0) {
        serviceIds = serviceIds.substr(0, serviceIds.length - 1)
      }
      this.value.serviceIds = serviceIds
    }
  },
  methods: {
    handleRemoveProductLadder(index, row) {
      let productLadderList = this.value.productLadderList
      if (productLadderList.length === 1) {
        productLadderList.pop()
        productLadderList.push({
          count: 0,
          discount: 0,
          price: 0
        })
      } else {
        productLadderList.splice(index, 1)
      }
    },
    handleAddProductLadder(index, row) {
      let productLadderList = this.value.productLadderList
      if (productLadderList.length < 3) {
        productLadderList.push({
          count: 0,
          discount: 0,
          price: 0
        })
      } else {
        this.$message({
          message: '最多只能添加三条',
          type: 'warning'
        })
      }
    },
    handleRemoveFullReduction(index, row) {
      let fullReductionList = this.value.productFullReductionList
      if (fullReductionList.length === 1) {
        fullReductionList.pop()
        fullReductionList.push({
          fullPrice: 0,
          reducePrice: 0
        })
      } else {
        fullReductionList.splice(index, 1)
      }
    },
    handleAddFullReduction(index, row) {
      let fullReductionList = this.value.productFullReductionList
      if (fullReductionList.length < 3) {
        fullReductionList.push({
          fullPrice: 0,
          reducePrice: 0
        })
      } else {
        this.$message({
          message: '最多只能添加三条',
          type: 'warning'
        })
      }
    },
    handlePrev() {
      this.$emit('prevStep')
    },
    handleNext() {
      this.$emit('nextStep')
    }
  }
}
</script>

<style scoped>
.littleMargin {
  margin-top: 10px;
}

.input-width {
  width: 220px;
}
</style> 