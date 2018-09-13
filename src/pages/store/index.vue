<template>
  <div class="store">
    <div class="header" :style="{width:imageWidth,height:imageHeigth}"><image :src="brandDO.keywords"></image></div>
    <div class="headerinfo">
        <div class="title">{{brandDO.name}}</div>
        <div class="info">
            <div class="left"><span class="leftspan1"><image :src="mapimg"></image></span><span class="leftspan2">{{address}}(距您13.2公里)</span></div>
            <div class="right"><image :src="fenxiangimg"></image></div>
        </div>
    </div>
    <!--store end-->
     
     <div class="shopinfo">
         <div class="infotitle">商家详情</div>
         <div class="shopontent">
             <wxParse :content="brandDO.brief" @prediv="prediv" @navigate="navigate" />
         </div>
     </div>
     <!--shopinfo end-->
     
     <div class="shoplist">
         <div class="shoplisttitle"><image :src="jinpinimg1"></image>精品推荐<image :src="jinpinimg2"></image></div>
         <div class="shoplistwarp">
         <ul>
            <li v-for="(item,index) in Goods" :index="index" :key="key" @click="jumpgoods(item.goodsId)">
                <div class="liimg"><image :src="item.thumbnail"></image></div>
                <div class="liinfo"><div>{{item.name}}</div><div class="price">￥{{item.price}}</div></div>
            </li>
         </ul>
         </div>
     </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"
import wxParse from 'mpvue-wxparse'
export default {
  data () {
    return {
      imageWidth:'',
      imageHeigth:'',
      mapimg:globalStore.state.imgapi+'image/listmaap.png',
      fenxiangimg:globalStore.state.imgapi+'image/store02.png',
      jinpinimg1:globalStore.state.imgapi+'image/store03.png',
      jinpinimg2:globalStore.state.imgapi+'image/store04.png',
      shoplistimg:globalStore.state.imgapi+'image/store05.png',
      brandDO:[],
      Goods:[],
      address:''
    }
  },

  components: {
 wxParse
  },

  methods: {
   jumpgoods:function(goodsId){
     wx.navigateTo({
      url: '../shumainfo/main?goodsId='+goodsId,
    })
   }
  },

  onLoad (options) {
    var that = this
    var windWidth=(wx.getSystemInfoSync().windowWidth);
    that.imageWidth=windWidth+"px";
    that.imageHeigth=windWidth*9/16+'px';
    wx.showLoading({
      title: '加载中',
    })
    var parms = {}
    var goods = {}
    goods.brandId = options.brandId
    parms.goods = goods
    wx.request({
      url: globalStore.state.api+'/api/Goods/getGoodsAll',
      data:{
        parms:parms
      },
      header: {
        'Content-Type': 'json'
      },
      success:function(res){
        wx.hideLoading()
        if(res.data.code==0){
          that.brandDO=res.data.brandDO;
          that.Goods=res.data.Goods;
          that.address=res.data.brandDO.url.split(',')[2]
        }
        // wx.setNavigationBarTitle({
        //   title: option.titlebar//页面标题为路由参数
        // })
      }
    })
  }
}
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
image{height: 100%;width: 100%;display:block;}
.store{background: #fff;height: 100vh;}
.header{
  overflow: hidden;
}
/*header*/
.headerinfo{padding: 0 20rpx 20rpx;}
.headerinfo .title{font-size: 35rpx;border-bottom: 1px solid #f6f6f6;}
.title{height: 70rpx;line-height: 70rpx;padding-right: 20rpx;padding-left: 20rpx;}
.info{display: flex;align-items: center;padding-top: 6rpx;}
.info .left{width: 80%;display: flex;}
.info .right{width: 20%;}
.left span{color: #b5b4ba;font-size: 30rpx;}
.left span image{width: 30rpx;height: 35rpx;}
.right image{height: 60rpx;width: 50rpx;float:right;margin-right: 16rpx;}

.left .leftspan1{display: flex;align-items: center;}
.left .leftspan2{padding-left: 40rpx;}
.leftspan1 image{margin-right: 12rpx;}

/*shopinfo*/
.shopinfo{border-top: 15rpx solid #f4f5f9;padding-bottom: 25rpx;}
.infotitle{padding-left: 20rpx;font-size: 35rpx;height: 80rpx;line-height: 80rpx;border-bottom: 1px solid #f4f5f9;}
.shopontent{padding-left: 20rpx;padding-right: 20rpx;font-size: 30rpx;padding-top: 10rpx;color: #666;}

/*shoplist*/
.shoplist{background: #fff;}
.shoplist{border-top: 15rpx solid #f4f5f9;}
.shoplisttitle{display: flex;justify-content: center;align-items: center;height: 85rpx;line-height: 85rpx;font-size: 35rpx;}
.shoplisttitle image{width: 10rpx;height: 20rpx;margin-left: 10rpx;margin-right: 10rpx;}

/*shoplistwarp*/
.shoplistwarp ul{overflow: hidden;display: flex;align-items: center;flex-wrap: wrap;}
.shoplistwarp li{width: 44%;margin-left: 3%;margin-right: 3%;margin-top: 10rpx;}
.liimg{width: 340rpx; height: 340rpx; overflow: hidden;}
.liinfo{padding-top: 10rpx;}
.liinfo div{font-size: 26rpx;}
.liinfo .price{color: #f69949;}
</style> 
