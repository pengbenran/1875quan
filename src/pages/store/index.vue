<template>
  <div class="store">
    <div class="header"><img :src="headerimg"></div>
    <div class="headerinfo">
        <div class="title"> 泡面食堂（红谷滩店）</div>
        <div class="info">
            <div class="left"><span class="leftspan1"><img :src="mapimg">南昌市红谷滩会展路999号</span><span class="leftspan2">(距您13.2公里)</span></div>
            <div class="right"><img :src="fenxiangimg"></div>
        </div>
    </div>
    <!--store end-->
     
     <div class="shopinfo">
         <div class="infotitle">商家详情</div>
         <div class="shopontent">这家的泡面小食堂，种类繁多这家的泡面小食堂，种类繁多这家的泡面小食堂，
             种类繁多这家的泡面小食堂，种类繁多这家的泡面小食堂，种类繁多
         </div>
     </div>
     <!--shopinfo end-->
     
     <div class="shoplist">
         <div class="shoplisttitle"><img :src="jinpinimg1">精品推荐<img :src="jinpinimg2"></div>
         <div class="shoplistwarp">
         <ul>
            <li>
                <div class="liimg"><img :src="shoplistimg"></div>
                <div class="liinfo"><div>韩国综艺RunnimgMan同款</div><div class="price">￥20</div></div>
            </li>
            <li>
                <div class="liimg"><img :src="shoplistimg"></div>
                <div class="liinfo"><div>韩国综艺RunnimgMan同款</div><div class="price">￥20</div></div>
            </li>
            <li>
                <div class="liimg"><img :src="shoplistimg"></div>
                <div class="liinfo"><div>韩国综艺RunnimgMan同款</div><div class="price">￥20</div></div>
            </li>
         </ul>
         </div>
     </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"
export default {
  data () {
    return {
      headerimg:globalStore.state.imgapi+'image/store01.png',
      mapimg:globalStore.state.imgapi+'image/listmaap.png',
      fenxiangimg:globalStore.state.imgapi+'image/store02.png',
      jinpinimg1:globalStore.state.imgapi+'image/store03.png',
      jinpinimg2:globalStore.state.imgapi+'image/store04.png',
      shoplistimg:globalStore.state.imgapi+'image/store05.png',
    }
  },

  components: {
 
  },

  methods: {
   
  },

  onLoad (options) {
    console.log(options)
  }
}
</script>

<style scoped>
img{width: 100%;height: 100%;display: block;}
.store{background: #fff;height: 100vh;}

/*header*/
.header{height: 358rpx;}
.headerinfo{padding: 0 20rpx 20rpx;}
.headerinfo .title{font-size: 35rpx;border-bottom: 1px solid #f6f6f6;}
.title{height: 70rpx;line-height: 70rpx;padding-right: 20rpx;padding-left: 20rpx;}
.info{display: flex;align-items: center;padding-top: 6rpx;}
.info .left{width: 80%}
.info .right{width: 20%;}
.left span{display: block;color: #b5b4ba;font-size: 30rpx;}
.left span img{width: 30rpx;height: 35rpx;}
.right img{height: 60rpx;width: 50rpx;float:right;margin-right: 16rpx;}

.left .leftspan1{display: flex;align-items: center;}
.left .leftspan2{padding-left: 40rpx;}
.leftspan1 img{margin-right: 12rpx;}

/*shopinfo*/
.shopinfo{border-top: 15rpx solid #f4f5f9;padding-bottom: 25rpx;}
.infotitle{padding-left: 20rpx;font-size: 35rpx;height: 80rpx;line-height: 80rpx;border-bottom: 1px solid #f4f5f9;}
.shopontent{padding-left: 20rpx;padding-right: 20rpx;font-size: 30rpx;padding-top: 10rpx;color: #666;}

/*shoplist*/
.shoplist{background: #fff;}
.shoplist{border-top: 15rpx solid #f4f5f9;}
.shoplisttitle{display: flex;justify-content: center;align-items: center;height: 85rpx;line-height: 85rpx;font-size: 35rpx;}
.shoplisttitle img{width: 10rpx;height: 20rpx;margin-left: 10rpx;margin-right: 10rpx;}

/*shoplistwarp*/
.shoplistwarp ul{overflow: hidden;display: flex;align-items: center;flex-wrap: wrap;}
.shoplistwarp li{width: 44%;margin-left: 3%;margin-right: 3%;margin-top: 10rpx;}
.liimg{height: 340rpx;}
.liinfo{padding-top: 10rpx;}
.liinfo div{font-size: 26rpx;}
.liinfo .price{color: #f69949;}
</style> 
