<template>
  <div class='shanquanindex'>
    <swiper class="swiper_box" autoplay="true" interval="5000" duration="1000">    
      <swiper-item v-for="(item,index) in banner" :key="key" :index="index">
        <image :src="item.imageUrl" ></image>
      </swiper-item>
    </swiper>
    <!-- 菜单选项-->
    <div class='menu'>
      <div class='df nav'>
        <div class='df_1'  v-for="(item,index) in menus" :key="key" :index="index" @click="jump(index,item.catId)">
          <image :src='item.image'></image>
          {{item.name}}
        </div>
      </div>
    </div>
    <div class='membeintro'>
      <image src='https://shop.guqinet.com/html/images/shanquan/memintro.jpg'></image>
    </div>
    <div class='membeintrodetail' v-if="apiLimit.length!=0">
      <div class='membeintrodetailtitle'>限时商品</div>
      <div class='membeintrodetailcontent'>
        <div v-for="(item,index) in apiLimit" :index="index" :key="key" class="membeintrodetaillist" @click="jumpLimit(index)">
          <div class="groupImg">
            <image :src="item.goodsDO.thumbnail"></image>
          </div>
          <div class="groupDetail"><span>活动价</span><span class="nowprice">￥{{item.finalAmount}}</span></div>
          <div class="oldprice">￥{{item.goodsPrice}}</div>
        </div>
      </div>
    </div>
    <div class='membeintrodetail' v-if="pingtuanList.length!=0">
      <div class='membeintrodetailtitle'>商圈拼团</div>
      <div class='membeintrodetailcontent'>
       <div v-for="(item,index) in pingtuanList" :index="index" :key="key" class="membeintrodetaillist" @click="jumpgroup(item.goodsId,item.collageGoodsId)">
        <div class="groupImg">
          <image :src="item.thumbnail"></image>
        </div>
        <div class="groupDetail"><span>{{item.collagePersons}}人团</span><span class="nowprice">￥{{item.activityPrice}}</span></div>
        <div class="oldprice">￥{{item.goodsPrice}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import globalStore from '../../stores/global-store';

export default {
  data () {
    return {
    banner:[],
    menus: [],
    indicatorDots: false,  //显示面板指示点
    autoplay: true,     //自动切换
    interval: 5000,    //自动切换时间间隔
    duration: 1000,    //滑动动画时长
    apiLimit:[],
    pingtuanList:[]
    }
  },
  components: {

  },

  methods: {
    jump:function(index,catId){
      var that=this;
      if(index==0){
        wx.navigateTo({
        url:'../shoplist/main?catId='+catId
      })
      } 
    },
   //获取初始数据后期更改(暂时数据)
   getCode(callback){
     let that=this;
     wx.login({
       success:function(res){
         if(res.code){
          wx.request({
            url: globalStore.state.api+'/api/byCode',
            data: {
              code:res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              console.log(res.data)
              //根据code获取回调后的数据
              if(res.data.memberDo!=null){
                wx.setStorageSync('memberId',res.data.memberDo.memberId)//创建缓存数据
                let memberId=res.data.memberDo.memberId
                callback(memberId)
                console.log(memberId)
              }else{
                let memberId="00";
                wx.setStorageSync('memberId', "00")//创建缓存数据
                callback(memberId)
              }
            }
          })//request end
         }
        
       }
     })//longin end
   },
    //获取code
  getMermberId(memberId){
    var parms = {}
    parms.memberId = memberId
    wx.request({
      url: globalStore.state.api +'/api/member/memberIndex',
      // url: 'http://192.168.2.131:8080/mall/api/member/memberIndex', 
      // url: 'http://192.168.2.131/mall/api/member/memberIndex',
      data: {
        parms: parms
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.setStorageSync('point', res.data.memberDO.point)
          wx.setStorageSync('memberIdlvId', res.data.memberDO.lvId)
          wx.setStorageSync('isAgent', res.data.memberDO.isAgent)
          wx.setStorageSync('name', res.data.memberDO.name)
          wx.setStorageSync('face', res.data.memberDO.face)
          wx.setStorageSync('openId', res.data.memberDO.openId)
        }
      }
    })   
  },
  getactive(){
    var that=this;
      wx.request({
        url: globalStore.state.api  + '/api/activity/limit',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          // 拼团活动没有添加商品 
          var limitActive=[];
          for(var i=0;i<res.data.apiLimit.length;i++){
            limitActive=limitActive.concat(res.data.apiLimit[i].apilimitGoods)
          }
          that.apiLimit=limitActive,
          that.limitActive=res.data.apiLimit
          console.log(that.apiLimit)
        }
      });
      wx.request({
        url:  globalStore.state.api + '/api/collage/collageGoodsList',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {    
          that.pingtuanList=res.data
          console.log(that.pingtuanList)
        }
      });
  },
  userLogin:function(){ 
    var that = this
    that.getCode(function (memberId) {
      that.getMermberId(memberId)
      that.memberId=memberId
    })
  },
   jumpgroup:function(goodsId,collageGoodsId){
    wx.navigateTo({
      url: '../collagedetails/main?collageGoodsId=' + collageGoodsId + '&goodsId=' +goodsId,
    })
   }, 
  jumpLimit:function(indx){
    var that=this;
    let xianshi = that.apiLimit[indx]
    var xianshidetail = {}
    for(var i=0;i<that.limitActive.length;i++){
      if (that.limitActive[i].limitId == xianshi.limitId){
        xianshidetail.endtime = that.limitActive[i].endtime
        xianshidetail.perTotal = that.limitActive[i].perTotal
      }
    }
    xianshidetail.finalAmount = xianshi.finalAmount
    xianshidetail.goodsPrice = xianshi.goodsPrice
    xianshidetail.goodsId = xianshi.goodsId
    xianshidetail.limitId = xianshi.limitId  
    if (xianshidetail.endtime<(new Date()).valueOf()){
      wx.showToast({
        title: '该活动已结束',
      });
    }
    else{
     wx.navigateTo({
      url: '../zhekouinfo/main?xianshidetail=' + JSON.stringify( xianshidetail)
      }) 
    }
    },
      // 获得商品详情
  getMain:function(){
    // 获取商品详情
    var that = this;
    wx.request({
      url: globalStore.state.api + '/api/index/main',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.menus= res.data.data.menus;
        that.banner=res.data.data.imgurl
        // that.data= res.data.data;
        // wx.setStorageSync('indexdata', res.data.data.message, )
        // 判断是否注册过
      },
      fail: function () {
        wx.showToast({
          title: '网络异常',
        })
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      }
    })
  },
  },
  onLoad(){ 
   this.userLogin();
   this.getactive();
   this.getMain();
  }
}
</script>

