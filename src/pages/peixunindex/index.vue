<template>
   <div class="peixunContainer">
    <div class="tip">
      <image src="https://shop.guqinet.com/html/images/shanquan/image/await.png"></image>
    </div>
     <!-- <div class="pxBrand"><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxbrand.jpg"></image></div> -->
     <!--pxBrand end-->
     <!-- <div class="pxitemwap">
       <div class="title"><span>推荐乐器</span></div>
       <div class="pxitem">
         <ul>
           <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxitem01.jpg"></image></li>
           <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxitem02.jpg"></image></li>
           <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxitem03.jpg"></image></li>
           <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxitem04.jpg"></image></li> 
         </ul>
       </div>
     </div> -->
     <!--pxitemwap end-->

     <!-- <div class="pxcase"> 
       <div class="pxcasetitle"><span>课程培训</span></div>
       <div class="top">
         <div class="topleft"></div>
         <div class="topright"><image src="https://shop.guqinet.com/html/images/shanquan/peixun/casetitle.png"></image></div>
       </div>
       <div class="pxcaseitem">
         <ul>
          <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxcase_03.jpg"></image></li>
          <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxcase_05.jpg"></image></li>
          <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxcase_09.jpg"></image></li>
          <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxcase_13.jpg"></image></li>
          <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxcase_10.jpg"></image></li>
          <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxcase_14.jpg"></image></li>
         </ul>
       </div>
       <div class="pxcasemoor"><image src="https://shop.guqinet.com/html/images/shanquan/peixun/moor.jpg"></image></div>
     </div> -->
     <!--pxcase end-->

<!-- 
     <div class="pxShop">
       <ul>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxshop.jpg"></image>
            <div class="pxShopinfo">
              <span>原价：￥300rmb</span><span>售价：￥200rmb</span>
              <small>立即购买</small>
            </div>
         </li>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxshop.jpg"></image>
            <div class="pxShopinfo">
              <span>原价：￥300rmb</span><span>售价：￥200rmb</span>
              <small>立即购买</small>
            </div>
         </li>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxshop.jpg"></image>
           <div class="pxShopinfo">
              <span>原价：￥300rmb</span><span>售价：￥200rmb</span>
              <small>立即购买</small>
            </div>
         </li>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/peixun/pxshop.jpg"></image>
            <div class="pxShopinfo">
              <span>原价：￥300rmb</span><span>售价：￥200rmb</span>
              <small>立即购买</small>
            </div>
         </li>
       </ul>
     <div class="pxcasemoor"><image src="https://shop.guqinet.com/html/images/shanquan/peixun/moor.jpg"></image></div>
     </div>
     pxShop end-->
    
     <!-- <div class="pxcommp"><span>谷琴技术支持</span></div> --> 
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
    that.imageHeigth=windWidth*3.567+'px';
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
/*.peixunContainer{background: #f2f2f2;}*/
.pxBrand{height: 400rpx;}

/*pxitem*/
.pxitemwap{padding-top: 25rpx;}
.pxitemwap .title{text-align: center;}
.pxitemwap .title span{font-size: 30rpx;}
.pxitem{padding-top:25rpx ;}
.pxitem ul{display: flex;}
.pxitem li{width: 25%;}
.pxitem li image{height: 110rpx;width: 110rpx;margin: auto;}

/*pxcase*/
.pxcase{margin-top: 55rpx;}
.pxcasetitle{padding-left: 22rpx;}
.pxcasetitle span{font-size: 28rpx;}
.pxcase .top{position: relative;}
.pxcase .topright{height: 21rpx;padding-left: 28rpx;padding-right: 15rpx;}
.pxcase .topleft{width: 20rpx;height: 110rpx;background: #4ebba4;position: absolute;left: 0;top: 0;}

/*pxcase01*/
.pxcaseitem ul{display: flex;flex-wrap: wrap;}
.pxcaseitem li{width: 44%;margin-left: 3%;margin-right: 3%;height: 300rpx;margin-top: 25rpx;}
.pxcasemoor{margin-top: 25rpx;}
.pxcasemoor image{height: 28rpx;width: 250rpx;margin: auto;}

/*pxShop*/
.pxShop{margin-top: 25rpx;}
.pxShop ul{display: flex;flex-wrap: wrap;}
.pxShop li{width: 46%;margin-left: 2%;margin-right: 2%;position: relative;height: 300rpx;margin-top: 25rpx;}
.pxShop .pxShopinfo{position: absolute;right:10rpx;bottom:100rpx;}
.pxShopinfo span{display: block;font-size: 23rpx;}
.pxShopinfo span:nth-child(1){text-decoration:line-through;}
.pxShopinfo small{margin-top: 20rpx;width:129rpx;font-size: 23rpx;border:1px solid #666;padding-left: 15rpx;padding-right: 15rpx;text-align: center;border-radius: 3px;color:#666;}

/*pxcommp*/
.pxcommp{text-align: center;padding-bottom: 30rpx;padding-top: 20rpx;}
.pxcommp span{font-size: 30rpx;}
</style>
