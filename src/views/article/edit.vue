<template>
  <div class="app-container">
    <el-card class="form-container" shadow="never">
      <el-form
        :model="articleForm"
        :rules="rules"
        ref="articleForm"
        label-width="150px"
        size="small"
        v-loading="loading">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="articleForm.title" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="模块：" prop="module">
          <el-select v-model="articleForm.module" placeholder="请选择" class="input-width">
            <el-option
              v-for="item in moduleOptions"
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
            <img v-if="articleForm.imageUrl" :src="articleForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容：" prop="content">
          <el-input
            type="textarea"
            v-model="articleForm.content"
            :rows="15"
            class="input-width">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('articleForm')">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleDetail, updateArticle } from '@/api/article'
import { getToken } from '@/utils/auth'

export default {
  name: 'EditArticle',
  data() {
    return {
      loading: false,
      articleForm: {
        id: undefined,
        title: '',
        module: undefined,
        imageUrl: '',
        content: ''
      },
      moduleOptions: [
        { label: '了解寺庙', value: 0 },
        { label: '禅修活动', value: 1 }
      ],
      uploadUrl: process.env.VUE_APP_BASE_URL + '/admin/upload/image',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        module: [
          { required: true, message: '请选择模块', trigger: 'change' }
        ],
        imageUrl: [
          { required: true, message: '请上传主图', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const id = this.$route.params.id
    this.getArticleDetail(id)
  },
  methods: {
    getArticleDetail(id) {
      this.loading = true
      getArticleDetail(id).then(response => {
        this.loading = false
        const article = response.data
        this.articleForm = {
          id: article.id,
          title: article.title,
          module: article.module,
          imageUrl: article.imageUrl,
          content: article.content
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleUploadSuccess(response) {
      this.articleForm.imageUrl = response.data.url
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
          updateArticle(this.articleForm).then(response => {
            this.loading = false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$router.push('/article/list')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    onCancel() {
      this.$router.push('/article/list')
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