<template>
  <div class="app-container">
    <el-card class="form-container" shadow="never">
      <el-form
        :model="bannerForm"
        :rules="rules"
        ref="bannerForm"
        label-width="100px"
        size="small"
        v-loading="loading">
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
        <el-form-item label="上传图片：" prop="imageUrl">
          <singleUpload v-model="bannerForm.imageUrl" size="690*766" @uploadSuccess="handleUploadSuccess"/>
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
          <el-button type="default" @click="article.show = true">选择文章</el-button>
          <el-row class="mt-10" v-if="article.selectData.id">
            <el-col :span="3"> 已选择</el-col>
            <el-col> 标题： {{ article.selectData.title }}</el-col>
            <el-col> 模块： {{ article.selectData.module | articleFilter }}</el-col>
            <el-col> 链接： {{ article.selectData.jumpUrl }}</el-col>
          </el-row>
        </el-form-item>
        <el-form-item label=" " class="form-btn-footer">
          <el-button type="primary" size="medium" @click="onSubmit('bannerForm')" style="width: 100px;">提交</el-button>
          <el-button size="medium" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <template v-if="article.show">
      <articleDialog 
        :show="article.show" 
        :selectData="article.selectData"
        @update:show="handleClose" 
        @select="handleSelectArticle" />
    </template>
  </div>
</template>

<script>
import { updateBanner } from '@/api/banner'
import { moduleOptions, genArticleLink } from '@/api/article'
import singleUpload from '@/components/Upload/singleUpload.vue'
import articleDialog from '@/views/article/dialog.vue'

export default {
  name: 'EditBanner',
  components: {
    singleUpload,
    articleDialog
  },
  data() {
    const validateJumpModule = (value, callback) => {
      if (this.bannerForm.isJump && !value) {
        callback(new Error('请选择跳转模块'))
      } else {
        callback()
      }
    }
    const validateJumpUrl = (value, callback) => {
      if (this.bannerForm.isJump && !value) {
        callback(new Error('请选择文章'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      bannerForm: {
        id: null,
        position: null,
        imageUrl: '',
        isJump: false,
        jumpModule: null,
        jumpUrl: ''
      },
      positionOptions: [
        { label: '首页', value: 0 },
        { label: '法物流通', value: 1 }
      ],
      jumpModuleOptions: moduleOptions,
      rules: {
        position: [
          { required: true, message: '请选择位置', trigger: 'change' }
        ],
        imageUrl: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        jumpModule: [
          { validator: validateJumpModule, trigger: 'change' }
        ],
        jumpUrl: [
          { validator: validateJumpUrl, trigger: 'blur' }
        ]
      },
      article: {
        selectData: {},
        show: false
      }
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.bannerForm = this.$store.getters['transferData']
      console.log(this.bannerForm)
    }
  },
  watch: {
    'bannerForm.isJump': function(newVal, oldVal) {
      if (newVal) {
        this.bannerForm.jumpModule = null
        this.bannerForm.jumpUrl = ''
        this.article.show = false
      }
    }
  },
  methods: {
    handleUploadSuccess(response) {
      if (response) { // code === 200
        this.bannerForm.imageUrl = response.url
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败')
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          updateBanner(this.bannerForm).then(response => {
            this.loading = false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$router.push('/banner/list')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    onCancel() {
      this.$router.push('/banner/list')
    },
    handleSelectArticle(data) {
      data.jumpUrl = genArticleLink(data)
      this.bannerForm.jumpUrl = data.jumpUrl
      this.article.selectData = data
      this.handleClose(false)

    },
    handleClose(data) {
      this.article.show = data
    }
  }
}
</script>

<style lang="less" scoped>

</style> 