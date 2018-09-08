<template>
  <div class="addressContainer">

      <div class="infowarp" v-if="hasList">
        <div class="listWarp" v-for="(item,index) in cartgoods" :index='index' :key='item'>
          <div class="infotitle">
            <div class="titleleft">谷琴优品</div>
            <div class="titleright" @click="edits">编辑</div> 
          </div>
            <div class="listinfowarp" :class="isTouchMove?'touch-move-active':''" @touchstart='touchstart' @touchmove='touchmove($event,index)'>
              <div class="infocontent">
                <div class="contenLeft"> 
                           <icon color='#e93429' type="success" size="20" v-if="item.selected" @click="selectList(item.cartId,index)"/>
                           <span v-else class="iconfalse"  @click="selectList(item.cartId,index)"></span></div>
                <div class="contentcon"><img :src="item.image"/></div>
                <div class="contentRight">
                  <div class="righttop"> {{item.name}}</div>
                  <div class="rightbotom"><div><span>￥{{item.price}}</span><span>x{{item.num}}</span></div>
                      <div class="inputNum">
                        <div class="inputnummins" @click="minusCount(item.cartId,index)">-</div><input  maxlength="10" :value="item.num" /><div class="inputnumplus" @click="addCount(item.cartId,index)">+</div>
                      </div>
                  </div>
                </div>
              </div>  
              <div class="del" @click="cartdele($event,item.cartId,index)">删除</div>
           </div>
          </div>
        </div>
      <div  class="elseinfo" v-else>购物车里是空的哦~~~</div>
     
     <div class="footer">
       <div class="footer-box1" @click="selectAll()"><icon color='#e93429' type="success" size="20" v-if="selectAllStatus"/><span v-else class="iconfalse"></span> <label>全选</label> </div>
       <div class="footer-box2" v-if="edit">合计：￥{{totalPrice}}元</div>
       <div class="footer-box3" v-if="edit" @click="next()"><span>结算</span> </div>
       <div class="footer-box4" @click="deled" v-else><span>删除</span></div>
     </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";

