import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main', 'pages/my/main', 'pages/group/main'
    , 'pages/hunshaindex/main', 'pages/jiancaiindex/main', 'pages/shumaindex/main', 'pages/meirongindex/main', 'pages/lvyouindex/main'
    , 'pages/cart/main', 'pages/peixunindex/main', 'pages/xiemaoindex/main','pages/shumalist/main','pages/shumainfo/main','pages/dingdan/main'
    ,'pages/address/main','pages/xinaddress/main','pages/jifen/main','pages/orderdetail/main','pages/tuikuan/main','pages/orderinfo/main',
    'pages/grouplist/main','pages/groupdetail/main','pages/membershipdetail/main','pages/micromember/main','pages/distribeposter/main','pages/memberlist/main'
    ,'pages/quanchongzhi/main','pages/quanduihuan/main','pages/dingdaninfo/main','pages/memberconsume/main','pages/addresschange/main',
   ,'pages/putforward/main','pages/zhekouinfo/main','pages/join/main','pages/collection/main',
    'pages/collagedetails/main','pages/dingdan2/main','pages/store/main','pages/storeruzhu/main','pages/shoplist/main',
    'pages/membermanage/main','pages/membership/main','pages/membershioup/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#F64F57',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: '#fff'
    }, 
     tabBar: {
      "selectedColor":"#e93429",
      "list": [
        {
            pagePath: "pages/index/main",
            iconPath: "/static/images/shouye.png",
            selectedIconPath: "/static/images/shouye1.png",
            text: "首页"
          },     
          {
            pagePath: "pages/group/main",
            iconPath: "/static/images/all.png",
            selectedIconPath: "/static/images/all1.png",
            text: "圈圈"
          },
          {
            pagePath: "pages/cart/main",
            iconPath: "/static/images/cart.png",
            selectedIconPath: "/static/images/cart1.png",
            text: "购物车"
          },
          {
            pagePath: "pages/my/main",
            iconPath: "/static/images/my.png",
            selectedIconPath: "/static/images/my.png",
            text: "我的"
          }
  ]
}
  }
}
