<template>
  <div class="orderinfoContainer">
   <div class="cantuan">
    <!--图片  -->
    <div class='can-image'>
      <div class='red-box'>团购</div>
      <image :src='joinData.img'></image>
    </div>
    <!-- 标题，价钱  -->
    <div class='can-tit'>
      <text class='can-title'>{{joinData.goodsName}}</text>
      <!--价钱  -->
      <div class='price'>
       <text class='money'>￥{{joinData.activityPrice}}</text>
     </div>
   </div>
   <!--标题end  -->
 </div>
 <!--介绍end  -->

 <!--等待开团  -->
 <div class='wait'>
  <div class='wait-tit'  v-if="canJoin">
    <image class='watch' :src='watch'></image>
    <text>仅剩<text class='number'>{{joinData.shortPerson}}</text>个名额，剩余{{countDownHour}}时{{countDownMinute}}分{{countDownSecond}}秒结束</text>
  </div>
  <div class='head-img'  v-if="canJoin">
    <div class='box-img'>
     <image class='headimg01' :src='collageSucceed.face'></image>
     <div class='noun'>团长</div> 
   </div>
 </div>

 <!--按钮 -->
 <div class='Offered' v-if="canJoin">
  <button class='btns'  @click='sModal'>参与活动</button>
</div>
<div class='Offered' v-if="!canJoin">
  <button class='btns' @click='kaituan'>我要开团</button>
</div>
</div>
<!--规格  -->
<!--立即购买模态框  -->
<div class="commodity_screen" @click="hModal" v-if="sModalStatus"></div>
<div class="commodity_attr_box" v-if="sModalStatus" :animation="animationData">
  <div class='commodity-box'>
    <div class='commodity-box1'>
      <div class='com-box1-left'>
        <image :src='joinData.img'></image>
      </div>
      <div class='com-box1-right'>
        <div class='box1-right-top'>
          <text>{{joinData.goodsName}}</text>
          <div class='cha-img'>
            <image :src='xximg'></image>
          </div>
        </div>
        <div class='cha-btm'>
          <text class='money-red'>￥{{joinData.activityPrice}}</text>
        </div>
      </div>
    </div>
    <div class='commodity-box3'>
      <text>购买数量：</text>
      <div class='btn'>
        <div id='del1' type="default" @click='minusCount'>-</div>
        <input type="number" v-model="buynum"></input>
        <div id='add1' type='defalut' @click='addCount'>+</div>
      </div>
    </div>
  </div>
  <!-- <div class='commodity-box5'>下一步</div>  -->
  <div class='commodity-box6'>
    <div class='com-box6' @click='next' style='width:100%'>
      点击购买
    </div>
  </div>
</div>
<!-- 模态框结束 -->
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


  </div>
</template>

