<template>
  <div class="dingdanContainer">
      <div  v-if="isAddr">
     <div class="dingdanHeader">
       <div class="dingleft">
         <img :src="heademapimg" >
       </div>
       <div class="dingright">
         <div class="title"><span>收货人：{{addr.name}}</span><span>15623140205</span></div>
         <div class="topdizhi">收货地址：{{addr.province}}{{addr.city}}{{addr.region}}{{addr.addr}}</div>
         <div class="dingtip">(收货不便时，您可以自选投放地点及自取)</div>
       </div>
       <div class="dingrightimg"><img :src="headerrightimg" ></div>
     </div>
     <div class="topbgimg"><img :src="headertopimgbg"></div>
     </div>
     <!--dingdanHeader end-->

     <div class="topBtn" @click="address" v-else><span>+ 点击新增地址</span></div>
     <!--userInfo end-->
     
     <div class="orderList">
      <div class="shopTitle"><image :src='homeimg' class="img01"></image><span>谷琴优品</span><image :src='titleright' class="img02"></image></div>
      <!--shopTile end-->
      <div class="orderinfo">
       <div class="infoimg">
         <div class="infoleft"><image :src="Goods.thumbnail"></image></div>
         <div class="inforight">
           <div class="inforighttitle">{{Goods.name}}</div>
           <div class="infoguige">
             <span class="infocase">正品发货</span>
           </div>
           <div class="infobottom">
             <div class="infoprice"><span>￥{{price}}</span><span></span></div>
             <div class="infonum">X{{pic}}</div>
           </div>
         </div>
       </div>
      </div>
        <!--orderinfo end-->
        <div class="listitem listinput"><span>买家留言：</span> <input  type="text" placeholder="点击填写留言" v-model ="msg" placeholder-style="color:#8d8d8d;"/></div>

        <div class="Summary">
          <div class="Summaryitem"><span>商品金额</span><span>￥{{totalPrice}}</span></div>
          <div class="Summaryitem"><span>运费</span><span>￥0</span></div>
        </div>
    </div>
      
      <div class="footer"><div class="footerleft">合计：<span>￥{{totalPrice}}</span></div><div class="footerright" @click="toast()">提交订单</div></div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"; 

export default {
  data () {
    return {
     homeimg:globalStore.state.guqinimgapi  + "/image/shang.png",
     titleright:globalStore.state.guqinimgapi  +"/image/8.png",
     heademapimg:globalStore.state.guqinimgapi +"/image/order04.png",
     headerrightimg:globalStore.state.guqinimgapi +"/image/order03.png",
     headertopimgbg:globalStore.state.guqinimgapi +"/image/order01.jpg",
      price:'',
      pic:'',
      goodsId:'',
      Type:'',
      msg:'',
      Goods:{},
      totalPrice:0
    }
  },

  components: {

  },

  methods: {
     
  
  },

  onLoad: function (options) {
    var that = this
    if (options.price == undefined || options.pic == undefined || options.goodsId == undefined || options.Type == undefined){
      
        that.price= wx.getStorageSync('price')
        that.pic=wx.getStorageSync('pic')
        that.goodsId= wx.getStorageSync('goodsId')
        that.Type= wx.getStorageSync('Type')
    }else{
        that.price= Number(options.price).toFixed(2)
        that.pic= options.pic
        that.goodsId=options.goodsId
        that.Type=options.Type
    }
    var totalPrice = that.price * that.pic
    that.memberId= wx.getStorageSync('memberId')
    that.indexdata=wx.getStorageSync('indexdata') 
    that.totalPrice= Number(totalPrice).toFixed(2)
    if (that.Type == 'K') {
      // 开团
      if(options.collagePersons==undefined){
          that.collagePersons=wx.getStorageSync('collagePersons')
      }
      else{
         that.collagePersons= options.collagePersons
      }
    }
    else if (that.Type == 'C') {
      // 参团
      if (options.memberCollageId == undefined) {
         that.memberCollageId= wx.getStorageSync('memberCollageId')
      }
      else {    
        that.memberCollageId= options.memberCollageId
      }
        that.isKaituan= false
    }
    else if(that.Type="KJ"){
      // 砍价
      if (options.cutId == undefined) {   
         that.cutId=wx.getStorageSync('cutId')
      }
      else {
        that.cutId=options.cutId
      }
    }
    else{
      // 限时活动
      if (options.limitId == undefined) {  
          that.limitId= wx.getStorageSync('limitId'),
          that.finalAmount= wx.getStorageSync('finalAmount')    
      }
      else {  
          that.limitId=options.limitId,
          that.finalAmount= Number(options.price).toFixed(2)
      }
    }
    if (wx.getStorageSync('addr') == '') {
      let addParms = {}
      addParms.memberId = that.memberId
      wx.request({
        url: globalStore.state.api + '/api/address/defutaddress',
        data: {
          parms: addParms
        },
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          // wx.setStorageSync('addr', res.data.memberAddressDO);
          if (res.data.code == 1) {
            that.isAddr= false
          }
          else {  
            that.addr=res.data.memberAddressDO
          }

        }
      })
    }
    else {
      
        that.addr= wx.getStorageSync('addr')
      
    }
    var goodsParms = {}
    goodsParms.goodsId = that.goodsId
    wx.request({
      url: globalStore.state.api + '/api/Goods/getGoods',
      // url: 'http://192.168.2.144/api/index/getGoods/166993'
      data: {
        parms: goodsParms
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
          that.Goods= res.data.Goods
          console.log(that.Goods)
      }
    })
    wx.request({
      url: globalStore.state.api + '/api/Goods/getProduct',
      data: {
        parms: goodsParms
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        that.productId=res.data.product.productId
      }
    })
  }
}
</script>

