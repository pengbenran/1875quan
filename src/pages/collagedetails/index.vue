<template>
  <div class="collagedetailContainer">
    <swiper class="swiper_box" autoplay="true" interval="5000" duration="1000" :style="{width:imageWidth,height:imageHeigth}">    
        <swiper-item v-for="(item,index) in Gallery" :index="index" :key="key">
          <image :src="item.original"></image>
        </swiper-item>
    </swiper>
    <div class="collageconent">
        <div class="price">
            <span class="nowprice">￥{{collageGoodsDo.activityPrice}}</span>
            <span class="oldprice">￥{{Goods.price}}</span>
            <span class="balance">库存:{{Goods.enableStore}}件</span>
        </div>
        <div class="title">
            {{Goods.name}}
        </div>
        <div class='Shop-box'>
          <div class='Sbox-left'>
            <image :src='boxleft'></image>
            <text>店铺认证</text>
          </div>
          <div class='Shop-text'>{{collageDo.collagePersons}}人团</div>
        </div>
        <div class='genuine'>
          <div class='g1' v-for="(item,index) in tags" :index="index" :key="key">
            <image :src='gimg'></image>
            <text>{{item.tagName}}</text>
          </div>
        </div>
    </div>
<!-- 正在拼团 -->
    <div class='group'>
      <div class='g-line'>
        <div class='gru'>
          <span class='line'></span>
          <span>一键参团</span>
        </div>
      </div>
      <div class='joinContent'>
        <div class='join' v-for="(item,index) in collages" :index="index" :key="key">
          <div class='h-left'>
            <div class='h-img'>
              <image :src='item.face'></image>
            </div>
            <div class='h-text'>
              <text class='from'>{{item.uname}}</text>
              <div class='h-from'>
                <text class='from'>仅差</text>
                <text class='nub'>{{item.shortPerson}}</text>
                <text class='from'>人</text>
                <text class='from' style="margin-left:30rpx;">剩余{{item.countDownHour}}时{{item.countDownMinute}}分{{item.countDownSecond}}秒</text>
              </div>
            </div>
          </div>
          <div class='join-img' @click="Readytobuy(1,item.memberCollageId)">去参团</div>
        </div>
      </div>
    </div>
    <div class='tip'>
      <text>开团后邀请好友参团，若24h之内未成团则自动退款</text>
    </div>
    <!-- 商品详情  -->
    <div class='g-lines ma-top'>
      <div class='line'></div>
      <text>商品详情</text>
    </div>
    <div>
       <wxParse :content="Goods.intro" @prediv="prediv" @navigate="navigate" />
    </div>
    <div class='footer'>
     <!-- 单独购买 -->
     <div class='foo-box' @click="Readytobuy(2)">
      <div class='foo-one'>￥{{Goods.price}}</div>
      <div class='foo-two'>单独购买</div>
    </div>
    <div class='foo-box boxone' @click="Readytobuy(3)">
      <div class='foo-one'>￥{{collageGoodsDo.activityPrice}}</div>
      <div class='foo-two'>一键开团</div>
    </div>
  </div>

  <!--立即购买模态框-->
  <div class="commodity_screen"  v-if="sModalStatuss" @click="hModals"></div>
  <div :animation="animationData" class="commodity_attr_box" v-if="sModalStatuss">
    <div class='commodity-box'>
      <div class='commodity-box1'>
        <div class='com-box1-left'>
          <image :src='Goods.thumbnail'></image>
        </div>
        <div class='com-box1-right'>
          <div class='box1-right-top'>
            <text>{{Goods.name}}</text>
            <div class='cha-img' @click="hModals">
              <image :src='chaimg'></image>
            </div>
          </div>
          <div class='cha-btm'>
           <text class='money-red' v-if="Type[1].isClick">￥{{Goods.price}}</text>
           <text class='money-red' v-else>￥{{collageGoodsDo.activityPrice}}</text>
         </div>
       </div>
     </div>
     <div class='commodity-box3'>
      <text>购买数量：</text>
      <div class='btn'>
        <div id='del1' type="default" @click='minusCount'>-</div>
        <input  type='number' v-model="buynum"></input>
        <div id='add1' type='defalut' @click='addCount'>+</div>
      </div>
    </div>
  </div>
  <!-- <div class='commodity-box5'>下一步</div>  -->
  <div class='commodity-box6' >
    <div class='com-box6' @click='cantuan' style='width:100%'  v-if="Type[0].isClick">
      立即参团
    </div>
    <div class='com-box6' @click='buySelf' style='width:100%'  v-if="Type[1].isClick">
     单独购买
   </div>
   <div class='com-box6' @click='kaituan' style='width:100%'  v-if="Type[2].isClick">
     立即开团
   </div>
 </div>
