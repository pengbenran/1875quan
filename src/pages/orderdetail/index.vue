<template>
  <div class="orderdetailContainer">
    <Tab :find_item="find_item" v-on:listenToChildEvent="showMsgFromChild"></Tab>
    <!-- 订单列表 -->
    <div class="ordercontent">
      <div class="ordercontentlist" v-for="(orderListOut,outindex) in orderList" :index='index' :key='key'>
          <div class='complete-box1'>
            <div class='box1-left'>
              <image :src='boximg'></image>
            </div>
            <div class='box1-right'>
              <div class='box1-top'>
                <text class='toptext1'>谷琴优品</text>
                <block>
                  <text class='toptext2' v-if="orderListOut.status==0&orderListOut.shipStatus==0">待付款</text>
                </block>
                <block v-if="orderListOut.status==1 || orderListOut.status == 2&orderListOut.shipStatus==0&orderListOut.payStatus==2">
                  <text class='toptext2'>待发货</text>
                </block>
                <block v-if="orderListOut.status==3&orderListOut.shipStatus==1&orderListOut.payStatus==2">
                  <text class='toptext2'>待收货</text>
                </block>
                <block v-if="orderListOut.status==4||orderListOut.status == 3&orderListOut.shipStatus==2&orderListOut.payStatus==2">
                  <text class='toptext2'>已完成</text>
                </block>
              </div>
              <div class='times'>
                <text class='box1-bootom'>订单编号{{orderListOut.sn}}</text>
                <text class='box1-bootomright'>{{orderListOut.createTime}}</text>
              </div>
            </div>
          </div>
          <div class='complete-box2' v-for="orderListInner in orderListOut.item"  @click="jumpgooddetail(orderListInner.goodsId)">
            <div class='box2-left'>
              <image :src='orderListInner.image'></image>
            </div>
            <div class='box2-conter'>
              <text class='context1'>{{orderListInner.name}}</text>
            </div>
            <div class='box2-right'>
              <text class='rigtext1'>{{orderListInner.price}}</text>
              <text class='rigtext3'>x{{orderListInner.num}}</text>
            </div>
          </div>
          <div class='complete-box3'>
            <text class='tex01'>共件商品{{orderListOut.totalnum}}合计:</text>
            <text class='tex02' v-if="orderListOut.shipZip==0">￥{{orderListOut.needPayMoney}}</text>
            <text class='tex02' v-else>￥{{orderListOut.shipZip}}圈圈</text>
          </div>
          <block>
            <div class='complete-box4'  v-if="orderListOut.status==0&orderListOut.shipStatus==0">
              <div class='com-input01' @click="payoff('取消订单',orderListOut.orderId)">取消订单</div>
              <div class='com-input02'  @click="payoff('确认付款',orderListOut.orderId,orderListOut.sn,orderListOut.needPayMoney,orderListOut.shipZip)">确认付款</div>
            </div>
          </block>
          <block v-if="orderListOut.status==1 || orderListOut.status == 2&orderListOut.shipStatus==0&orderListOut.payStatus==2">
            <div class='complete-box4'>
              <div class='com-input01' @click="payoff('查看订单',orderListOut.orderId,outindex)">查看订单</div>
              <div class='com-input02' @click="payoff('申请退款',orderListOut.orderId,orderListOut.sn,'')">申请退款</div>
            </div>
          </block>
          <block v-if="orderListOut.status==3&orderListOut.shipStatus==1&orderListOut.payStatus==2">
            <div class='complete-box4'>
              <div class='com-input01'>查看物流</div>
              <div class='com-input02' @click="payoff('确认收货',orderListOut.orderId)">确认收货</div>
            </div>
          </block>
          <block v-if="orderListOut.status==4||orderListOut.status == 3&orderListOut.shipStatus==2&orderListOut.payStatus==2">
            <div class='complete-box4'>
               <div class='com-input01'>删除订单</div>
              <div class='com-input02'  @click="payoff('查看订单',orderListOut.orderId)">查看订单</div>
              <div class='com-input02'  @click="payoff('申请退货',orderListOut.orderId,orderListOut.sn,orderListOut.goodssn)" style='margin-left:20rpx;'>申请退货</div>
            </div>
          </block>
        </div>
    </div>
    <!-- 订单列表为空时 -->
    <div class="ordercontentno" v-if="orderList.length==0">
      <image :src="nothingimg"></image>  
    </div>
  </div>
