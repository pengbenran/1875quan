<template>
   <div class="jcContainer">
    <div class="tip">
      <image src="https://shop.guqinet.com/html/images/shanquan/image/await.png"></image>
    </div>
    <!--  <div class="jc-brand"><image src="https://shop.guqinet.com/html/images/shanquan/jcbrand.jpg"></image></div>

     <div class="jcList">
       <ul>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/jcitem01.jpg"></image><span>家具团队</span></li>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/jcbrand02.jpg"></image><span>品牌建材</span></li>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/jcitem03.jpg"></image><span>家具</span></li>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/jcitem04.jpg"></image><span>家纺</span></li>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/jcitem05.jpg"></image><span>窗帘</span></li>
       </ul>
     </div>
     jcList end-->

    <!-- <div class="jcCase">
      <div class="jcCase-item item1"><image src="https://shop.guqinet.com/html/images/shanquan/jccase01.jpg"></image>
        <div class="jcCaseInfo"><span>商家入驻</span><small>(玩转本地商圈)</small></div>
      </div>
      <div class="jcCase-item item2"><image src="https://shop.guqinet.com/html/images/shanquan/jccase02.jpg"></image>
        <div class="jcCaseInfo"><span>发布信息</span><small>(便民信息发布)</small></div></div>
    </div> -->
    <!--jcCase end-->
     
    <!--  <div class="jcCList">
        <div class="jcCList-title"><span>精品案例推荐</span><small>更多</small></div>
        <ul>
           <li><image src="https://shop.guqinet.com/html/images/shanquan/jcList.jpg"></image></li>
           <li><image src="https://shop.guqinet.com/html/images/shanquan/jcList.jpg"></image></li>
        </ul>
     </div> -->
     <!--jcCList end-->
<!-- 
     <div class="jcShop">
        <div class="jcCList-title"><span>商品推荐</span><small>更多</small></div>
        <ul>
          <li><div class="jcShop-img"><image src="https://shop.guqinet.com/html/images/shanquan/jcShop01.jpg"></image></div>
            <span>这里是文案这里是文案...</span><small>￥998.00</small>
          </li>
          <li><div class="jcShop-img"><image src="https://shop.guqinet.com/html/images/shanquan/jcShop02.jpg"></image></div>
           <span>这里是文案这里是文案...</span><small>￥998.00</small>
          </li>
          <li><div class="jcShop-img"><image src="https://shop.guqinet.com/html/images/shanquan/jcShop03.jpg"></image></div>
           <span>这里是文案这里是文案...</span><small>￥998.00</small>
          </li>
          <li><div class="jcShop-img"><image src="https://shop.guqinet.com/html/images/shanquan/jcShop04.jpg"></image></div>
            <span>这里是文案这里是文案...</span><small>￥998.00</small>
          </li>
        </ul>
     </div> -->
     <!--jcShop end-->
      
     <!--  <div class="jcTemp">
         <div class="jcCList-title"><span>附近的装修队伍</span><small>更多</small></div>
         <ul>
            <li>
             <div class="jcTemp-logo"><image src="https://shop.guqinet.com/html/images/shanquan/jclogo.jpg"></image></div>
             <div class="jcTemp-info"><span>谷琴装饰有限公司</span>
             <div class="jcTemp-small"><image src="https://shop.guqinet.com/html/images/shanquan/jcmap01.jpg"></image>南昌市八一大道财富广场</div>
             <div class="jcTemp-small"><image src="https://shop.guqinet.com/html/images/shanquan/jcmap02.jpg"></image>距离您有2.17km</div>
             </div>
           </li>
           <li>
             <div class="jcTemp-logo"><image src="https://shop.guqinet.com/html/images/shanquan/jclogo.jpg"></image></div>
             <div class="jcTemp-info"><span>谷琴装饰有限公司</span>
             <div class="jcTemp-small"><image src="https://shop.guqinet.com/html/images/shanquan/jcmap01.jpg"></image>南昌市八一大道财富广场</div>
             <div class="jcTemp-small"><image src="https://shop.guqinet.com/html/images/shanquan/jcmap02.jpg"></image>距离您有2.17km</div>
             </div>
           </li>
           <li>
             <div class="jcTemp-logo"><image src="https://shop.guqinet.com/html/images/shanquan/jclogo.jpg"></image></div>
             <div class="jcTemp-info"><span>谷琴装饰有限公司</span>
             <div class="jcTemp-small"><image src="https://shop.guqinet.com/html/images/shanquan/jcmap01.jpg"></image>南昌市八一大道财富广场</div>
             <div class="jcTemp-small"><image src="https://shop.guqinet.com/html/images/shanquan/jcmap02.jpg"></image>距离您有2.17km</div>
             </div>
           </li>
         </ul>
      </div>
      <div class="jccompany"><span>谷琴技术支持</span></div> -->
   </div>
 <!--jccontainer end-->
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
    var windWidth=wx.getSystemInfoSync().windowWidth;//获取系统的宽度
    var imageWidth=windWidth+"px";
    that.imageWidth=imageWidth+"px";
    that.imageHeigth=windWidth*3.64+'px';
  }
}
</script>

