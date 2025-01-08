import Vue from 'vue'
import { moduleOptions as articleModules } from '@/api/article'

// Vue.filter('wishTFilter', (value) => {
//     return wishTypes.find(item => item.value === value)?.label || ''
// })

Vue.filter('articleFilter', (value) => {
    return articleModules.find(item => item.value === value)?.label || ''
})