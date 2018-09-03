<template>
  <div class="addressContainer">
       <div class="addlist">
          <div class="additem">
            <span class="addname">马登</span> <span class="addphone">15623140205</span>
            <div class="adddizhi">湖北省黄石市阳新县兴国大道156号</div>
          </div>
          <div class="addbtnitem">
             <div class="btnitemleft"><radio value="1" checked="true"/>默认地址</div> 
             <div class="btnitemight"><span class="deit">编辑</span><span class="dele">删除</span></div>
          </div>
       </div>
       <!--addlist end-->

     <div class="addres" @click="address"><span>新增收货地址</span></div>        
     <!--addres end-->
  </div>
</template>

<script>

export default {
  data () {
    return {
      Goods:[]
     }
  },

  components: {

  },

  methods: {
     address(){
       let that=this;
       let memberId=wx.getStorageSync('memberId');
       if(memberId){
         that.memberId=memberId;
       }
        if(memberId==''){
         wx.showModal({
           title: '提示', //提示的标题,
           content: '你还未登录，是否登录', //提示的内容,
           success: res => {
             if (res.confirm) {
                wx.switchTab({ url: '../my/main' });
             } else if (res.cancel) {
               console.log('用户点击取消')
             }
           }
         });
       }else{
         wx.navigateTo({ url: '../xinaddress/main' });
       }
       
     }
   },

   onLoad(options){
       
    }
}
</script>



<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}

.addressContainer{height: 100vh;background: #f2f2f2;}
.addres{line-height: 75rpx;padding-top: 25rpx;padding-bottom: 25rpx;}
.addres span{display: block;width: 85%;text-align: center;line-height: 75rpx;margin: auto;font-size: 30rpx;background: #26b4fe;border-radius: 45rpx;color: #ffffff;}

/*additem*/
.addlist{padding-left: 25rpx;padding-right: 25rpx;background: #ffffff;}
.additem{padding-top: 15rpx;padding-bottom: 15rpx;}
.additem span{margin-right: 25rpx;font-size: 30rpx;}
.adddizhi{font-size: 30rpx;padding-top: 20rpx;padding-bottom: 20rpx;}
.addbtnitem{display: flex;align-items: center;padding-bottom: 15rpx;padding-top: 15rpx;border-top: 1px solid #f2f2f2;}
.btnitemleft{display: flex;align-items: center;color: #26b8ff;}
.btnitemleft,.btnitemight{width: 50%;font-size: 30rpx;}
.btnitemight{display: flex;justify-content: space-between;padding-left: 145rpx;padding-right: 20rpx;}
.btnitemight .deit{color: #26b8ff;}
</style>