export default {
  data() {
    return {
      hasList: false,
      cartgoods: [],
      isTouchMove:false,
      selectAllStatus:false,
      totalPrice:0,
      edit:true
    };
  },

  components: {},

  methods: {
    //点击删除购物车商品
    cartdele(e,cartid,index){
     console.log("删除事件");
        this.cartgoods.splice(index, 1)
        let that=this;
        var parms={}
        var cart = {}
        var cartId = cartid;
        cart.cartId=cartId;
        parms.cart=cart;
        parms = JSON.stringify(parms)
        wx.request({
          url: globalStore.state.api + '/api/shoppingCart/delete',
          data: {
            "parms": parms
          },
          method: "POST",
          header: {
            
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
             console.log(that.cartgoods)
              that.cartgoods=that.cartgoods,
              that.code=res.data.code
            //that.getTotalPrice();
          }
        })
    },

    touchstart(e) {

      let that=this;
        //开始触摸时 重置所有删除
      that.cartgoods.forEach(function (v, i) {
        if (v.isTouchMove)//只操作为true的
          v.isTouchMove = false;
          that.isTouchMove=false;
      })
        that.startX=e.clientX;
        that.startY=e.clientY;
        that.cartgoods=that.cartgoods;
    },
      //滑动事件处理
    touchmove(e,index) {
      console.log("11111")
      var that = this,
        index = index,//当前索引
        startX = that.startX,//开始X坐标
        startY = that.startY,//开始Y坐标
        touchMoveX = e.clientX,//滑动变化坐标
        touchMoveY = e.clientY,//滑动变化坐标
        //获取滑动角度
        angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
      that.cartgoods.forEach(function (v, i) {
        v.isTouchMove = false
        //滑动超过30度角 return
        if (Math.abs(angle) > 30){ 
          return;
          }
        if (i == index) {
          if (touchMoveX > startX){
            //右滑
                that.isTouchMove=false;
          } 
          else{
            //左滑
                that.isTouchMove=true;
          }
        }
      })
      //更新数据
        that.cartgoods=that.cartgoods;
    },
    angle(start, end) {
      var _X = end.X - start.X,
        _Y = end.Y - start.Y
      //返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },
   
   //点击商品选中
   selectList(cartId,index){ 
     console.log("商品选中事件");
      let that=this;
      that.selects = cartId;
      let cartgoods = that.cartgoods;
      const selected = cartgoods[index].selected;
      cartgoods[index].selected = !selected;
      that.cartgoods=cartgoods;
      console.log(that.cartgoods);
      that.getTotalPrice();
      
   },
    
    onloadshow(){
     //首先加载初始数据
      let parms = {};
      try {
        var memberId = wx.getStorageSync("memberId");
        if (memberId) {
          memberId: memberId;
        }
      } catch (e) {}
      try {
        var indexdata = wx.getStorageSync("indexdata");
        if (indexdata) {
          indexdata: indexdata;
        }
      } catch (e) {}
      parms.memberId = memberId;
      let that = this;
      wx.request({
        url: globalStore.state.api + "/api/shoppingCart/select",
        data: {
          parms: parms
        },
        headers: {
          "Content-Type": "application/json"
        },
        success: function(res) {
          if (res.data.code != 1) {
             for(var i in res.data.cartgoods){
              res.data.cartgoods[i].selected=false;
             }
             that.cartgoods = res.data.cartgoods;
              that.code = res.data.code;
              that.selectAllStatus = false;
              that.totalPrice = 0.0;
              that.indexdata = indexdata;
            //res代表success函数的事件对，data是固定的
            console.log("------------------");
          }
          if (res.data.code == 1) {
            that.indexdata = indexdata;
            that.hasList = false;
            that.totalPrice = 0.0;
          } else {
            that.indexdata = indexdata;
            that.hasList = true;
          }
        }
      });
    },
     
     /*总价计算*/
     getTotalPrice(){
        let that=this;
        let cartgoods = this.cartgoods;  // 获取购物车列表
        let total = 0;
        if (cartgoods != undefined){
          for (let i = 0; i < cartgoods.length; i++) {          // 循环列表得到每个数据
            if (cartgoods[i].selected) {                        // 判断选中才会计算价格
              total += cartgoods[i].num * cartgoods[i].price;   // 所有价格加起来
            }
          }
          // 最后赋值到data中渲染到页面
          that.cartgoods=cartgoods,
          // totalPrice: total.toFixed(2)
          that.totalPrice=total
        }
     },
     
     //购物车商品数量增加
     addCount(cartIds,index){
        let that = this
        let cartgoods = that.cartgoods;
        let num = cartgoods[index].num;
        var cartId = cartIds
        var parms={}
        var cart={}
        cart.cartId = cartId
        cart.num = num
        parms.cart = cart
        parms = JSON.stringify(parms)
        wx.request({
          url:  globalStore.state.api  + '/api/shoppingCart/modification',
          data: {
            parms: parms
          },
          method: "PUT",
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            num = num + 1;
            cartgoods[index].num = num;
            that.getTotalPrice();
            that.cartgoods=cartgoods
          }
        })
     },
      //购物车商品数量减少
    minusCount(cartIds,index){
      let that = this
      let cartgoods = that.cartgoods;
      let num = cartgoods[index].num;
      var cartId = cartIds;
      var parms={}
      var cart = {}
      cart.cartId = cartId
      cart.num = num
      parms.cart = cart
      parms = JSON.stringify(parms)
      cartgoods[index].num = num;
      wx.request({
        url:  globalStore.state.api + '/api/shoppingCart/modification',
        data: {
          parms: parms
        },
        method: "PUT",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (num <= 1) {
            return false;
          }
          num = num - 1;
          cartgoods[index].num = num;
          that.getTotalPrice();
          that.cartgoods=cartgoods;
        }
      })
    },
     //点击编辑事件
    edits(){
      console.log("888888")
       var edit=this.edit
      if(edit==true){edit=!this.edit}
      else{edit=!this.edit}
        this.edit=edit
    },
    //商品全选
    selectAll(){
      let that=this;
      let selectAllStatus = that.selectAllStatus;
      selectAllStatus = !selectAllStatus;
      let cartgoods = that.cartgoods;
      for (let i = 0; i < cartgoods.length; i++) {
        cartgoods[i].selected = selectAllStatus;
      }
      that.selectAllStatus=selectAllStatus;
      that.cartgoods=cartgoods;
      this.getTotalPrice();
    },
    
    //选择商品
    deled(){
      var that = this
      var parms = {}
      var totalPrice = that.totalPrice
      var cartIdgood=[]
      var edit=that.edit
      var cart = {}
      for (let i = 0; i < that.cartgoods.length; i++) {         // 循环列表得到每个数据
        if (that.cartgoods[i].selected) {                     // 判断选中
          cartIdgood.push(that.cartgoods[i].cartId)   //获取所有选中的订单ID
        }
      }
      parms.cartS = cartIdgood
      parms = JSON.stringify(parms)
      wx.request({
        url:  globalStore.state.api + '/api/shoppingCart/deleteAll',
        data: {
          "parms": parms
        },
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            that.cartgoods=that.cartgoods,
            that.selectAllStatus=false,
            that.edit=!edit,
            that.totalPrice=0.00,
          that.onloadshow();
        }
      })
    },

    //点击加载结算事件
    next(){
          var that = this
          let total = 0;
          var weight=0;
          var aa = {};
          var gainedpoint = 0;
          var googitem = [];
          var Goods = {};
          var gooditemString = gooditemString
          var shippingAmount = 0
        var orderAmount = that.totalPrice
        var totalPrice = that.totalPrice
        var goodsAmount = that.totalPrice
          var cartgoods = that.cartgoods;                  // 获取购物车列表
          for (let i = 0; i < cartgoods.length; i++) {         // 循环列表得到每个数据
            if (cartgoods[i].selected) {                // 判断选中      
              cartgoods[i].cart = 1,
              googitem.push(cartgoods[i])
              gainedpoint += cartgoods[i].point 
              total  += cartgoods[i].num * cartgoods[i].price;   
              weight += cartgoods[i].num * cartgoods[i].weight;     
            }
            Goods.googitem = googitem
            Goods.weight = weight
            Goods.gainedpoint = gainedpoint
            Goods.goodsAmount = goodsAmount
            Goods.shippingAmount = 0
            Goods.orderAmount = that.orderAmount
            Goods.gainedpoint = gainedpoint
            gooditemString = JSON.stringify(Goods)
          }
          
            that.totalPrice=total.toFixed(2)
        
          if (googitem.length == "") {
            wx.showToast({
              title: "请选择订单",
              icon: "success",
              durantion: 2000
            })
          } else {
            wx.navigateTo({
              url: "../dingdan/main?gooditem=" + gooditemString + '&cart=1',
              success: function (res) {
                that.selectAllStatus=false;
                that.totalPrice=0.00;    
              },
              fail: function () {
                // fail
              },
              complete: function () {
              }
            })
          }
    }

  },
  //返回当前页面是即加载一次数据
  onShow(){
    console.log("页面请求时加载");
    //加载页面即加载数据
     let that = this;
    that.onloadshow();
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组） 
    var arr = that.cartgoods; 
    if( arr != undefined){
      // 有数据的话，就遍历数据，计算总金额 和 总数量  
      if (arr.length > 0) {
        for (var i in arr) {
          // that.data.total += Number(arr[i].price) * Number(arr[i].count);
          // that.data.goodsCount += Number(arr[i].count);
        } 
        // 更新数据  
          that.hasList=true
          that.cartgoods=arr
         // iscart: true,
          // total: that.data.total,
          // goodsCount: that.data.goodsCount
      }
    }
    //this.getTotalPrice();
  },

  //下拉刷新
