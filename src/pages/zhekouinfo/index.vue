<template>
  <div class="zhekou">
   <div class="header">
       <swiper :indicator-dots='indicatorDots' :autoplay='autoplay'>
           <swiper-item v-for="(item,index) in Gallery" :index='index' :key='item'>
               <img :src="item.original" width="100%" height="180" @click='previewImage(item.type,item.action)'>
           </swiper-item>
       </swiper>
       
       </div>
   <div class="info">
       <div class="price"><span>￥{{xianshidetail.finalAmount}}<label>原价￥{{Gooddetatil.price}}</label></span><small>库存 <em>{{Gooddetatil.enableStore}}</em> 件</small></div>
       <div class="title">{{Gooddetatil.name}}</div>
       <!--<div class="infotion">口味丰富，味道香满街，营养价值高，口感上乘，是顾客放心食用的大品牌。</div>-->
       <div class="shopinfo"><span><img :src="shopimg">店铺认证 <!--<label>运费：￥6.00</label>--></span>
         <div><small>{{countDownHour}}</small>时<small>{{countDownMinute}}</small>分<small>{{countDownSecond}}</small>秒</div>
       </div>
   </div>
    <div class="infolist">
        <ul>
            <li><img :src="listimg">正品保证</li>
            <li><img :src="listimg">全场包邮</li>
            <li><img :src="listimg">24h发货</li>
            <li><img :src="listimg">返点积分</li>
        </ul>
    </div>
    <div class="guige">
       <span>选择：规格</span> 
    </div>
    <div class="shopcontent">
        <div class="shoptitle"><span>商品详情</span></div>
        <div class="content">
            <wxParse :content="article" @preview="preview" @navigate="navigate" />
        </div>
    </div>
     <div class="shopbtn">
         <div class="btncart">加入购物车</div>
         <div class="goumaibtn" @click="buy()">立即购买</div>
     </div>
    <!--模拟框-->
    <div class="shopmodel" v-if="showModalStatus" :animation="animationData">
       <div class="modelwarp">
         <div class="warpleft"><image :src="Gooddetatil.thumbnail"></image></div>
         <div class="warpright">
           <div class="warprighttop"><span>{{Gooddetatil.name}}</span><div class="col-img"><image :src="xximg" @click="hidemodel"></image></div></div>
          <div class="warprightbottom"><span>￥{{xianshidetail.finalAmount}}</span><span>库存{{Gooddetatil.enableStore}}件</span></div>
         </div>
       </div>
       <div class="modelNum">
          <span>购买数量</span>
          <div class="btn">
            <div class="del1" @click="less">-</div>
            <input type="number" :value="pic" @change="inputchange">
            <div class="add1"  @click="plus">+</div>
          </div>
       </div>
       <div class="modelbtn">
         <div class="cart" @click="toCart">加入购物车</div>
         <div class="buy" @click="next">立即购买</div>
       </div>
     </div>
     <!--model end-->
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";
import wxParse from 'mpvue-wxparse' 

