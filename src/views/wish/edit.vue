<template>
  <div class="app-container">
    <el-card class="form-container" shadow="never">
      <el-form
        :model="wishForm"
        :rules="rules"
        ref="wishForm"
        label-width="150px"
        size="small"
        v-loading="loading">
        <el-form-item label="位置：" prop="position">
          <el-select v-model="wishForm.position" placeholder="请选择" class="input-width">
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主图：" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload">
            <img v-if="wishForm.imageUrl" :src="wishForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否跳转：">
          <el-switch v-model="wishForm.hasLink"></el-switch>
        </el-form-item>
        <el-form-item label="跳转模块：" v-if="wishForm.hasLink" prop="linkModule">
          <el-select v-model="wishForm.linkModule" placeholder="请选择" class="input-width">
            <el-option
              v-for="item in moduleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转链接：" v-if="wishForm.hasLink" prop="linkUrl">
          <el-input v-model="wishForm.linkUrl" class="input-width"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('wishForm')">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updateWish } from '@/api/wish'
import { getToken } from '@/utils/auth'

export default {
  name: 'EditWish',
  data() {
    return {
      loading: false,
      wishForm: {
        id: undefined,
        position: undefined,
        imageUrl: '',
        hasLink: false,
        linkModule: undefined,
        linkUrl: ''
      },
      positionOptions: [
        { label: '首页', value: 0 },
        { label: '法物流通', value: 1 }
      ],
      moduleOptions: [
        { label: '了解寺庙', value: 0 },
        { label: '禅修活动', value: 1 }
      ],
      uploadUrl: process.env.VUE_APP_BASE_URL + '/admin/upload/image',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      rules: {
        position: [
          { required: true, message: '请选择位置', trigger: 'change' }
        ],
        imageUrl: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        linkModule: [
          { required: true, message: '请选择跳转模块', trigger: 'change' }
        ],
        linkUrl: [
          { required: true, message: '请输入跳转链接', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const wish = JSON.parse(this.$route.query.wish)
    this.wishForm = {
      id: wish.id,
      position: wish.position,
      imageUrl: wish.imageUrl,
      hasLink: wish.hasLink,
      linkModule: wish.linkModule,
      linkUrl: wish.linkUrl
    }
  },
  methods: {
    handleUploadSuccess(response) {
      this.wishForm.imageUrl = response.data.url
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          updateWish(this.wishForm).then(response => {
            this.loading = false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$router.push('/wish/list')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    onCancel() {
      this.$router.push('/wish/list')
    }
  }
}
</script>

<style lang="less" scoped>
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
</style> 