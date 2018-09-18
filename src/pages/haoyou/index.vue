<template>
<div class='membermanage'>
  <div class='list1' @click='change(0)' >
    <div class="title"><image :src='haoyou01'></image> <span>分享二维码图片链接</span></div>
    <div class='downicon'  :style="{transform:'rotate('+rot[0]+'deg)'}"><image :src='downimg'></image></div>
  </div>

  <div class='list1' @click='change(1)' data-index="1">
    <div class="title"><image :src='haoyou02'></image><span>朋友圈中央文案库</span></div>
    <div class='downicon'  :style="{transform:'rotate('+rot[1]+'deg)'}"><image :src='downimg'></image></div>
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
        haoyou01:globalStore.state.imgapi+'image/haoyou01.png',
        haoyou02:globalStore.state.imgapi+'image/haoyou02.png',
    }
  },

  components: {
 
  },

  methods: {
 
  },

  onLoad:function(options){

  }
}
</script>

<style scoped>
.membermanage{margin-top: 20rpx;}

.list1{width: 95%;height: 160rpx;line-height: 160rpx;margin: 20rpx auto;background: #fff;display: flex;justify-content: space-between;border-radius: 10rpx;padding: 0 40rpx;box-sizing: border-box;}
.downicon{width: 50rpx;height: 50rpx;overflow: hidden;margin-top:38rpx; }
image{width: 100%;height: 100%;display: block;}
.detail{width: 95%;margin: 0 auto;background: #fff;margin-top: -20rpx;transition:transform 1s linear;transition:height 1s;overflow: hidden;font-size:0.8rem;}
.detailtitle,.detaillist{display: flex;justify-content: space-around;border-bottom:1px solid #ddd;height: 80rpx;line-height: 80rpx; }

.detail{border-radius: 10rpx;margin-top: 5rpx;}
.list1 .title{font-size: 32rpx;color: #666;}
.list1 .title image{width: 80rpx;height: 80rpx;margin-right: 15rpx;}
.list1 .title{display: flex;align-items: center;}
</style>
