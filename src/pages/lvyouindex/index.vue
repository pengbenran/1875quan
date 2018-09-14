<template>
  <div class="lvyouContainer">
    <div class="tip">
      <image src="https://shop.guqinet.com/html/images/shanquan/image/await.png"></image>
    </div>
    <!-- <div class="head">
      <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/banner.jpg"></image>
    </div>
    <div class="floor"> 
      <div class="title">
        <span class="icon"><image src="/static/images/lvyouicon1.jpg"></image></span>
        <span>景点热门</span>
      </div>
      <div class="Scenicspot">
          <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/1.jpg"></image>
          </div>
         <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/2.jpg"></image>
          </div>
          <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/3.jpg"></image>
          </div>
          <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/4.jpg"></image>
          </div>
          <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/5.jpg"></image>
          </div>
         <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/6.jpg"></image>
          </div>
      </div>
    </div>
    <div class="floor"> 
      <div class="title">
        <span class="icon"><image src="/static/images/lvyouicon1.jpg"></image></span>
        <span>热销特产</span>
      </div>
      <div class="Scenicspot">
          <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/7.jpg"></image>
          </div>
         <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/8.jpg"></image>
          </div>
          <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/9.jpg"></image>
          </div>
          <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/10.jpg"></image>
          </div>
          <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/11.jpg"></image>
          </div>
         <div class="Scenicspotlist" :style="{width:imageWidth,height:imageWidth}">
            <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/12.jpg"></image>
          </div>
      </div>
    </div>
    <div class="floor"> 
      <div class="title">
        <span class="icon1"><image src="/static/images/lvyouicon.jpg"></image></span>
        <span>限时活动</span>
      </div>
      <div class="Timelimit">
        <div class="TimelimitImg">
           <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/13.jpg"></image>
        </div>
        <div class="Timelimittitle">
          桂林三天三两夜游
        </div>
      </div>
      <div class="Timelimit">
        <div class="TimelimitImg">
           <image src="https://shop.guqinet.com/html/images/shanquan/lvyou/13.jpg"></image>
        </div>
        <div class="Timelimittitle">
          桂林三天三两夜游
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>

export default {
  data () {
    return {
   
     imageWidth:'',
     }
  },

  components: {
  
  },

  methods: {
   },

   onLoad(){
    var that=this;
    var windWidth=wx.getSystemInfoSync().windowWidth;
    var width=windWidth/3.5;
    that.imageWidth=width+"px";
  }
}
</script>

<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.tip{width: 500rpx;height: 500rpx; overflow: hidden; margin:200rpx auto;}
.head{
  width: 100%;
  height: 350rpx;
}
.title{
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
}
.icon{
  width: 25rpx;
  height: 39rpx;
  vertical-align:middle;
  margin-right: 15rpx;
  display: inline-block;

}
.icon1{
  width: 35rpx;
  height: 40rpx;
  vertical-align:middle;
  margin-right: 15rpx;
  display: inline-block;
}
.Scenicspot{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;

}

.Scenicspotlist{
    margin-bottom: 15rpx;
}
.TimelimitImg{
  width: 731rpx;
  height: 229rpx;
  overflow: hidden;
  margin: 0 auto;
}
.Timelimittitle{
  height: 60rpx;
  line-height: 60rpx;
  padding-left: 15rpx;
  font-size: 24rpx;
}
</style>