export default {
  data () {
    return {
        headerimg: globalStore.state.imgapi+'image/zhekou01.jpg',
        shopimg:globalStore.state.imgapi+'image/zhekou02.jpg',
        listimg:globalStore.state.imgapi+'image/zhekou03.jpg',
        contentimg:globalStore.state.imgapi+'image/zhekou04.jpg',
        xximg:globalStore.state.imgapi+"/image/xx.png",
        indicatorDots:true,
        showModalStatus:false,
        autoplay:true,
        pic:1,
        ImageWidth:0,
        ImageHeight:0,
        xianshidetail:[],
        Gallery:[],
        Gooddetatil:[],
        countDownDay:0,
        countDownHour:0,
        countDownMinute:0,
        countDownSecond:0,
        article:'',
        animationData:{}
    }
  },

  components: {
 wxParse
  },

  methods: {
    buy(){
     let that=this;
     that.showModle();
     that.showModalStatus=true;
    },
    next(){
    var that=this;
    console.log(that.xianshidetail)
        if(that.xianshidetail.perTotal==0){
            wx.navigateTo({
                url: "../dingdan2/dingdan2?pic=" + that.pic + '&goodsId=' + that.xianshidetail.goodsId + '&price=' + that.xianshidetail.finalAmount + '&limitId=' + that.xianshidetail.limitId + '&Type=Z',
            })
        }
        else{
        if (that.pic > that.xianshidetail.perTotal) {
            wx.showToast({
            title: '限购数量为' + that.xianshidetail.perTotal,
            })
        } else {
            wx.navigateTo({
                url: "../dingdan2/dingdan2?pic=" + that.pic + '&goodsId=' + that.xianshidetail.goodsId + '&price=' + that.xianshidetail.finalAmount + '&limitId=' + that.xianshidetail.limitId + '&Type=Z',
            })
        }
        }
   },
   onloads(options){
        var that=this;
        wx.getSystemInfo({ success: res => {
            that.ImageWidth=res.screenWidth + 'px';
            that.ImageHeight=res.screenWidth + 'px';
        } });
        wx.showLoading({
         title: '加载中',
        })
       // var xianshidetail = JSON.parse(options.xianshidetail);
        console.log()
        that.xianshidetail=options.xianshidetail;
        var timestamp2 = (new Date()).valueOf();
        var leftTime = that.xianshidetail.endtime - timestamp2;
        console.log("获取时间")
        // console.log(timestamp2)
        // console.log(that.xianshidetail.endtime)
        // console.log(leftTime)
        //获取时间
        if (leftTime >= 0) {
          var interval = setInterval(function () {
            var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
            var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
            var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
            var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
            leftTime = leftTime - 1000;
            that.countDownDay=days;
            that.countDownHour=hours;
            that.countDownMinute=minutes;
            that.countDownSecond=seconds;
          }, 1000)
          if (leftTime <= 0) {
            clearinterval(interval)
          }
          console.log(hours)
           console.log(minutes)
            console.log(seconds)
        }
       
        var parms = {}
        parms.goodsId = that.xianshidetail.goodsId
        wx.request({
        url:  globalStore.state.api + '/api/Goods/getGoods',
        // url: 'http://192.168.2.144/api/index/getGoods/166993'
        data: {
            "parms": parms
        },
        header: {
            'Content-Type': 'json'
        },
        success: function (res) {
            wx.hideLoading()
            that.article = res.data.Goods.intro;
            var percount = res.data.percount
            var point = res.data.Goods.point
            var haveSpec = res.data.Goods.haveSpec;
            that.Gallery=res.data.Gallery;
            that.Gooddetatil=res.data.Goods;
            that.tags=res.data.tags;

            console.log(that.Gallery);
         },
        })
   },

    //显示模拟框
    showModle(){
      let that=this;
      let animation=wx.createAnimation({//设置动画
      duration: 200,
      timingFunction: "linear",
      delay: 0
      })
      this.animation = animation;//设置开始动画
      animation.translateY(300).step();
      that.animationData=animation.export();
      that.showModalStatus=true;
      setTimeout(function(){//设置动画结束
        animation.translateY(0).step();
        this.animationData=animation.export()
      }.bind(this),200)
    },
    //隐藏模拟框
    hidemodel(){
      let that=this;
      let animation=wx.createAnimation({//设置动画
      duration: 200,
      timingFunction: "linear",
      delay: 0
      })
      this.animation = animation;//设置开始动画
      animation.translateY(300).step();
      that.animationData=animation.export();
      setTimeout(function(){//设置动画结束
        animation.translateY(0).step();
        this.animationData=animation.export()
        that.showModalStatus=false;
      }.bind(this),200)
    },
    //绑定加的数量
    plus(){
    let pic=this.pic;
    pic+=1;
    this.pic=pic;
    },
    //绑定减数量
    less(){
    let pic=this.pic;
    if(pic<=1){
        return;
    }
    pic-=1;
    this.pic=pic;
    },
      //当input的框输入的时候
    inputchange(e){
      this.pic=parseInt(e.target.value);
    },
  },
    onLoad:function(){
        //模拟数据
        var options={};
        var xianshidetail={};
        xianshidetail.endtime=1536336000000;
        xianshidetail.perTotal=1;
        xianshidetail.finalAmount=0.01;
        xianshidetail.goodsPrice=0.01;
        xianshidetail.goodsId=199692;
        xianshidetail.limitId=1;
        options.xianshidetail=xianshidetail
       this.onloads(options)

    }
}
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");



