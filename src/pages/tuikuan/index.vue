<template>
  <div class="tuikuanContainer">
     <!--pages/tuikuan/tuikuan.wxml-->
    <div class='Spcart'v-for="(item,index) in tuikuandetail.item" :key="key" :index="index">
        <div class='box2'>
          <image :src='item.image'></image>
        </div>
      <!-- 数量加减 -->
        <div class='box6'>
          <div class='character'>{{item.name}}</div>
        </div>
        <div class='box5'>
            <div class='box5-text'>
              <text class='box5-one'>￥{{item.price}}</text>
              <text class='box5-two'>x{{item.num}}</text>
            </div>
            <div class='box5-two'>
              <text class='bao'>正品保障</text>
            </div>
        </div>
    </div>
    <div class='way'>
      <text class='way-text1'>合计：</text>
      <text class='way-text3'>￥{{tuikuandetail.orderAmount}}</text>
    </div>
    <div class='body'>
     <!--  <div class='title'>
        <text>选择退款选项</text>
      </div> -->
    <!--选择  -->
      <div class='option_box'>{{item}}</div>
      <!-- 退款原因  
      <div class='select' catchtap='selectTaps'>
          <text class='select_text'>{{selectDatas[index]}}</text>
          <image class='select_img {{shows&&"select_img_rotate"}}' src='/image/xiala.png'></image>         
      </div>
      <div class='option_box1' style='height:{{shows?(selectDatas.length>5?300:selectDatas.length*60):0}}rpx;'>
          <text class='option1' style='{{inx==selectDatas.length-1&&"border:0;"}}' v-for='{{selectDatas}}' wx:key='thiss' data-index='{{index}}' catchtap='optionTap'>{{item}}</text>
      </div> -->
      <div class='inputs'>
        <textarea placeholder="请输入你要退款的原因" class='add-input' placeholder-style="color:#b3b3b3;" v-model="tuikuanreson"/>
      </div>
      <div class='cellbtn'>
        <button class='com-input01' @click="tuikuan">申请退款</button>
      </div>
  </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"
export default {
  data () {
    return {
      Goods:[],
      tuikuandetail:[],
      tuikuanreson:''
     }
  },

  components: {

  },

  methods: {
    tuikuan:function(){
      var that=this;
      console.log(that.tuikuanreson);
      var parms = {}
      try {
        var memberId = wx.getStorageSync('memberId')
        if (memberId) {
          memberId: memberId
        }
      } catch (e) {
      }
      var returnorder = {}
      returnorder.memberid = memberId
      returnorder.ordersn = that.sn
      returnorder.sellbackAmount = that.tuikuandetail.goodsAmount
      returnorder.remark = ""
      returnorder.show = ""
      returnorder.applyReason = that.tuikuanreson
      returnorder.orderId = that.orderId
      returnorder.type = 0
      parms.returnorder = returnorder
      parms = JSON.stringify(parms)
      wx.request({
        url: globalStore.state.api + '/api/order/returnOrder',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method:"POST",
        data: {
          'parms': parms
        },
        success: function (res) {
          if (res.data.msg == 1){
            wx.showToast({
              title: '申请成功',
            })
            wx.switchTab({
              url: '../my/main',
            })
          }
        }
      })
        }
   },
   onLoad(options){
    var parms = {}
    var that = this
    that.orderId=options.orderId;
    that.sn=options.sn;
    parms.orderId = options.orderId
    parms = JSON.stringify(parms)
    wx.request({
      url: globalStore.state.api  + '/api/order/orderIntRo',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'parms': parms
      },
      success: function (res) {
        if(res.data.code==0){
          that.tuikuandetail=res.data.orderDO
        }    
      }
    })
  }
}
</script>
<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.tuikuanContainer{
  background: #fff;
  width: 95%;
  margin: 20rpx auto;
  height: 95vh;
}
.Spcart{
  background: #FFF;
  display: flex;
  justify-content:  space-between;
  align-items: center;
  height: 260rpx;
  margin-top: 10rpx;
  padding: 10rpx;
  border-bottom: 1rpx solid #eee;
}
.box2{
  height: 200rpx;
  width: 200rpx;
}
.character{
  display:-webkit-box;
word-break:break-all;
text-overflow:ellipsis;
overflow:hidden;
-webkit-box-orient:vertical;
-webkit-line-clamp:3;

  font-size: 14px;
}

.price{
  color: red;
  font-size: 15px;
  height: 25%;
}
.box5{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 80%;
  width: 24%;
  padding-right: 15rpx;
}
.box5-text{
display: flex;
flex-direction: column;
align-items: flex-end;
}
.bao{
font-size:28rpx;
color: #F64F57;
}
.box5-one{
font-size: 15px;
color: red;
}
.box5-two{
display: flex;
justify-content: center;
align-items: center;
font-size: 14px;
color: #8d8d8d;
}
.way{
  display: flex;
  height: 100rpx;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1rpx solid #eee;
  padding:  0 15rpx 0 10rpx;
}
.way-text1{
 font-size:15px;
}
.way-text3{
  font-size:15px;
  color:red; 
}
.select{
  box-sizing: border-box;
  width: 100%;
  height: 70rpx;
  border:1px solid #efefef;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
}
.option_box{
  top: 70rpx;
  width: 100%;
  border:1px solid #efefef;
  box-sizing: border-box;
  height: 0;
  overflow-y: auto;
  border-top: 0;
  background: #fff;
  transition: height 0.3s;
}
.inputs{
  border: 1px solid #DDD;
  height: 400rpx;
  padding: 10rpx;
  box-sizing: border-box;
}
.cellbtn{
  width: 100%;
  height:100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40rpx;
}
.com-input01{
  height:90rpx;
  line-height: 90rpx;
  width:85%;
  color: #fff;
  border-radius: 45rpx;
  background: #F64F57;
  text-align: center;
}
</style>
