<template>
 
<div class='shanquanindex'>
<swiper class="swiper_box" autoplay="true" interval="5000" duration="1000">    
    <swiper-item>
      <image src="https://shop.guqinet.com/html/images/shanquan/banner2.jpg" />
    </swiper-item>
    <swiper-item>
      <image src="https://shop.guqinet.com/html/images/shanquan/banner.jpg" />
    </swiper-item>
    <swiper-item>
      <image src="https://shop.guqinet.com/html/images/shanquan/banner1.jpg" />
    </swiper-item>
</swiper>
<!-- 菜单选项-->
  <div class='menu'>
    <div class='df nav'>
      <div class='df_1'  v-for="(item,index) in kind" @click=jump(item.jumpurl)>
        <image :src='item.imageurl'></image>
        {{item.name}}
      </div>
    </div>
  </div>
  <div class='membeintro'>
    <image src='https://shop.guqinet.com/html/images/shanquan/memintro.jpg'></image>
  </div>
  <div class='membeintrodetail'>
    <div class='membeintrodetailtitle'>会员特权</div>
    <div class='membeintrodetailcontent'>
       <div>
       <image src="https://shop.guqinet.com/html/images/shanquan/adv1.jpg"></image>
      </div>
        <div>
       <image src="https://shop.guqinet.com/html/images/shanquan/adv1.jpg"></image>
      </div>
       <div>
       <image src="https://shop.guqinet.com/html/images/shanquan/adv1.jpg"></image>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      banner:['https://shop.guqinet.com/shopimages/dimages/ynkrfldb-yyu4-0l61-0t3v-0xrxcw5q1i3r.jpg','https://shop.guqinet.com/shopimages/dimages/ynkrfldb-yyu4-0l61-0t3v-0xrxcw5q1i3r.jpg','https://shop.guqinet.com/shopimages/dimages/ynkrfldb-yyu4-0l61-0t3v-0xrxcw5q1i3r.jpg'],
       kind: [{ name: '3c数码', imageurl:'https://shop.guqinet.com/html/images/shanquan/kindicon.jpg',jumpurl:'../shumaindex/main'},
      { name: '家装建材', imageurl: 'https://shop.guqinet.com/html/images/shanquan/kindicon1.jpg', jumpurl: '../jiancaiindex/main' },
      { name: '婚纱摄影', imageurl: 'https://shop.guqinet.com/html/images/shanquan/kindicon2.jpg', jumpurl: '../hunshaindex/main' },
      { name: '鞋帽服饰', imageurl: 'https://shop.guqinet.com/html/images/shanquan/kindicon3.jpg', jumpurl: '../xiemaoindex/main' },
      { name: '旅游特产', imageurl: 'https://shop.guqinet.com/html/images/shanquan/kindicon4.jpg', jumpurl: '../lvyouindex/main' },
      { name: '美容养生', imageurl: 'https://shop.guqinet.com/html/images/shanquan/kindicon5.jpg', jumpurl: '../meirongindex/main' },
      { name: '培训教育', imageurl: 'https://shop.guqinet.com/html/images/shanquan/kindicon7.jpg', jumpurl: '../peixunindex/main' },
      { name: '新零售', imageurl: 'https://shop.guqinet.com/html/images/shanquan/kindicon8.jpg', jumpurl: '../lingshouindex/main' }],
    indicatorDots: false,  //显示面板指示点
    autoplay: true,     //自动切换
    interval: 5000,    //自动切换时间间隔
    duration: 1000,    //滑动动画时长
    }
  },
  components: {

  },

  methods: {
   jump:function(url){
    wx.navigateTo({
      url: url,
    })
   }
    
  },
  
  onLoad(){ 
   
  }
}
</script>

<style scoped>
/* pages/shanquanindex/shanquanindex.wxss */
image{
width:100%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
}
.shanquanindex{
  background: #fff;
  min-height: 100vh;
  padding: 10rpx;
  box-sizing: border-box;
}
/* 轮播 */
.swiper_box{
  width:100%;
  height:200px;
  box-shadow: 0px 10rpx #fdfdfd;
}

/* 菜单选项 */
.menu{
  display:block;
  box-shadow: 0px 5rpx #f1f1f1;
  margin-top: 10rpx;
}
.nav{
  background: #fff;
  padding: 10px 0;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex; 
  text-align: center;
  font-size: 28rpx;
  color: #666;

}
.nav image{
  width: 90rpx;
  height: 90rpx;
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 5px;
  border-radius: 15px;
}
.df{
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
   flex-wrap: wrap;
}
.df_1{
  width: 25%;
  height: 146rpx;
  -webkit-tap-highlight-color: transparent;
}
/* 会员介绍 */
.membeintro{
  width: 100%;
  height: 34.8vw;
  box-shadow: 0px 5rpx #f1f1f1;
  margin-top: 10rpx;
}
.membeintrodetail{
  box-shadow: 0px 5rpx #f1f1f1;
  margin: 10rpx;
}
.membeintrodetailtitle{
  height: 80rpx;
  line-height: 80rpx;
  font-size: 26rpx;
}
.membeintrodetailcontent{
  height:180rpx;
  width:100%;
  overflow: scroll;
  white-space:nowrap;
}
.membeintrodetailcontent view{
  width: 301rpx;
  height: 170rpx;
  display: inline-block;
}
</style>
