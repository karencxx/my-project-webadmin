<template>
  <div class="app-container">
    <el-card class="form-container" shadow="never">
      <el-form
        :model="formData"
        :rules="rules"
        ref="wishForm"
        label-width="100px"
        size="small"
        v-loading="loading">
        <el-form-item label="祈福类型" prop="type">
          {{ formData.type }}
        </el-form-item>
        <el-form-item label="祈福性质" prop="property">
          {{ formData.property }}
        </el-form-item>
        <el-form-item label="是否周期性"> 
          <el-switch v-model="formData.check" />
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="formData.name" class="input-width" maxlength="50" />
        </el-form-item>
        <el-form-item label="每月活动日期" prop="date" v-if="formData.check">
          <JDatePicker v-model="formData.date" :showLunarControl="false" />
        </el-form-item>
        <el-form-item label="上传图片" prop="imageUrl">
          <MultiUpload v-model="formData.imageUrl" size="690*790" :limit="9" @upload-success="handleUploadSuccess" />
        </el-form-item>
        <el-form-item label="详情" prop="content">
          <Editor v-model="formData.content" />
        </el-form-item>
        <el-form-item label=" ">
          <el-button style="width: 200px;" type="primary" @click="onSubmit()">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updateWish } from '@/api/wish'
import MultiUpload from '@/components/Upload/multiUpload.vue'
import JDatePicker from 'vue-jlunar-datepicker'
import Editor from '@/components/Editor'
export default {
  name: 'EditWish',
  components: {
    MultiUpload,
    JDatePicker,
    Editor
  },
  data() {
    const validateDate = (rule, value, callback) => {
      if (this.formData.check && !value) {
        callback(new Error('请选择日期'))
      }
      callback()
    }
    return {
      loading: false,
      formData: {
        id: null,
        type: null,
        property: null,
        imageUrl: null,
        content: null,
        check: false,
        date: new Date(),
        name: ''
      },
      rules: {
        imageUrl: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请选择日期', validator: this.validateDate }
        ],
        content: [
          { required: true, message: '请输入祈福内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.formData.id = this.$route.query.id
    this.formData.type = this.$route.query.type
    this.formData.property = this.$route.query.property
  },
  methods: {
    handleUploadSuccess(res, file) {
      // this.formData.imageUrl = response.data.url
      console.log(res, file)
    },
    onSubmit() {
      this.$refs['wishForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          updateWish(this.formData).then(response => {
            this.loading = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$router.push('/wish/list')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<!-- <style lang="less" scoped>
.form-container {
  width: 800px;
  margin: 20px auto;
}

.input-width {
  width: 370px;
}

.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
    &:hover {
      border-color: #409EFF;
    }
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>  -->