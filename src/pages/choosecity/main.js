import Vue from 'vue'
import App from './index'

const app = new Vue(App)
Vue.prototype.globalData = getApp().globalData
app.$mount()
export default {
  config: {
    navigationBarTitleText: '切换城市',
    "enablePullDownRefresh": true
  }
}