</div>
  </div>
</template>

<script>
import globalStore from '../../stores/global-store'
import wxParse from 'mpvue-wxparse'
export default {
  data () {
    return {
     imageWidth:'',
     imageHeigth:'',
     sModalStatuss:false,
     chaimg:globalStore.state.imgapi+"image/xx.png",
     boxleft:globalStore.state.imgapi+"image/renzhenicon.png",
     gimg:globalStore.state.imgapi+"image/zhichi.jpg",
     Gallery:[],
     Goods:{},
     tags:[],
     collageDo:[],
     collageGoodsDo:{},
     collages:[],
     Type: [{ buyType: 1, isClick: false },
     { buyType: 2, isClick: false },
     { buyType: 3, isClick: false}],
     animationData:'',
     buynum:1
    }
  },

  components: {
    wxParse
  },

  methods: {
    // 参团
  cantuan: function (e) {
    var that = this;
    console.log(e)
    if (that.buynum > that.Goods.enableStore) {
      wx.showToast({
        title: "库存不够！",
        icon: "success",
        durantion: 2000
      })
    }
    else {
      wx.navigateTo({
        url: "../dingdan2/main?pic=" + that.buynum + '&goodsId=' + that.Goods.goodsId + '&price=' + that.collageGoodsDo.activityPrice + '&memberCollageId=' + that.memberCollageId + '&Type=C',
      })
    }   
  },
// 单独购买
 buySelf:function(e){
    var that = this
    var goodarr = []
    var goodlist = {}
    goodlist.pic = that.buynum
    goodlist.goodsId = that.goodsId
    goodlist.productId = that.productId
    goodarr[0] = goodlist
    wx.navigateTo({
      url: "../dingdan/main?goodlist=" + JSON.stringify(goodarr) + '&cart=0'
    })
  },
// 开团
  kaituan:function(){
    var that = this;
    if (that.buynum > that.Goods.enableStore) {
        wx.showToast({
          title: "库存不够！",
          icon: "success",
          durantion: 2000
        })
    }
    else{ 
    wx.navigateTo({
      url: "../dingdan2/main?pic=" + that.buynum + '&goodsId=' + that.Goods.goodsId + '&price=' + that.collageGoodsDo.activityPrice + '&collagePersons='+that.collageDo.collagePersons+'&Type=K',
            })
    }   
  },
      /**
       * 绑定加数量事件
       */
  addCount(e) {
    var that=this
   that.buynum=that.buynum+1
  },
  /**
     * 绑定减数量事件
     */
  minusCount(e) {
    var that=this
    if (that.buynum <= 1) {
      that.buynum=1
    }else{
      that.buynum=that.buynum-1
    }
  },
    Readytobuy:function(buytype,collageId){
// 显示模态框
    var that=this
    for (var i in that.Type) {
      that.Type[i].isClick=false
    }
    if(buytype==1){ 
      let cantuanParams = {}
      cantuanParams.memberId = wx.getStorageSync('memberId')
      cantuanParams.memberCollageId = collageId
          // 调用接口
          wx.request({
            url: globalStore.state.api + "/api/collage/joinCollageRepetition",
            data: {
              params: JSON.stringify(cantuanParams)
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.code == 1) {
                wx.showModal({
                  title: '提示',
                  showCancel:false,
                  confirmText:'我知道了',
                  content: '你已经参加过该拼团了哦！',
                  success: function (res) {

                  }
                })
              }
              else {
                that.sModel();
                that.Type[0].isClick=true;
                that.memberCollageId=collageId;
              }
            }
          })
          

        }
        else if (buytype == 2){
         that.sModel();
         that.Type[1].isClick=true
       }
       else{
        that.sModel();
        that.Type[2].isClick=true
      }
    },
    countdown:function(i,endtime){
    var that=this;
    var timestamp2 = (new Date()).valueOf();
    var leftTime = (endtime+86400000) - timestamp2
    if (leftTime >= 0) {
      var interval = setInterval(function () {
        // var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
        var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        leftTime = leftTime - 1000;
        that.collages[i].countDownHour=hours;
        that.collages[i].countDownMinute=minutes;
        that.collages[i].countDownSecond=seconds;
      }, 1000)
      if (leftTime <= 0) {
        clearinterval(interval)
      }
    } 
   },
    sModel:function(){
    var that=this;
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateY(300).step()
    that.animationData=animation.export();
    that.sModalStatuss=true;
    setTimeout(function () {
      animation.translateY(0).step()
      that.animationData=animation.export()
    }, 200)
  },
  hModals: function () {
    // 隐藏遮罩层
    var that=this;
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    that.animationData= animation.export()
    setTimeout(function () {
      animation.translateY(0).step()
      that.animationData=animation.export();
      that.sModalStatuss= false;     
    }, 200)
  },
  },

  onLoad() {
    var that = this;
    var windWidth=(wx.getSystemInfoSync().windowWidth);
    that.imageWidth=windWidth+"px";
    that.imageHeigth=windWidth*9/16+'px';
    that.collageGoodsId=options.collageGoodsId;
    // that.collageGoodsId=1
    that.goodsId=options.goodsId;
    // that.goodsId=199692
    that.memberId=wx.getStorageSync('memberId');
    // that.memberId=131

    wx.showLoading({
      title: '加载中',
    })
    //上个页面传的开团活动商品数据
    //商品详情
    var goodsParms = {}
    goodsParms.goodsId = that.goodsId
    goodsParms.memberId = that.memberId
    wx.request({
      url: globalStore.state.api + '/api/Goods/getProduct',
      data: {
        parms: goodsParms
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {    
         that.productId= res.data.product.productId
      }
    })
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
        wx.hideLoading()   
        that.Gallery= res.data.Gallery;
        that.article=res.data.Goods.intro;
        that.Goods=res.data.Goods;
        that.tags=res.data.tags;
        // WxParse.wxParse('article', 'html', that.data.article, that, 25);
      }
    })
    // 获取拼团数据
    wx.request({
      url: globalStore.state.api + '/api/collage/seleCollGoods/' + that.collageGoodsId, 
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code==0){   
            that.collageDo= res.data.collageDO,
            that.collageGoodsDo= res.data.collageGoodsDO   
        }   
      }
    })

    // var goodsList = options.goodsList
  //   var goodsList = JSON.parse(e.goodString);
  //   console.log(goodsList);
  // //请求获取正在开团的数据
    wx.request({
      url: globalStore.state.api +'/api/collage/allStartCollage', 
      data: {
        goodsId: that.goodsId
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {  
        for(var i=0;i<res.data.length;i++){
          res.data[i].countDownHour=0;
          res.data[i].countDownMinute=0;
          res.data[i].countDownSecond=0;
        }
        that.collages=res.data

       // console.log(res.data)
       // that.countdown(that.data.collages[0].collageStarttime)
        for (var i = 0; i < that.collages.length; i++) {
          that.countdown(i,that.collages[i].collageStarttime)
        }
      }
    })  
  }
}
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
image{
  width:100%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
}
.h-img{
  width: 80rpx;
  height: 80rpx;
  overflow: hidden;
  border-radius: 50%;
}
.tip text{
  padding: 20rpx;
  font-size: 30rpx;
  color: #b3b3b3
}
.collageconent{
  background: #fff;
  width: 100%;
  padding-left: 20rpx;
  padding-right: 20rpx;
  box-sizing: border-box;
}
.price{
  height: 100rpx;
  line-height: 100rpx;
}
.nowprice{
  font-size: 1.2em;
  color: #F64F57;
  font-weight: bold;
}
.oldprice{
  color:#ddd;
  font-size: 0.8em;
  margin-left: 20rpx;
  text-decoration: line-through;
}
.balance{
  color:#5b5b5b;
  font-size: 0.8em;
  display: inline-block;
  float: right;
  margin-right: 40rpx;
}
.title{
    width: 80%;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 0.9em;
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:1;
}
.intro{
    width: 80%;
    font-size: 0.8em;
    color:#5b5b5b;
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
}
.Shop-box{
display:flex;
height:86rpx;
justify-content: space-between;
align-items: center;
}
.Sbox-left{
 font-size: 14px;
 display: flex;
 /* align-items: center; */
 color: #ffa800;

}
.Shop-text{
  font-size: 14px;
   color: #5b5b5b;
}
.Sbox-left image{
  width:33rpx;
  height: 33rpx;
  margin-right: 10rpx;
  vertical-align:middle;
}
.genuine{
  display: flex;
  height: 60rpx;
  align-items: center;
  justify-content: space-between;
  border-top: 1rpx solid #eee;
  margin-top: 10rpx;
}
.g1{
  display: flex;
  font-size: 13px;
  color: #5b5b5b;
  align-items: center;
}
.g1 image{
  height: 32rpx;
  width: 32rpx;
  margin-right: 10rpx;
}
/*团购  */
.group{
  display: flex;
  flex-direction: column;
  margin-top: 20rpx;
  background: #FFF;
}
.g-line{
  background: #fff;
  display: flex;
  align-items: center;
  padding: 20rpx;
  height: 60rpx;
  font-size: 0.9em;
  justify-content: space-between;

}
.g-lines{
  background:#fff;
display:flex;
align-items:center;
padding:20rpx;
height:60rpx;

}

