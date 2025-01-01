import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import Login from '@/views/login/index.vue'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(ElementUI)

jest.mock('element-ui', () => ({
  Message: jest.fn()
}))

describe('Login.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Login, {
      localVue,
      store,
      router,
      stubs: {
        'el-row': true,
        'el-col': true,
        'el-card': true,
        'el-form': true,
        'el-form-item': true,
        'el-input': true,
        'el-button': true
      },
      mocks: {
        $refs: {
          loginForm: {
            validate: jest.fn(callback => callback(true))
          }
        }
      }
    })
    jest.clearAllMocks()
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('TC001: 正常登录', async () => {
    // 准备测试数据
    const username = 'admin'
    const password = '123456'
    
    // 设置表单数据
    await wrapper.setData({
      loginForm: {
        username,
        password
      }
    })

    // 模拟表单验证通过
    wrapper.vm.$refs.loginForm.validate.mockImplementationOnce(callback => callback(true))

    // 模拟登录请求
    const mockLoginResponse = {
      code: 200,
      data: {
        token: 'mock-token',
        userInfo: {
          name: 'Admin'
        }
      }
    }
    jest.spyOn(store, 'dispatch').mockResolvedValueOnce(mockLoginResponse)

    // 触发登录
    await wrapper.vm.handleLogin()

    // 验证结果
    expect(wrapper.vm.$refs.loginForm.validate).toHaveBeenCalled()
    expect(store.dispatch).toHaveBeenCalledWith('user/login', {
      username,
      password
    })
    expect(router.push).toHaveBeenCalledWith('/dashboard')
  })

  it('TC002: 密码错误', async () => {
    // 准备测试数据
    const username = 'admin'
    const password = 'wrong-password'
    
    // 设置表单数据
    await wrapper.setData({
      loginForm: {
        username,
        password
      }
    })

    // 模拟表单验证通过
    wrapper.vm.$refs.loginForm.validate.mockImplementationOnce(callback => callback(true))

    // 模拟登录失败
    jest.spyOn(store, 'dispatch').mockRejectedValueOnce(new Error('密码错误'))

    // 触发登录
    await wrapper.vm.handleLogin()

    // 验证结果
    expect(wrapper.vm.$refs.loginForm.validate).toHaveBeenCalled()
    expect(Message).toHaveBeenCalledWith({
      message: '登录失败',
      type: 'error'
    })
    expect(router.push).not.toHaveBeenCalled()
  })

  it('TC003: 表单验证失败', async () => {
    // 模拟表单验证失败
    wrapper.vm.$refs.loginForm.validate.mockImplementationOnce(callback => callback(false))

    // 触发登录
    await wrapper.vm.handleLogin()

    // 验证结果
    expect(wrapper.vm.$refs.loginForm.validate).toHaveBeenCalled()
    expect(store.dispatch).not.toHaveBeenCalled()
    expect(router.push).not.toHaveBeenCalled()
  })
}) 