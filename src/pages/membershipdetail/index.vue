<template>
  <div class="detail">
      <div class='membershipForm'>
        <div class='membershipIcon'>
        <image src='https://shop.guqinet.com/html/images/shanquan/memberIcon.jpg'></image>
        </div>
        <div class='membershiptitle'>微分销详细信息提交</div>
        <form @submit='btnform'>
        <div class='membershipFormList'>
            <input placeholder='姓名' name="name"></input>
        </div>
        <div class='membershipFormList'>
            <input type='number' placeholder='电话' name="mobile"></input>
        </div>
        <div class='membershipFormList'>
            <input placeholder='身份证号码' name="IDcard"></input>
        </div>
        <div class='membershipFormList'>
            <input placeholder='银行卡号' name="bankcard" type='number'></input>
        </div>
        <div class='membershipFormList'>
            <input placeholder='开户银行' name="depositBlank"></input>
        </div>
        <button class='formBtn' form-type='submit'>提交并支付{{money}}元</button>
        <!--负责提交的按钮-->
        </form>
    </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"; 

export default {
  data () {
    return {
            money:''
    }
  },

  components: {
   
  },

  methods: {
    //表单提交事件
    btnform(s){
      console.log(s);
      var e=s.mp;
      console.log(e.detail.value.IDcard);
        var that = this;
    if (e.detail.value.IDcard == "" || e.detail.value.IDcard.length!=18) {
      wx.showToast({
        title: '身份证格式错误',
        icon: 'loading'
      })
    }else if(e.detail.value.name==''){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'loading'
      })
    }else if(e.detail.value.mobile==''){
       wx.showToast({
        title: '电话不能为空',
        icon: 'loading'
      })
    }
    else if (e.detail.value.bankcard == "") {
      wx.showToast({
        title: '银行卡号为空',
        icon: 'loading'
      })
    }
    else if (e.detail.value.depositBlank == "") {
      wx.showToast({
        title: '开户银行为空',
        icon: 'loading'
      })
    } else {
      wx.showLoading({
        title: '请稍等',
      })
      var parms = {}
      parms.name= e.detail.value.name
      parms.mobile= e.detail.value.mobile
      parms.referrer= ''
       parms.lvid= that.memberIdlvId;
      parms.memberId = that.memberId
      parms.midentity = e.detail.value.IDcard
      parms.cardno = e.detail.value.bankcard
      parms.depositBank = e.detail.value.depositBlank
      wx.request({
        url: globalStore.state.api + '/api/distribe/submitDistribeApply',
        data: {
          params: JSON.stringify(parms)
        },
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
         if(res.data.code==0){
          //  订单提交成功，唤起微信支付
          let payParms={}
          var  sn = Date.parse(new Date())
           payParms.orderid = Date.parse(new Date())
           payParms.total_fee = that.money*100 
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
                         let orderParm={}
                         orderParm.sn = sn
                         orderParm.payMoney =that.money
                         orderParm.payStatus  = 0
                         orderParm.memberId = that.memberId
                         wx.request({
                           url: globalStore.state.api + "/api/distribe/payOrder",
                           method:"POST",
                           data: {
                             params: JSON.stringify(orderParm)
                           },
                           header: {
                             'Content-Type': 'application/x-www-form-urlencoded'
                           },
                           method:"POST",
                           success: function (res) {
                             console.log(res.data)
                             if(res.data.code==0){
                               wx.redirectTo({
                                 url: '../micromember/main',
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
    }


    }
  },

  onLoad:function(options){
    var that=this;
      var memberId = wx.getStorageSync('memberId');
      var memberIdlvId=wx.getStorageSync('memberIdlvId');
      that.money=options.money;
      that.memberId=memberId;
      that.memberIdlvId=memberIdlvId;

      console.log("============")
      console.log(options)
      console.log(that.memberIdlvId);
      


  }


     
}
</script>

<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.membershipForm{width: 95%;margin: 10rpx auto;background: #fff;padding-top:20rpx;padding-bottom: 40rpx;box-sizing: border-box; }
.membershipIcon{width: 71rpx;height: 65rpx;overflow: hidden;margin: 0 auto;}
.membershiptitle{width: 100%;text-align: center;color: #F5E698;margin-top: 10rpx;margin-bottom: 40rpx;}
.membershipFormList{height: 100rpx;width: 80%;margin: 0 auto;border-bottom: 1rpx solid #C5C5C5;}
.membershipFormList input{width: 100%;height: 100%;text-align: center;}
.formBtn{width: 400rpx;height: 80rpx;line-height: 80rpx;text-align: center;background: #F5E698;color: #fff;margin: 0 auto;border-radius: 200rpx;margin-top: 40rpx;}
</style>
