<template>
  <div class="app-container">
    <el-card class="form-container" shadow="never">
      <el-form
        :model="bannerForm"
        :rules="rules"
        ref="bannerForm"
        label-width="150px"
        size="small">
        <el-form-item label="位置：" prop="position">
          <el-select v-model="bannerForm.position" placeholder="请选择" class="input-width">
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Banner图片：" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload">
            <img v-if="bannerForm.imageUrl" :src="bannerForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="image-tip">建议尺寸：750*350像素，大小不超过2M</div>
        </el-form-item>
        <el-form-item label="是否跳转：">
          <el-switch v-model="bannerForm.isJump"></el-switch>
        </el-form-item>
        <el-form-item label="跳转模块：" prop="jumpModule" v-if="bannerForm.isJump">
          <el-select v-model="bannerForm.jumpModule" placeholder="请选择" class="input-width">
            <el-option
              v-for="item in jumpModuleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转链接：" prop="jumpUrl" v-if="bannerForm.isJump">
          <el-input v-model="bannerForm.jumpUrl" class="input-width" placeholder="请输入跳转链接"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('bannerForm')">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addBanner } from '@/api/banner'
import { getToken } from '@/utils/auth'

export default {
  name: 'AddBanner',
  data() {
    const validateJumpModule = (rule, value, callback) => {
      if (this.bannerForm.isJump && !value) {
        callback(new Error('请选择跳转模块'))
      } else {
        callback()
      }
    }
    const validateJumpUrl = (rule, value, callback) => {
      if (this.bannerForm.isJump && !value) {
        callback(new Error('请输入跳转链接'))
      } else {
        callback()
      }
    }
    return {
      bannerForm: {
        position: undefined,
        imageUrl: '',
        isJump: false,
        jumpModule: undefined,
        jumpUrl: ''
      },
      positionOptions: [
        { label: '首页', value: 0 },
        { label: '法物流通', value: 1 }
      ],
      jumpModuleOptions: [
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
          { required: true, message: '请上传Banner图片', trigger: 'change' }
        ],
        jumpModule: [
          { validator: validateJumpModule, trigger: 'change' }
        ],
        jumpUrl: [
          { validator: validateJumpUrl, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleUploadSuccess(response) {
      if (response.code === 200) {
        this.bannerForm.imageUrl = response.data.url
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败')
      }
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
          addBanner(this.bannerForm).then(response => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$router.push('/banner/list')
          })
        }
      })
    },
    onCancel() {
      this.$router.push('/banner/list')
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

.image-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 10px;
}
</style> 