<style scoped>
/* pages/shanquanindex/shanquanindex.wxss */
image{
width:100%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
}
.shanquanindex{
  background: #fff;
  min-height: 100vh;
  padding: 10rpx;
  box-sizing: border-box;
}
/* 轮播 */
.swiper_box{
  width:100%;
  height:200px;
  box-shadow: 0px 10rpx #fdfdfd;
}

/* 菜单选项 */
.menu{
  display:block;
  box-shadow: 0px 5rpx #f1f1f1;
  margin-top: 10rpx;
  background: #fff;
}
.nav{
  background: #fff;
  padding: 10px 0;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex; 
  text-align: center;
  font-size: 28rpx;
  color: #666;

}
.nav image{
  width: 90rpx;
  height: 90rpx;
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 5px;
  border-radius: 15px;
}
.df{
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
   flex-wrap: wrap;
}
.df_1{
  width: 25%;
  height: 146rpx;
  -webkit-tap-highlight-color: transparent;
}
/* 会员介绍 */
.membeintro{
  width: 100%;
  height: 34.8vw;
  box-shadow: 0px 5rpx #f1f1f1;
  margin-top: 10rpx;
}
.membeintrodetail{
  box-shadow: 0px 5rpx #f1f1f1;
  margin: 10rpx;
}
.membeintrodetailtitle{
  height: 80rpx;
  line-height: 80rpx;
  font-size: 26rpx;
}
.membeintrodetailcontent{
  width:100%;
  overflow: scroll;
  white-space:nowrap;
 
  font-size: 0.8em;
}
.groupImg{
  width: 200rpx;
  height: 200rpx;
  display: inline-block;
}
.membeintrodetaillist{
  width: 200rpx;
}
.groupDetail{
 text-align: center;
}
.oldprice{
  text-align: center;
  text-decoration: line-through;
  color:#ccc;
}
.nowprice{
  color: #F64F57;
}
</style>
