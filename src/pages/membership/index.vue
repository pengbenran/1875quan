<template>
    <div class='membership'>
    <div class='membershipForm'>
    <div class='membershipIcon'>
        <image src='https://shop.guqinet.com/html/images/shanquan/memberIcon.jpg'></image>
    </div>
    <div class='membershiptitle'>微分销信息提交</div>
    <form @submit='btnform'>
        <div class='membershipFormList'>
        <input placeholder='姓名' name="username"></input>
        </div>
        <div class='membershipFormList'>
        <input placeholder='联系方式' name="tel" type='number'></input>
        </div>
        <button class='formBtn' form-type='submit'>提交</button>
    </form>

    </div>
    </div>
</template>

<script>
import globalStore from "../../stores/global-store"; 

export default {
  data () {
    return {
      memberDOList:[],
      hasmember:false 
    }
  },

  components: {
 
  },

  methods: {
  //表单数据加载
   btnform(s){
          var e=s.mp;
           var that=this;
            console.log(e.detail.value)
            if (e.detail.value.username==""){
            wx.showToast({
                title: '姓名为空',
                icon:'loading'
            })
            }
            else if (e.detail.value.tel == "" || e.detail.value.tel.length != 11){
            wx.showToast({
                title: '号码格式错误',
                icon: 'loading'
            })
            }else{
            wx.showLoading({
                title: '请稍等',
            })
            var parms = {}
            parms.memberId = that.memberId
            parms.name = e.detail.value.username
            parms.mobile = e.detail.value.tel
            parms.lvid = that.ivId
            wx.request({
            url: globalStore.state.api +'/api/distribe/submitDistribeApply',
            data:{
                params: JSON.stringify(parms)
            },
            method:"POST",
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                if(res.data.code==0){
                wx.hideLoading();
                wx.showToast({
                    title: '提交成功',
                    duration:2000,
                })
                setTimeout(function(){
                    wx.switchTab({
                    url: '../my/main',
                    })
                },2000)
                
                }
            }
            })
            }
   
   }

  },

  onLoad: function (options) {
      var that=this;
      var memberId = wx.getStorageSync('memberId')
      that.ivId=options.lvId;
      that.memberId=memberId;
  }
}
</script>

<style scoped>
/* pages/membership/membership.wxss */
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
