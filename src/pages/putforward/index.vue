<template>
  <div class="提现">
     <div class='putforward'>
      <div class='putforwardcard'>
        <div class='title'>到账银行卡:</div>
        <div>{{depositBank}}({{cardno}})</div>
      </div>
      <div class='putforwardnum'>
        <div class='title'>提现金额</div>
        <div class='putforwardinpt'>￥ <input placeholder='请输入提现金额' placeholder-style='font-weight: inherit;color:rgb(163, 163, 163);font-size:28rpx;' @input="bindKeyInput" auto-focus :value='inputValue'></input></div>
      </div>
      <div class='tip'>当前账号余额为{{balance}}元,<text class='allforward' @click='allforward()'>全部提现</text></div>
      <div class='putforwardbtn' @click='putforwardbtn()'>立即提现</div>
    </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";

export default {
  data () {
    return {
             inputValue:'',
             depositBank:'',
             cardno:'',
             balance:''
    }
  },

  components: {
 
  },

  methods: {
   allforward(){
      var that=this;  
      that.inputValue=that.balance
   },
   bindKeyInput(e){
     console.log(e);
    var that=this;
    that.inputValue=e.mp.detail.value 
   },
   putforwardbtn(){
    var that=this;
    if (that.balance*1 <that.inputValue*1) {
      wx.showToast({
        title: '账号余额不足',
        icon: "none"
      })
    }
    else{
      var parms = {}
      parms.memberId = that.memberId
      parms.amount = that.inputValue

      wx.request({
        url: globalStore.state.api + '/api/distribe/withdraw',
        data: {
          params: JSON.stringify(parms)
        },
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if(res.data.code==0){
            wx.showToast({
              title: '提现申请成功',
            })
            that.balance=that.balance-that.inputValue;
            that.inputValue='';
            setTimeout(function(){
              wx.navigateTo({
                url: '../micromember/main',
              })
            },1000)
           
          }
          else{
            wx.showToast({
              title: '提现申请失败',
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '../micromember/main',
              })
            }, 1000)
          }
        }
      })
    }
   }
  },

  onLoad: function (options) {
    var that=this;
    var memberId = wx.getStorageSync('memberId');
    that.balance=options.balance;
    that.cardno=options.cardno.slice(-4);
    that.depositBank=options.depositBank;
    that.memberId=memberId;
  }
}
</script>

<style scoped>

.tip{font-size: rgb(131, 131, 131);font-size: 28rpx;}
.putforward{background: #fff;width: 95%;margin: 20rpx auto;padding-left: 20rpx;box-sizing: border-box;padding-bottom: 30rpx;}
.putforwardcard{display: flex;height: 80rpx;line-height: 80rpx;font-size: 32rpx;}
.title{font-size: 32rpx; margin-right: 20rpx;height: 80rpx;line-height: 80rpx;}
.putforwardinpt{height: 100rpx;border-bottom:1rpx solid #ddd; width: 90%;display:flex;align-items: center;}
.putforwardinpt input{height: 100%;font-size: 40rpx;font-weight: bold;}
.tip{height: 80rpx;line-height: 80rpx;}
.putforwardbtn{width: 80%;margin: 30rpx auto;color: #fff;background: #F5E698;height: 100rpx;line-height: 100rpx;text-align: center;border-radius: 50rpx;}
</style>
