<template>
  <div class="ruzhu">
    <div class="ruzhubrand"><img :src="strongimg"></div>
    <div class="item"><span>姓名：</span><input  type="text" placeholder="请输入商家姓名" placeholder-style='#ccc'/></div>
    <div class="item"><span>商家名称：</span><input  type="text" placeholder="请输入商家名称" placeholder-style='#ccc'/></div>
    <div class="listitem"><span>行业分类：</span><div class="list">
       <picker @change="changpick" :value='index' :range='listitem'>
          <div class="picker">{{listitem[index]}}</div>
       </picker>
      <img style="transform:rotate(-90deg)" :src="downimg"></div></div>
    <div class="item"><span>联系电话：</span><input  type="text" placeholder="请输入您的电话" placeholder-style='#ccc'/></div>
    <div class="item"><span>详细地址：</span><input  type="text" placeholder="请输入详细地址" placeholder-style='#ccc'/></div>
    
    <div class="btn"><span>申请入驻</span></div>        
  </div>
  </template>

<script>
import globalStore from "../../stores/global-store";

export default {
  data () {
    return {
       downimg:globalStore.state.imgapi+'image/down.png', 
       strongimg:globalStore.state.imgapi+'image/store01.png', 
       listitem:['运动健身','美食','餐饮','景区游玩'],
       index:0
    }
  },

  components: {
 
  },

  methods: {
     changpick(e){
       let that=this;
      console.log(e); 
      console.log(e.mp.detail.value);
      that.index=e.mp.detail.value

  }
  },

  created () {
   
  }
}
</script>

<style scoped>
.ruzhubrand{height: 382rpx;margin-bottom: 12rpx;}
.ruzhubrand img{width: 100%;height: 100%;}
.ruzhu{background: #fff;height: 100vh;}
.item{display: flex;align-items: center;border-bottom: 1px solid #f5f5f5;height: 90rpx;line-height: 90rpx;padding-left: 20rpx;padding-right: 20rpx;}
.item span{font-size: 32rpx;}
.item input{font-size: 28rpx;}

.listitem{display: flex;align-items: center;padding-left: 20rpx;padding-right: 20rpx;border-bottom: 1px solid #f5f5f5;}
.listitem span{font-size: 32rpx;height: 90rpx;line-height: 90rpx;}
.list{display: flex;justify-content: space-between;align-items: center;width: 75%;}
.list img{width: 30rpx;height: 30rpx;}
.list .picker{color: #666;font-size: 28rpx;}

.infoinput{padding-left: 20rpx;padding-right: 20rpx;}
.infoinput textarea{background: #f5f5f5;border-radius: 8rpx;}

.dagou{position: relative;padding-left: 70rpx;justify-content: center;align-items: center;font-size: 32rpx;height: 80rpx;line-height: 80rpx;}
.dagou icon{position: absolute;left: 25rpx;top: 18rpx;}
.dagou span{font-size: 28rpx;color: #666;}

.btn{padding:20rpx 30rpx 0;text-align: center;}
.btn span{display: inline-block;width: 80%;margin: auto;text-align: center;
height: 70rpx;line-height: 75rpx;border-radius: 10rpx;font-size: 34rpx;background: #e93429;color: #fff;}

</style>
