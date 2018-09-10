<template>
  <div class="groupContainer">
     <div class="tabs"><tab :find_item='tabitem' /></div> 
     <!--tab end-->

   <div  v-if="listStaue">
    <div class="List" @click="tojump">
      <div class="left">
        <img :src="listimg">
      </div>
      <div class="right">
        <div class="title">虾仁拌饭</div>
        <div class="map"><img :src="listmap"><span>南昌市青山湖区顺外路699创意园</span></div>
        <span class="care">0.5km</span>
      </div>
    </div>

     <div class="List">
      <div class="left">
        <img :src="listimg">
      </div>
      <div class="right">
        <div class="title">虾仁拌饭</div>
        <div class="map"><img :src="listmap"><span>南昌市青山湖区顺外路699创意园</span></div>
        <span class="care">0.5km</span>
      </div>
    </div>
   </div> 
    <div v-else class="tip">抱歉还没有商家入驻哦~~~~</div>

    <div class="ruzhubtn" @click="ruzhu()"><img :src="ruzhuimg"></div>
  </div>
</template>

<script>
import tab from '../../components/tabbar';
import globalStore from "../../stores/global-store"

export default {
  data () {
    return {
      listimg:globalStore.state.imgapi+'image/quanquanlist01.png',
      listmap:globalStore.state.imgapi+'image/listmaap.png',
      ruzhuimg:globalStore.state.imgapi+'image/ruzhubtn.png',
      listStaue:true,
      tabitem:[
        {name:'全部',index:0,selected:true},
        {name:'美食',index:1,selected:false},
        {name:'美发美甲',index:2,selected:false},
        {name:'运动健康',index:3,selected:false},
        {name:'鲜花店',index:4,selected:false}]
    }
  },

  components: {
   tab
  },

  methods: {
   tojump(){
     wx.navigateTo({ url: '../../pages/store/main' });
   },
   ruzhu(){
     wx.navigateTo({ url: '../../pages/storeruzhu/main' });
   }
  },

  created () {
   
  }
}
</script>

<style scoped>
img{height: 100%;width: 100%;}
.groupContainer{background: #fff;height: 100vh;}
.tabs li{font-size: 32rpx;color:#b6b5ba; }
.find_item_list span{font-size: 32rpx;color:#b6b5ba; }

.tabs{border-bottom: 1px solid #f6f6f6;}
/*List*/
.List{display: flex;padding:20rpx 20rpx 0; }
.title{font-size: 32rpx;padding-bottom: 6rpx;}
.left{width: 21%;margin-right: 3%;}
.left img{height: 150rpx;}
.map{display: flex;align-items: center;}
.right{width: 76%;border-bottom:1px solid #f6f6f6;}
.right img{width:30rpx;height: 36rpx;margin-right: 10rpx;}
.map span{color: #6f6f6f;font-size:28rpx}

.care{display: inline-block;padding-left: 15rpx;padding-right: 15rpx;height: 38rpx;line-height: 38rpx;background: #fe7d77;color: #fff;font-size: 26rpx;border-radius: 8rpx;}
.tip{padding-top: 30rpx;color: #6f6f6f;text-align: center;font-size: 34rpx;}
.ruzhubtn{position: fixed;bottom: 35rpx;right: 20rpx;height: 120rpx;width: 120rpx;}
</style>
