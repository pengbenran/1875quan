<template>
  <div class="women">
    <div class="header" :style="{width:imageWidth,height:imageHeigth}"><img :src="indexdata.logo" /></div>
    <div class="info">
        <div class="title"> <span>关于我们</span> </div>
         <div class="contenter">
            {{indexdata.descs}}
         </div>
    </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"
export default {
  data () {
    return {
      headerimg: globalStore.state.imgapi+'image/women.jpg',
      indexdata:{},
       imageWidth:'',
     imageHeigth:'',
    }
  },

  components: {

  },

  methods: {

  },

  onLoad (options) {
    var that=this;
    that.indexdata=wx.getStorageSync('indexdata')
     var windWidth=(wx.getSystemInfoSync().windowWidth);
     that.imageWidth=windWidth+"px";
     that.imageHeigth=windWidth*9/16+'px';
  }
}
</script>

<style scoped>
img{width: 100%;height: 100%;display: block;}
.women{background: #fff;min-height: 100vh;}
.header{height: 295rpx;}
.info{padding-left: 25rpx;padding-right: 25rpx;}
.info .title{text-align: center;font-size: 40rpx;font-weight: 200;margin-top: 30rpx;}
.contenter{font-size: 32rpx;font-weight: 100;text-align: justify;color: #666;margin-top: 25rpx;}
.title span{border-bottom: 6rpx solid #eca79c;}
</style> 
