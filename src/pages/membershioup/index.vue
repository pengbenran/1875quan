<template>
  <div class="indexContainer">
    <div class='membershioup'>
        <div class='membershiouphead'>
            <div class='membershioupbcg' :style="{width:ImageWidth,height:ImageHeight}">
            <image src='https://shop.guqinet.com/html/images/shanquan/membershipup.jpg'></image>
            </div>
            <div class='membershioupname'>
            {{name}}
            </div>
            <div class='membershioupavator'>
            <image :src='face'></image>
            </div> 
            <!-- <view class='membergard'>
            <view>大众</view>
            <view>金卡</view>
            </view> -->
            <div class='membershioupIntro'>
            <div class='membershioupIntroleft'>
                当前会员等级为{{name}}，查{{needpay}}元就能成为{{memberLvList[1].name}}，享受更多分润
            </div>
            <div class='membershioupIntroright' bindtap='membershioup'>
                立即升级
            </div>
            </div>  
        </div>
        <div class='membergarddetail'>
            <div class='title'>成长介绍</div>
            <div class='membergardtitle'>
            <div>会员</div>
            <div>分润</div>
            <div>价格</div>
            </div>
            <div class='membergardlist' v-for="(item,index) in memberLvList" :index='index' :key="item">
            <div>{{item.name}}</div>
            <div>{{item.discount}}%</div>
            <div style='color: #C19657'>{{item.point}}元</div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import globalStore from "../../stores/global-store";

export default {
  data () {
    return {
        memberLvList:[],
        ImageWidth:0,
        ImageHeight:0,
        name:'',
        face:'',
        needpay:''
    }
  },

  components: {
 
  },

  methods: {
   membershioup(){
    var that=this;
    let payParms = {}
    var sn = Date.parse(new Date())
    payParms.orderid = Date.parse(new Date())
    payParms.total_fee = that.needpay*100
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
                  let orderParm = {}
                  orderParm.sn = sn
                  orderParm.payMoney = that.needpay
                  orderParm.payStatus = 1
                  orderParm.nowlvid = that.memberLvList[1].lvId
                  orderParm.memberId = that.memberId
                  wx.request({
                    url: globalStore.state.api  + "/api/distribe/payOrder",
                    method: "POST",
                    data: {
                      params: JSON.stringify(orderParm)
                    },
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: "POST",
                    success: function (res) {
                      console.log(res.data)
                      if (res.data.code == 0) {
                        wx.showToast({
                          title: '升级成功',
                        })
                        setTimeout(function(){
                          wx.navigateTo({
                            url: '../micromember/micromember',
                          })
                        },1000)
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

   },

   //初始化加载的数据
  },

  onLoad:function(options){
      var that=this;
        var memberId = wx.getStorageSync('memberId')
        wx.getSystemInfo({
        success: function (res) {
            that.ImageWidth=res.screenWidth + 'px';
            that.ImageHeight=res.screenWidth / 1.503 + 'px';
            that.memberId=memberId;
            that.name=options.name;
            that.face=options.face;
         }
        })
        wx.request({
        url: globalStore.state.api + '/api/distribe/memberLvList',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            if (res.data.code == 0) {
                that.memberLvList=res.data.memberLvList;
                that.needpay=res.data.memberLvList[1].point - res.data.memberLvList[0].point;
            }
            console.log("------------")
            console.log(that.memberLvList)
         }
        })

  }
}
</script>

<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.indexContainer{background: #fff;height: 100vh;}
.membergarddetail{background: #f8f8f8;}

.membershiouphead{position: relative;}
.membershioupname{position: absolute;top: 20rpx;left: 90rpx;color: #E9E9E9;}
.membershioupavator{width: 100rpx;height: 100rpx;overflow: hidden;position: absolute;left: 24%;top: 35%;border-radius: 50%;overflow: hidden;}
.membergard{width: 54%;display: flex;justify-content: space-between;padding:0 50rpx;box-sizing: border-box; position: absolute;top: 60%;left: 20%;font-size: 0.6rem;}
.membershioupIntro{width: 100%;position: absolute;bottom: 10rpx;left: 0rpx;display: flex;padding: 0rpx 30rpx 20rpx 20rpx;box-sizing: border-box; }
.membershioupIntroleft{flex-grow:1 ;color: #fff;font-size: 28rpx;}
.membershioupIntroright{width: 300rpx;height: 80rpx;line-height: 80rpx;background: #F9EFAD;text-align: center;font-size: 30rpx;border-radius: 40rpx;}
.membergarddetail{background: #fff;}    
.membergardtitle{display: flex;background: #FAF4E8;color: #C19657;}
.title{height: 100rpx;line-height: 100rpx;padding-left: 20rpx;box-sizing: border-box;}
.membergardtitle view{width: 33%;text-align: center;height: 80rpx;line-height: 80rpx;font-size: 35rpx;}
.membergardlist{display: flex}
.membergardlist view{width: 33%;text-align: center;height: 80rpx;line-height: 80rpx;font-size: 34rpx;}
</style>
