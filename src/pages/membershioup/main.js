import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '圈圈充值',
    navigationBarBackgroundColor: '#FFF',
    navigationBarTextStyle: 'black'
  }
}