</template>

<script>
import Tab from '../../components/tabbar'
import globalStore from "../../stores/global-store"
import globaltime from '../../utils/index'
export default {
  data () {
    return {
    boximg:"https://shop.guqinet.com/html/images/guqinzhen/images/quzhifu/shang.png",
    nothingimg:globalStore.state.imgapi+'image/nothing.png',
    find_item:[
      {name:"全部订单",selected:false},
      {name:"待付款",selected:false},
      {name:"待发货",selected:false},
      {name:"待收货",selected:false},
      {name:"已完成",selected:false}],
      currentTab:'',
      orderList:[],
      quanquan:''
     }
  },

  components: {
   Tab
  },

  methods: {
    getOrderdetail: function(orderStatus){
    var that = this//不要漏了这句，很重要
    // 全部订单
    if(orderStatus=="0"){
      var parms = {}
      let status=100
      parms.memberId = that.memberId
      wx.request({
        url: globalStore.state.api  + '/api/order/apiSelectOrderList',
        data: {
          parms: parms
        },
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var orderList = res.data.orderList
          if (status == 100) {
            status = "确认付款"
          }
          for (var i = 0; i < orderList.length; i++) {
          let totalnum=0;
          orderList[i]["createTime"] = globaltime.formatTime(new Date(orderList[i]["createTime"]))
          for(var j=0;j<orderList[i].item.length;j++){
            totalnum=totalnum+orderList[i].item[j].num
          }
          orderList[i]["totalnum"]=totalnum;
        }
          that.orderList = orderList
          // that.setData({
          //   status: status,
          //   orderList: orderList,
          //   //res代表success函数的事件对，data是固定的
          // })
        },
      })
    }
  },
    orderRequest: function (statuss, payStatus, shipStatus, status,cat){
    var that=this
    let parms = {}
    let order = {} 
    order.statuss = statuss//状态
    order.payStatus = payStatus
    order.shipStatus = shipStatus
    order.memberId = that.memberId
    parms.order = order
    wx.request({
      url: globalStore.state.api  + '/api/order/orderList',
      data: {
        parms: parms
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var orderList = res.data.orderList
        that.status=status
        that.cat=cat
        for (var i = 0; i < orderList.length; i++) {
          let totalnum=0;
          orderList[i]["createTime"] = globaltime.formatTime(new Date(orderList[i]["createTime"]))
          for(var j=0;j<orderList[i].item.length;j++){
            totalnum=totalnum+orderList[i].item[j].num
          }
          // if(orderList.shipZip!=0){
          //    orderList[i]["shipWay"]=orderList[i].shipZip.split('+')
          // }
          orderList[i]["totalnum"]=totalnum;
        }
        that.orderList = orderList
        console.log(that.orderList)
        // that.setData({
        //   orderList: orderList,
        //   status: status,
        //   cat: cat
        // })
      },
    })
  },
  showMsgFromChild:function(data){
    var that=this
    if(data==0){
      that.getOrderdetail(0)
    }
    else if(data==1){
      let stauts=1;
      let cat="待付款"
      that.orderRequest(0,0,0,stauts,cat)
    }
    else if (data == 2){   
      let stauts = 2;
      let cat = "待发货" 
      var statuss = "2,1"
      that.orderRequest(statuss,2,0, stauts, cat)
    }
    else if (data == 3){
      let stauts = 3;
      let cat = "已发货" 
      that.orderRequest(3,2,1, stauts, cat) 
    }
    else{
      let stauts = 4;
      let cat = "已完成"
      that.orderRequest("3,4",2,2,stauts, cat) 
    }
  },
  jumpgooddetail:function(e){
     wx.navigateTo({
      url: '../shumainfo/main?goodid='+e,
    })
  },
  // 支付

  payoff: function (value,orderId,sn,total,shipzip) {
    var  that=this
    var status = 4
    var parms = {}
    var order = {}
    if (value == "确认收货") {
      wx.showModal({
        title: '提示',
        content: '是否确认收货',
        success: function (res) {
          if (res.confirm) {
            order.shipStatus = 2
            order.orderId=orderId
            parms.order = order
            parms = JSON.stringify(parms)
            wx.request({
              url: globalStore.state.api + '/api/order/synthesize',
              data: {
                parms: parms
              },
              method: "PUT",
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 1500
                })
                let stauts = 3;
                let cat = "已发货" 
                that.orderRequest(3,2,1, stauts, cat)     
              },

            })
          } 
          else if (res.cancel) {
          }
        }
      })  
    }
    else if (value == "查看订单") {
      var orderId = orderId
      // console.log(sn);//获取当前点击的数据列表下标
       console.log("----获取数据-----")
       console.log(that.orderList[sn]);
       var orderlist=JSON.stringify(that.orderList[sn]);
      wx.redirectTo({
        url: '../orderinfo/main?OrderList='+orderlist,
      })
      return;
    }
    else if(value=="申请退款"){
      wx.showModal({
        title: '提示',
        content: '是否确认退款',
        success: function (res) {
          if (res.confirm) { 
            wx.navigateTo({
              url: '../tuikuan/main?orderId=' +orderId+'&sn='+sn,
            })       
          } else if (res.cancel) {
          
          }
        }
      })  
    }
    else if (value=="确认付款"){
    wx.showLoading({
      title:'请稍等'
    })
    let payflag=true
    if(shipzip!=0){
      that.quanquan=shipzip.split("+")[1]
      let mp=wx.getStorageSync('mp')
      if(mp<that.quanquan){
          wx.showToast({
            title: '圈圈不足',
            icon: 'success',
            duration: 2000
          })
          payflag=false
      }    
    }

    if(payflag){
      let surepayparms = {}
      surepayparms.orderid = orderId
      surepayparms.total_fee = total * 100
      surepayparms.sn=sn
      wx.login({
        success: function (res) {
          if (res.code) {
          //发起网络请求
          wx.request({
            url: globalStore.state.api + "/api/pay/prepay",
            data: {
              code: res.code,
              parms: surepayparms
            },
            method: 'GET',
            success: function (res) {
              wx.hideLoading()
              var pay = res.data
              var parms = {}
              var order = {}
              order.orderId = orderId
              parms.order = order
              parms.code = 200
              parms.paymoney = total * 100
              parms = JSON.stringify(parms)
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success: function (res) {
                  wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 2000
                  })

                  if(shipzip!=0){
                    // 选择圈圈加现金支付
                    let fenrunParm = {}
                    fenrunParm.memberId = that.memberId
                    fenrunParm.distribeId = wx.getStorageSync('isAgent')
                    fenrunParm.monetary = total * 100
                    fenrunParm.memberPoint = that.quanquan
                    wx.request({
                      url: globalStore.state.api + "/api/distribe/shareProfit",
                      method: "POST",
                      data: {
                        params: JSON.stringify(fenrunParm)
                      },
                      header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      method: "POST",
                      success: function (res) {
                        console.log(res.data)
                        if (res.data.code == 0) {


                        }
                      }
                    })
                  }
                  wx.request({
                    url: globalStore.state.api + "/api/order/passOrder",
                    data: {
                      parms: parms
                    },
                    method: 'PUT',
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                     let stauts=1;
                     let cat="待付款"
                     that.orderRequest(0,0,0,stauts,cat)

                   }
                 })
                }
              })
            }
          })    
        }
      }
    })

    }
  
  }
  else if(value=="取消订单"){
    var orderId = orderId
    var parms = {}
    var order = {}
    wx.showModal({
      title: '提示',
      content: '是否删除订单',
      success: function (res) {
        if (res.confirm) {
          order.orderId = orderId
          order.status = 7
          parms.order = order
          parms = JSON.stringify(parms)
          wx.request({
            url: globalStore.state.api + '/api/order/synthesize',
            data: {
              parms: parms
            },
            method: "PUT",
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 1500
              })
             
              let stauts=1;
              let cat="待付款"
              that.orderRequest(0,0,0,stauts,cat)

            },

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
  }else if(value=="申请退货"){
   wx.showModal({
     title: '提示', //提示的标题,
     content: '是否确认退货', //提示的内容,
     success: res => {
       if (res.confirm) {
         console.log('用户点击确定')
        //  console.log(value);
        //  console.log(orderId);
        //  console.log(sn);
        //  console.log(total);
         
          let dd={};
          dd.orderId = orderId;
          dd.goodssn = total;
          dd.sn = sn;
          var dd = JSON.stringify(dd)
          wx.navigateTo({
            url: '../tuihuo/main?dd=' + dd,
          })

       } else if (res.cancel) {
         console.log('用户点击取消')
       }
     }
   });
  }

  },
   },

   onLoad(options){
    var that=this
    try {
      var memberId = wx.getStorageSync('memberId')
      var indexdata = wx.getStorageSync('indexdata')
      if (memberId) {
          that.memberId=memberId,
          that.indexdata=indexdata      
      }
    } catch (e) {
    }
    var currentTarget = options.currentTarget*1
    for(var i=0;i<that.find_item.length;i++){
      that.find_item[i].selected=false;
    }
    that.find_item[currentTarget].selected=true
    // var currentTarget=0;
    if(currentTarget==0){
      that.currentTab=0
      that.getOrderdetail(0)
    }
    else if (currentTarget=="1"){
      that.currentTab=1
      let stauts = 1;
      let cat = "待付款"
      that.orderRequest(0, 0, 0, stauts, cat)
    }
    else if (currentTarget == "2") {
      that.currentTab=2
      let stauts = 2;
      let cat = "待发货"
      var statuss = "2,1"
      that.orderRequest(statuss, 2, 0, stauts, cat)
    }
    else if (currentTarget == "3") {
      that.currentTab=3
      let stauts = 3;
      let cat = "已发货"
      that.orderRequest(3, 2, 1, stauts, cat) 
    }
    else if (currentTarget == "4") {
      that.currentTab=4
      let stauts = 4;
      let cat = "已完成"
      that.orderRequest("3,4", 2, 2, stauts, cat) 
    }
  }
}
</script>

