<template>
  <div class="groupdetailContainer">
    <!-- 拼团详情 -->
    <div class="cantuan" >
  <!--图片  -->
      <div class='can-image'>
        <div class='red-box'>团购</div>
        <div class="goodimg">
          <image :src='pingtuandetail.img'></image>
        </div>      
      </div>
  <!-- 标题，价钱  -->
      <div class='can-tit'>
        <div class='can-title'>{{pingtuandetail.goodsName}}</div>
        <!--价钱-->
        <div class='price'>
          <div class='price-left'>
            <text class='money'>￥{{pingtuandetail.activityPrice}}</text>
            <text class='discount' style='text-decoration:line-through;'>￥{{pingtuandetail.price}}</text>
          </div>
         <block v-if="pingtuandetail.iscollage==0">
            <div class='price-right' style="color:#ccc">
              拼团失败
            </div>
          </block>
          <block v-if="pingtuandetail.iscollage==1">
            <div class='price-right' style="color:red}">
              拼团成功
            </div>
          </block>
          <block v-if="pingtuandetail.iscollage==2">
            <div class='price-right' style="color:#59d867}">
              等待拼团
            </div>
          </block>
        </div>
      </div>
  <!--标题end  -->
</div>
<div v-if="pingtuandetail.iscollage==2" class='writeping'>等待开团,仅剩<text class='number'>{{pingtuandetail.shortPerson}}</text>个名额</div>
<div class='phimg'>
  <div class='conel' v-for="(item,index) in collageSucceed" :index="index" :key="key">
    <image :src='item.face'></image>
    <block v-if="item.isStarter">
     <div class='noun'>团长</div> 
    </block>
  </div>  
</div>
<div class='Offered' v-if="pingtuandetail.iscollage==1||pingtuandetail.iscollage==0">
  <button class='btn'>再开一团</button>
</div>
<div class='Offered' v-if="pingtuandetail.iscollage==2">
  <button class='btn' open-type='share'>邀请好友参团</button>
</div>
<!-- <div class='Offered'>
  <button class='btn' @click="jumpindex">返回首页</button>
</div> -->
<!--拼团玩法 -->
<div class='paly'>
  <div class='paly-left'>
    <image :src='paly'></image>
    <text>拼团玩法?</text>
  </div>
  <div class='paly-right'>
    支付开团/参团>邀请参团>人满成团
  </div>
</div>
<!-- <div class="drawer_screen"  v-if="showModalStatus1"></div>
<div class="drawer_box" v-if="showModalStatus1">
  <div class='cular>
    <image src='/image/bi.png'></image>
  </div>
  <div class='headtop' v-for="(item,index) in collageSucceed":key="key" :index="index">
  <div class='pture'>
  <image :src='item.face'></image>
  <block v-if = "item.isStarter">
    <div class='tuan'>团长</div>
  </block>
  </div>
  <text class='open'>{{item.uname}}</text>
  <text class='open'>{{item.entertime}}参团</text>
  </div>
</div> -->
   <showbtn :lisbtn_s='lisbtn' :selectbtnbool_s='selectbtnbool'/>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";
