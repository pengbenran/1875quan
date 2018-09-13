<template>
  <div class="jifencontainer">
     <div class="jifenbrand">
         <div class="brandimg"><image :src='headimg'></image></div>  
         <div class="brandinfo"><span>{{mp}}</span><span>我的圈圈</span>
           <div class="brandinfobtn" @click="onTimeToast()"><image :src='qianimg'></image>
            <label v-if="signStatus==1">签到</label><label v-if="signStatus==2">已签到</label>
           </div>
           
         </div>
     </div>
     <!--jifenbrand end-->
     <div class="jifenlist">
       <ul>
         <li v-for="(item,index) in pointSign" :index='index' :key='item' >
           <span class="tit1">签到圈圈</span>
           <span class="tit2">+ {{item.signPoint}}</span>
           <span class="tit3">{{item.signTime}}</span>
         </li>
       </ul>
       <div class="jifenlistbox"><span>. . .</span></div>
     </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";
import globaltime from '../../utils/index';

export default {
  data () {
    return {
        tabPageHeight:350,
        currentTab: 0,
        "headimg": [globalStore.state.imgapi+"/image/jifenbcgimg.jpg"],
        "qianimg": [globalStore.state.imgapi+"/image/qiandao.png"],
        pointSign:[],//积分次数合集
        signStatus:1,//是否签到状态判断
        mp:0 //总分数
     }
  },

  components: {

  },

  methods: {
    //点击进行签到事件
    onTimeToast(){
      let addpoint='+'+2;
      var that=this;
      let memberId=wx.getStorageSync('memberId');
      var parms={};
      parms.memberId=memberId;
      parms.cutpoint = 2  //积分签到获取
      var parms=JSON.stringify(parms);
      if (that.signStatus == 1){
        wx.request({
          url: globalStore.state.api+'/api/member/upMemberLv',
          method: 'POST',
          data: {
            parms: parms
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.onLoad()
          }
        })
      that.wetoast.toast({
        title: addpoint,
        duration: 200
      })
     }
    if (that.signStatus == 2){
      wx.showModal({
        title: '提示',
        content: '你已经签到过了哦！',
      })
     }
    }
  
   },

   onLoad(options){
    let that = this
    try {
      var memberId = wx.getStorageSync('memberId')
      if (memberId) {
        memberId: memberId
      }
    } catch (e) {
    }  
    var  memberId = memberId
      wx.request({
      //url: api + '/api/member/point',
      url:globalStore.state.api+'/api/member/point',
      data: {
        "memberId": memberId
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var mp =res.data.mp
        var signStatus = res.data.signStatus
        var pointSign = res.data.pointSign
        for (var i = 0; i < pointSign.length; i++) {
          pointSign[i]["signTime"] =globaltime.formatTime(new Date(pointSign[i]["signTime"]))
        }
        
          that.mp=mp;
          that.signStatus=signStatus;
          that.pointSign=pointSign;
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

.jifencontainer{background: #fff;height: 100vh;}

.jifenbrand{position: relative;}
.brandimg{height: 410rpx;}
.brandinfo{position: absolute;left: 0;top: 20%;width: 100%;display: flex;flex-direction: column;align-items: center;}
.brandinfo span{color:#ffffff;font-size: 30rpx; margin-top: 20rpx;}
.brandinfobtn{display: flex;justify-content: center;align-items: center;margin-top: 20rpx;border:1px solid #ffffff;border-radius: 35rpx;line-height: 50rpx;width: 200rpx;}
.brandinfobtn image{height: 35rpx;width: 35rpx;margin-right: 15rpx;}
.brandinfobtn label{font-size: 30rpx;color:#ffffff;}

.jifenlist ul{width: 94%;margin: auto;}
.jifenlist li{border:1rpx solid #eee;margin-top: 20rpx;
border-radius: 15rpx;display: flex;justify-content: space-between;line-height: 70rpx;padding-left: 16rpx;padding-right: 16rpx; }
.jifenlist span{font-size: 30rpx;}
.tit1{color:#666;}
.tit2{color:#26b4ff;}
.tit3{color: #707070;}
.jifenlistbox{text-align: center;margin-top: 25rpx;}
</style>
