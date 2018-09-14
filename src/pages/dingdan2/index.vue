<template>
  <div class="dingdanContainer">
    <div  v-if="isAddr"  @click="address">
     <div class="dingdanHeader">
       <div class="dingleft">
         <img :src="heademapimg" >
       </div>
       <div class="dingright">
         <div class="title"><span>收货人：{{addr.name}}</span><span>{{addr.mobile}}</span></div>
         <div class="topdizhi">收货地址：{{addr.addr}}</div>
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
      <!-- <div class="shopTitle"><image :src='homeimg' class="img01">
      </image><span>谷琴优品</span><image :src='titleright' class="img02"></image></div> -->
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
      <!-- <div class="zhifu">
        <div class="zhifutitle">支付方式</div>
        <div class="zhifuprice"><div class="price">{{quanprice}}元+{{quanquan}}圈圈</div>
           <div class="slectico" @click="selectrs(1)"><icon color='#e93429' type="success" size="20" v-if="selectstu" /><icon type="circle" v-else color="#DDD"   size="20" /></div>
        </div>
        <div class="zhifuprice"><div class="price">{{totalPrice}}元</div><div class="slectico" @click="selectrs(2)">
          <icon color='#e93429' type="success" size="20" v-if="!selectstu" /><icon type="circle" v-else color="#DDD"   size="20" />
          </div></div>
      </div> -->
      <div class="footer"><div class="footerleft">合计：<span>￥{{totalPrice}}</span></div>

      <div class="footerright" @click="kaituan" v-if="Type=='K'">
        <text>立即开团</text>
      </div>
      <div class="footerright" @click="cantuan" v-if="Type=='C'">
        <text>立即参团</text>
      </div>
      <div class="footerright" @click="xianshi" v-if="Type=='Z'">
        <text>限时参加</text>
      </div>
 <!--      <div class="footerright" bindtap="kanjia" wx:if="{{Type=='KJ'}}">
        <text>提交订单</text>  -->
      </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"; 

