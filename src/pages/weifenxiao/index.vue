<template>
  <div class="indexContainer">
     <div class="topimg"><img :src="topimg"/></div>
     <div class="listimg"><img :src="listimg"></div>

      <div class="carewarp">
              <div class="caretitle"> <span><img :src="care03" /> 开通会员</span></div>
          <div v-if="!isSubmit">
              <div class="list" v-for="(item,index) in memberLvList" :index='index' :key='item'>
              <div class="careimg"><img :src="lvpicurl">
                  <div class="careinfo">
                      <div class="infotitle"><span>{{item.name}}</span><span class="tip">享受百分二的提成</span></div>
                      <div class="carebtn" @click="jump(item.lvId)">立即开通 ></div>
                  </div>
              </div>
              </div>
          </div>

          <div v-if="isSubmit">
             <div class="tip" v-if="!isPass">{{tip}}</div>
             <div class="tipconten" v-if="isPass" > 微分销会员审核已通过，请完善信息
                 <div class="jupminfodetail" @click="jupminfodetail()">立即完善</div>
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
      topimg: globalStore.state.imgapi + '/image/member.jpg', 
      listimg: globalStore.state.imgapi + '/image/intro.jpg', 
      care01:globalStore.state.imgapi + '/image/card1.jpg', 
      care02:globalStore.state.imgapi + '/image/card2.jpg', 
      care03:globalStore.state.imgapi + '/image/cart03.jpg', 
      lvpicurl:globalStore.state.imgapi + '/image/weifensrc.jpg', 
      disabled:false,
      memberLvList:[], 
      isSubmit:true,
      isPass:true,
      tip:''
    }
  },

  components: {
 
  },

  methods: {
  
  jump(lvId){
    wx.navigateTo({
      url: '../membership/main?lvId='+lvId,
    })
  },
  jupminfodetail(){
    var that=this;
    wx.navigateTo({
      url: '../membershipdetail/main?money=' + that.money,
    })
  },

  onloads(){
    var that=this;
    var memberId = wx.getStorageSync('memberId')
    that.memberId=memberId,
    wx.request({
    url: globalStore.state.api + '/api/distribe/whetherSubmit',
    headers: {
        'Content-Type': 'application/json'
    },
    data:{
        memberId: that.memberId
    },
    success: function (res) {
        if (res.data.code == 1) {
             console.log("检测是否请求")
            that.isSubmit=false,
           wx.request({
            url: globalStore.state.api + '/api/distribe/memberLvList',
            headers: {
            'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log("检测是否请求-----+++------")
                   
                if(res.data.code==0){
                    that.memberLvList=res.data.memberLvList
                  console.log(that.memberLvList);
                  console.log("---------------")
                }
            }
        })
        }
        else{
            that.isSubmit=true,
        wx.request({
            url: globalStore.state.api + '/api/distribe/whetherPass',
            headers: {
            'Content-Type': 'application/json'
            },
            data:{
            memberId: that.memberId
            },
            success: function (res) {
                console.log("=====");
                console.log(res.data);
            if(res.data.msg=="未审核"){
                that.isPass=false,
                that.tip=' 微分销会员申请已经提交，请等待审核结果'
            }
            else if(res.data.msg=="未通过审核"){
                that.isPass=false,
                that.tip='微分销会员申请未通过，请联系管理员'
            }
            else{
                that.isPass=true,
                that.money=res.data.money
            }
            
            }
        })
        }

    }
    })          
  }
  },
    onLoad: function(options) {
        console.log("6666")
        this.onloads();
    }

}
</script>

<style scoped>
img{width: 100%;height: 100%;display: block;}

.topimg{height: 285rpx;}
.listimg{height: 168rpx;}

/*carewarp*/
.carewarp{padding-left: 30rpx;padding-right: 40rpx;padding-bottom: 25rpx;;background: #fff;border-top: 15rpx solid #ECEAEB;}
.caretitle{text-align: center;font-size: 34rpx;padding-top: 20rpx;padding-bottom: 20rpx;}
.caretitle img{width: 40rpx;height: 40rpx;margin-right: 15rpx;}
.caretitle span{display: inline-block;display: flex;align-items: center;justify-content: center;}
.infotitle span{display: block;}
.careinfo .infotitle .tip{font-size: 26rpx;margin-top: 12rpx;}
.careimg{position: relative;height: 376rpx;margin-top: 30rpx;}
.careinfo{position: absolute;top: 0;width: 90%;height: 78%;left: 0;display: flex;flex-direction: column;justify-content: space-between;padding:4% 5%;}
.careinfo span{color: #fff;}
.carebtn{text-align: right;font-size: 28rpx;color:#fff;}
.tip{font-size: 32rpx;text-align: center;}

.indexContainer{height: 100vh;background: #fff;}
.tipconten{text-align: center;font-size: 34rpx;}
.jupminfodetail{ width: 400rpx;height: 80rpx;line-height: 80rpx;text-align: center;background: #F5E698;color: #fff;margin: 0 auto;border-radius: 200rpx;margin-top: 40rpx;}
</style>
