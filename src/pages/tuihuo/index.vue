<template>
  <div class="tuikuanContainer">
      <div class="header" v-for="(items,index) in listitem" :index="index" :key='key'>
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
          <div class="price"><span>退款金额：</span><small class="stuprice">￥{{datas.orderDO.orderAmount}}</small></div>
      </div>
      <!--shopstu end-->

      <div class="tip">最多选择￥{{datas.orderDO.orderAmount}}，含发货邮费￥{{yunfei}}</div>
      <!--tip end-->
      
      <div class="shuoming"><span>退款说明：</span>  <input type="text" @input="more" placeholder="选填" placeholder-style='color:#939393'/></div>
  
      <div class="btn" @click="trues">提交</div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"

export default {
  data () {
    return {
       handerimg:globalStore.state.imgapi+'image/quanquanlist01.png',
       selectData: ["请选择","商品有问题", "买错/拍错", "发票问题","其他"],
       shopstu:'退货退款',
       show: false,
       index:0,
       datas:[],
       yunfei:0,
       listitem:[]
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

       trues(){
            var parms = {}
            var that = this
            var applyReason = ""
            try {
            var memberId = wx.getStorageSync('memberId')
            if (memberId) {
                memberId: memberId
            }
            } catch (e) {
            }
            var index = that.index;
            // if (index == 0) {
            //   applyReason = "商品质量有问题"
            // }
            // if(index == 1){
            //   applyReason="收到商品与描述不符"
            // }if(index==2){
            //   applyReason = "不喜欢/不想要"
            // } if (index == 3) {
            //   applyReason = "发票问题"
            // } if (index == 4) {
            //   applyReason = "快递没收到"
            // }
            // if (index == 5) {
            //   applyReason = "其他"
            // }


            if (index == 0) {
            applyReason = "请选择"
            }
            if (index == 1) {
            applyReason = "商品有问题"
            } if (index == 2) {
            applyReason = "买错/拍错"
            }
            if (index == 3) {
            applyReason = "发票问题"
            }
            if (index == 4) {
            applyReason = "其他"
            }
            if (that.more == undefined) {
            wx.showModal({
                title: '提示',
                content: '请描述退货原因详情',
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
            returnorder.memberid = memberId
            returnorder.ordersn = that.dd.sn
            returnorder.sellbackAmount = that.goodsAmount
            returnorder.remark = that.more
            returnorder.show = that.show
            returnorder.applyReason = applyReason
            returnorder.orderId = that.dd.orderId
            returnorder.type = 1
            parms.returnorder = returnorder
            parms = JSON.stringify(parms)
            wx.request({
            url: globalStore.state.api + '/api/order/returnOrder',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            data: {
                'parms': parms
            },
            success: function (res) {
                if (res.data.msg == 1) {
                wx.showToast({
                    title: '申请成功',
                })
                wx.switchTab({
                    url: '../my/main',
                })
                }
            }
            })

    },
    //获取页面初始化数据
    onloads(options){
       var parms = {}
        var that = this
        var dd = JSON.parse(options.dd)
        parms.orderId = dd.orderId
        parms = JSON.stringify(parms)

        wx.request({
        url: globalStore.state.api + '/api/order/orderIntRo',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            'parms': parms
        },
        success: function (res) {
            console.log("初始化数据--------------")
            console.log(res.data.orderDO.item)
            that.goodsAmount=res.data.orderDO.goodsAmount;
            that.dd=dd;
            that.datas=res.data;
            that.listitem=res.data.orderDO.item;
        }
        })
    }
   },
   onLoad(options){
    let that=this;
    that.onloads(options);
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
