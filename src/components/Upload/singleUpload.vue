<template>
  <div>
    <el-upload
      class="image-uploader"
      :action="uploadAction"
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :before-upload="beforeUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="image-uploader-image" />
      <i v-else class="el-icon-plus image-uploader-icon"></i>
      <div class="image-tip" slot="tip">建议尺寸：{{ size }}，大小不超过2M</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "singleUpload",
  props: {
    value: String,
    size: {
      type: String,
      default: "",
    },
  },
  computed: {
    imageUrl() {
      return this.value;
    },
    uploadAction() {
      return process.env.VUE_APP_BASE_API + "/file/upload";
    },
  },
  methods: {
    handleUploadSuccess(res, file) {
      this.$emit("uploadSuccess", res.data);
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
.image-uploader {
  .image-uploader-icon {
    font-size: 30px;
    color: #999;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
  .image-uploader-image {
    width: 80px;
    height: 80px;
    display: block;
  }
  .image-tip {
    font-size: 12px;
    color: #999;
  }
}
</style>
