<template>
  <div class="tuikuanContainer">
         <div class="header" v-for="(items,index) in tuikuandetail.item" :index="index" :key='key'>
          <div class="left">
              <img :src="items.image"/>
          </div>
          <div class="right">
              <div class="title">{{items.name}}</div>
               <span class="price">￥{{items.price}}</span><span class="num">×{{items.num}}</span>
          </div>
      </div>
      <!--header end-->
      
      <div class="shopstu">
          <div class="stutitle"><span>货物状态</span><span class="spanr">{{shopstu}}</span></div>
          <div class="stuyuan"><span>退款原因</span><div class="spandiv spanr"> 
               <picker @change='changpick' :value='index' :range='selectData'>
                    <div class="picker">{{selectData[index]}} ></div>
                </picker>
              </div></div>
          <div class="price"><span>退款金额：</span><small class="stuprice">￥{{tuikuandetail.orderAmount}}</small></div>
      </div>
      <!--shopstu end-->

      <div class="tip">最多选择￥{{tuikuandetail.orderAmount}}，含发货邮费￥{{yunfei}}</div>
      <!--tip end-->
      
      <div class="shuoming"><span>退款说明：</span>  <input type="text" @input="more" placeholder="选填" placeholder-style='color:#939393'/></div>
  
      <div class="btn" @click="tuikuan">提交</div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"
export default {
  data () {
    return {
      selectData:['不喜欢/不想要','快递没有收到','其他'],
      Goods:[],
      tuikuandetail:[],
      tuikuanreson:'',
      shopstu:'申请退款',
      index:0,
      show:false
     }
  },

  components: {

  },

  methods: {
 
      //详情信息
      more(e){
          let that=this;
          console.log(e)
          var key = e.mp.detail.value;
          that.more=key;
      },

     changpick(e){
        let that=this;
        console.log(e.mp.detail.value);
        that.index=e.mp.detail.value;
        that.show=!that.show;
      },

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
    let index=that.index;
    var applyReason="";
    if (index == 0) {
        applyReason = "不喜欢/不想要"
      } if (index == 1) {
        applyReason = "快递没收到"
      }
      if (index == 2) {
        applyReason = "其他"
      }
      if (that.more == undefined){
        wx.showModal({
          title: '提示',
          content: '请描述退款原因详情',
          success: function (res) {
            if (res.confirm) {

              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })  
        return
      }
      var returnorder = {}
      returnorder.memberid = memberId;
      returnorder.ordersn = that.sn;
      returnorder.sellbackAmount = that.tuikuandetail.goodsAmount;
      returnorder.remark = that.more;
      returnorder.show = that.show;
      returnorder.applyReason = applyReason;
      returnorder.orderId = that.orderId;
      returnorder.type = 0;
      parms.returnorder = returnorder;
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
        console.log("=============");
        console.log(that.tuikuandetail);
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
.tuikuanContainer{background: #f3f3f3;height: 100vh;}

.header{display: flex;align-items: center;padding: 16rpx 0;border-top: 10rpx solid #f1f1f1;background: #fff;border-bottom: 13rpx solid #f1f1f1;}
.header .left{height: 155rpx;width: 25%;padding-left: 20rpx;padding-right: 20rpx;}
.header .right{width: 75%;height: 165rpx;}
.title{font-size: 30rpx;}
.right span{color: #666;font-size: 30rpx;padding-top: 30rpx;display: inline-block;margin-right: 28rpx;}
.right .price{color: #F64F57;font-size: 32rpx;}

.shopstu{padding-left: 15rpx;padding-right: 15rpx;background: #fff;}
.stutitle{border-bottom: 1px solid #f3f3f3;}
.shopstu div{line-height: 85rpx;}
.shopstu span{font-size: 30rpx;}
.shopstu .spanr{color:#939393;}
.stuprice{color: #F64F57;font-size: 34rpx;}
.stutitle,.stuyuan{display: flex;justify-content: space-between;align-items: center;}
.shopstu .price{display: flex;align-items: center;}

.picker{font-size: 30rpx;}

.tip{background:#f3f3f3;line-height: 75rpx;color: #939393;font-size: 30rpx;padding-left: 20rpx;}
.shuoming{display: flex;align-items: center;background: #fff;padding:15rpx 20rpx;}
.shuoming span{font-size: 30rpx;}
.shuoming input{font-size: 30rpx;}

.btn{position: fixed;bottom: 0;width: 100%;text-align: center;background:#f23f3f;color: #fff;font-size: 36rpx;line-height: 90rpx;}

</style>
