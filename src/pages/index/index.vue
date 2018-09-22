<template>
  <div class='shanquanindex'>
   
  <div class="search" @click="tosearch">
     <icon type="search" size="20" color='#fff'/>
     <span>搜索商品</span>
  </div>
 

    <swiper class="swiper_box" autoplay="true" interval="5000" duration="1000" indicator-dots='true' :style="{width:imageWidth,height:imageHeigth}">    
      <swiper-item v-for="(item,index) in banner" :key="key" :index="index" @click="tojump(item.houseId)">
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
    <div class='membeintro' @click="ruzhu">
      <image :src='guanggaowei'></image>
    </div>

    <div class="gonggao">
      <div class="left"><img :src="gonggao"/></div>
      <div class="right">
        <swiper duration='1000' autoplay='true' interval='3000' vertical='true'>
           <swiper-item v-for="(item,index) in indexNotice" :key="key" :index="index">
              <div>{{item.title}}</div>
           </swiper-item>
        </swiper>
      </div>
    </div>
    <!--gonggao end-->

    <div class='membeintrodetail' v-if="apiLimit.length!=0">
      <div class='membeintrodetailtitle'><image :src='shizong'></image> 限时商品</div>
      <div class='membeintrodetailcontent homexianshi'>
        <div v-for="(item,index) in apiLimit" :index="index" :key="key" class="membeintrodetaillist" @click="jumpLimit(index)">
          <div class="groupImg">
            <image :src="item.goodsDO.thumbnail"></image>
          </div>
          <div class="groupDetail"><span class="groupcase">活动价</span><span class="nowprice">￥{{item.finalAmount}}</span></div>
          <div class="oldprice">￥{{item.goodsPrice}}</div>
        </div>
      </div>
    </div>
    <div class='membeintrodetail' v-if="pingtuanList.length!=0">
      <div class='membeintrodetailtitle popile'><image :src='shangquan'></image> 商圈拼团</div>
      <div class='membeintrodetailcontent'>
       <div v-for="(item,index) in pingtuanList" :index="index" :key="key" class="membeintrodetaillist" @click="jumpgroup(item.goodsId,item.collageGoodsId)">
        <div class="groupImg">
          <image :src="item.thumbnail"></image>
        </div>
        <div class="groupDetail"><span class="groupcase ">{{item.collagePersons}}人团</span><span class="nowprice">￥{{item.activityPrice}}</span></div>
        <div class="oldprice">￥{{item.goodsPrice}}</div>
      </div>
    </div>
  </div>
  
  <div class="tuijian">
      <div class="homexin">
        <image :src='homexin'></image> 精品推荐
      </div>
            <ul class="smlistUl">
                <li v-for="(item,itemindex) in goods" :key='item' :index='itemindex' @click="toshopinfo(item.goodsId,item.catId)">
                    <div class="smlistimg"><image :src="item.thumbnail"></image></div>
                    <div class="smlistinfo">
                        <div class="infotitle">{{item.name}}</div>
                        <div class="smlistpri">
                          <small>￥{{item.price}}</small><small class="smallLeft">....</small>
                        </div>
                    </div>
      
                </li>
                <!--template内以上为动态代码 以下均可删除-->
            </ul>
    </div>


      <div class='newmodel' v-if='sModalStatus'>
      <div class='mask'></div>
      <div class='bcgImg' :animation="animationData">
        <image src='https://shop.guqinet.com/html/images/shanquan/hong.jpg'></image>
      </div>
      <div class='closebtn' @click='hModal' :animation="animationData">
      <image src='../../../static/images/bi.png'></image>
      </div>
      <div class='telphone' :animation="animationData">
        <div class='inputBcg'>
          {{mobile}}
        </div>
        <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class='getphoneBtn'>验证号码</button>
      </div>
      <div class='getbtn' :animation="animationData" @click='receiveRed'>立即领取{{faceValue}}元新人圈圈</div>
    </div>
    <div class="bottom">
      <div class="btninfo">1875技术团队提供支持</div>
      <!-- <div class="btn"><span @click="tomask">我也要做小程序</span></div> -->
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
    pingtuanList:[],
    goods:[],
    indexNotice:[],
    sModalStatus:false,
    animationData:[],
    faceValue:'',
    mobile:'请点击验证号码',
    ggbrandimg:globalStore.state.imgapi+"/image/homrguangao.png",
    shizong:globalStore.state.imgapi+"/image/homezhong.png",
    shangquan:globalStore.state.imgapi+"/image/shangquan.png",
    homexin:globalStore.state.imgapi+"/image/homexin.png",
    searchimg:globalStore.state.imgapi+"/image/homexin.png",
    gonggao:globalStore.state.imgapi+"/image/gonggao.png",
    guanggaowei:globalStore.state.imgapi+"/image/ruzhuheader.jpg",
    bottomimg:globalStore.state.imgapi+"/image/indebottomimg.jpg",
     imageWidth:'',
     imageHeigth:'',
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
      else if(index==1){
        wx.navigateTo({
          url:'../jiancaiindex/main?catId='+catId
        })
      }
      else if(index==2){
        wx.navigateTo({
          url:'../hunshaindex/main?catId='+catId
        })
      }
      else if(index==3){
        wx.navigateTo({
          url:'../xiemaoindex/main?catId='+catId
        })
      }
      else if(index==4){
        wx.navigateTo({
          url:'../lvyouindex/main?catId='+catId
        })
      }
      else if(index==5){
        wx.navigateTo({
          url:'../meirongindex/main?catId='+catId
        })
      }
      else if(index==6){
        wx.navigateTo({
          url:'../peixunindex/main?catId='+catId
        })
      }
      else{
        wx.navigateTo({
          url:'../lingshouindex/main?catId='+catId
        })
      }
    },
    //跳转至店铺详情
    tojump:function(brandId){
      console.log("-----")
      console.log(brandId)
     if(brandId!=-1){
          wx.navigateTo({
            url:'../store/main?brandId='+brandId
          })
     }
    },
    //入驻页面跳转
    ruzhu:function(){
        wx.navigateTo({
          url:'../storeruzhu/main'
        })
    },
    tomask:function(){
       wx.navigateTo({ url: '../make/main' });
    },
    tosearch:function(){
      let that=this;
      wx.navigateTo({ url: '../search/main' });
    },
    toshopinfo:function(goodsId,catId){
      let that=this;
      console.log(goodsId)
      wx.navigateTo({ url: '../shumainfo/main?goodsId='+goodsId+'&catid='+catId });
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
          wx.setStorageSync('mp', res.data.memberDO.mp)
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
      that.selectMermberRed(memberId)
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
        that.database= res.data.data;
        that.goods=res.data.data.goods;
        that.indexNotice=res.data.data.indexNotice
        wx.setStorageSync('indexdata', res.data.data.message)
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
    //立即购买模态框
  sModal: function () {
    
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()

      this.animationData=animation.export(),
      this.sModalStatus=true

    setTimeout(function () {
      animation.translateY(0).step()
        this.animationData=animation.export()
    }.bind(this), 200)
  },
  
  hModal: function () {
    let that=this;
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()

      this.animationData=animation.export(),

    setTimeout(function () {
      animation.translateY(0).step()
        this.animationData=animation.export(),
        that.sModalStatus=false
    }.bind(this), 200)
  },

    getPhoneNumber: function (e) {
    var that = this;
    if (e.mp.detail.errMsg == "getPhoneNumber:ok") {

      that.disabled=true
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            wx.request({
              url: globalStore.state.api + '/api/weCatGetTel',
              data: {
                code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
                encryptedData: e.mp.detail.encryptedData,
                iv: e.mp.detail.iv
              },
              success: function (res) {
               console.log("------------");
               console.log(res.data);
                if (res.data.code == 0) {
                    that.mobile=res.data.mobile
                    that.openId=res.data.opendId
                }
              }
            })
          }
        }
      })
    }
    },
      selectMermberRed:function(memberId){//红包
    var that=this
    wx.request({
      url: globalStore.state.api + '/api/redPacket/selectMermberRed',
      data: {
        memberId: memberId
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.request({
            url: globalStore.state.api + '/api/redPacket/select',
            headers: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              if (res.data.redPacket[0].isend == 1) {
                that.sModal()
                  that.iscanGet=true;
                  that.faceValue=res.data.redPacket[0].faceValue;
                  that.repacketId=res.data.redPacket[0].repacketId;
              }
            }
          })
        }
      }
    })
  },
    receiveRed:function(){
    var that=this
    var receiveParams = {}
    receiveParams.openId = that.openId
    receiveParams.phoneNumber = that.mobile
    receiveParams.memberId = that.memberId
    receiveParams.amount = that.faceValue
    receiveParams.redpacketId = that.repacketId
    console.log(that.memberId)
    if(that.memberId=="00"){
      wx.showModal({
        title: '提示',
        content: '请先授权登录',
        confirmText: "去登录",
        cancelText: '残忍拒绝',
        success: function (res) {
          if (res.confirm) {
            that.hModal()
           wx.switchTab({
             url: '../my/main',
           })
          } else if (res.cancel) {

          }
        }
      })
    }
    else{
      if (that.mobile == '请点击验证号码') {
        wx.showToast({
          title: '未验证手机号',
          icon: 'loading'
        })
      }
      else{
        wx.showLoading({
          title: '请稍等',
        })
        wx.request({
          url: globalStore.state.api + '/api/redPacket/MemberRedGet',
          data: {
            parm: receiveParams
          },
          success: function (res) {
            if (res.data.code == 0) {
              that.iscanGet=false
              //that.onLoad()
              that.hModal()
              wx.hideLoading()
              wx.showToast({
                title: '领取成功',
                icon:'success',
                duration:2000
              })
            }   
          }
        })
      }
    } 
  },
  },
  onLoad:function(options){
     var that = this
    if (options.scene == undefined) {
      wx.setStorageSync('distribeId', null)
    }
    else {
      wx.setStorageSync('distribeId', decodeURIComponent(options.scene))
    }
  },
  onShow(){ 
    var windWidth=(wx.getSystemInfoSync().windowWidth);
    this.imageWidth=windWidth+"px";
    this.imageHeigth=windWidth*9/16+'px';
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
  box-sizing: border-box;
}
/* 轮播 */

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
  height: 36.8vw;
  box-shadow: 0px 5rpx #f1f1f1;
  margin-top: 10rpx;
  text-align: center;
}
.membeintro image{
  width: 96%;border-radius: 14rpx;
}

