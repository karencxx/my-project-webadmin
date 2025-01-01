import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import EmployeeList from '@/views/employee/list.vue'
import EmployeeDetail from '@/views/employee/components/EmployeeDetail.vue'
import { addEmployee, getEmployeeList } from '@/api/employee'

const localVue = createLocalVue()
localVue.use(ElementUI)

jest.mock('@/api/employee')
jest.mock('element-ui', () => ({
  Message: jest.fn()
}))

describe('Employee Management', () => {
  describe('EmployeeList.vue', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(EmployeeList, {
        localVue,
        stubs: {
          'el-card': true,
          'el-form': true,
          'el-form-item': true,
          'el-input': true,
          'el-select': true,
          'el-option': true,
          'el-button': true,
          'el-table': true,
          'el-table-column': true,
          'el-drawer': true
        }
      })
      jest.clearAllMocks()
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('TC003: 添加员工', async () => {
      // 模拟获取列表数据
      const mockList = [
        { id: 1, name: '张三', role: '管理员', organization: 0, phone: '13800138000' }
      ]
      getEmployeeList.mockResolvedValueOnce({ data: { list: mockList, total: 1 } })

      // 打开添加抽屉
      await wrapper.vm.handleAdd()
      expect(wrapper.vm.drawer).toBe(true)

      // 验证抽屉组件存在
      const drawerComponent = wrapper.findComponent(EmployeeDetail)
      expect(drawerComponent.exists()).toBe(true)
    })
  })

  describe('EmployeeDetail.vue', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(EmployeeDetail, {
        localVue,
        propsData: {
          organizationOptions: [
            { label: '流量团队', value: 0 },
            { label: '管理层', value: 1 }
          ]
        },
        stubs: {
          'el-form': true,
          'el-form-item': true,
          'el-input': true,
          'el-select': true,
          'el-option': true,
          'el-button': true
        },
        mocks: {
          $refs: {
            employeeForm: {
              validate: jest.fn(callback => callback(true)),
              resetFields: jest.fn()
            }
          }
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('TC003: 添加员工表单提交', async () => {
      // 准备测试数据
      const employeeData = {
        name: '张三',
        role: '管理员',
        organization: 0,
        phone: '13800138000'
      }

      // 设置表单数据
      await wrapper.setData({
        employeeForm: employeeData
      })

      // 模拟添加成功
      addEmployee.mockResolvedValueOnce({ code: 200 })

      // 触发提交
      await wrapper.vm.onSubmit('employeeForm')

      // 验证结果
      expect(addEmployee).toHaveBeenCalledWith(employeeData)
      expect(Message).toHaveBeenCalledWith({
        message: '添加成功',
        type: 'success'
      })
      expect(wrapper.emitted('submit-success')).toBeTruthy()
    })

    it('表单验证 - 手机号格式', async () => {
      // 设置错误的手机号
      await wrapper.setData({
        employeeForm: {
          name: '张三',
          role: '管理员',
          organization: 0,
          phone: '12345' // 错误格式
        }
      })

      // 触发提交
      await wrapper.vm.onSubmit('employeeForm')

      // 验证未调用添加接口
      expect(addEmployee).not.toHaveBeenCalled()
    })

    it('表单验证失败', async () => {
      // 模拟表单验证失败
      wrapper.vm.$refs.employeeForm.validate.mockImplementationOnce(callback => callback(false))

      // 触发提交
      await wrapper.vm.onSubmit('employeeForm')

      // 验证结果
      expect(wrapper.vm.$refs.employeeForm.validate).toHaveBeenCalled()
      expect(addEmployee).not.toHaveBeenCalled()
    })
  })
}) 