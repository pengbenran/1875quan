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
      <div class="orderinfo" v-for="(item,index) in list" :index='index' :key="item">
       <div class="infoimg">
         <div class="infoleft"><img :src="item.image"></div>
         <div class="inforight">
           <div class="inforighttitle">{{item.name}}</div>
           <div class="infoguige"><span class="infoshopnum">20只 / 一盒</span>
             <span class="infocase">正品发货</span>
           </div>
           <div class="infobottom">
             <div class="infoprice"><span>￥{{item.price}}</span><span></span></div>
             <div class="infonum">X{{item.num}}</div>
           </div>
         </div>
       </div>
      </div>
        <!--orderinfo end-->
        <div class="listitem listinput"><span>买家留言：</span> <input  type="text" placeholder="点击填写留言" @input="clickd($event)" placeholder-style="color:#8d8d8d;"/></div>

        <div class="Summary">
          <div class="Summaryitem"><span>商品金额</span><span>￥{{goodsAmount}}</span></div>
          <div class="Summaryitem"><span>运费</span><span>￥0</span></div>
        </div>
    </div>
      
      <div class="footer"><div class="footerleft">合计：<span>￥{{goodsAmount}}</span></div><div class="footerright" @click="toast()">提交订单</div></div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"; 

export default {
  data () {
    return {
     homeimg:globalStore.state.imgapi + "/images/quzhifu/shang.png",
     titleright:globalStore.state.imgapi +"/images/quzhifu/8.png",
     heademapimg:globalStore.state.guqinimgapi +"/image/order04.png",
     headerrightimg:globalStore.state.guqinimgapi +"/image/order03.png",
     headertopimgbg:globalStore.state.guqinimgapi +"/image/order01.jpg",
     select:false,
     isAddr:true,
     addr:[],
     point:0,
     point_price:0,
     goodsAmount:0,
     orderAmount:0,
     list:[]
    }
  },

  components: {

  },

  methods: {
      clickd(e){
        console.log("留言填写");
        this.clickd=e.target.value
      },

      hongbao(e){
        var that = this
        wx.setStorageSync('cart', that.cart);
        wx.setStorageSync('gooditem', that.gooditem);
        wx.setStorageSync('goodlist', that.goodlist);
        wx.setStorageSync('select', that.select);
        wx.setStorageSync('orderAmount', that.orderAmount);
        wx.setStorageSync('pars', that.pars);
        wx.setStorageSync('facevalue', that.facevalue);
        wx.navigateTo({
          url: '../voucher/voucher?type=1',
        })
      },

      youhui(e){
          var that = this
          wx.setStorageSync('cart', that.cart);
          wx.setStorageSync('gooditem', that.gooditem);
          wx.setStorageSync('goodlist', that.goodlist);
          wx.setStorageSync('select', that.select);
          wx.setStorageSync('orderAmount', that.orderAmount);
          wx.setStorageSync('pars', that.pars);
          wx.setStorageSync('redamount', that.redamount);
          var parms = {}
          var goodsIds = []
          console.log(that.list)
          for (let i = 0; i < that.list.length; i++) {
            goodsIds.push(that.list[i].goodsId)
          }
          var goodsAmount = that.goodsAmount
          parms.orderAmount = goodsAmount
          parms.goodsIds = goodsIds
          parms = JSON.stringify(parms)
          wx.navigateTo({
            url: '../voucher/voucher?parms=' + parms,
          })
      },

      /*新增地址*/
      address(){
        var that=this
        wx.setStorageSync('cart', that.cart);
        wx.setStorageSync('gooditem', that.gooditem);
        wx.setStorageSync('goodlist', that.goodlist);
        wx.setStorageSync('select', that.select);
        wx.setStorageSync('orderAmount', that.orderAmount);
        wx.setStorageSync('pars', that.pars);
        wx.navigateTo({
          url: '../myaddresstwo/myaddresstwo',
        })
      },

      selects(){
        console.log("测试点击");
          var that = this
          var defAddr = that.select
          var select = that.select
          if (defAddr == "false" || defAddr =="") {
            select= true
            that.select=true
          } else {
            select= false
            that.select=false
          }
      },
      //加载初始数据并存入缓存
      onloads(options){
          var that=this
          console.log(options)
          wx.showLoading({
            title: '加载中',
          })
          var point = wx.getStorageSync('point') //创建缓存
          var indexdata = wx.getStorageSync('indexdata') //创建缓存
          var point_price = Number(point / indexdata.pointCash).toFixed(2)
          if (options.cart==undefined){that.cart=wx.getStorageSync('cart')}
          else{that.cart=options.cart}

          if(options.pars!=undefined){
            //  说明用了优惠劵
            if (options.pars==1){
                that.pars=options.pars;
                that.memberVoucherId=options.memberVoucherId;
                that.facevalue=options.facevalue;
                that.select=wx.getStorageSync('select');
                that.redamount=0;
            }
            else if(options.pars==2){
              console.log(options.redamount)
              that.pars=options.pars;
              that.memberredpacketid=options.memberredpacketid;
              that.redamount=options.redamount*1;
              that.select=wx.getStorageSync('select');
              that.facevalue=0;
            } 
          }
          else{
              that.pars=0;
              that.memberVoucherId=0;
              that.facevalue=0;
              that.redamount=0;
              that.memberredpacketid=0;
          }
          if (that.pars == 1 && options.pars == undefined){
                that.facevalue=wx.getStorageSync('facevalue')
                that.memberVoucherId=wx.getStorageSync('memberVoucherId') 
            }
              else if (that.pars == 2 && options.pars == undefined){
                  that.redamount=wx.getStorageSync('redamount')
                  that.memberredpacketid=wx.getStorageSync('memberredpacketid') 
            }
                that.memberId=wx.getStorageSync('memberId'),
                that.indexdata=indexdata;
                that.point=point;
                that.point_price=point_price;

            // 加载地址
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
                  if (res.data.code == 1) {that.isAddr=false}
                  else {that.addr=res.data.memberAddressDO}
                }
              })
            }
            else {that.addr=wx.getStorageSync('addr')}

           if(that.cart==1){ //Cart订单类型
              wx.hideLoading()
              if (options.gooditem==undefined){
                var gooditem = wx.getStorageSync('gooditem');
                  that.gooditem=wx.getStorageSync('gooditem'),
                  that.select=wx.getStorageSync('select')
              }
              else{
                var gooditem = JSON.parse(options.gooditem);
                  that.gooditem=gooditem  
              }  
              var orderamount = Number(gooditem.goodsAmount - that.facevalue - that.redamount).toFixed(2)
              if (orderamount <= 0) {
                orderamount = 0.01
              }
                that.goodsAmount=Number(gooditem.goodsAmount).toFixed(2),
                that.list=gooditem.googitem,
                that.weight=gooditem.weight,
                that.orderAmount=orderamount,
                that.gainedpoint=gooditem.gainedpoint
            }
           else{
              if (options.goodlist == undefined) {
                var goodlist = wx.getStorageSync('goodlist');
                
                  that.goodlist=wx.getStorageSync('goodlist'),
                  that.select=wx.getStorageSync('select')
        
              }
              else {
                var goodlist = JSON.parse(options.goodlist);
                  that.goodlist=goodlist
              }
                var goodArr = [];
                var goodparms = {}
                goodparms.goodsId = that.goodlist[0].goodsId
                wx.request({
                  url: globalStore.state.api + '/api/Goods/getGoods',
                  // url: 'http://192.168.2.144/api/index/getGoods/166993'
                  data: {
                    parms: goodparms
                  },
                  header: {
                    'Content-Type': 'json'
                  },
                  success: function (res) {
                    
                    res.data.Goods.num = that.goodlist[0].pic
                    res.data.Goods.image = res.data.Goods.thumbnail
                    goodArr.push(res.data.Goods) 
                    let ordermount = Number(that.goodlist[0].pic * res.data.Goods.price - that.facevalue - that.redamount).toFixed(2)
                    if(ordermount<=0){
                      ordermount=0.01
                    }
                      that.list=goodArr;
                      that.goodsAmount=Number(that.goodlist[0].pic * res.data.Goods.price).toFixed(2);
                      that.orderAmount=ordermount;
                    wx.hideLoading()
                  }
                })
              }
      },
      toast(){
          var that = this
          if (that.addr == undefined) {
            wx.showToast({
              title: '请添加地址',
            })
          }
          else {
            if (that.cart==0){
            var bean = {}
            var goodObj = {}
            wx.showLoading({
              title: '请稍等',
            })
            //  判断是否使用积分
            if(that.select==true){
              if (that.goodsAmount - that.point_price<=0){
                bean.orderAmount =0.01
                bean.consumepoint = parseInt((that.goodsAmount-0.01)*indexdata.pointCash)
              }else{
                bean.orderAmount = that.orderAmount - that.point_price
                bean.consumepoint = that.point
              }      
            }
            else{
              bean.orderAmount = that.orderAmount 
              bean.consumepoint =0
              }
              bean.memberId = that.memberId
              bean.image = that.list[0].image
              bean.weight = that.list[0].weight * that.list[0].num
              bean.shippingAmount = 0
              bean.googitem = []
              goodObj.price = that.list[0].price
              goodObj.name = that.list[0].name
              goodObj.num = that.list[0].num * 1
              goodObj.cart = that.cart
              goodObj.goodsId = that.list[0].goodsId
              goodObj.catId = that.list[0].catId
              goodObj.image = that.list[0].image
              goodObj.goodsAmount = that.list[0].price * that.list[0].num
              goodObj.productId = that.goodlist[0].productId
              bean.googitem[0] = goodObj
              bean.point = that.point
              bean.gainedpoint = that.list[0].point
              bean.province = that.addr.province
              bean.city = that.addr.city
              bean.addr = that.addr.addr
              bean.region = that.addr.region
              bean.shipMobile = that.addr.mobile
              bean.shipName = that.addr.name
              bean.addrId = that.addr.addrId
              bean.clickd = that.clickd
              bean.goodsAmount = that.list[0].price * that.list[0].num
              bean = JSON.stringify(bean)
              wx.request({
              url: globalStore.state.api + '/api/order/save',
              method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                order: bean
              },
              success: function (res) {
                wx.hideLoading()
                if(res.data.code==0){
                  wx.showToast({
                    title: '订单提交成功',
                    icon: 'success',
                    duration: 2000
                  })
                  var parms = {}
                    that.order=res.data.order

                  if(that.pars==1){
                    wx.request({
                      url: globalStore.state.api + '/api/vocher/usedState',
                      data: {
                        memberVoucherId:that.memberVoucherId
                      },
                      header: {
                        'Content-Type': 'json'
                      },
                      success: function (res) {
                      console.log(res.data)
                      }
                    })
                  }
                  else if(that.pars==2){
                    wx.request({
                      url: globalStore.state.api + '/api/redPacket/RedusedState',
                      data: {
                        memberRedpacketId: that.memberredpacketid
                      },
                      header: {
                        'Content-Type': 'json'
                      },
                      success: function (res) {
                        console.log(res.data)
                      }
                    })
                  }
                  parms.orderid = res.data.order.orderId
                  parms.sn=that.order.sn
                  parms.total_fee = res.data.order.orderAmount * 100
                  wx.login({
                    success: function (res) {
                      if (res.code) {
                        //发起网络请求
                        wx.request({
                          url: globalStore.state.api + "/api/pay/prepay",
                          data: {
                            code: res.code,
                            parms: parms,
                          
                          },
                          method: 'GET',
                          success: function (res) {
                            var pay = res.data
                            wx.requestPayment({
                              timeStamp: pay.timeStamp,
                              nonceStr: pay.nonceStr,
                              package: pay.package,
                              signType: pay.signType,
                              paySign: pay.paySign,
                              success: function (res) {
                                wx.showToast({
                                  title: '支付成功',
                                  icon: 'success',
                                  duration: 2000
                                })
                                var orderparms = {}
                                var order={}
                                order.orderId = that.order.orderId
                                orderparms.order = order
                                orderparms.code = 200
                                orderparms.gainedpoint = Number(that.order.gainedpoint)
                                orderparms.paymoney = that.order.orderAmount
                                wx.request({
                                  url: globalStore.state.api + "/api/order/passOrder",
                                  data: {
                                    parms: JSON.stringify(orderparms)
                                  },
                                  method: 'PUT',
                                  header: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                  },
                                  success: function (res) {
                                      if(res.data.code==0){
                                        wx.showToast({
                                          title: '订单成功',
                                          icon: 'success',
                                          duration: 2000
                                        })
                                        wx.switchTab({
                                          url: '../index/index',
                                        })
                                      }
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
              })
            }
            else{
              // 购物车提交订单
              var bean = {}
              var goodObj = {}
              wx.showLoading({
                title: '请稍等',
              })
              //  判断是否使用积分
              if (that.select == true) {
                if (that.goodsAmount - that.point_price <= 0) {
                  bean.orderAmount = 0.01
                  bean.consumepoint = parseInt((that.goodsAmount - 0.01) * indexdata.pointCash)
                } else {
                  bean.orderAmount = that.orderAmount - that.point_price
                  bean.consumepoint = that.point
                }
              }
              else {
                bean.orderAmount = that.orderAmount
                bean.consumepoint = 0
              }
              bean.weight = that.weight
              bean.gainedpoint = that.gainedpoint
              bean.memberId = that.memberId
              bean.goodsAmount = that.goodsAmount
              bean.shippingAmount = 0
              bean.googitem = that.list
              bean = JSON.stringify(bean)
              wx.request({
                url:  globalStore.state.api + '/api/order/save',
                method: 'POST',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                  order: bean
                },
                success: function (res) {
                  wx.hideLoading()
                  if (res.data.code == 0) {
                    wx.showToast({
                      title: '订单提交成功',
                      icon: 'success',
                      duration: 2000
                    })
                    var parms = {}
                      that.order=res.data.order
                    if (that.pars == 1) {
                      wx.request({
                        url: globalStore.state.api + '/api/vocher/usedState',
                        data: {
                          memberVoucherId: that.memberVoucherId
                        },
                        header: {
                          'Content-Type': 'json'
                        },
                        success: function (res) {
                          console.log(res.data)
                        }
                      })
                    }
                    parms.orderid = res.data.order.orderId
                    parms.sn = that.order.sn
                    parms.total_fee = res.data.order.orderAmount * 100
                    wx.login({
                      success: function (res) {
                        if (res.code) {
                          //发起网络请求
                          wx.request({
                            url: globalStore.state.api + "/api/pay/prepay",
                            data: {
                              code: res.code,
                              parms: parms
                            },
                            method: 'GET',
                            success: function (res) {
                              var pay = res.data
                              wx.requestPayment({
                                timeStamp: pay.timeStamp,
                                nonceStr: pay.nonceStr,
                                package: pay.package,
                                signType: pay.signType,
                                paySign: pay.paySign,
                                success: function (res) {
                                  wx.showToast({
                                    title: '支付成功',
                                    icon: 'success',
                                    duration: 2000
                                  })
                                  var orderparms = {}
                                  var order = {}
                                  order.orderId = that.order.orderId
                                  orderparms.order = order
                                  orderparms.code = 200
                                  orderparms.gainedpoint = Number(that.order.gainedpoint)
                                  orderparms.paymoney = that.order.orderAmount
                                  wx.request({
                                    url: globalStore.state.api + "/api/order/passOrder",
                                    data: {
                                      parms: JSON.stringify(orderparms)
                                    },
                                    method: 'PUT',
                                    header: {
                                      'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    success: function (res) {
                                      if (res.data.code == 0) {
                                        wx.showToast({
                                          title: '订单成功',
                                          icon: 'success',
                                          duration: 2000
                                        })
                                        wx.switchTab({
                                          url: '../index/index',
                                        })
                                      }
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
              })
            }
        
          }

      }
  },

  onLoad: function (options) {
      this.onloads(options);   
  }
}
</script>

<style scoped>
.dingdanContainer{background: #fff;padding-bottom: 50rpx;}
/*dingdanHeader*/
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
.infoleft img{width:158rpx;height:170rpx;}  
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
