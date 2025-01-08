<template>
  <div class="app-container">
    <el-card class="form-container" shadow="never">
      <el-form
        ref="articleForm"
        :model="articleForm"
        :rules="rules"
        label-width="100px"
        size="small"
        v-loading="loading">
        <el-form-item label="标题：" prop="title">
          <el-input v-model.trim="articleForm.title" class="input-width" maxlength="50"></el-input>
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
          <singleUpload v-model="articleForm.imageUrl" size="690*940" @uploadSuccess="handleUploadSuccess" />
        </el-form-item>
        <el-form-item label="文章内容：" prop="content">
          <Editor v-model="articleForm.content" />
        </el-form-item>
        <el-form-item label=" " class="form-btn-footer">
          <el-button size="medium" type="primary" @click="onSubmit()" style="width: 200px;">提交</el-button>
          <el-button size="medium" @click="onCancel" style="width: 100px;">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleDetail, updateArticle, moduleOptions } from '@/api/article'
import Editor from '@/components/Editor'
import singleUpload from '@/components/Upload/singleUpload.vue'
export default {
  name: 'EditArticle',
  components: {
    Editor,
    singleUpload
  },
  data() {
    return {
      loading: false,
      articleForm: {
        id: null,
        title: '',
        module: null,
        imageUrl: '',
        content: ''
      },
      moduleOptions,
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
    const id = this.$route.query.id
    if (id) {
      // this.getArticleDetail(id)
      this.articleForm = this.$store.getters['transferData']
      console.log(this.articleForm)
      this.articleForm.imageUrl = 'http://dummyimage.com/690x940'
    }
  },
  methods: {
    getArticleDetail(id) {
      this.loading = true
      getArticleDetail(id).then(response => {
        this.loading = false
        this.articleForm = response.data
      }).catch(() => {
        this.loading = false
      })
    },
    handleUploadSuccess(response) {
      this.articleForm.imageUrl = response.url
    },
    onSubmit(formName = 'articleForm') {
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