<template>
  <div class="shopcontainer" >
    <!--  <div class="shoptab">
       <ul>
         <li v-for="(item,index) in listTab" :index='index' :key="item" @click="changs(index)"><span :class="{'selects':item.tabstu}">{{item.name}}</span></li>
         <li><span>推荐排序</span></li>
         <li><span>距您最近</span></li>
         <li><span>人气优先</span></li>
       </ul>
     </div> -->
     <!--shoptab end-->

     <div class="listwarp">
           <div class="List" @click="tojump(item.brandId)" v-for="(item,index) in brand" :key="key" :index="index">
            <div class="left">
              <img :src="item.logo">
            </div>
            <div class="right">
              <div class="title">{{item.name}}</div>
              <div class="map"><img :src="listmap"><span>{{item.address}}</span></div>
              <span class="care"v-if="item.juli<1000">{{item.juli}}m</span> 
              <span class="care"v-else>{{item.juli/1000}}km</span> 
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
      brandcopy:[],
      latitude:'',
      longitude:'',
      listimg:globalStore.state.imgapi+'image/quanquanlist01.png',
      listmap:globalStore.state.imgapi+'image/listmaap.png',
      listTab:[{name:'推荐排序',tabstu:true},{name:'距您最近',tabstu:false}]
    }
  },

  components: {
 
  },

  methods: {
   
   //点击Tab切换
   // changs(index){
   //   let that=this;
   //   console.log(that.brandcopy)
   //    for(var i=0;i<that.listTab.length;i++){
   //       that.listTab[i].tabstu=false;
   //       // console.log(that.listTab[i])
   //    }
   //    //设置为true
   //    that.listTab[index].tabstu=true;
   //    if(that.listTab[1].tabstu==true){
   //      for(var i=0;i<that.brand.length-1;i++){
   //      for(var j=i+1;j<that.brand.length;j++){
   //        if(that.brand[i].juli>that.brand[j].juli){
   //          var temp=that.brand[i];
   //          that.brand[i]=that.brand[j];
   //          that.brand[j]=temp;
   //        }
   //      }
   //    }
   //    console.log(that.brandcopy)
   //    }
   //    else if(that.listTab[0].tabstu==true){
        
   //    that.brand=that.brandcopy
   //    }
   // },
   tojump:function(brandId,juli){
    wx.navigateTo({
        url:'../store/main?brandId='+brandId
      })
   },
   getDistance: function (lat1, lng1, lat2, lng2) {
    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137;
    return parseInt(r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))) 
  }

  },

  onLoad(options){
    let that=this;
    wx.getSystemInfo({success:res=>{
         that.syswinth=res.windowWidth+'px';
         that.sysheight=res.windowHeight + 'px';
        }
    })
    wx.getLocation({
      success: function (res) {
        if (res != undefined && res != null) {
          let latitude=res.latitude;
          let longitude=res.longitude;
          wx.request({
            url: globalStore.state.api+'/api/index/getBrand',
            data: {
              catId:options.catId,
              adCode:that.globalData.citycode
            },
            header: {
             'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              for(var i in res.data.brand){
                res.data.brand[i].address=res.data.brand[i].url.split(',')[2]
                res.data.brand[i].juli=that.getDistance(latitude,longitude,res.data.brand[i].url.split(',')[0],res.data.brand[i].url.split(',')[1])
              }
              for(var i=0;i<res.data.brand.length-1;i++){
                for(var j=i+1;j<res.data.brand.length;j++){
                  if(res.data.brand[i].juli>res.data.brand[j].juli){
                    var temp=res.data.brand[i];
                    res.data.brand[i]=res.data.brand[j];
                    res.data.brand[j]=temp;
                  }
                }
              }
              // let brand=res.data.brand
              that.brand=res.data.brand
          }
        })
        }
      },
    })

  }
}
</script>

<style scoped>
img{width: 100%;height: 100%;display: block;}
.shopcontainer{background: #fff;min-height:100vh;}
.shoptab ul{height:85rpx;display:flex;align-items: center;border-top: 1px solid #f5f5f5;border-bottom: 1px solid #f5f5f5; justify-content: space-around;}
.shoptab li{padding-top: 15rpx;padding-bottom: 15rpx; flex-grow: 1;}
.shoptab span{display: block;text-align: center;font-size: 32rpx;border-right: 2px solid #f5f5f5;color: #666;}
.shoptab .selects{color:#000;}

/*List*/
.List{display: flex;padding:20rpx 20rpx 0; }
.title{font-size: 32rpx;padding-bottom: 6rpx;}
.left{width: 21%;margin-right: 3%;}
.left img{height: 150rpx;}
.map{display: flex;align-items: center;}
.right{width: 76%;border-bottom:1px solid #f6f6f6;}
.right img{width:28rpx;height: 36rpx;margin-right: 10rpx;}
.map span{color: #6f6f6f;font-size:28rpx}
.care{display: inline-block;padding-left: 15rpx;padding-right: 15rpx;height: 38rpx;line-height: 38rpx;background: #fe7d77;color: #fff;font-size: 26rpx;border-radius: 8rpx;}
.tip{padding-top: 30rpx;color: #6f6f6f;text-align: center;font-size: 34rpx;}

</style>
