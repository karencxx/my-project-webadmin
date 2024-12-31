<template>
  <div class="multi-upload">
    <el-upload
      :action="uploadAction"
      :file-list="fileList"
      :show-file-list="true"
      :before-upload="beforeUpload"
      :on-success="handleUploadSuccess"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      multiple
      :limit="limit"
      :list-type="listType"
      :on-exceed="handleExceed">
      <template v-if="type === 'video'">
        <el-button size="small">上传视频</el-button>
        <div class="upload-tip" slot="tip">
          支持 mp4 格式，大小不超过{{ maxSize }}MB
        </div>
      </template>
      <template v-else>
        <el-button size="small">上传图片</el-button>
        <div class="upload-tip" slot="tip">
          <span>建议<template v-if="size">尺寸：{{ size }}，</template>单个文件不超过{{ maxSize }}MB</span>
          <span v-if="limit">，最多可上传{{ limit }}个</span>
        </div>
      </template>
    </el-upload>

    <!-- 预览弹窗 -->
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <template v-if="type === 'video'">
        
      </template>
      <template v-else>
        <img width="100%" :src="dialogImageUrl" alt="">
      </template>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'MultiUpload',
  components: {

  },
  props: {
    // 文件列表，格式：[{name: xx, url: xx}]
    value: {
      type: Array,
      default: () => []
    },
    // 建议尺寸提示文字
    size: {
      type: String,
      default: ''
    },
    // 最大上传数量
    limit: {
      type: Number,
      default: 0
    },
    // 上传类型：image/video
    type: {
      type: String,
      default: 'image',
      validator: function(value) {
        return ['image', 'video'].indexOf(value) !== -1
      }
    },
    // 最大文件大小(MB)
    maxSize: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        autoplay: false,
        controls: true,
        preload: 'auto',
        fluid: true,
        sources: [{
          type: "video/mp4",
          src: ""
        }]
      }
    }
  },
  computed: {
    uploadAction() {
      return process.env.VUE_APP_BASE_API + '/file/upload'
    },
    listType() {
      return this.type === 'video' ? 'text' : 'picture'
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal) {
          this.fileList = newVal.map(item => {
            if (typeof item === 'string') {
              return { url: item }
            }
            return item
          })
        } else {
          this.fileList = []
        }
      },
      immediate: true
    }
  },
  methods: {
    // 上传前校验
    beforeUpload(file) {
      if (this.type === 'video') {
        const isMP4 = file.type === 'video/mp4'
        const isLtSize = file.size / 1024 / 1024 < this.maxSize

        if (!isMP4) {
          this.$message.error('只能上传 MP4 格式的视频!')
          return false
        }
        if (!isLtSize) {
          this.$message.error(`视频大小不能超过 ${this.maxSize}MB!`)
          return false
        }
        return true
      } else {
        const isImage = file.type.includes('image')
        const isLtSize = file.size / 1024 / 1024 < this.maxSize

        if (!isImage) {
          this.$message.error('只能上传图片文件!')
          return false
        }
        if (!isLtSize) {
          this.$message.error(`图片大小不能超过 ${this.maxSize}MB!`)
          return false
        }
        return true
      }
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      // 更新文件状态
      file.url = res.data
      file.name = res.data.substring(res.data.lastIndexOf('/') + 1)
      
      // 触发input事件更新v-model绑定的值
      this.$emit('input', this.fileList.map(item => item.url))
      // 触发上传成功事件
      this.$emit('upload-success', { file, fileList: this.fileList })
    },
    // 移除文件
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.$emit('input', fileList.map(item => item.url))
      this.$emit('remove', { file, fileList })
    },
    // 预览文件
    handlePreview(file) {
      if (this.type === 'video') {
        this.playerOptions.sources[0].src = file.url
      } else {
        this.dialogImageUrl = file.url
      }
      this.dialogVisible = true
    },
    // 超出限制提示
    handleExceed(files, fileList) {
      this.$message.warning(`最多只能上传 ${this.limit} 个文件`)
    }
  }
}
</script>

<style lang="less" scoped>
.multi-upload {
  .video-player {
    width: 100%;
    margin-bottom: 10px;
  }

  .upload-tip {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }
}
</style>
