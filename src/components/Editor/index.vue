<template>
  <div class="editor-container">
    <div ref="editor"></div>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    // 上传图片的配置
    uploadConfig: {
      type: Object,
      default: () => ({
        showLinkImg: false,
        uploadImgMaxSize: 2 * 1024 * 1024, // 2M
        uploadImgMaxLength: 5,
        uploadImgServer: process.env.VUE_APP_BASE_API + '/file/upload',
        uploadFileName: 'file',
        uploadImgHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    },
    // 菜单配置
    menus: {
      type: Array,
      default: () => [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        // 'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'video',  // 插入视频
        'table',  // 表格
        // 'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      editor: null,
      currentValue: ''
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.currentValue) {
          this.currentValue = val
          this.editor?.txt.html(val)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.initEditor()
  },
  beforeDestroy() {
    this.editor?.destroy()
    this.editor = null
  },
  methods: {
    initEditor() {
      const editor = new E(this.$refs.editor)

      // 配置菜单
      editor.config.menus = this.menus
      
      // 配置编辑区域高度
      editor.config.height = this.height
      
      // 配置上传图片
      Object.assign(editor.config, this.uploadConfig)
      
      // 配置 onchange 回调函数
      editor.config.onchange = (html) => {
        this.currentValue = html
        this.$emit('input', html)
        this.$emit('change', html)
      }

      // 创建编辑器
      editor.create()
      
      // 设置初始内容
      if (this.value) {
        editor.txt.html(this.value)
      }

      this.editor = editor
    }
  }
}
</script>

<style lang="less" scoped>
.editor-container {
  :deep(.w-e-text-container) {
    z-index: 100 !important;
  }
  :deep(.w-e-menu-panel) {
    z-index: 101 !important;
  }
  :deep(.w-e-toolbar) {
    z-index: 102 !important;
  }
}
</style>
