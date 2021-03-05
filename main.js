import Vue from 'vue'
import App from './App'
import store from "@/common/store/index"

Vue.config.productionTip = false

// 过滤器
import * as filters from '@/common/utils/filter.js' 
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 全局函数
import * as global from '@/common/utils/prototype.js' 
Object.keys(global).forEach(key => {
  Vue.prototype["$" + key]=global[key]
})

App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
