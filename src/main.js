import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from '@/components/SvgIcon'

Vue.use(ElementUI)
Vue.config.productionTip = false
// 开启vue devtools
Vue.config.devtools = true

// 全局注册 svg-icon 组件
Vue.component('svg-icon', SvgIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') 