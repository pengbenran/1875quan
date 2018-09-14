<template>
  <div class="hsContainer">
    <div class="tip">
      <image src="https://shop.guqinet.com/html/images/shanquan/image/await.png"></image>
    </div>
      <!-- <div class="hsBrand">
        <image src="https://shop.guqinet.com/html/images/shanquan/hsbrand.jpg"></image>
      </div> -->
      <!--hsBrand end-->
<!-- 
      <div class="hsTab">
        <ul>
          <li><span>首页</span></li>
          <li><span>鉴赏</span></li>
          <li><span>活动</span></li>
        </ul>
      </div> -->
      <!--hsTab end-->

    <!--  <div class="hsItem">
        <div class="hsItmetitle"><span class="hsItemtit">风格鉴赏</span><span class="itemimg"><image src="https://shop.guqinet.com/html/images/shanquan/hsfanhui.jpg"></image></span></div>
        <div class="hsitemList">
          <ul>
            <li><image src="https://shop.guqinet.com/html/images/shanquan/hsitem01.jpg"></image></li>
            <li><image src="https://shop.guqinet.com/html/images/shanquan/hsitem02.jpg"></image></li>
            <li><image src="https://shop.guqinet.com/html/images/shanquan/hsitem01.jpg"></image></li>
          </ul>
        </div>
     </div> -->
    <!--hsTabe end-->

   <!--  <div class="hsCase">
     <div class="hsItmetitle"><span class="hsItemtit">近期活动</span><span class="itemimg"><image src="https://shop.guqinet.com/html/images/shanquan/hsfanhui.jpg"></image></span></div>
     <div class="hsCaselist">
         <ul>
           <li><image src="https://shop.guqinet.com/html/images/shanquan/hscase01.jpg"></image></li>  
           <li><image src="https://shop.guqinet.com/html/images/shanquan/hscase02.jpg"></image></li>  
         </ul>          
     </div>   
    </div> -->
    <!--hsCase end-->

    <!-- <div class="hsfrom">
      <div class="hsfromitem"><span>您的称呼：</span><input type="text" placeholder="请输入你的称呼"></div>
      <div class="hsfromitem"><span>联系方式：</span><input type="text" placeholder="请输入联系方式"></div>
      <div class="hsfromitem"><span>咨询详情：</span><input type="text" placeholder="请输入咨询详情"></div>
      <div class="hsbtn"><span>提交</span></div>
    </div> -->
    <!--hsfrom end-->

    <!-- <div class="hscompany"><span>技术支持：谷琴电子信息</span></div> -->
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
/*hsBrand*/
.hsBrand{padding-left: 20rpx;padding-right: 20rpx;height: 455rpx;}
.hsTab{margin-top: 30rpx;}
.hsTab ul{display: flex;align-items: center;justify-content: center;}
.hsTab li{padding-left: 25rpx;padding-right: 25rpx;font-size: 30rpx;font-weight: bold;}
.hsTab li:nth-child(1) span{border-bottom: 1px solid #000000;}

/*hsItem*/
.hsItem{padding-left: 20rpx;padding-right: 20rpx;margin-top: 25rpx;}
.hsItmetitle{display: flex;align-items: center;justify-content:space-between;}
.hsItemtit{font-size: 30rpx;font-weight: bold;}
.itemimg{width:68rpx;height:23rpx;}
.hsitemList{margin-top: 20rpx;}
.hsitemList ul{height:270rpx;width:100%;overflow:scroll;white-space:nowrap;}
.hsitemList li{height: 260rpx;width: 450rpx;display: inline-block;margin-right:25rpx;} 
.hsitemList li:last-child{margin-right: 0;}

/*hsCase*/
.hsCase{padding-left: 20rpx;padding-right: 20rpx;margin-top: 25rpx;}
.hsCaselist{margin-top: 25rpx;}
.hsCaselist ul{height:300rpx;width:100%;overflow:scroll;white-space:nowrap;}
.hsCaselist li{height: 290rpx;width: 390rpx;display: inline-block;margin-right:20rpx;} 

/*hsfrom*/
.hsfrom{margin-top: 50rpx;}
.hsfromitem{border-bottom: 1px solid #d4d2d3;display: flex;line-height:90rpx;}
.hsfromitem span{width: 35%;font-size: 30rpx;text-align: center;}
.hsfromitem input{width: 64%;height:90rpx;padding-left:40rpx;font-size: 28rpx;}
.hsbtn{text-align: center;margin-top: 25rpx;}
.hsbtn span{width: 220rpx;height: 70rpx;line-height: 70rpx;display: inline-block;border-radius: 8rpx;background: #381a02;color:#ffffff;font-weight: bold; }

.hscompany{text-align: center;margin-top: 25rpx;margin-bottom: 30rpx;}
.hscompany span{color:#000000;font-size: 28rpx;}
</style>