export default {
  data () {
    return {
     homeimg:globalStore.state.imgapi  + "/image/shang.png",
     titleright:globalStore.state.imgapi  +"/image/8.png",
     heademapimg:globalStore.state.imgapi +"/image/order04.png",
     headerrightimg:globalStore.state.imgapi +"/image/order03.png",
     headertopimgbg:globalStore.state.imgapi +"/image/order01.jpg",
     selectstu:true,
      price:'',
      pic:'',
      goodsId:'',
      Type:'',
      msg:'',
      Goods:{},
      totalPrice:0,
      quanprice:900,
      quanquan:98,
      isAddr:false,
      addr:'',
      memberCollageId:'',
      finalAmount:'',
      memberCollageId:'',
      collagePersons:'',
      cutId:'',
      memberId:'',
      order:{},
    }
  },

  components: {

  },

  methods: {
    selectrs(index){
      let that=this;
      that.selectstu=!that.selectstu;
      console.log(that.selectstu);
      console.log(index);
    },
    

    address:function(){
      var that = this
      wx.setStorageSync('price', that.price);
      wx.setStorageSync('pic', that.pic);
      wx.setStorageSync('goodsId', that.goodsId);
      wx.setStorageSync('collagePersons', that.collagePersons);
      wx.setStorageSync('memberCollageId', that.memberCollageId);
      wx.setStorageSync('limitId', that.limitId);
      wx.setStorageSync('Type', that.Type);
      wx.setStorageSync('finalAmount', that.finalAmount);
      wx.setStorageSync('cutId', that.cutId);
      wx.navigateTo({
        url: '../address/main',
      })
    },
     //信息提交
    xianshi:function(){
    var that = this
    if (that.addr == '') {
      wx.showToast({
        title: '请添加地址',
      })
    }
    else {
      var bean = {}
      var goodObj = {}
      wx.showLoading({
        title: '请稍等',
      })
      bean.image = that.Goods.thumbnail
      bean.memberId = that.memberId
      bean.gainedpoint=that.Goods.point
      bean.orderAmount = that.finalAmount
      bean.weight = that.Goods.weight
      bean.shippingAmount = 0
      bean.goodsAmount = that.finalAmount
      bean.limitId = that.limitId
      bean.googitem = []
      goodObj.price = that.Goods.price
      goodObj.name = that.Goods.name
      goodObj.num = that.pic * 1
      goodObj.cart = 0
      goodObj.goodsId = that.Goods.goodsId
      goodObj.catId = that.Goods.catId
      goodObj.image = that.Goods.thumbnail
      goodObj.goodsAmount = that.totalPrice
      goodObj.memberCollageId = that.memberCollageId
      goodObj.productId = that.productId
      bean.googitem[0] = goodObj
      // var googitem = that.list; 
      bean.province = that.province
      bean.city = that.addr.city
      bean.addr = that.addr.addr
      bean.region = that.addr.region
      bean.shipMobile = that.addr.mobile
      bean.shipName = that.addr.name
      bean.addrId = that.addr.addrId
      bean.clickd = that.clickd
      bean = JSON.stringify(bean)
      wx.request({
        url: globalStore.state.api  + '/api/order/save',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          order: bean
        },
        success: function (res) {
          if(res.data.code==0){
            wx.showToast({
              title: '订单提交成功',
              icon: 'success',
              duration: 2000
            })
            wx.hideLoading()
            var parms = {}
            that.order= res.data.order
            parms.orderid = res.data.order.orderId
            parms.sn = that.order.sn
            parms.total_fee = that.order.orderAmount * 100
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
                          var order = {}
                          order.orderId = that.order.orderId
                          orderparms.order = order
                          orderparms.code = 200
                          orderparms.gainedpoint = Number(that.order.gainedpoint)
                          orderparms.paymoney = that.order.orderAmount
                          wx.request({
                            url: globalStore.state.api  + "/api/order/passOrder",
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
                                  url: '../index/main',
                                })
                              }
                            }
                          })
                        },
                        fail: function (res) {
                          // fail   
                          wx.showToast({
                            title: '未支付',
                            icon: 'success',
                            duration: 2000
                          })

                        },
                        complete: function () {

                        }
                      })
                    },
                    fail: function () {

                    },
                    complete: function () {

                    }
                  })

                } else {

                }
              }
            });
          }  
        }
      })
    }
  },
  cantuan:function(){
    var that = this
    if (that.addr == '') {
      wx.showToast({
        title: '请添加地址',
      })
    }
     else{
      var bean = {}
      var goodObj = {}
      wx.showLoading({
        title: '请稍等',
      })
      wx.request({
        url: globalStore.state.api + '/api/collage/judgeIsCollaged',
        data: {
          memberCollageId: that.memberCollageId
        },
        success: function (res) {
            if(res.code==1){
              wx.showToast({
                title: '手慢了，已成团',
              })
              setTimeout(function(){
                wx.switchTab({
                  url: '../index/main',
                })
              },1000)          
            }
            else{
              bean.image = that.Goods.thumbnail
              bean.memberId = that.memberId
              bean.orderAmount = that.totalPrice
              bean.weight = that.Goods.weight
              bean.shippingAmount = 0
              bean.goodsAmount = that.totalPrice
              bean.googitem = []
              goodObj.price = that.Goods.price
              goodObj.name = that.Goods.name
              goodObj.num = that.pic * 1
              goodObj.cart = 0
              goodObj.goodsId = that.Goods.goodsId
              goodObj.catId = that.Goods.catId
              goodObj.image = that.Goods.thumbnail
              goodObj.goodsAmount = that.totalPrice
              goodObj.memberCollageId = that.memberCollageId
              goodObj.productId = that.productId
              bean.googitem[0] = goodObj
              // var googitem = that.list; 
              bean.province = that.province
              bean.city = that.addr.city
              bean.addr = that.addr.addr
              bean.region = that.addr.region
              bean.shipMobile = that.addr.mobile
              bean.shipName = that.addr.name
              bean.addrId = that.addr.addrId
              bean.clickd = that.clickd
              bean = JSON.stringify(bean)
              wx.request({
                url: globalStore.state.api  + '/api/order/save',
                method: 'POST',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                  order: bean
                },
                success: function (res) {
                  wx.hideLoading()
                  var parms = {}
                  
                  that.order=res.data.order
                  
                  parms.orderid = res.data.order.orderId
                  parms.sn = that.order.sn
                  parms.total_fee = that.totalPrice * 100
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
                                let cantuanparams = {}
                                cantuanparams.orderId = that.order.orderId

                                wx.request({
                                  url: globalStore.state.api  + "/api/order/collagepayreturn",
                                  data: {
                                    parms: JSON.stringify(cantuanparams)
                                  },
                                  method: 'PUT',
                                  header: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                  },
                                  success: function (res) {
                                    if (res.data.code == 0) {
                                      let cantuanorderparams = {}
                                      cantuanorderparams.goodsId = that.goodsId
                                      cantuanorderparams.price = that.price
                                      cantuanorderparams.sn = that.order.sn
                                      cantuanorderparams.amounts = that.totalPrice * 100
                                      cantuanorderparams.amount = that.totalPrice
                                      cantuanorderparams.memberId = that.memberId
                                      cantuanorderparams.memberCollageId = that.memberCollageId
                                      cantuanorderparams.productId = that.productId
                                      cantuanorderparams.num = that.pic * 1
                                      cantuanorderparams.orderId = that.order.orderId
                                      wx.request({
                                        url: globalStore.state.api + '/api/collage/joinCollage',
                                        data: {
                                          params: cantuanorderparams
                                        },
                                        header: {
                                          'Content-Type': 'application/json'
                                        },
                                        success: function (res) {
                                          //util.sendMsg(pay.package, that.order.orderId, payordertime, ordername, that.order.orderAmount)
                                          console.log(res.data)
                                          wx.showToast({
                                            title: '参团成功',
                                            icon: 'success',
                                            duration: 2000
                                          })
                                          var parmss = {}
                                          parmss.price = res.data.price
                                          parmss.activityPrice = res.data.activityPrice
                                          parmss.goodsId = res.data.goodsId
                                          parmss.goodsName = res.data.goodsName
                                          parmss.memberCollageId = res.data.memberCollageId
                                          parmss.img = res.data.img
                                          parmss.shortPerson = res.data.shortPerson
                                          if (res.data.shortPerson == 0) {
                                            parmss.iscollage = 1
                                          }
                                          else {
                                            parmss.iscollage = 2
                                          }
                                          parmss = JSON.stringify(parmss)

                                          wx.navigateTo({
                                            url: '../groupdetail/main?shops= ' + parmss,
                                          })
                                        }
                                      })
                                    }
                                  }
                                })
                              },
                              fail: function (res) {
                                // fail   
                                wx.showToast({
                                  title: '登录失败',
                                  icon: 'success',
                                  duration: 2000
                                })

                              },
                              complete: function () {

                              }
                            })
                          },
                          fail: function () {

                          },
                          complete: function () {

                          }
                        })

                      } else {

                      }
                    }
                  });
                }
              })
            }
        }
      })
     }
  },
  kaituan: function () {
// 获取订单
    var that = this
    if (that.addr == undefined) {
      wx.showToast({
        title: '请添加地址',
      })
    }
    else {
    var bean = {}
    var goodObj={}
    wx.showLoading({
      title: '请稍等',
    })
    bean.image = that.Goods.thumbnail
    bean.memberId = that.memberId
    bean.orderAmount = that.totalPrice
    bean.weight = that.Goods.weight
    bean.shippingAmount = 0
    bean.goodsAmount = that.totalPrice
    bean.googitem = []
    goodObj.price = that.Goods.price
    goodObj.name = that.Goods.name
    goodObj.num = that.pic*1
    goodObj.cart = 0
    goodObj.goodsId = that.Goods.goodsId
    goodObj.catId = that.Goods.catId
    goodObj.image = that.Goods.thumbnail
    goodObj.goodsAmount = that.totalPrice
    goodObj.collagePersons = that.collagePersons
    goodObj.productId = that.productId
    bean.googitem[0] = goodObj
    // var googitem = that.list; 
    bean.province = that.province
    bean.city = that.addr.city
    bean.addr = that.addr.addr
    bean.region = that.addr.region
    bean.shipMobile = that.addr.mobile
    bean.shipName = that.addr.name
    bean.addrId = that.addr.addrId
    bean.clickd = that.clickd
    bean = JSON.stringify(bean)
    console.log(bean)
    // if (that.addr == {}) {
    //   that.addr == ""
    // }
    // if (that.region == undefined) {
    //   wx.showToast({
    //     title: '请添加地址',
    //   })
    //   return;
    wx.request({
      url: globalStore.state.api  + '/api/order/save',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        order: bean
      },
      success: function (res) {
        wx.hideLoading()
        var parms = {}
       
        that.order=res.data.order
        parms.orderid = res.data.order.orderId
        parms.sn = that.order.sn
        parms.total_fee = that.totalPrice*100
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: globalStore.state.api  + "/api/pay/prepay",
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
                      var orderparams = {}
                      orderparams.goodsId = that.goodsId
                      orderparams.price = that.price
                      orderparams.sn = that.order.sn
                      orderparams.amounts = that.totalPrice * 100
                      orderparams.amount = that.totalPrice
                      orderparams.memberId = that.memberId
                      orderparams.collagePersons = that.collagePersons
                      orderparams.productId = that.productId
                      orderparams.num = that.pic*1
                      orderparams.orderId = that.order.orderId
                      wx.request({
                        url: globalStore.state.api  + '/api/collage/openCollage',
                        data: {
                          "params": orderparams
                        },
                        header: {
                          'Content-Type': 'application/json'
                        },
                        success: function (res) {
                          var kaituanrest=res.data
                          wx.request({
                            url: globalStore.state.api  + "/api/order/collagepayreturn",
                            data: {
                              parms: JSON.stringify(orderparams)
                            },
                            method: 'PUT',
                            header: {
                              'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                              if(res.data.code==0){
                                wx.showToast({
                                  title: '开团成功',
                                  icon: 'success',
                                  duration: 2000
                                })
                                var parmss = {}
                                parmss.price = kaituanrest.price
                                parmss.activityPrice = kaituanrest.activityPrice
                                parmss.goodsId = kaituanrest.goodsId
                                parmss.goodsName = kaituanrest.goodsName
                                parmss.memberCollageId = kaituanrest.memberCollageId
                                parmss.img = kaituanrest.img
                                parmss.shortPerson = kaituanrest.shortPerson
                                if (kaituanrest.shortPerson == 0) {
                                  parmss.iscollage = 1
                                }
                                else {
                                  parmss.iscollage = 2
                                }
                                parmss = JSON.stringify(parmss)
                                wx.navigateTo({
                                  url: '../groupdetail/main?shops= ' + parmss,
                                })

                              }
                            }
                          })
                        
                        }
                      });
                    },
                    fail: function (res) {
                      // fail   
                      wx.showToast({
                        title: '支付失败',
                        icon: 'success',
                        duration: 2000
                      })

                    },
                    complete: function () {
                      // complete   
                      console.log("pay complete")
                    }
                  })
                },
                fail: function () {
                  // fail
                },
                complete: function () {
                  // complete
                }
              })

            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
      }
    })
    }
  }
  },

  onLoad: function (options) {
    var that = this
    console.log(wx.getStorageSync('addr') )
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
    console.log(that.Type)
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
    // else if(that.Type="KJ"){ //此处为设置砍价的事件
    //   // 砍价
    //   if (options.cutId == undefined) {   
    //      that.cutId=wx.getStorageSync('cutId')
    //   }
    //   else {
    //     that.cutId=options.cutId
    //   }
    // }
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
            that.isAddr= true
            that.addr=res.data.memberAddressDO
          }
        }
      })
    }
    else {
        that.isAddr= true
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
       // console.log(res.data.product)
      }
    })
  }
}
</script>

<style scoped>
.dingdanContainer{background: #fff;}
.topBtn{background: #fff;}

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
.orderList{border-top: 20rpx solid #f3f3f3}
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

/*zhifu*/
.zhifu{padding-left: 20rpx;padding-right: 20rpx;padding-top: 15rpx;}
.zhifuprice .price{font-size: 28rpx;}
.zhifuprice{padding-top: 6rpx;}
.zhifuprice{display:flex;justify-content: space-between;}
.zhifutitle{font-size: 34rpx;padding-bottom: 15rpx}
</style>
