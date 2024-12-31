<template>
  <el-form
    :model="employeeForm"
    :rules="rules"
    ref="employeeForm"
    label-width="120px"
    size="small"
    class="form-container">
    <el-form-item label="员工姓名：" prop="name">
      <el-input v-model.trim="employeeForm.name" class="input-width"></el-input>
    </el-form-item>
    <el-form-item label="角色：" prop="role">
      <el-input v-model.trim="employeeForm.role" class="input-width"></el-input>
    </el-form-item>
    <el-form-item label="所属组织：" prop="organization">
      <el-select v-model="employeeForm.organization" placeholder="请选择" class="input-width">
        <el-option
          v-for="item in organizationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="手机号：" prop="phone">
      <el-input v-model.trim="employeeForm.phone" class="input-width"></el-input>
    </el-form-item>
    <el-form-item label=" " class="form-btn-footer">
      <el-button type="primary" @click="onSubmit('employeeForm')" style="width: 100px;">提交</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addEmployee } from '@/api/employee'

export default {
  name: 'EmployeeDetail',
  props: {
    data: {
      type: Object,
      default: () => ({

      })
    },
    organizationOptions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    employeeForm: {
        name: '',
        role: '',
        organization: 0,
        phone: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请输入角色', trigger: 'blur' }
        ],
        organization: [
          { required: true, message: '请选择所属组织', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    data(newVal) {
      this.employeeForm = newVal
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addEmployee(this.employeeForm).then(response => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$emit('submit-success')
            this.resetForm(formName)
            this.onCancel()
          })
        }
      })
    },
    onCancel() {
        this.$emit('cancel')
        this.resetForm('employeeForm')
    },
    resetForm(formName = 'employeeForm') {
        this.employeeForm = {
            name: '',
            role: '',
            organization: 0,
            phone: ''
        }
        this.$refs[formName].resetFields()
    }
  }
}
</script>