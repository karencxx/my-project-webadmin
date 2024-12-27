<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productRelationForm" label-width="120px" class="form-inner-container" size="small">
      <el-form-item label="关联专题：">
        <el-transfer
          style="display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入专题名称"
          v-model="selectSubject"
          :titles="subjectTitles"
          :data="subjectList">
        </el-transfer>
      </el-form-item>
      <el-form-item label="关联优选：">
        <el-transfer
          style="display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入优选名称"
          v-model="selectPrefrenceArea"
          :titles="prefrenceAreaTitles"
          :data="prefrenceAreaList">
        </el-transfer>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写商品属性</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchList as fetchSubjectList } from '@/api/subject'
import { fetchList as fetchPrefrenceAreaList } from '@/api/prefrenceArea'

export default {
  name: 'ProductRelationDetail',
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      subjectList: [], // 专题列表
      prefrenceAreaList: [], // 优选列表
      selectSubject: [], // 选中的专题
      selectPrefrenceArea: [], // 选中的优选
      subjectTitles: ['可选专题', '已选专题'],
      prefrenceAreaTitles: ['可选优选', '已选优选']
    }
  },
  created() {
    this.getSubjectList()
    this.getPrefrenceAreaList()
  },
  methods: {
    handlePrev() {
      this.$emit('prevStep')
    },
    handleFinishCommit() {
      this.$emit('finishCommit', this.isEdit)
    },
    // 过滤方法
    filterMethod(query, item) {
      return item.label.indexOf(query) > -1
    },
    // 获取专题列表
    getSubjectList() {
      fetchSubjectList({ pageNum: 1, pageSize: 100 }).then(response => {
        let list = response.data.list
        for (let i = 0; i < list.length; i++) {
          this.subjectList.push({
            label: list[i].title,
            key: list[i].id
          })
        }
      })
    },
    // 获取优选列表
    getPrefrenceAreaList() {
      fetchPrefrenceAreaList({ pageNum: 1, pageSize: 100 }).then(response => {
        let list = response.data.list
        for (let i = 0; i < list.length; i++) {
          this.prefrenceAreaList.push({
            label: list[i].name,
            key: list[i].id
          })
        }
      })
    }
  },
  watch: {
    selectSubject(newValue) {
      let subjectProductRelationList = []
      if (newValue != null && newValue.length > 0) {
        for (let i = 0; i < newValue.length; i++) {
          subjectProductRelationList.push({ subjectId: newValue[i] })
        }
      }
      this.value.subjectProductRelationList = subjectProductRelationList
    },
    selectPrefrenceArea(newValue) {
      let prefrenceAreaProductRelationList = []
      if (newValue != null && newValue.length > 0) {
        for (let i = 0; i < newValue.length; i++) {
          prefrenceAreaProductRelationList.push({ prefrenceAreaId: newValue[i] })
        }
      }
      this.value.prefrenceAreaProductRelationList = prefrenceAreaProductRelationList
    }
  }
}
</script>

<style>
</style> 