<style scoped>
/*dingdanHeader*/
image{
  height: 100%;width: 100%;display: inline-block;
}
.dingdanHeader{display: flex;padding-top: 20rpx;padding-bottom: 15rpx;}
.dingdanHeader .dingleft{width: 15%;display: flex;align-items: center;justify-content: center;}
.dingdanHeader .dingright{width: 75%;display: flex;flex-direction: column;justify-content: space-between;}
.dingleft img{width: 52rpx;height: 55rpx;}
.title{display: flex;justify-content: space-between;}
.title span{font-size: 32rpx;}
.topdizhi{font-size: 28rpx;margin-top: 15rpx;}
.dingtip{font-size: 28rpx;color: #efc26f;margin-top: 15rpx;}
.dingrightimg{width: 10%;display: flex;justify-content: center;align-items: center;margin-top: 15rpx;}
.dingrightimg img{width: 25rpx;height: 38rpx;}
.topbgimg img{height: 12rpx;width: 100%;}

/*topbtn*/
.topBtn{background: #f2f2f2;text-align: center;}
.topBtn span{font-size: 30rpx;line-height: 90rpx;color: #666;}

/*shopTitle*/
.shopTitle{display: flex;align-items: center;padding-left: 10rpx;padding-top: 20rpx;padding-bottom: 20rpx;}
.shopTitle .img01{width: 38rpx;height: 38rpx;}
.shopTitle .img02{width: 21rpx;height: 35rpx;}
.shopTitle span{padding-left: 25rpx;padding-right: 25rpx;font-size: 30rpx;}


/*shoplist*/
.shoplist{border-top:10rpx solid #f2f2f2;}

/*iconlist*/
.iconlist{display:inline-flex;align-items: center;margin-left: 20rpx;}
.iconlist icon{height: 45rpx;height: 45rpx;}

/*infoimg*/
.orderList{margin-bottom: 150rpx;border-top: 20rpx solid #f3f3f3}
.orderinfo{height: 170rpx;display: flex;justify-content:space-between;align-items: center;padding: 25rpx 15rpx;}
.infoimg{display: flex;align-items: center;width: 100%;}
.infoimg .infoleft{width: 28%;display: flex;justify-content: center;align-items: center;}
.infoimg .inforight{width: 72%;display: flex;flex-direction:column;justify-content: space-between;}
.inforighttitle{font-size: 30rpx;}
.infoleft {width:180rpx;height:180rpx;overflow: hidden;}  
.infobottom{display: flex;justify-content:space-between;margin-top: 15rpx;}
.infobottom img{width: 20rpx;height: 20rpx;}
.infobottom span{font-size: 28rpx;color:#666;}
.infoguige{font-size: 28rpx;color:#666;margin-top: 15rpx;}
.infoguige span{display:inline-block;margin-top: 10rpx;}
.infocase{border:1px solid #ff0100;border-radius: 8rpx;color: #ff0100;padding-left: 15rpx;padding-right: 15rpx;}
.infoguige .infoshopnum{display: block;}
.infonum{font-size: 28rpx;color: #666;}
.infoprice span{font-size: 30rpx;color: #ff0101;}

/*listitem*/
.listitem{height: 100rpx;line-height: 100rpx;display: flex;align-items: center;justify-content: space-between;border-bottom:1rpx solid #eee;padding-left: 20rpx;padding-right: 20rpx;}
.listinput{justify-content: initial;}
.listinput input{font-size: 26rpx;}
.listitem span{font-size: 32rpx;width: 25%}
.listitembtn{display: flex;align-items: center;}

/*Summary*/
.Summary{border-bottom:1rpx solid #eee;}
.Summary span{font-size: 32rpx;}
.Summaryitem{display: flex;justify-content: space-between;align-items: center;height: 75rpx;line-height: 75rpx;padding-right: 20rpx;padding-left: 20rpx;}

/*footer*/
.footer{box-shadow: 0px -3px 4px 0 rgba(0,0,0,0.05);position: fixed;bottom: 0;left: 0;width: 100%;display: flex;justify-content: space-between;align-items: center;line-height: 120rpx;}
.footer .footerleft{width: 65%;text-align:right;font-size: 35rpx;padding-right: 25rpx;background: #fff;}
.footer .footerright{width: 35%;text-align: center;background: linear-gradient(to right, #ff9003 , #ff5001);color: #ffffff;}
.footerleft span{color: #fc6305;}
</style>
