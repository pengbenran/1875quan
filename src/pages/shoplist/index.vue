<template>
  <div class="shopcontainer" >
     <div class="shoptab">
       <ul>
         <li v-for="(item,index) in listTab" :index='index' :key="item" @click="changs(index)"><span :class="{'selects':item.tabstu}">{{item.name}}</span></li>
         <!-- <li><span>推荐排序</span></li>
         <li><span>距您最近</span></li>
         <li><span>人气优先</span></li> -->
       </ul>
     </div>
     <!--shoptab end-->

     <div class="listwarp">
           <div class="List" @click="tojump(item.brandId)" v-for="(item,index) in brand" :key="key" :index="index">
            <div class="left">
              <img :src="item.logo">
            </div>
            <div class="right">
              <div class="title">{{item.name}}</div>
              <div class="map"><img :src="listmap"><span>南昌市青山湖区顺外路699创意园</span></div>
              <span class="care">0.5km</span>
            </div>
          </div>
     </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"

export default {
  data () {
    return {
      syswinth:0,
      sysheight:0,
      brand:[],
      listimg:globalStore.state.imgapi+'image/quanquanlist01.png',
      listmap:globalStore.state.imgapi+'image/listmaap.png',
      listTab:[{name:'推荐排序',tabstu:true},{name:'距您最近',tabstu:false},{name:'人气优先',tabstu:false}]
    }
  },

  components: {
 
  },

  methods: {
   
   //点击Tab切换
   changs(index){
     let that=this;
      for(var i=0;i<that.listTab.length;i++){
         that.listTab[i].tabstu=false;
         // console.log(that.listTab[i])
      }
      //设置为true
      that.listTab[index].tabstu=true;
   },
   tojump:function(brandId){
    wx.navigateTo({
        url:'../store/main?brandId='+brandId
      })
   }
  },

  onLoad(options){
    let that=this;
    wx.getSystemInfo({success:res=>{
         that.syswinth=res.windowWidth+'px';
         that.sysheight=res.windowHeight + 'px';
        }
    })
    wx.request({
      url: globalStore.state.api+'/api/index/getBrand',
      data: {
        catId:options.catId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.brand=res.data.brand
        console.log("=========");
        console.log(that.brand);
      }
    })
  }
}
</script>

<style scoped>
img{width: 100%;height: 100%;display: block;}
.shopcontainer{background: #fff;min-height:100vh;}
.shoptab ul{height:85rpx;display:flex;align-items: center;border-top: 1px solid #f5f5f5;border-bottom: 1px solid #f5f5f5; }
.shoptab li{width: 33.3%;padding-top: 15rpx;padding-bottom: 15rpx;}
.shoptab span{display: block;text-align: center;font-size: 32rpx;border-right: 2px solid #f5f5f5;color: #666;}
.shoptab .selects{color:#000;}

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

</style>
