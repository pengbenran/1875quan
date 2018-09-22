<template>
  <div class="search">
    <div class="searchwarp">
      <div class="searchleft">
        <div class="leftwarp">
            <icon type="search" size="20" color='#fff'/>
            <input type="text" placeholder="商品名称" @input="serarchkey" placeholder-style='#fff'/>
        </div>
      </div>
      <div class="searchright">
        <span @click="sousuobtn">搜索</span>
      </div>
    </div>
    <!--searchwarp end-->
    
    <div class="listmenu">
      <div class="menttitle">
        <span>热门搜索</span> <span @click="taps">换一批</span>
      </div>
     <div class="menu">
       <span v-for="(item,index) in random" :index='index' :key='key'  @click="tojump(item.brandId)">{{item.name}}</span>
     </div>
    </div>
    <!--listmenu end-->

    <div class="list">
      <div class="title">搜索列表</div>
      <div class="listwarp">
            <ul class="smlistUl" v-if="hide">
                <li v-for="(item,itemindex) in goodsList" :key='item' :index='itemindex' @click="toshopinfo(item.goodsId,item.catId)">

                    <div class="smlistimg"><image :src="item.thumbnail"></image></div>
                    <div class="smlistinfo">
                        <div class="infotitle">{{item.name}}</div>
                        <div class="smlistpri">
                          <small>￥{{item.price}} </small><small class="smallLeft">....</small>
                        </div>
                    </div>
                </li>
                <!--template内以上为动态代码 以下均可删除-->
            </ul>
            <div v-else class="kongtip">
              <span>搜索是空的哦~</span>
            </div>
      </div>
    </div>
 
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";
import globaltime from '../../utils/index';

export default {
  data () {
    return {
      random:[],
      hide:true,
      serarchkey:'',
      goodsList:[]
     }
  },

  components: {

  },

  methods: {
    tojump:function(brandId){
    wx.navigateTo({
        url:'../store/main?brandId='+brandId
      })
   },
    toshopinfo:function(goodsId,catId){
      let that=this;
      wx.navigateTo({ url: '../shumainfo/main?goodsId='+goodsId+'&catid='+catId });
    },
    taps:function(){
          var that = this;
          wx.request({
            url: globalStore.state.api + "/api/brand/randomList",
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                that.random=res.data.random;
               // that.goodsList=res.data.goodsList;
                that.code=res.data.code;
            },
            fail: function (e) {
              // wx.showToast({
              //   title: '网络异常！',
              //   duration: 2000
              // });
            },
          })
    },
    serarchkey:function(e){
     console.log(e.mp.detail.value);
     this.serarchkey=e.mp.detail.value;
    },
    sousuobtn:function(){
          var that = this;
          var parms = {}
          var hide = that.hide
          parms.condition = that.serarchkey
          wx.request({
            url: globalStore.state.api + '/api/Goods/selectIndexGoods',
            data: {
              parms: parms
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.code == "1") {
                hide = false
              }else if(res.data.code=="0") {
                hide = true
              }
              if (res.data.goodsList.length == 0) {
                hide = false
              }else{
                hide=true
              }
                that.goodsList=res.data.goodsList;
                that.code=res.data.code;
                that.hide=hide;
            },
            fail: function (e) {
              // wx.showToast({
              //   title: '网络异常！',
              //   duration: 2000
              // });
            },
          })
    }
   
  
   },

   onLoad(options){
    var that = this;
      wx.request({
        url: globalStore.state.api +"/api/brand/getSearchList",
        header: {
          'Content-Type':  'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if(res.data.code!=1){
            that.random=res.data.random
          }
          else{

          }
          console.log("===========")
          console.log(that.random);
        },
        fail:function(e){
          // wx.showToast({
          //   title: '网络异常！',
          //   duration: 2000
          // });
        },
      })
  } 
}
</script>

<style scoped>
image{width: 100%;height: 100%;display: block;}

.search{background: #fff;min-height: 100vh;}
.searchwarp{display: flex;justify-content: center;justify-content: center;padding-top: 20rpx;padding-bottom: 20rpx;border-bottom: 1px solid #f3f3f3;}
.searchwarp .searchleft{width: 80%;}
.searchwarp .searchright{width: 20%;}
.leftwarp{display: flex;background: #f3f3f3;display:flex;align-items: center;width: 90%;margin: 0 auto;border-radius: 30rpx;padding-left: 20rpx;}
.leftwarp input{font-size: 30rpx;}
.leftwarp icon{margin-right: 10rpx;}
.searchright{display: flex;}

.searchright span{display: inline-block;line-height: 50rpx;border-radius: 8rpx;padding-left: 16rpx;padding-right: 16rpx;background:#F64F57;color: #fff;font-size: 32rpx;}

.listmenu{padding:10rpx 20rpx;}
.menttitle{display: flex;justify-content: space-between;align-items: center;}
.menttitle span:nth-child(1){color: #666;font-size: 32rpx;}
.menttitle span:nth-child(2){color: #F64F57;font-size: 28rpx;}
.listmenu .menu {padding-top: 20rpx;display: flex;flex-wrap: wrap;}
.listmenu .menu span{font-size: 30rpx;margin: 10rpx 20rpx;background: #f3f3f3;border-radius: 8rpx;padding:8rpx 22rpx;color: #666;}

.smlistUl{display: flex;flex-wrap: wrap;}
.smlistUl li{width: 48.6%;border-bottom: 10rpx solid #f2f2f2;}
.smlistUl li:nth-child(1){border-right: 10rpx solid #f2f2f2;}
.smlistUl li:nth-child(2n){border-left: 10rpx solid #f2f2f2;}
.smlistUl li:nth-child(3n){border-right: 10rpx solid #f2f2f2;}
.smlistimg{height:360rpx;}
.smlistpri{display: flex;align-items: center;justify-content: space-between;margin-top: 20rpx;} 
.smlistinfo{padding-left: 15rpx;padding-right: 15rpx;padding-bottom: 20rpx;background: #fff;}
.infotitle{font-size: 26rpx;}
.smlistinfo small{margin-right: 15rpx;font-size: 28rpx;color:red;}
.smlistinfo label{color:#666;font-size: 22rpx;}
.smlistinfo .smallLeft{color:#666;width: 30rpx;letter-spacing: 1rpx;}

.list{padding-top: 25rpx;font-size: 36rpx;}
.list .title{padding-left: 20rpx;}
.kongtip{text-align: center;}
.kongtip span{font-size: 34rpx;}
</style>
