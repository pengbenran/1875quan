import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '会员申请',
     navigationBarBackgroundColor: '#FFF',
    navigationBarTextStyle: 'black'
  }
}