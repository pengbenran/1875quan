<template>
  <div class="xiemaoContainer">
     <div class="xmtopwarp">
       <div class="xmbrand"><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/xmbrand.jpg"></image></div>
       <div class="xmtop">
          <image src="https://shop.guqinet.com/html/images/shanquan/xiemao/sras.png"></image>
       </div>
     </div>
     <!--xmtopwarp end-->
     <div class="xmbrand02">
       <image src="https://shop.guqinet.com/html/images/shanquan/xiemao/xmxuanc.jpg"></image>
     </div>
    <!--brand02 end-->
    
    <div class="xmitem">
      <ul>
        <li><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/xmitem01.jpg"></image>
           <span>短裙</span>
        </li>
        <li><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/xmitem02.jpg"></image>
           <span>连衣裙</span>
        </li>
        <li><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/xmitem03.jpg"></image>
           <span>高跟鞋</span>
        </li>
        <li><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/xmitem04.jpg"></image>
           <span>帽类</span>
        </li>
      </ul>
    </div>
    <!--xmitem end-->

    <div class="xmbrand03">
      <div class="xmtitle01"><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/xmtitle01.jpg"></image></div>
      <div class="brand03"><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/xmbrand02.jpg"></image></div>
      <div class="xmbrand03info"><div class="tit">整套出游装备#</div>
        <div class="pir"><label>￥380</label><span>￥380</span></div>
      </div>
    </div>

       <div class="xmbrand03">
      <div class="xmtitle01"><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/xmtitle01.jpg"></image></div>
      <div class="brand03"><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/xmbrand02.jpg"></image></div>
      <div class="xmbrand03info"><div class="tit">整套出游装备#</div>
        <div class="pir"><label>￥380</label><span>￥380</span></div>
      </div>
    </div>
    <!--xmbrand03 end-->

    <div class="xmcase">
      <ul>
        <li>
          <div class="xmcaseimg"><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/case01.jpg"></image></div>
          <div class="xmcasetit">这里是文案这里是文案...</div>
          <div class="xmcasepir">￥998.00</div>
        </li>
         <li>
          <div class="xmcaseimg"><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/case01.jpg"></image></div>
          <div class="xmcasetit">这里是文案这里是文案...</div>
          <div class="xmcasepir">￥998.00</div>
        </li>
                <li>
          <div class="xmcaseimg"><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/case01.jpg"></image></div>
          <div class="xmcasetit">这里是文案这里是文案...</div>
          <div class="xmcasepir">￥998.00</div>
        </li>
                <li>
          <div class="xmcaseimg"><image src="https://shop.guqinet.com/html/images/shanquan/xiemao/case01.jpg"></image></div>
          <div class="xmcasetit">这里是文案这里是文案...</div>
          <div class="xmcasepir">￥998.00</div>
        </li>
      </ul>
    </div>
    <!--xmcase end-->

    <div class="xmcommp"><span>谷琴技术支持</span></div>
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
    that.imageHeigth=windWidth*4.677+'px';
  }
}
</script>

<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.xiemaoContainer{background: #f2f2f2;}
.xmtopwarp{position: relative;}
.xmbrand{height: 400rpx;}
.xmtop{display: flex;position: absolute;top: 0;left: 0;width: 100%;height: 65rpx;}
.menu{width: 10%;height: 80rpx;}
.cart{width: 10%;height: 80rpx;}
.sea{width: 80%;height: 80rpx;}
/*xmbrand02*/
.xmbrand02{padding-top: 25rpx;height: 330rpx;}

/*xmitem*/
.xmitem{background: #ffffff;margin-top: 20rpx;padding: 15rpx 25rpx 15rpx;}
.xmitem ul{display: flex;}
.xmitem li{width: 25%;text-align: center;}
.xmitem image{margin: auto;width: 75rpx;height: 75rpx;}
.xmitem li span{display: block;text-align: center;font-size: 28rpx;margin-top: 15rpx;}

/*xmbrand03*/
.xmbrand03{background: #ffffff;margin-top: 25rpx;padding-bottom: 25rpx;}
.xmtitle01{padding-top: 25rpx;}
.xmtitle01 image{width: 130rpx;height: 36rpx;margin: auto;}
.brand03{height:595rpx;margin-top: 20rpx;}
.xmbrand03info .tit{font-size: 34rpx;}
.xmbrand03info div{text-align: center;}
.xmbrand03info .pir label{color: #ff7e09;font-size: 32rpx;}
.xmbrand03info .pir span{color:#ccc;font-size: 24rpx;text-decoration:line-through }

/*xmcase*/
.xmcase{padding-top: 20rpx;background: #ffffff;}
.xmcase ul{display: flex;flex-wrap: wrap;}
.xmcase li{width: 49%;padding-bottom: 20rpx;}
.xmcase li:first-child{padding-right: 1%}
.xmcase li:nth-child(2n){padding-left: 1%}
.xmcase li:nth-child(3n){padding-right: 1%}
.xmcaseimg{height: 380rpx;}
.xmcasetit{font-size: 30rpx;}
.xmcasepir{font-size: 26rpx;color:#ff7e09;}

/*xmcommp*/
.xmcommp{text-align: center;padding-bottom: 30rpx;padding-top: 20rpx;background: #ffffff;}
.xmcommp span{font-size: 30rpx;}
</style>