.line{
  background: #F64F57;
  height: 32rpx;
  width: 8rpx;
  margin-right: 20rpx;
  display: inline-block;
}
.joinContent{
  max-height: 500rpx;
  overflow: scroll;
}
.join{
  display: flex;
  align-items: center;
  justify-content:  space-between;
  padding: 0 20rpx 20rpx 20rpx;
  height: 100rpx;
  box-sizing: border-box;
}
.h-left{
  display: flex;
  align-items: center;
}
.h-text{
  margin-left: 20rpx;
  font-size: 28rpx;
}
.himg{
  height:89rpx;
width:89rpx;
border-radius:50px;
}
.from{
  font-size: 28rpx;
  color: #b3b3b3;
}
.nub{
  color: red;
  font-size: 25rpx;
}
.join-img{
  width: 134rpx;
  height: 45rpx;
  background: #F64F57;
  border-radius: 10rpx;
  color: #fff;
  text-align: center;
  font-size: 0.8em;
}

.footer{
 display: flex;
 justify-content: space-around;
 width: 100%;
 height: 110rpx;
 position: fixed;
 bottom: 0;  

}
.foo-box{
  height: 100%;
  width: 30%;
  background: red;
  color: #fff;
  background: #FF4236;
  text-align: center;
  padding-top: 15rpx;
  box-sizing: border-box;
  flex-grow: 1;
}
.boxone{
background: #FF0F00;
  }