import showbtn from '../../components/showBtn';
export default {
  data () {
    return {
      pingtuandetail:{},
      collageSucceed:[],
      lisbtn:[{btnname:'首页',btnimg:globalStore.state.imgapi +"/image/listbtn02.png",url:'../index/main'},
             {btnname:'我的',btnimg:globalStore.state.imgapi +"/image/listbtn03.png",url:'../my/main'},
             {btnname:'收藏',btnimg:globalStore.state.imgapi +"/image/listbtn01.png",url:'../collection/main'},
             {btnname:'充值',btnimg:globalStore.state.imgapi +"/image/listbtn04.png",url:'../quanchongzhi/main'},
     ],
     }
    },
  components: {
  showbtn
  },

  methods: {
    jumpindex:function(){
      wx.switchTab({
        url: '../index/main',
      })
    }
 
  },
   onShareAppMessage: function () {
    var that = this
    var fenxiangpingtuan = {}
    fenxiangpingtuan = that.pingtuandetail
    fenxiangpingtuan.memberId = that.memberId
    fenxiangpingtuan = JSON.stringify(fenxiangpingtuan)
    console.log(fenxiangpingtuan);
    return {
      path: '/pages/join/main?fenxiangpingtuan=' + fenxiangpingtuan,
    }
    },  
  onLoad(options){
     var that = this
    var pingtuandetail = JSON.parse(options.shops)
    console.log(pingtuandetail)
    var params = {}
    params.goodsId = pingtuandetail.goodsId
    params.memberCollageId = pingtuandetail.memberCollageId
    wx.request({
      url: globalStore.state.api + '/api/collage/collageSucceed',
      data: {
        "params": params
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
          that.collageSucceed=res.data.collageSucceed
          that.pingtuandetail=pingtuandetail
          that.memberId=wx.getStorageSync('memberId')
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    });
  }
}

  
</script>

<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.goodimg{
  width: 200rpx;
  height: 200rpx;
  overflow: hidden;
}
.writeping{
  height: 100rpx;
  text-align: center;
  width: 100%;
  line-height: 100rpx;
}
.number{
  color: red;
}
.cantuan{
  display: flex;
  justify-content:  flex-start;
  align-items: center;
  height: 300rpx;
  padding: 20rpx;
  background: #FFF;
  border-top:1px solid #DDD;
}
.can-image{
  height: 240rpx;
  width: 26%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.red-box{
  width: 80rpx;
  height:80rpx;
  background:#ff4546;
  border-radius: 50%;
  position: absolute;
  left:-8rpx;
  top: -15rpx;
  font-size: 14px;
  text-align: center;
  line-height: 80rpx;
  color: #fff;
}
/*产品介绍  */
.can-tit{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 220rpx;
}
.can-title{
  font-size: 14px;
  width: 82%;
  padding: 20rpx;
}
.nub-text{
  font-size: 12px;
  color: #b3b3b3;
  padding: 20rpx;
}
.nub-text text{
  margin-right: 20rpx;
}
/* 价钱 */
.price{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20rpx;
}
.money{
  color: red;
  font-size: 14px;
}
.price-right{
  font-size: 13px;
  color: red;
}
.discount{
  margin-left:8rpx;
  font-size:11px;
  color: #b3b3b3;
}
.fenxiang{
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFF;
  margin-left: 15rpx;
}
.fenxiang image{
  height: 30rpx;
  width: 30rpx;
  margin-right: 5rpx;
}
.fenxiang text{
  font-size: 13px;
  color: #b6b6b6;
}

/*正品保证  */

.genuine{
  border-top: 1px solid #DDD;
  background: #FFF;
  display: flex;
  height: 60rpx;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
}
.g1{
  display: flex;
  font-size: 12px;
  color: #6d6d6d;
  align-items: center;
}
.g1 image{
  height: 30rpx;
  width: 30rpx;
  margin-right: 8rpx;
}
/*等待开团  */

    /* 计时 */

      /* 参与人头像  */


/* 一键参团按钮 */
.Offered{
 width: 100%;
 height: 100rpx;
 display: flex;
 justify-content: center;
 align-items: center;
}
.btn{
  width: 80%;
  height: 84rpx;
  background: #F64F57;
  color: #fff;
  border-radius: 16rpx;
  line-height: 84rpx;
  text-align: center;
  font-size: 16px;
}
/*拼团玩法  */
.paly{
  padding: 20rpx;
  background: #fff;
  margin-top:1rpx;
 height: 40rpx;
display: flex;
justify-content: space-between;
align-items: center;
}
.paly-left{
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #F64F57;
}
.paly-left image{
  width: 30rpx;
  height: 30rpx;
  margin-right: 5rpx;
}
.paly-right{
font-size: 12px;
color: #6d6d6d;
}
/*新加样式  */
.phimg {
padding: 20rpx;
display: flex;
justify-content: center;
}
.phimg image{
width: 100rpx;
height: 100rpx;
margin-left: 30rpx;
border-radius: 50%;
}
.conel{
position: relative;
}
.noun{
width: 70rpx;
height:40rpx;
line-height: 40rpx;
text-align: center;
 background:#efb336;
 font-size: 10px;
 color: #fff;
 border-radius:46%;
 position: absolute;
 top: -8rpx;
 left:12rpx;
}
/*content*/  
.drawer_screen {  
  width: 100%;  
  height: 100%;  
  position: fixed;  
  top: 0;  
  left: 0;  
  z-index: 1000;  
  background: #000;  
  opacity: 0.5;  
  overflow: hidden;  
}  
/*content*/  
.drawer_box {  
  width: 80%;
  height:700rpx;   
  overflow: hidden;  
  position: fixed;
  background: #fff;  
  top: 22%;
  left: 10%;  
  z-index: 1001;  
   display: flex;
   flex-direction: column;
   align-items: center;
  border-radius:12rpx;
}  

.cular{
  width: 60rpx;
  height: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top:-4rpx;
  right:-4rpx;
}
.cular image{
  width:90%;
  height: 90%;
}
.headtop{
margin-top: 20rpx;
/* height:200rpx; */
display: flex;
flex-direction: column;
align-items: center;
}
.headtopbom{
width:100%;
background: #eee;
}
.pture{
position: relative;
}
.tuan{
width: 50rpx;
height: 32rpx;
line-height: 32rpx;
text-align: center;
background:#efb336;
font-size: 7px;
color: #fff;
border-radius:46%;
position: absolute;
top: -2rpx;
left:0rpx;
}
  
.pture image{
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.scul{
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
}
.scul image{
  width: 80rpx;
  height: 80rpx;
}
.muan{
  width: 145rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}
.open{
  font-size: 12px;
   color: #6d6d6d;
}
.join{
  color: #6d6d6d;
}


</style>
