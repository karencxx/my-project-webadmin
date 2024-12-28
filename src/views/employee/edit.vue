<template>
  <div class="app-container">
    <el-card class="form-container" shadow="never">
      <el-form
        :model="employeeForm"
        :rules="rules"
        ref="employeeForm"
        label-width="150px"
        size="small"
        v-loading="loading">
        <el-form-item label="员工姓名：" prop="name">
          <el-input v-model="employeeForm.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="role">
          <el-input v-model="employeeForm.role" class="input-width"></el-input>
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
          <el-input v-model="employeeForm.phone" class="input-width"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('employeeForm')">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updateEmployee } from '@/api/employee'

export default {
  name: 'EditEmployee',
  data() {
    return {
      loading: false,
      employeeForm: {
        id: undefined,
        name: '',
        role: '',
        organization: undefined,
        phone: ''
      },
      organizationOptions: [
        { label: '流量团队', value: 0 },
        { label: '管理层', value: 1 }
      ],
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
  created() {
    const employee = this.$route.query.employee
    if (employee) {
      this.employeeForm = JSON.parse(employee)
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateEmployee(this.employeeForm).then(response => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$router.push('/employee/list')
          })
        }
      })
    },
    onCancel() {
      this.$router.push('/employee/list')
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
</style> 