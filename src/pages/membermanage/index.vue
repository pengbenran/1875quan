<template>
<div class='membermanage'>
  <div class='list1' @click='change(0)' >
    <div class="title">待打款提现申请</div>
    <div class='downicon'  :style="{transform:'rotate('+rot[0]+'deg)'}"><image :src='downimg'></image></div>
  </div>
  <div class='detail' :style="{height:hei[0]+'rpx'}">
    <div class='detaillist' v-for="(item,index) in Notforward" :index='index' :key='item' >
      <div>{{item.withdrawId}}</div>
       <div>{{item.name}}</div>
      <div>{{item.amount}}元</div>
      <div>{{item.withdrawTime}}</div>   
    </div>
  </div>
  <div class='list1' @click='change(1)' data-index="1">
    <div class="title">已打款提现申请</div>
    <div class='downicon'  :style="{transform:'rotate('+rot[1]+'deg)'}"><image :src='downimg'></image></div>
  </div>
<div class='detail' :style="{height:hei[1]+'rpx'}">
 
    <div class='detaillist' v-for='(item,index) in Alreadyforward' :index='index' :key='item'>
    <div>{{item.withdrawId}}</div>
      <div>{{item.name}}</div>
      <div>{{item.amount}}元</div>
      <div>{{item.withdrawTime}}</div>
    </div>
  </div>
  <div class='list1' @click='change(2)' >
    <div class="title">无效提现申请</div>
    <div class='downicon' :style="{transform:'rotate('+rot[2]+'deg)'}"><image :src='downimg'></image></div>
  </div>
  <div class='detail' :style="{height:hei[2]+'rpx'}">
    <div class='detaillist' v-for="(item,index) in noUserforward" :index='index' :key="item" >
    <div>{{item.withdrawId}}</div>
       <div>{{item.name}}</div>
      <div>{{item.amount}}元</div>
      <div>{{item.withdrawTime}}</div>
    </div>
  </div>
</div>
</template>

<script>
import globalStore from "../../stores/global-store";
export default {
  data () {
    return {
        downimg:globalStore.state.imgapi+'image/down.png',
        hei:[0,0,0],
        rot: [-90,-90,-90],
        animationData: {},
        Notforward: [],
        Alreadyforward: [],
        noUserforward: []
    }
  },

  components: {
 
  },

  methods: {
   
   change(index){
     console.log("--------ceshi-------")
        var that=this;
        var idx = index,
        key1 = "hei[" + idx + "]",
        rotkey1 = "rot[" + idx + "]"
        var datalenght = 0;
        if(that.hei[idx]==0){
        var animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1000,
            timingFunction: "ease",
            delay: 0
        })
        this.animation = animation
        animation.rotate(90).step()
        that.animationData=animation.export()

        for (var i = 0; i < that.hei.length; i++) {
            // var key = "hei[" + i + "]"
            // var rotkey = "rot[" + i + "]"   
            that.hei[i]=0,
            that.rot[i]=-90
        }

        if (idx == 0) {
            datalenght = that.Notforward.length
        }
        else if (idx == 1) {
            datalenght = that.Alreadyforward.length
        } else {
            datalenght = that.noUserforward.length
        }
            that.hei[index]=80 * datalenght;
            that.rot[index]= 0;
        }
    else{
            that.hei[index]=0;
    }
   },
   //加载初始化数据
   onloads(){
        var that = this;
        var memberId = wx.getStorageSync('memberId')
        that.memberId=memberId,
        wx.request({
        url: globalStore.state.api + '/api/distribe/accountManagement',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            memberId: that.memberId
        },
        success: function (res) {
        //  console.log(res.data.statusNo[0].withdrawTime.split(' ')[0]
            if(res.data.code==0){
                that.Notforward=res.data.statusNo;
                that.Alreadyforward=res.data.statusSucceed; //累计到账金额
                that.noUserforward=res.data.statusFail;//资产总计
            }   
        }
        })
   }
  },

  onLoad:function(options){
    this.onloads();
  }
}
</script>

<style scoped>
.membermanage{margin-top: 20rpx;}

.list1{width: 95%;height: 125rpx;line-height: 125rpx;margin: 7rpx auto;background: #fff;display: flex;justify-content: space-between;border-radius: 10rpx;padding: 0 40rpx;box-sizing: border-box;}
.downicon{width: 50rpx;height: 50rpx;overflow: hidden;margin-top:38rpx; }
image{width: 100%;height: 100%;display: block;}
.detail{width: 95%;margin: 0 auto;background: #fff;margin-top: -20rpx;transition:transform 1s linear;transition:height 1s;overflow: hidden;font-size:0.8rem;}
.detailtitle,.detaillist{display: flex;justify-content: space-around;border-bottom:1px solid #ddd;height: 80rpx;line-height: 80rpx; }

.detail{border-radius: 10rpx;margin-top: 5rpx;}
.list1 .title{font-size: 32rpx;color: #666;}
</style>