<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.ordercontentno{
  width: 400rpx;
  height: 400rpx;
  margin: 100rpx auto;
  margin-bottom: 0rpx;
}
.ordercontentlist{
  width:95%;
  margin: 10px auto;
  background: #fff;
  border-radius: 10px;
}
.complete-box1{
 padding: 10rpx;
 height: 100rpx;
 display: flex;
}
.box1-left{
 width:25px;
 height: 25px;
}
.box1-right{
  flex-grow: 1;
  height: 100%;
}
.box1-top{
 display: flex;
 justify-content: space-between;
 height:45%;
 align-items: center;
}
.toptext1{
 font-size: 15px;
}
.toptext2{
font-size: 14px;
color: red;
padding-right: 20rpx;
}
.shipped{
  color: #5ca2fa;
  font-size: 14px;
  padding-right: 20rpx;
}

.box1-bootom{
font-size: 14px;
color: #919191;
}
.complete-box2{
  /* height: 260rpx; */
  display: flex;
  align-items: center;
  padding: 20rpx;
  box-sizing: border-box;
}
.box2-left{
 width: 200rpx;
 height: 200rpx;
}
.box2-conter{
 width: 350rpx;
 padding-left:20rpx;
 box-sizing: border-box; 
}
.context1{
 font-size: 14px;
}
.context2{
  font-size: 14px;
  color: #828282;
}
.box2-right{
 display: flex;
 flex-direction: column;
 align-items: flex-end;
}
.rigtext1{
  font-size: 15px;
  color: red;
}
.rigtext2{
 font-size: 14px;
 color: #828282;
}
.rigtext3{
 font-size: 14px;
 color: #828282;
}
.complete-box3{
   padding: 0 20rpx 0 20rpx;
  text-align: right;
  height: 80rpx;
  border-bottom: 1rpx solid #eee;
 }
 /*字体  */
 .tex01{
    font-size: 14px;
 }
 .tex02{
   font-size: 15px;
   color: red;
 }
 .tex03{
   font-size: 14px;
   margin-left: 5rpx;
 }
 .win-text{
 color: #b3b3b3;
 font-size: 14px;
 padding-right: 20rpx;
 }
 /*  */
.complete-box4{
  padding: 20rpx;
 height: 80rpx;
 display: flex;
 align-items: center;
 justify-content:  flex-end;
 margin-bottom: 15rpx;
 box-sizing: border-box;
}
.com-input01{
  border: 1px solid #b3b3b3;
  height: 60rpx;
  width: 140rpx;
  border-radius: 45rpx;
  text-align: center;
  margin-right: 20rpx;
  font-size: 14px;
  line-height: 60rpx;
}
.com-input02{
  border: 1px solid red;
  height: 60rpx;
  width: 140rpx;
  font-size: 14px;
  color: red;
  border-radius: 50rpx;
  text-align: center;
  line-height: 60rpx;
}
.box1-bootomright{
  font-size:14px;
color:#919191;
}
.times{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10rpx;
}
.ordertip{
  margin-top: 20rpx;
  text-align: center;
  color:#8A8890;
}
</style>
