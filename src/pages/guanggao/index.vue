<template>
  <div class="guanggaocontainer">
    <div class="gaoimg"><img :src="guanggao" /></div>
    <div class="topbtn"><span class="btn" @click="closebtn">{{time}}s 关闭</span></div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"


export default {
  data () {
    return {
     guanggao:globalStore.state.imgapi+"/image/guanggao.jpg",
     time:3
    }
  },

  components: {

  },

  methods: {
    onloads(){
      let that=this;
      var timer=setInterval(function(){
            that.time=that.time-1;
            if(that.time<=0){
                clearInterval(timer);
                console.log(that.time);
                wx.switchTab({ url: '../index/main' }); 
            }
        },1000)
    },
    closebtn:function(){
     wx.switchTab({ url: '../index/main' });
    }
  },
  
  onLoad(){
      this.onloads();
  }
}
</script>

<style scoped>
img{height: 100%;width: 100%;display: block;}
.guanggaocontainer{height: 100vh;position: relative;}
.gaoimg{height: 100%;}

.topbtn{position: absolute;top: 15rpx;right: 10rpx;}
.btn{border: 1px solid #f1f1f1;background: rgba(211, 211, 211, 0.199);font-size: 24rpx;padding:5rpx 20rpx;border-radius: 20rpx;color: #fff;}
</style>
