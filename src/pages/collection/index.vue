<template>
  <div class="orderinfoContainer">
   <div class='collect-head' v-if="FavoriteList.length!=0">
    <div class='head-left'>
      共收藏<text class='mub-text'>{{FavoriteList.length}}个</text>宝贝 
    </div>
    <div class='head-right'>
      <text @click='changeMode'>管理</text>
    </div>
  </div>
  <div class="spell-down"  v-for="(item,index) in FavoriteList">
      <div class="spell-left">
        <div class='spellimg'>
        <image :src="item.goodsDO.thumbnail" ></image>
      </div>  
      <div class='spot'>收藏</div>
    </div>
    <div class="spell-right">
      <div class="spell-top">
        <text class='name'>{{item.goodsDO.name}}</text>
      </div>
      <div class=" spell-bottom">
        <div class="spe-left">
          <text class=" spetext-one">￥{{item.goodsDO.price}}</text>
          <!-- <text class=" spetext-two">￥{{item.goodsPrice}}</text> -->
        </div>
        <!-- <div class="spell-btn" >
          <image src='https://shop.yogain.cn/simages/image/treeyiqi/tuan.png'></image>
        </div> -->
      </div>
    </div>
    <div class="spellRightIcon"  v-if="inEditMode">
      <icon v-if="item.selected" type="success" color="red" size="21"  class="cart-pro-select" @click="selectList(index)" />
      <icon v-if="!item.selected" type="circle"  @click="selectList(index)" />
    </div>
  </div>
  <div class="footers" v-if="inEditMode">
    <div class="cart-foot">
      <div class="foot-left">
        <icon v-if="selectAllStatus" type="success" color="red" size="21"  class="cart-pro-select" @click="selectAll" />
        <icon v-if="!selectAllStatus" type="circle" color="#DDD" @click="selectAll" />
        <text>全选</text>
      </div>
      <div class="foot-right" @click='deled'>
        <text>删除</text>
      </div>
    </div>
  </div>
  <div class="ordercontentno" v-if="!haslist">
      <image :src="nothingimg"></image>  
  </div>
</div>
</template>

<script>
import globalStore from "../../stores/global-store"
export default {
  data () {
    return {
     FavoriteList: [],
     haslist:true,
     inEditMode:false,
     selectAllStatus: false ,
     nothingimg:globalStore.state.imgapi+'image/nothing.png',
     }
  },

  components: {

  },

  methods: {
   changeMode:function(){
    var that=this;
    that.inEditMode=!that.inEditMode
   },
   selectList:function(e){
    var that=this
    that.FavoriteList[e].selected=!that.FavoriteList[e].selected
    console.log(that.FavoriteList[e].selected)
   },
   selectAll:function(){
    var that=this;
    var selected = that.selected
    that.selectAllStatus=!that.selectAllStatus;
    for (let i = 0; i < that.FavoriteList.length; i++) {
      that.FavoriteList[i].selected = that.selectAllStatus;
    }
   },
   deled:function(){
    var that=this
    wx.showLoading({
      title:'正在删除',
      icon:'loading'
    })
    var parms = {}
    var favdel = []
    for (let i = 0; i < that.FavoriteList.length; i++) {         // 循环列表得到每个数据
      if (that.FavoriteList[i].selected) {                     // 判断选中
        favdel.push(that.FavoriteList[i].favoriteId)
      }
    }
    parms.favoriteIds = favdel
    parms = JSON.stringify(parms)
    wx.request({
      url: globalStore.state.api + '/api/favorite/deletelist',
      data: {
        "parms": parms
      },
      method: "POST",
      header: {

        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        if(res.data.code==0){
         that.getshoucang();
        }   
      }

    })
   },
   getshoucang:function(){
    var that = this
    var parms = {}
    parms.memberId = wx.getStorageSync('memberId')
    wx.request({
      url:globalStore.state.api + '/api/favorite/get',
      data: {
        "parms": parms
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {  
        wx.hideLoading()  
       if(res.data.code==0){
         for(var i=0;i<res.data.FavoriteList.length;i++){
          res.data.FavoriteList[i].selected=false
         }
         that.FavoriteList=res.data.FavoriteList
         that.haslist=true
       } 
       else{
        that.haslist=false
       } 
      }
      
    })
   }
   },
   onLoad(options){
    wx.showLoading({
      title:'加载中'
    })
    var that=this;
    that.getshoucang();
  }
}
</script>
<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.spellRightIcon{
  width: 70rpx;
}
.collect-head{
height:40rpx;
background: #fff;
border-top: 1rpx solid #eee;
padding: 20rpx;
display: flex;
justify-content: space-between;
align-items: center;
font-size: 15px;
color: #9e9e9e;
}
.mub-text{
  color: #F64F57;
}
.ordercontentno{
  width: 400rpx;
  height: 400rpx;
  margin: 100rpx auto;
  margin-bottom: 0rpx;
}
.ordertip{
  margin-top: 20rpx;
  text-align: center;
  color:#8A8890;
}

.spell-down{
  background: #fff;
  height: 300rpx;
  display: flex;
  margin-top: 15rpx;
  align-items: center;
}
.spell-img{
  width: 100%;
  height: 300rpx;
  
}
.spell-left{
display: flex;
justify-content: center;
align-items: center;
width:300rpx;
position: relative;
height: 300rpx;
}
.spellimg {
  width: 100%;
  height: 100%;
}
.spot{
  width: 88rpx;
  height: 88rpx;
  background: #ff4546;
  color: #fff;
  border-radius: 50%;
  font-size: 28rpx;
  text-align: center;
  line-height: 88rpx;
  position: absolute;
  left: 4rpx;
  top: 10rpx;
}
.spell-right{
 /* padding: 30rpx 0; */
 display: flex;
 flex-direction: column;
 flex: 1;
 justify-content: space-around;
 height: 228rpx;
}
.spell-top{
  width: 80%;
  height: 100rpx;
  font-size: 34rpx;
}
.name{
   display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
}
.spell-conten{
  width: 30%;
  font-size: 30rpx;
  color: #2f96fd;
}
.spell-bottom{
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.spetext-one{
 font-size: 34rpx;
 color: red;
}
.spetext-two{
  margin-left:10rpx;
  font-size: 30rpx;
  color: #ccc;
  text-decoration:line-through;
}
.spell-btn{
  width:28%;
  height:52rpx;
  margin-right: 20rpx;
}
.spell-btn image{
  width: 100%;
  height: 92%;
}
.spe-left{
 width:64%;
}
.footers{
  position: fixed;
  bottom: 0;
  width: 100%;
}
.cart-foot{
  display: flex;
 height: 100rpx;

}
.foot-left{
  width: 65%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20rpx;
  color: #000;
  font-size: 14px;
}
.quanxuan{
  width: 50rpx;
  height: 50rpx;
}
.foot-right{
  width: 45%;
  height: 100%;
  background: #ff4f4f;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30rpx;
}
</style>
