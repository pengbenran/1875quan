<template>
  <div>
    <div class="showmodel" v-if="selectbtnbool_s"></div>
        <div class="itemmask" :class="{'selectbtn':selectbtnbool_s}">
        <div class="itemleft" @click="dingjidong">{{tip}}</div>
        <div class="bntlistt">
            <div class="btn1" v-for="(item,index) in lisbtn_s" :index='index' :key="key" @click="toclick(item.url)">
            <div class="btnimg"><img :src="item.btnimg"></div>
            <div class="titless">{{item.btnname}}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
//   props: ['lisbtn_s'],
  props: ['selectbtnbool_s','lisbtn_s'],
  data () {
    return {
    	tip:'展开'
    }
    },
    methods: {
        toclick(url){
        console.log(url);
        if(url=='../my/main'||url=='../index/main'){
          wx.switchTab({ url: url });
        }else{
          wx.navigateTo({ url: url});
        }
      },
            dingjidong(){
       this.selectbtnbool_s=!this.selectbtnbool_s;
       this.tip='收缩'
      },
    }
}
</script>

<style>
/*itemmask*/
.itemmask{position: fixed;z-index: 3;right:-415rpx;bottom: 140rpx;display:flex;align-items: center;transition: all 0.4s;}
.bntlistt{display: flex;align-items:center;}
.selectbtn{right:15rpx;}
.itemleft{font-size: 26rpx;color: #fff;background: #000;opacity: 0.2;width: 85rpx;height: 85rpx;text-align: center;line-height: 85rpx;
border-top-left-radius: 10rpx;border-bottom-left-radius: 10rpx;word-wrap : break-word}
.showmodel{position: fixed;z-index: 2;height: 100vh;width: 100%;top: 0;left: 0;;background:#000;opacity:0.2;}
.btnimg{text-align: center;height: 54rpx;}
.btnimg img{width: 54rpx;height: 54rpx;margin: auto;}
.bntlistt  .titless{color: #666;font-size: 26rpx;display: block;text-align: center;}
.btn1{padding:15rpx 25rpx;}
.bntlistt{background: #fff;border-radius: 6rpx;}
</style>