.foo-one{
font-size:30rpx;
}
.foo-two{
  font-size: 33rpx;
}
/*选模态框css */
.commodity_screen {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.2;
  overflow: hidden;
  z-index: 1000;
  color: #fff;
}
.commodity_attr_box {
  width: 100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background: #fff;
}
.commodity-box{
  padding: 20rpx;
}
.commodity-box1{
 height:180rpx;
 display: flex;
 font-size:32rpx;
}
.commodity-box2{
 font-size:32rpx;
 padding-top: 20rpx;
}
.commodity-box3{
height:120rpx;
border-bottom: 1rpx solid #eee;
display: flex;
align-items: center;
justify-content: space-between;
font-size: 32rpx;
}
.commodity-box4{
height: 100rpx;
display: flex;
align-items: center;
font-size: 32rpx;
}
.commodity-box5{
height: 100rpx;
background: #ff4f4f;
text-align: center;
line-height: 100rpx;
color: #fff;
font-size: 33rpx;
}
.commodity-box6{
display: flex;
font-size: 33rpx;
}
.com-box6{
width: 50%;
height: 110rpx;
background: #ff4f4f;
text-align: center;
line-height: 100rpx; 
color: #fff;
}
.comcor{
  background:#feba33;
}
.com-box1-left{
width: 150rpx;
height: 150rpx;
overflow: hidden;
}
.com-box1-left image{
 width: 100%;
 height:100%;
 display: block;
}
.com-box1-right{
 width: 75%; 
 margin-left: 20rpx;
 border-bottom: 1rpx solid #eee;
 display: flex;
 flex-direction: column;
 justify-content: space-around;
}
.box1-right-top{
  display: flex;
 justify-content: space-between;
  /* height:75rpx; */
}
.box1-right-top text{
  width:70%;
  
  display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
}
.cha-img{
 width: 50rpx;
 height: 50rpx;
}
.cha-btm{
  display: flex;
  justify-content: space-between;
}
.gray{
 color: #5b5b5b;
 padding-right: 20rpx;
 font-size: 32rpx;
}
.cha-img image{
 width: 50rpx;
 height: 50rpx;
}
.money-red{
  color: red;
  font-size:32rpx;
}
.btn{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.btn input{
margin:0;
width:30px;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
border-top:1px solid #eee;
border-bottom:1px solid #eee;
font-size:15px;
height:50rpx;
min-height: 40rpx;
color: #000;
}
#del1{
   display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  height:50rpx;
  width:55rpx;
  border: 1px solid #DDD;
  font-size:18px;
}
#add1{
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 45%;
  border-top-right-radius: 45%;
  height:50rpx;
  width:55rpx;
  border: 1px solid #DDD;
  font-size:18px;
}
.leave{
  width: 80%;
}
</style>
