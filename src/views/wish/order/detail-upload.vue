<template>
  <div class="upload-container">
    <el-form ref="uploadForm" :model="uploadForm" label-width="100px" size="small">
      <el-form-item label="祈福图片：" prop="images">
        <multi-upload
          v-model="uploadForm.images"
          :limit="6"
          @upload-success="handleImageSuccess">
        </multi-upload>
      </el-form-item>
      <el-form-item label="祈福视频：" prop="videoUrl">
        <multi-upload
          v-model="uploadForm.videos"
          type="video"
          :limit="6"
          :max-size="500"
          @upload-success="handleVideoSuccess">
        </multi-upload>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="handleSubmit" :loading="loading" style="width: 100px;">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadWishVideo } from '@/api/wish'
import MultiUpload from '@/components/Upload/multiUpload'

export default {
  name: 'WishUpload',
  components: {
    MultiUpload
  },
  props: {
    orderId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: false,
      uploadForm: {
        orderId: '',
        images: [],
        videos: []
      }
    }
  },
  watch: {
    orderId: {
      handler(val) {
        this.uploadForm.orderId = val
      },
      immediate: true
    }
  },
  computed: {
    orderIdList() {
      return String(this.orderId).split(',')
    },
    isMultiple() {
      return this.orderIdList.length > 1
    }
  },
  methods: {
    handleImageSuccess({ fileList }) {
      console.log('图片上传成功:', fileList)
    },
    handleVideoSuccess({ fileList }) {
      console.log('视频上传成功:', fileList)
    },
    handleSubmit() {
      if (this.uploadForm.images.length === 0 && this.uploadForm.videos.length === 0) {
        this.$message.warning('请至少上传一张图片或一个视频')
        return
      }

      this.loading = true
      
      // 如果是批量上传，需要循环处理每个订单
      const uploadPromises = this.orderIdList.map(id => {
        return uploadWishVideo({
          ...this.uploadForm,
          orderId: id
        })
      })

      Promise.all(uploadPromises)
        .then(() => {
          this.$message.success('上传成功')
          this.$emit('success')
        })
        .catch(() => {
          this.$message.error('部分订单上传失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    resetForm() {
      this.uploadForm = {
        orderId: this.orderId,
        images: [],
        videos: []
      }
      this.$refs.uploadForm?.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.upload-container {
  padding: 20px;

  .upload-header {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;

    .title {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
