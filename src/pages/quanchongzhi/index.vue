<template>
  <div class="chongzhi" >
    <div class="header"><image :src="headerimg"></image></div>
    <div class="headerbtn">
        <div class="price" v-for="(item,index) in  quanquanPayDOList" :key="key" :index="index" @click="next(item.pay,item.quanPayId)">
            <span>{{item.pay}} 元</span>
            <small>实际到账{{item.quanAmount}}圈圈</small>
        </div>
    </div>
    <!-- <div class="tijiao" @click="next()"><span>微信支付</span> <div class="info">提示：一次性消费1元等于1圈圈</div> </div> -->
     <div class="tip">
       <p>充值规则</p>
       <p>1、充值对象为商圈所有会员</p>
       <p>2、当圈圈数量大于500不能再次充值</p>
     </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"

export default {
  data () {
    return {
       headerimg: globalStore.state.imgapi+'image/quanbran02.jpg',
       syswidth:0,
       sysheight:0,
       pay:0,
       quanAmount:0,
       quanquanPayDOList:[]
    }
  },

  components: {
   
  },

  methods: {
    //提交付款
      next(paymoney,quanPayId){
        let that=this;
        let memberId=wx.getStorageSync('memberId');  
        wx.request({
         url: globalStore.state.api + "/api/member/judgeQuanUp",
         data: {
           memberId:memberId
         },
         header: {
           'content-type': 'application/json' 
         },
         success: function (res) {
         if(res.data.status==1){
             wx.showToast({
             title: res.data.msg,
             icon: 'none',
             duration: 2000
           })
          }
          else{
          let payParms={}
          var  sn = Date.parse(new Date())
           payParms.orderid = Date.parse(new Date())
           payParms.total_fee = paymoney*100 
           payParms.sn = sn
            wx.login({
             success: function (res) {
               if (res.code) {
                 //发起网络请求
                 wx.request({
                   url: globalStore.state.api + "/api/pay/prepay",
                   data: {
                     code: res.code,
                     parms: payParms,
                     
                   },
                   method: 'GET',
                   success: function (res) {
                     var pay = res.data
                     wx.requestPayment({
                       timeStamp: pay.timeStamp,
                       nonceStr: pay.nonceStr,
                       package: pay.package,
                       signType: pay.signType,
                       paySign: pay.paySign,
                       success: function (res) {
                         wx.showToast({
                           title: '支付成功',
                           icon: 'success',
                           duration: 2000
                         })
                
                         wx.request({
                           url: globalStore.state.api + "/api/member/quanquanUp",
                           data: {
                             quanPayId:quanPayId,
                             memberId:memberId
                           },
                           header: {
                             'content-type': 'application/json' 
                           },
                           success: function (res) {
                                if(res.data.status==0){
                                  wx.switchTab({
                                      url: '../my/main',
                                  })
                              }
                           }
                         })
                       }
                     })
                   }
                 })
               }
             }
           })
    
          }
        }
      })





       
          // wx.showModal({
          //   title: '提示',
          //   content: '你还不是会员',
          //   success: function(res) {
          //     if (res.confirm) {
          //       console.log("点了确定")
          //       wx.redirectTo({
          //         url: '../my/main',
          //       })
          //     } else if (res.cancel) {
          //       console.log("点了取消")
          //       wx.redirectTo({
          //         url: '../my/main',
          //       })
          //     }
          //   }
          // })
        
        
      },
      //请求数据列表
    onloads(){
        let that=this;
        wx.request({
          url:globalStore.state.api+'/api/member/quanquanUpList', //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            console.log("获取到浮夸列表数据")
            console.log(res.data);
            console.log(res.data.quanquanPayDOList[0].quanPayId);
            if(res.data.code==0){
              that.quanquanPayDOList=res.data.quanquanPayDOList
            }
          }
        })
    },
   
  },

  onLoad(options){
       this.onloads();
       console.log(options.lvidname);
  }
 
}
</script>

<style scoped>
.chongzhi{background: #fff;height: 100vh;}
image{width: 100%;height: 100%;display: block;}  

.header{height: 350rpx;}
.headerbtn{padding-top: 30rpx;padding-bottom: 30rpx;text-align: center; display: flex; justify-content: space-around;}
.price{width: 36%;margin: auto;border-top:1px solid #f5f5f5;padding-top: 16rpx;padding-bottom: 16rpx;border-radius: 10rpx;
    box-shadow: 0 10rpx 50rpx rgba(0,0,0,0.1);}
.price small{font-size: 26rpx;color: #c1c1c1;padding-top: 10rpx;}

.tijiao{padding-top:40rpx;text-align: center;}
.tijiao span{display: inline-block;width: 40%;background: #111111;color:#fff;line-height: 58rpx;border-radius: 15rpx;text-align: center;margin: auto;}
.tijiao .info{font-size: 26rpx;color: #c1c1c1;padding-top: 15rpx;}
.tip{ font-size: 0.8em; color: #ccc;position: absolute; left: 150rpx;bottom: 100rpx;}
</style>