<style scoped>
image{ width: 100%;height: 100%;display: block;}
.tip{width: 500rpx;height: 500rpx; overflow: hidden; margin:200rpx auto;}
.jc-brand{padding-left: 5%;padding-right: 5%;height: 255rpx;}

/*jcList*/
.jcList{margin-top: 30rpx;padding-left: 6%;padding-right: 6%;height: 120rpx; }
.jcList ul{display: flex;flex-wrap:wrap;}
.jcList li{width: 20%;height: 76rpx;}
.jcList li image{margin: auto;width: 60rpx;                                   height: 60rpx;}
.jcList li span{margin-top: 13rpx;display: block;text-align: center;color: rgb(29, 29, 29);font-size:24rpx;}

/*jcaCase*/
.jcCase{margin-top: 20rpx;padding-left: 6%;padding-right: 6%;display: block;display: flex;}
.jcCase-item{width: 50%;height: 175rpx;position: relative;}
.jcCase .item1{padding-right: 15rpx;}
.jcCase .item2{padding-left: 15rpx;}
.jcCaseInfo{position: absolute;top: 14%;left: 10%;}
.jcCaseInfo span{font-size: 32rpx;color: #ffffff;}
.jcCaseInfo small{font-size: 26rpx;color:#ffffff;} 

/*jcList*/
.jcCList{margin-top: 30rpx;padding-left: 5%;padding-right: 5%;}
.jcCList li{margin-top: 20rpx;height: 290rpx;}
.jcCList-title span{font-size: 30rpx;font-weight: bold;}
.jcCList-title small{float: right;font-size: 23rpx;line-height:50rpx;color: #666;}

/*jcShop*/
.jcShop{padding-left: 5%;padding-right: 5%;margin-top: 20rpx;}
.jcShop li{width: 48%;float: left;margin-top: 18rpx;margin-left: 1%;margin-right: 1%;}
.jcShop ul{min-height: 615rpx;} 
.jcShop li span{font-size: 26rpx;}
.jcShop li small{font-size: 29rpx;color:red;}
.jcShop-img{height:200rpx;}

/*jcTemp*/
.jcTemp{padding-left: 5%;padding-right: 5%;margin-top: 20rpx;}
.jcTemp-logo{float: left;width: 35%;}
.jcTemp-info{float: right;width: 60%;}
.jcTemp-info{margin-left: 5%;}
.jcTemp-info span{font-size: 30rpx;font-weight:600;}
.jcTemp-info .jcTemp-small{font-size: 26rpx;color:#666;margin-top: 14rpx;display: flex;display: -webkit-flex;align-items: center;}
.jcTemp-logo image{height:46rpx;}
.jcTemp li{height: 172rpx;}
.jcTemp-logo{line-height: 135rpx;margin-top:62rpx;}
.jcTemp-small image{width: 20rpx;height: 20rpx;display: inline-block;margin-right: 10rpx;}

/*jccompany*/
.jccompany{text-align: center;margin-bottom: 35rpx;}
.jccompany span{color:#666;font-size: 30rpx;margin-top: 15rpx;}
</style>
