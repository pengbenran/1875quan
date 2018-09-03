<template>
  <div class="dingdanContainer">
     <div class="topBtn"><span>+ 点击新增地址</span></div>
     <!--topbtn end-->
     <div class="shopTitle"><image :src='homeimg' class="img01"></image><span>谷琴优品</span><image :src='titleright' class="img02"></image></div>
    <!--shopTile end-->

    <div class="shoplist">
      <div class="lsitwarp">
        <div class="shopimg"><image src=""></image></div>
        <div class="shopinfo"><span>Apple/苹果iPhone X苹果x iphoneX</span></div>
        <div class="shoppic">
          <div class="shoppictop"><span>￥0.01</span><span>*1</span></div>
          <div class="shoppicbottom">正品保证</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"; 

export default {
  data () {
    return {
     homeimg:globalStore.state.imgapi + "/images/quzhifu/shang.png",
     titleright:globalStore.state.imgapi +"/images/quzhifu/8.png",

    }
  },

  components: {

  },

  methods: {
  
  },

  onLoad: function (options) {
     let that=this;
     console.log(options)
     wx.showLoading({
       title:'加载中'
     })
     
  }
}
</script>

<style scoped>
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
</style>
