<template>
   <div class="meirongContainer">
      <div class="floor">
        <div class="title">
            店铺介绍
        </div>
        <div class="store">
          <div class="storeleft">
              <image src="https://shop.guqinet.com/html/images/shanquan/meirong/store1.jpg"></image>
          </div>
          <div class="storeright">
            <div>
               <image src="https://shop.guqinet.com/html/images/shanquan/meirong/store2.jpg"></image>
            </div>
            <div>
               <image src="https://shop.guqinet.com/html/images/shanquan/meirong/store3.jpg"></image>
            </div>
          </div>
        </div> 
        
        <div class="storedetail">
          <span class="icon">
            <image src="/static/images/loca.jpg"></image>
          </span>
          <span class="addr">江西南昌江西南昌江西昌江西南昌江西</span>
          <span class="icon">
            <image src="/static/images/phone.jpg"></image>
          </span>
          <span class="icon">
            <image src="/static/images/wechat.jpg"></image>
          </span>
        </div>
      </div>
      <!-- 店主推荐 -->
      <div class="floor2">
        <div class="title abbrtitle">店长推荐</div>
          <ul class="tuijianlist">
            <li><image src="https://shop.guqinet.com/html/images/shanquan/meirong/tuijian1.jpg"></image></li>
            <li><image src="https://shop.guqinet.com/html/images/shanquan/meirong/tuijian2.jpg"></image></li>
            <li><image src="https://shop.guqinet.com/html/images/shanquan/meirong/tuijian1.jpg"></image></li>
            <li><image src="https://shop.guqinet.com/html/images/shanquan/meirong/tuijian2.jpg"></image></li>
          </ul>
      </div>
      <!-- 体验区 -->
       <div class="floor3">
        <div class="title abbrtitle">体验区</div>
          <ul class="tuijianlist">
            <li><image src="https://shop.guqinet.com/html/images/shanquan/meirong/tiyan.jpg"></image></li>
            <li><image src="https://shop.guqinet.com/html/images/shanquan/meirong/tiyan2.jpg"></image></li>
            <li><image src="https://shop.guqinet.com/html/images/shanquan/meirong/tiyan.jpg"></image></li>
            <li><image src="https://shop.guqinet.com/html/images/shanquan/meirong/tiyan2.jpg"></image></li>
          </ul>
      </div>
      <!-- 店铺详情 -->
      <div class="floor4">
        <div class="title">店铺详情</div>
        <div class="storeintro">
          <ul>
            <li>
              <span class="icon"><image src="/static/images/time.jpg"></image></span>
              <span>每天 &nbsp&nbsp&nbsp 10:00-21:00</span>
            </li>
            <li>
              <span class="icon"><image src="/static/images/zhang.jpg"></image></span>
              <span>免费WIFI &nbsp&nbsp&nbsp 可刷卡</span>
            </li>
          </ul>
          <div class="storedetailintro">
            本店美容与养生相结合。主要项目:主要是延续细胞衰老的生物多态主要是延续细胞衰老的生物多态主要是延续细胞衰老的生物多态主要是延续细胞衰老的生物多态主要是延续细胞衰老的生物多态
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
     imageHeigth:'',
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
    that.imageWidth=windWidth+"px";
    that.imageHeigth=windWidth*2.383+'px';
  }
}
</script>

<style scoped>
.meirongContainer{
background: #F5F6FA;
min-height: 100vh;
}
image{
  width: 100%;
  height: 100%;
  display: block;
}
.floor{
  width: 95%;
  margin: 0 auto;

}
.title{
  height: 80rpx;
  line-height: 80rpx;
  padding-left: 10rpx;
  font-size: 32rpx;
}
.store{
  background:#fff;
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 20rpx;
  box-sizing: border-box;
}
.storeleft{
  width: 373rpx;
  height: 314rpx;
}
.storeright{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}
.storeright div{
  width: 256rpx;
  height: 145rpx;
  overflow: hidden;
  margin: 0 auto
}
.storedetail{
  background: #fff;

}
.icon{
  display: inline-block;
  height: 50rpx;
  width: 50rpx;
  overflow: hidden;
  vertical-align:middle;
  margin: 15rpx;
}
.addr{
  display: inline-block;
  height: 50rpx;
  line-height: 50rpx;
  width: 430rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
   vertical-align:middle;
   font-size: 28rpx;
}

/*推荐模块*/
.tuijianlist{
  background: #fff;
  padding: 10rpx;
  width: 95%;
  margin: 0 auto;
  white-space: nowrap;
  overflow: scroll;
}
.tuijianlist li{
  display: inline-block;
  height: 286rpx;
  width: 372rpx;
  overflow: hidden;
  margin: 10rpx;

}
.storeintro{
  font-size: 0.3rem;
  color: #797979;
  background: #fff;
}
.storedetailintro{
  width: 80%;
  margin: 0 auto;
  font-size: 30rpx;
  color: #000;
}

/*abbrtitle*/
.abbrtitle{padding-left: 2rpx;}
</style>
