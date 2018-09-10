<template>
  <div class='memberContain'>
    <div class='memberList' v-for="(item,index) in memberDOList" :index='index' :key='item' @click='jumpconsume(item.memberId)' >
      <div class='memberuser'>
        <div class='memberuseravator'>
          <image :src='item.face'></image>
        </div>
        <div class='memberName'>{{item.uname}}</div>
      </div>
    </div> 
     <view v-if="!hasmember" class='tip'>
      还没有会员哦
    </view> 
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";

export default {
  data () {
    return {
       memberDOList:[]     
    }
  },

  components: {
 
  },

  methods: {
   
   //加载初始数据
   onLoads(){
    var that = this;
    var memberId = wx.getStorageSync('memberId')
      that.memberId=memberId,
    wx.request({
      url: globalStore.state.api + '/api/distribe/memberDistribeList',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        memberId: that.memberId
      },
      success: function (res) {
        //  console.log(res.data.statusNo[0].withdrawTime.split(' ')[0]
        if (res.data.code == 0) {
          if (res.data.memberList.length == 0) {
              that.hasmember=false
          }
          else {
              that.hasmember=true
          }
            that.memberDOList=res.data.memberList;
        }
      }
    })
   },
   jumpconsume(memberid){
    wx.navigateTo({
      url: '../memberconsume/memberconsume?memberId='+memberid,
    })
   }
  },

   onLoad: function (options) {
   this.onLoads();
  }
}
</script>

<style scoped>

image{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.memberContain{background: #fff;padding-top:20rpx;box-sizing: border-box;}
.membertitle{height: 80rpx;line-height: 80rpx;padding-left: 20rpx;box-sizing: border-box;}
.memberList{width: 95%;margin: 10rpx auto;border: 1rpx solid #F1F1F1;border-radius:10rpx;}
.memberuser{display: flex;width: 95%;margin: 0 auto;border-bottom:1rpx solid #F1F1F1;   }
.memberuseravator{width: 100rpx;height: 100rpx;overflow: hidden;margin: 20rpx;border-radius:50%; }
.memberName{height: 100rpx;line-height: 100rpx;font-size: 0.9rem;}

.tip{height: 100vh;background: #fff;text-align: center;color: #B0B0B0;}
</style>
