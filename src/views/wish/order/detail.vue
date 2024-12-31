<template>
  <div class="app-container">
    <el-card class="form-container mb-10" shadow="never">
      <el-descriptions :column="3" border size="small">
        <el-descriptions-item label="祈福类型">{{ formData.type | wishType }}</el-descriptions-item>
        <el-descriptions-item label="用户昵称">{{ formData.name }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ formData.phone }}</el-descriptions-item>
        <el-descriptions-item label="祈福时间">{{ formData.createTime }}</el-descriptions-item>
        <el-descriptions-item label="祈福数量">{{ formData.number }}</el-descriptions-item>
        <el-descriptions-item label="祈福金额">¥{{ (formData.amount || 0 )/ 100 }}</el-descriptions-item>
        <el-descriptions-item label="祈福者">{{ formData.wishName }}</el-descriptions-item>
        <el-descriptions-item label="祈福祝语">{{ formData.wishContent }}</el-descriptions-item>
        <el-descriptions-item label="祈福状态">{{ formData.wishStatus }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="form-container" shadow="never">
      <wish-upload 
        :order-id="formData.id"
        @success="handleUploadSuccess">
      </wish-upload>
    </el-card>
  </div>
</template>

<script>
import { getWishOrderDetail, types } from '@/api/wish'
import WishUpload from './detail-upload'

export default {
  name: 'WishDetail',
  components: {
    WishUpload
  },
  data() {
    return {
      formData: {
        id: null,
        type: null,
        name: '',
        phone: null,
        createTime: null,
        status: null,
        wishName: null,
        wishContent: null,
        wishImages: null,
        wishVideos: null,
        wishStatus: null,
      }
    }
  },
  created() {
    this.formData.id = this.$route.query.id
    this.getDetail()
  },
  filters: {
    wishType(value) {
      return types.find(item => item.value === value)?.label
    }
  },
  methods: {
    getDetail() {
      getWishOrderDetail(this.formData.id).then(response => {
        this.formData = response.data
      }).catch(() => {
        this.$message.error('获取详情失败')
      })
    },
    handleUploadSuccess() {
      this.getDetail()
    }
  }
}
</script>

<style lang="less" scoped>
.mb-10 {
  margin-bottom: 10px;
}
</style> 