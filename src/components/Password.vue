<template>
  <el-dialog
    :title="isReset ? '重置密码' : '修改密码'"
    :visible.sync="visible"
    width="500px"
    :close-on-click-modal="false"
    @close="handleClose">
    <el-form
      ref="passwordForm"
      :model="passwordForm"
      :rules="rules"
      label-width="120px"
      size="small">
      <template v-if="!isReset">
        <el-form-item label="原密码：" prop="oldPassword">
          <el-input
            v-model.trim="passwordForm.oldPassword"
            type="password"
            show-password
            placeholder="请输入原密码">
          </el-input>
        </el-form-item>
      </template>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input
          v-model.trim="passwordForm.newPassword"
          type="password"
          show-password
          placeholder="请输入新密码">
        </el-input>
      </el-form-item>
      <el-form-item label="确认新密码：" prop="confirmPassword">
        <el-input
          v-model.trim="passwordForm.confirmPassword"
          type="password"
          show-password
          placeholder="请再次输入新密码">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="handleClose" size="small">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updatePassword, resetPassword } from '@/api/user'

export default {
  name: 'Password',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isReset: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 验证密码是否一致
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          this.loading = true
          const api = this.isReset ? resetPassword : updatePassword
          const params = this.isReset 
            ? { newPassword: this.passwordForm.newPassword }
            : this.passwordForm

          api(params)
            .then(() => {
              this.$message.success(this.isReset ? '重置成功' : '修改成功')
              this.handleClose()
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.$refs.passwordForm.resetFields()
      this.passwordForm = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
}

</style> 