<script>
import globalStore from "../../stores/global-store"
export default {
  data () {
    return {
    joinData:{},
    countDownDay:'',
    countDownHour:'',
    countDownMinute:'',
    countDownSecond:'',
    canJoin: false,
    hidden: false,
    collageSucceed:[],
    sModalStatus:false,
    buynum:1,
    joinmemberId:''
   }
  },

  components: {

  },

  methods: {
    addCount(e) {
      var that=this;
      that.buynum++
    },
  /**
     * 绑定减数量事件
     */
  minusCount(e) {
   var that=this;
    if (that.buynum <= 1) {
      that.buynum=1
    }
    else{
      that.buynum--;
    }
  },

    next: function (e) {
    var that=this
    wx.setStorageSync('memberId', that.joinmemberId )
    wx.navigateTo({
      url: "../dingdan2/main?pic=" + that.buynum + '&goodsId=' + that.joinData.goodsId + '&price=' + that.joinData.activityPrice + '&memberCollageId=' + that.joinData.memberCollageId + '&Type=C',
       }) 
   },
    hModal: function () {
    // 隐藏遮罩层
    var that=this
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateY(300).step()
    that.animationData= animation.export(),
    setTimeout(function () {
      animation.translateY(0).step()
        that.animationData= animation.export(),
        that.sModalStatus= false
      },100)
    },
    kaituan:function(){
      wx.switchTab({
        url:'../index/main'
      })
    },
    //立即购买模态框
    sModal: function () {
     var that=this;
    // 显示遮罩层
    if (that.joinmemberId == that.joinData.memberId) {
      wx.showModal({
        title: '提示',
        content: '你不能参加自己的团哦!',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../index/main',
            })   
          } else if (res.cancel) {

          }
        }
      })
    }
    else if(that.isOk==false){
      wx.showToast({
        title: "活动已过期！",
        icon: "success",
        durantion: 2000
      })
    }
    else{
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      that.animation = animation
      animation.translateY(300).step()
      that.animationData=animation.export(),
      that.sModalStatus=true    
      setTimeout(function () {
        animation.translateY(0).step()  
        that.animationData=animation.export()    
      },100)
    }   
    }
   },
   onLoad(options){
    var that=this;
    var fenxiangpingtuan = JSON.parse(options.fenxiangpingtuan)
    that.joinData=fenxiangpingtuan
    wx.login({
      success: function(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: globalStore.state.api + '/api/byCode',
            data: {
              code: res.code
            },
            success: function (res) {
             if (res.data.memberDo == null) {
                wx.showModal({
                  title: '提示',
                  content: '您还未登录，请先登录',
                  showCancel:false,
                  success: function (res) { 
                    wx.switchTab({
                      url: '../my/my',
                    })
                  }
                })
                
              }
              else{
               that.joinmemberId=res.data.memberDo.memberId
               
               var params = {}
               params.memberCollageId = that.joinData.memberCollageId
               wx.request({
                 url: globalStore.state.api + '/api/collage/friendCollage',
                 data: {
                   params: params
                 },
                 success: function (res) {
                   if(res.data.code==0){
                    //  说明拼团未成功可以参加拼团
                     var collageparams = {}
                     collageparams.goodsId = that.joinData.goodsId
                     collageparams.memberCollageId = that.joinData.memberCollageId
                      wx.request({
                        url: globalStore.state.api  + '/api/collage/collageSucceed',
                        data: {
                          params: collageparams
                        },
                        header: {
                          'Content-Type': 'application/json'
                        },
                        success: function (res) {     
                          var timestamp2 = (new Date()).valueOf();
                          var leftTime = (res.data.collageSucceed[0].entertime + 86400000) - timestamp2;
                          if (leftTime >= 0) {
                            var interval = setInterval(function () {
                              var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
                              var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
                              var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
                              var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
                              leftTime = leftTime - 1000;  
                                that.countDownDay=days;
                                that.countDownHour=hours;
                                that.countDownMinute=minutes;
                                that.countDownSecond=seconds;
                            
                            }, 1000)
                            if (leftTime <= 0) {
                              clearinterval(interval)
                            } 
                            that.collageSucceed=res.data.collageSucceed[0];
                            that.isOk=true;
                            that.canJoin= true;
                           
                          }else{
                            wx.showToast({
                              title: "活动已过期！",
                              icon: "success",
                              durantion: 2000
                            })
                              that.canJoin=false
                              that.collageSucceed=res.data.collageSucceed[0]
                              that.isOk=false
                          
                          }
                         
                        }
                      });
                   }
                   else{
                     wx.showToast({
                       title: "团人数已满！",
                       icon: "success",
                       durantion: 2000
                     })
                    
                      taht.canJoin=false
                     
                   }
                 }
               });

              }
            }
          })
        }
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

/*选模态框css */
.commodity_screen {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.2;
  overflow: if;
  z-index: 1000;
  color: #fff;
}
.commodity_attr_box {
  width: 100%;
  overflow: if;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background: #fff;
}
.commodity-box{
  padding: 20rpx;
}
.commodity-box1{
 height:180rpx;
 display: flex;
 font-size:32rpx;
}

.commodity-box3{
height:120rpx;
border-bottom: 1rpx solid #eee;
display: flex;
align-items: center;
justify-content: space-between;
font-size: 32rpx;
}


.commodity-box6{
display: flex;
font-size: 33rpx;
}
.com-box6{
width: 50%;
height: 110rpx;
background: #ff4f4f;
text-align: center;
line-height: 100rpx; 
color: #fff;
}

.com-box1-left{
  width: 150rpx;
  height: 150rpx;
}

.com-box1-right{
 width: 75%; 
 margin-left: 20rpx;
 border-bottom: 1rpx solid #eee;
 display: flex;
 flex-direction: column;
 justify-content: space-around;
}
.box1-right-top{
  display: flex;
 justify-content: space-between;
  /* height:75rpx; */
}
.box1-right-top text{
  width:70%;
  
  display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: if;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
}
.cha-img{
 width: 50rpx;
 height: 50rpx;
}
.cha-btm{
  display: flex;
  justify-content: space-between;
}
.gray{
 color: #5b5b5b;
 padding-right: 20rpx;
 font-size: 32rpx;
}
.cha-img image{
 width: 50rpx;
 height: 50rpx;
}
.money-red{
  color: red;
  font-size:32rpx;
}

/* 规格被选中 */
.active{
  color:#fff;
  background: #3394ff;
}

.btn{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.btn input{
margin:0;
width:30px;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
border-top:1px solid #eee;
border-bottom:1px solid #eee;
font-size:15px;
height:50rpx;
min-height: 40rpx;
color: #000;
}
#del1{
   display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  height:50rpx;
  width:55rpx;
  border: 1px solid #DDD;
  font-size:18px;
}
#add1{
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 45%;
  border-top-right-radius: 45%;
  height:50rpx;
  width:55rpx;
  border: 1px solid #DDD;
  font-size:18px;
}

