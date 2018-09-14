<template>
  <div class='shanquanindex'>
    <swiper class="swiper_box" autoplay="true" interval="5000" duration="1000" indicator-dots='true' :style="{width:imageWidth,height:imageHeigth}">    
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
      <image :src='ggbrandimg'></image>
    </div>
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
                          <small>￥{{item.price}} <label>848人购买</label></small><small class="smallLeft">....</small>
                        </div>
                    </div>
      
                </li>
                <!--template内以上为动态代码 以下均可删除-->
            </ul>

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
    ggbrandimg:globalStore.state.imgapi+"/image/homrguangao.png",
    shizong:globalStore.state.imgapi+"/image/homezhong.png",
    shangquan:globalStore.state.imgapi+"/image/shangquan.png",
    homexin:globalStore.state.imgapi+"/image/homexin.png",
     imageWidth:'',
     imageHeigth:''
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
    toshopinfo:function(goodsId,catId){
      let that=this;
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
        that.goods=res.data.data.goods
        console.log("=============")
        console.log(that.goods);
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
  }
  },
  onLoad(){ 
    var windWidth=(wx.getSystemInfoSync().windowWidth);
    this.imageWidth=windWidth+"px";
    this.imageHeigth=windWidth*9/16+'px';
   this.userLogin();
   this.getactive();
   this.getMain();
   console.log("------------")
   console.log(this.menus);
   console.log("--------------")
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
  height: 35.8vw;
  box-shadow: 0px 5rpx #f1f1f1;
  margin-top: 10rpx;
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
}
.groupImg{
  width: 180rpx;
  height: 180rpx;
  display: inline-block;
}
.membeintrodetaillist{
  width: 200rpx;
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
.smlistpri{display: flex;align-items: center;justify-content: space-between;margin-top: 20rpx;} 
.smlistinfo{padding-left: 15rpx;padding-right: 15rpx;padding-bottom: 20rpx;background: #fff;}
.infotitle{font-size: 26rpx;}
.smlistinfo small{margin-right: 15rpx;font-size: 28rpx;color:red;}
.smlistinfo label{color:#666;font-size: 22rpx;}
.smlistinfo .smallLeft{color:#666;width: 30rpx;letter-spacing: 1rpx;}

.homexin{text-align: center;display: flex;align-items: center;justify-content: center;color: #f6352c;font-size: 34rpx;font-weight: bold;}
.homexin image{height: 45rpx;width: 45rpx;margin-right: 15rpx;}
</style>