.membeintrodetail{
padding-left: 15rpx;
padding-right: 15rpx;
  margin:20rpx 10rpx 10rpx;
}
.membeintrodetailtitle{
  height: 80rpx;
  line-height: 80rpx;
  font-size: 26rpx;
}
.membeintrodetailcontent{
  width:94%;
  padding-left: 3%;
  padding-right: 3%;
  display: flex;
  
  overflow: scroll;
  white-space:nowrap;
  margin-top: 10rpx;
  font-size: 0.8em;
  display: flex;
}
.groupImg{
  width: 250rpx;
  height: 250rpx;
  display: inline-block;
}
.membeintrodetaillist{
  width: 300rpx;
  text-align: center;
  margin-right: 38rpx;
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
.membeintrodetailtitle{
  display: flex;align-items: center;font-size: 32rpx;font-weight: bold;
}
.membeintrodetailtitle image{
 margin-right: 20rpx;width: 42rpx;height: 45rpx;
}
.shanquanindex{background: #fff;height: 100%;}
.groupcase{display: inline-block;width: 100rpx;background: linear-gradient(70deg, #e93429, #fd8f6e);border-radius: 12rpx;font-size: 24rpx;color: #fff;}
.popile image{width: 54rpx;}
.homexianshi{border-radius: 6rpx;box-shadow: 0 0 10px #f3f3f3;}

.homexin{margin-bottom: 25rpx;margin-top: 45rpx;}
.smlistUl{display: flex;flex-wrap: wrap;}
.smlistUl li{width: 48.6%;border-bottom: 10rpx solid #f2f2f2;}
.smlistUl li:nth-child(1){border-right: 10rpx solid #f2f2f2;}
.smlistUl li:nth-child(2n){border-left: 10rpx solid #f2f2f2;}
.smlistUl li:nth-child(3n){border-right: 10rpx solid #f2f2f2;}
.smlistimg{height:360rpx;}
.smlistpri{display: flex;align-items: center;justify-content: space-between;margin-top: 15rpx;} 
.smlistinfo{padding-left: 15rpx;padding-right: 15rpx;padding-bottom: 20rpx;background: #fff;}
.infotitle{font-size: 26rpx;height: 72rpx;text-overflow:ellipsis;overflow: hidden;word-break:break-all;
display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;
}
.smlistinfo small{margin-right: 15rpx;font-size: 28rpx;color:red;}
.smlistinfo label{color:#666;font-size: 22rpx;}
.smlistinfo .smallLeft{color:#666;width: 30rpx;letter-spacing: 1rpx;}

.homexin{text-align: center;display: flex;align-items: center;justify-content: center;color: #f6352c;font-size: 34rpx;font-weight: bold;}
.homexin image{height: 45rpx;width: 45rpx;margin-right: 15rpx;}

.search{display: flex;align-items: center;justify-content: center;}
.search{position:absolute;z-index: 3;top: 30rpx;margin-left: 8%;border:1px solid #adadad;background: #adadad;opacity: 0.4;;border-radius: 20rpx;height: 52rpx;width: 84%;}
.search icon{margin-right: 20rpx;}
.search span{font-size: 30rpx;color: #fff;}

/*gonggao*/
.gonggao{display: flex;margin-top: 25rpx;}
.gonggao .left{width: 10%;display: flex;justify-content:center;}
.gonggao .left img{width: 40rpx;height: 40rpx;}
.gonggao .right{width: 90%;overflow:hidden;height:45rpx;line-height: 45rpx;}
.gonggao swiper{height:45rpx;}
.gonggao swiper div{font-size: 30rpx;}
/* .infoitem{width:100%;position:relative;}
.info{font-size: 28rpx;white-space:nowrap;position:absolute;top:0;} */

.btninfo{text-align: center;font-size: 28rpx;color: rgb(190, 190, 190)}
.bottom{padding-top: 25rpx;padding-bottom: 20rpx;}
.btn{text-align: center;}
.btn span{display: inline-block;padding-left: 25rpx;padding-right: 25rpx;
border:1px solid #F64F57;border-radius: 15rpx;color: #F64F57;font-size: 24rpx;height: 30rpx;line-height: 30rpx;}

/* 新人专享红包 */
/* .newmodel{
  position: relative;
  top: 0;
  left: 0;
} */
.mask{width: 100%;height: 100vh;background: #000;opacity: 0.5;position: fixed;top: 0;left: 0;}
.bcgImg{width: 70vw;height: 90vw;overflow: hidden;position: fixed;top: 200rpx;left: 15vw;}
.bcgImg image{width: 100%;height: 100%;display: block;}
.telphone{position: fixed;top: 590rpx;left: 15vw;display: flex;width: 70vw;padding:0 2vw;box-sizing: border-box;}
.inputBcg{width: 40vw;height: 80rpx;line-height:80rpx;border:2px solid #FA7C04; background: #fff;border-radius: 5rpx;padding-left:5rpx;box-sizing: border-box; font-size:30rpx;}
.getphoneBtn{font-size:30rpx;padding: 0;margin-left: 10rpx;flex-grow: 1;background: #FFB425;}
.getbtn{position: fixed;top: 730rpx;left: 17vw;height: 80rpx;line-height: 80rpx;width: 66vw;text-align: center;border-radius: 10rpx;font-size:30rpx;background: #FFB425;}
.closebtn{height: 50rpx;width: 50rpx;position: fixed;right: 16vw;top:210rpx;}
.closebtn image{width: 100%;height: 100%;display: block;}

.showredpack{width: 100rpx;height: 100rpx;overflow: hidden;position: fixed;bottom: 120rpx;right: 80rpx;}
.showredpack image{width: 100%;height: 100%;display: flex;}

.bottonimg{text-align: center;}
.bottonimg img{width: 200rpx;height: 65rpx;}
</style>