/*  */



.cantuan{
  display: flex;
  position: relative;
  justify-content:  flex-start;
  align-items: center;
  height: 300rpx;
  padding: 20rpx;
  background: #FFF;
  border-top:1px solid #DDD;
}
.can-image{
  height: 240rpx;
}
.can-image image{
  width: 240rpx;
  height: 240rpx;
  padding: 20rpx;
  box-sizing: border-box;
  display: inline-block;
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
  height: 218rpx;
  justify-content: space-between;
}
.can-title{
  font-size: 15px;
  /* width: 82%; */
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
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: center; */
  padding-left: 20rpx;
}
.money{
  color: red;
  font-size: 14px;
}

.discount{
  margin-left: 12rpx;
  font-size: 13px;
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
.wait{
  height: 400rpx;
  margin-top: 22rpx;
  background: #FFF;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20rpx;
}
.wait-tit{
  height: 50rpx;
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
}
.watch{
  height: 34rpx;
  width: 34rpx;
  margin-right: 10rpx;
}
.wait-tit text{
  font-size: 16px;
}
.number{
  color: red;
}

    /* 计时 */

.time{
  display: flex;
  justify-content: center;
  align-items: center;
}

.end{
  font-size: 12px;
  color: #b3b3b3;
  margin-right: 15rpx;
}
.countDownTimeView{
  display: flex;
  height:50rpx;
   font-size:14px;
   line-height: 48rpx;
}
.countDownTimeView text{
  margin-left: 5rpx;
  margin-right: 5rpx;
}
.voteText{
color:#FFF;
background:#000;
height:40rpx;
width:40rpx;
border-radius:3px;
font-size:13px;
line-height:46rpx;
text-align:center;

}

      /* 参与人头像  */

.head-img{
   width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cular{
  height:86rpx;
  width: 86rpx;
  border-radius: 50px;
  border: 1px dashed #ccc;
  text-align: center;
  line-height: 84rpx;
  color: #ccc;
  margin-left: 20rpx;
}
.box-img{
  /* width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center; */
  display: flex;
  position: relative;
}
.box-img image{
  height:86rpx;
  width: 86rpx;
  border-radius: 50px;
  border: 1px solid #FFF;
}
.headimg01{
  /* position:relative; */
  /* right: 470rpx; */
}
.headimg02{
  position: absolute;
  right: 420rpx;
}
.headimg03{
  position: absolute;
  right: 370rpx;
}
.headimg04{
  position: absolute;
  right: 320rpx;
}
.headimg05{
  position: absolute;
  right: 270rpx;
}
.dian{
  width:46rpx;
  height: 10rpx;
}
/* 一键参团按钮 */
.Offered{
 width: 100%;
 height: 100rpx;
 display: flex;
 justify-content: center;
 align-items: center;
}
.btns{
  width: 80%;
  height: 84rpx;
  background: red;
  color: #fff;
  border-radius: 10rpx;
  line-height: 84rpx;
  text-align: center;
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
  color: #27b5fd;
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
 top: -7rpx;
 left:-12rpx;
}
</style>