async onPullDownRefresh() {
  wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
        this.onloadshow();
  },
  onLoad(options) {
   this.onloadshow();
  }
};
</script>





<style scoped>
image {
  width: 100%;
  height: 100%;
  display: block;
}
.addressContainer {background: #f2f2f2;height: 100vh;}
.infowarp {background: #ffffff;}

/*infowarp*/
.infowarp {display: flex;flex-direction: column;}
.infotitle {display: flex;justify-content: space-between;border-bottom: 1px solid #f2f2f2;height: 80rpx;line-height: 80rpx;font-size: 28rpx;padding-left: 15rpx;padding-right: 15rpx;color: #666;}
.titleright{font-size: 28rpx;color:#b3b3b3;}
.infotitle i-icon {padding-right: 20rpx;}

.swipwarp {display: flex;justify-content: space-between;width: 100%;overflow: hidden;}

/*del*/
.del {background-color: orangered;width: 155rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;
  color: #fff;-webkit-transform: translateX(90px);transform: translateX(90px);-webkit-transition: all 0.4s;transition: all 0.4s;}

.listinfowarp {display: flex;justify-content: space-between;}
.listinfowarp .infocontent {-webkit-transform: translateX(90px);transform: translateX(90px);-webkit-transition: all 0.4s;transition: all 0.4s;margin-left: -180rpx;}
.touch-move-active .infocontent,.touch-move-active .del{-webkit-transform:translateX(0);transform:translateX(0);}

/*infocontent*/
.infocontent {display: flex;justify-content: space-between;padding: 20rpx 12rpx;}
.contenLeft {display: flex;justify-content: center;align-items: center;}
.righttop {font-size: 28rpx;color: #ccc;}
.contentcon {display: flex;align-items: center;}
.contentcon img {width: 140rpx;height: 140rpx;margin-right: 15rpx;}
.rightbotom {display: flex;justify-content: space-between;padding-left: 15rpx;padding-right: 15rpx;margin-top: 22rpx;}
.rightbotom span {color: rgb(245, 109, 109);font-size: 28rpx;padding-right: 35rpx;}

.rightbotom i-input-number view {line-height: 20px;height: 20px;}
.inputNum {display: flex;width: 200rpx;}
.inputNum div {line-height: 52rpx;text-align: center;width: 60rpx;height: 52rpx;border: 1rpx solid #dddee1;border-radius: 2px 0 0 2px;color: rgb(126, 126, 126);}
.inputNum input {border: 1rpx solid #dddee1;color: rgb(126, 126, 126);display: inline-block;text-align: center;vertical-align: middle;height: 52rpx;width: 70rpx;min-height: auto;font-size: 12px;line-height: 52rpx;}

.elseinfo {font-size: 30rpx;text-align: center;padding-top: 20rpx;}
/*footer*/
.footer{position: fixed;bottom: 0;display: flex;justify-content: space-between;width: 100%;height: 90rpx;background: #ffffff;}
.footer div{font-size: 30rpx;height: 90rpx;line-height: 90rpx;}
.footer-box1{display: flex;justify-content: center;align-items: center;color:#666;padding-left: 20rpx;}
.footer-box2{color: #e93429;}
.footer-box3 span{display: inline-block;width: 150rpx;height: 90rpx;text-align: center;background: #e93429;color: #ffffff;}
.footer-box1 icon{width:35rpx;height:50rpx;}
.iconfalse{display: inline-block;width: 35rpx;height: 35rpx;border:1px solid #ccc;border-radius: 50%;}
.footer-box1 label{margin-left: 16rpx;}
.footer-box4 span{display: inline-block;;width: 165rpx;height: 90rpx;text-align: center; background: #2757be;color: #ffffff;}
</style>
