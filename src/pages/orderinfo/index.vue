<template>
  <div class="ordercontainer">
    <div class="headerwarp">
      <div class="header">
        <div class="left map"><img :src="headerimg"></div>
        <div class="right">
           <div class="title"><span>{{OrderList.shipName}}</span><span>{{OrderList.shipMobile}}</span></div>
           <div class="info">{{OrderList.shipAddr}}</div>
           <div class="tip">(收货不便时，您可以自选投放地点及自取)</div>
        </div>
      </div>
      <div class="orderimg"><img :src="orderimg"></div>
    </div>
      <!--header end-->

      <div class="shop" v-for="(item,index) in goodItem" :index='index' :key='key' >
        <div class="shopleft"><img :src="item.image"/></div>
        <div class="shopright">
          <div class="infos">
            <div class="zi">{{item.name}}</div>
            <div class="num">20只/一盒</div>  
          </div>
          <div class="pirce">
            <span>￥{{item.price}}</span>
            <span>×{{item.num}}</span>
          </div>
        </div>
      </div>
      <!--shop end-->
      <div class="priceinfo">
         <div class="pirs zongjia"><span>商品总价</span><span>￥{{toprice}}</span></div>
         <div class="pirs yun"><span>运费</span><span>￥{{yunprice}}</span></div>
         <div class="pirs shijijin"><span>应付款</span><span>￥{{zongprice}}</span></div>
      </div>
      <!--priceinfo end-->

      <div class="orderinfo">
        <div class="order">订单号：{{OrderList.sn}}</div>
        <div class="time">订单时间：{{OrderList.createTime}}</div>
      </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"
export default {
  data () {
    return {
        headerimg:globalStore.state.imgapi+'image/order04.png',
        orderimg:globalStore.state.imgapi+'image/order01.jpg',
        shopimg:globalStore.state.imgapi+'image/quanquanlist01.png',
        OrderList:{},
        goodItem:{},
        toprice:0,
        yunprice:0,
        zongprice:0
     }
  },

  components: {

  },

  methods: {
   
   price(){
     let that=this;
     var num=0;
     for(var i=0;i<that.goodItem.length;i++){
       num=that.goodItem[i].price*that.goodItem[i].num;
       num+=num;
     }
     that.toprice=num;
     that.zongprice=that.toprice-that.yunprice;
   }
   },
   onLoad(options){
     let that=this;
     that.OrderList=JSON.parse(options.OrderList);
     that.goodItem=that.OrderList.item;
     that.price();
    console.log(that.OrderList);
    console.log(that.goodItem);
  }
}
</script>
<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}

.headerwarp{margin-bottom: 15rpx;margin-top:10rpx;background: #fff;padding-top: 15rpx}
.header{display: flex;align-items: center;}
.orderimg{height: 16rpx;padding-top: 25rpx;}


.left {width: 20%;}
.right{width: 80%;}
.left img{width: 56rpx;height: 62rpx;margin: auto;}
.title span{font-size: 30rpx;margin-right: 20rpx;color: #666;}
.info{font-size: 30rpx;padding-top: 6rpx;padding-bottom: 6rpx;}
.tip{color: #eebd5c;font-size: 28rpx;}

/*shop*/
.shop{display: flex;align-items: center;background: #fff;padding:20rpx 0;}
.shopleft{width: 26%;padding: 0 20rpx}
.shopleft img{height: 168rpx;}
.shopright{width: 65%;display: flex;justify-content: space-between;height: 165rpx;}
.infos .zi{font-size: 28rpx;color: #666;}
.infos .num{color:#a4a4a4;font-size: 26rpx;padding-top: 35rpx;}
.pirce span{display:block;font-size: 28rpx;text-align: right;padding-top: 10rpx;}
.pirce span:nth-child(1){color:#ff6d6d;}

.pirs{display: flex;justify-content:space-between;line-height: 50rpx}
.pirs span{font-size: 30rpx;}
.zongjia span{color: #9f9f9f;}
.yun span{color: #9f9f9f;}
.priceinfo{padding:20rpx 15rpx;background: #fff;margin: 5rpx 0;}

.orderinfo{padding:25rpx 15rpx;background: #fff;}
.orderinfo div{font-size: 30rpx;line-height: 60rpx;color: #9f9f9f;}
</style>
  