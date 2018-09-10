<template>
  <div class="chongzhi">
    <div class="header"><image :src="headerimg"></image></div>
    <div class="headerbtn">
         <ul>
           <li v-for="(item,index) in list" :index='index' :key='item' :class="{'select':item.liststu}" @click="change(index)"><span >{{item.name}}</span></li>
         </ul>
    </div>
    <div class="tijiao"><span>兑换</span></div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"

export default {
  data () {
    return {
       headerimg: globalStore.state.imgapi+'image/quanbran01.jpg',
       list:[{name:'1000圈圈兑换300元',liststu:true},{name:'3000圈圈兑换800元',liststu:false},{name:'5000圈圈兑换2000元',liststu:false},{name:'10000圈圈兑换5000元',liststu:false}]    
    }
  },

  components: {
 
  },

  methods: {
 



   change(index){
      let that=this;  
      console.log(that.list);
      for(var i=0;i<that.list.length;i++){
        that.list[i].liststu=false;
      }
      console.log(index);
      that.list[index].liststu=true;
   }
  },

  onLoad(){

  }
}
</script>

<style scoped>
image{display: block;width: 100%;height: 100%;}
.chongzhi{background: #fff;height: 100vh;}

.header{height: 350rpx;}
.headerbtn{margin-top: 35rpx;}
.headerbtn ul{width: 76%;margin: auto;display: flex;align-items: center;flex-wrap: wrap;}
.headerbtn li{width: 45%;margin-left: 2%;margin-right: 2%;border-top:1px solid #f8f8f8;margin-top: 35rpx;line-height: 110rpx;border-radius: 10rpx;text-align: center;    
box-shadow: 0 10px 30px rgba(0,0,0,0.1);}
.headerbtn li span{font-size: 25rpx;}
.headerbtn .select{background: #f33f40;color: #fff;}

.tijiao{text-align: center;padding-top: 40rpx;}
.tijiao span{display:inline-block;background: #e7213c;color: #fff;padding: 10rpx 45rpx;border-radius: 12rpx;}
</style>