image{height: 100%;width: 100%;display:block;}
.header{height: 440rpx;}
.zhekou{background: #fff;}
.header swiper{height: 100%;}

/*info*/
.info{padding:20rpx;}
.price{display: flex;justify-content: space-between;align-items: center;}
.price span{font-size: 38rpx;font-weight: bold;color: #eb352a;}
.price label{margin-left: 16rpx;color: #d0d0d0;font-size: 32rpx;font-weight: 200;text-decoration:line-through}
.price em{color: #eb352a;display: inline-block;}
.price small{color: #d0d0d0;font-size: 32rpx;}
.title{padding-top: 10rpx;font-size: 34rpx;}
.infotion{font-size: 30rpx;color: #d0d0d0;font-weight: 300;padding-top: 7rpx;}

.shopinfo{display: flex;justify-content: space-between;align-items: center;padding-top: 30rpx;}
.shopinfo span {font-size: 30rpx;color: #ffbf44;display: flex;align-items: center;justify-content: center;}
.shopinfo span img{width: 32rpx;height: 32rpx;margin-right: 15rpx;}
.shopinfo span label{color: #676767;padding-left: 30rpx;font-size: 28rpx;}
.shopinfo div{display: flex;justify-content:flex-end;align-items: center;color: #e7342d;font-size: 28rpx;}
.shopinfo div small{width: 45rpx;height: 40rpx;line-height: 40rpx;border-radius: 5rpx;text-align: center;background:#e7342d;color: #fff;margin-left: 6rpx;;margin-right: 6rpx;}

/*infolist*/
.infolist{padding-top: 25rpx;}
.infolist ul{height: 75rpx;}
.infolist li{float: left;width: 25%;font-size: 26rpx;display: flex;justify-content: center;align-items: center;}
.infolist li img{width: 30rpx;height: 30rpx;padding-right: 10rpx;}

/*guige*/
.guige{height: 80rpx;line-height: 80rpx;padding: 0 25rpx;background: #fff;border-top: 15rpx solid #f5f5f5;border-bottom: 15rpx solid #f5f5f5}
.guige span{color: #ea352c;font-size: 30rpx;}

/*shopcontent*/
.shopcontent{margin-bottom: 110rpx;}
.shoptitle{padding:10rpx 20rpx 0;font-size: 30rpx;line-height: 70rpx;}
.shoptitle span{border-left: 8rpx solid #e93429;padding-left: 10rpx;font-size: 35rpx;}


/*shopbtn*/
.shopbtn{display: flex;align-items: center;position: fixed;bottom: 0;width: 100%;}
.shopbtn div{width: 50%;text-align: center;color: #fff;font-size: 32rpx;height: 110rpx;line-height: 110rpx;}
.btncart{background: #feba33;}
.goumaibtn{background:#ff3b3c;}

/*模拟框样式*/
.shopmodel{padding-top: 20rpx;position: fixed;bottom: 0;width: 100%;left: 0;background: #ffffff;border-top: 1px solid #f8f8f8;z-index:2;
}
.modelwarp{display: flex;padding-left: 20rpx;padding-right: 20rpx;}
.warpleft{width: 20%;margin-right: 2%;}
.warpleft image{width: 100%;height: 160rpx;}
.col-img{width: 100rpx;}
.col-img image{width: 45rpx;height: 45rpx;float:right;}
.warpright{width: 78%;}
.warpright span{font-size: 30rpx;}
.warprighttop{display: flex;justify-content: space-between;}
.warprightbottom{display: flex;justify-content: space-between;margin-top: 25rpx;border-bottom: 1px solid #f8f8f8;}
.warprightbottom span:nth-child(1){color:red;}
.warprightbottom span:nth-child(2){color:#666;}
.modelNum{display: flex;justify-content: space-between;height: 120rpx;line-height: 120rpx;padding-left: 20rpx;padding-right: 20rpx;}
.modelNum span{font-size: 30rpx;color:#666;}
.btn{display: flex;align-items: center;}

.modelNum input{margin:0;width:30px;display:flex;justify-content:center;align-items:center;text-align:center;border-top:1px solid #eee;border-bottom:1px solid #eee;font-size:15px;height:50rpx;min-height:40rpx;color:#000;}
.del1{display:flex;justify-content:center;align-items:center;border-top-left-radius:50px;border-bottom-left-radius:50px;border-bottom-right-radius:0px;border-top-right-radius:0px;height:50rpx;width:55rpx;border:1px solid #DDD;font-size:18px;}
.add1{display:flex;justify-content:center;align-items:center;border-top-left-radius:0px;border-bottom-left-radius:0px;border-bottom-right-radius:45%;border-top-right-radius:45%;height:50rpx;width:55rpx;border:1px solid #DDD;font-size:18px;}

.modelbtn{margin-left: -20rpx;margin-right: -20rpx;}
.modelbtn{display: flex;height: 95rpx;line-height: 95rpx;}
.modelbtn div{width: 50%;text-align: center;line-height:66rpx;color: #ffffff;font-size: 32rpx;}
.modelbtn .cart{background:#feba33;}
.modelbtn .buy{background:#ff4f4f;}
</style>
