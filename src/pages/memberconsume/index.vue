<template>
  <div class="memberconsume">
    <div class='memberconsumetitle'>
      <div class='line1'>订单号</div>
      <div class='line2'>消费额</div>
      <div class='line3'>分润</div>
      <div class='line4'>消费日期</div>
    </div>
    <div class='memberconsumelist' v-for="(item,index) in expense">
      <div class='line1'>{{item.shareId}}</div>
      <div class='line2'>{{item.monetary}}</div>
      <div class='line3'>{{item.shareMoney}}</div>
      <div class='line4'>{{item.shareTime}}</div>
    </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"
export default {
  data () {
    return {
     expense:[]
     }
  },

  components: {

  },

  methods: {
   
   },
   onLoad(options){
    var that=this;
    wx.request({
      url: globalStore.state.api  + '/api/distribe/expense',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        memberId: options.memberId
      },
      success: function (res) {   
        that.expense=res.data.expense
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
.memberconsumetitle,.memberconsumelist{
  display: flex;
  width: 100%;
 text-align: center;
 border: 1rpx solid #ddd;
 background: #fff;
}
.memberconsumetitle view{
  width: 18%;
  height: 80rpx;
  line-height: 80rpx;
}
.memberconsumelist view{
  width: 18%;
  font-size: 0.8em;
  height: 80rpx;
  line-height: 80rpx;
}
.memberconsumetitle .line4{
 flex-grow: 1;
}
.memberconsumelist .line4{
  flex-grow: 1;
}

</style>
