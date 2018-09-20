<template>
  <div class="maskcontainer">
    <div class="header"><img :src="headerimg"/></div>
    <form @submit='fromsub'>
    <div class="maskinfo">
         <div class="title">留下电话号码，客服马上联系你</div>
         <div class="itemwarp">
             <div class="item">
                 <div class="item01">姓名</div>
                 <div class="item02"><input type="text" placeholder="请输入你的真实姓名" placeholder-style='font-size: 26rpx;'></div>
             </div>
             <div class="item">
                 <div class="item01">手机号</div>
                 <div class="item02"><input type="text" placeholder="请填写您的手机号" placeholder-style='font-size: 26rpx;'></div>
             </div>
            <div class="item">
                 <div class="item01">行业</div>
                 <div class="item02"><input type="text" placeholder="请填写您当前从事的行业" placeholder-style='font-size: 26rpx;'></div>
             </div>
         </div>
    </div>
    <div class="formsub"><button form-type='submit'>提交</button></div>
    </form>
    <div class="liucheng">
        <div class="bottiel">入驻流程：</div>
        <div class="listwarp">
            <span>填写资料</span><img :src="maskright"/><span>客服回电确认</span><img :src="maskright"/>
            <span>小程序</span><img :src="maskright"/><span>上传商品</span>
        </div>
    </div>
    <div class="kefu" @click="kefu">
        <img :src="kefuimg" />
    </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"

export default {
  data () {
    return {
      headerimg: globalStore.state.imgapi+'image/maskbrand.jpg',
      maskright: globalStore.state.imgapi+'image/maskright.png',
      kefuimg: globalStore.state.imgapi+'image/maskphone.png'
    }
  },

  components: {

  },

  methods: {
      kefu:function(){
          wx.makePhoneCall({
                phoneNumber: '13767842228', //仅为示例，并非真实的电话号码
                success:function(){
                  console.log("拨打成功")
                },
                fail:function(){
                  console.log("拨打失败")
                }
           })
      }

  },

  onLoad (options) {

  }
}
</script>

<style scoped>
img{width: 100%;height: 100%;display: block;}
.maskcontainer{background: #fffaf7;min-height: 100vh;}

.header{height: 420rpx;}
.maskinfo{background: #fffaf7}
.title{text-align: center;font-size: 34rpx;font-weight: bold;padding-top: 45rpx;color: #c5aa95;}
.itemwarp{padding-left: 55rpx;padding-right: 55rpx;padding-top: 30rpx;}
.item{display: flex;justify-content: space-between;align-items: center;margin-top: 35rpx;}
.item .item01{width: 25%;font-size: 34rpx;}
.item .item02{width: 75%;border:1px solid #eaeae8;background: #fff;display: flex;align-items: center;padding-left: 15rpx;height: 65rpx;}

.formsub{text-align: center;margin-top: 45rpx;}
.formsub button{background:#ff7903;width: 36%;margin: auto;font-size: 34rpx;color: #fff;}

.liucheng{padding-top: 85rpx;}
.listwarp{display: flex;align-items: center;justify-content: center;padding-top: 15rpx;}
.listwarp span{display: inline-block;border:1px solid #9a7a6b;color: #9a7a6b;font-size: 26rpx;border-radius: 6rpx;padding-left: 15rpx;padding-right:15rpx; }
.listwarp img{width: 24rpx;height: 26rpx;margin-right: 12rpx;margin-left: 12rpx;}
.bottiel{padding-left: 25rpx;font-size: 34rpx;color:#9a7a6b; }

.kefu{position: fixed;bottom: 120rpx;right: 10rpx}
.kefu img{width: 75rpx;height: 75rpx;}
</style> 
