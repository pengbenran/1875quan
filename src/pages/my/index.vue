<template>
  <div class="mycontainer">
    <div class="myBrand">
      <image class="brandimg" :src="head"></image>
      <div class="userinfo" v-if="hasmemberId&&isUse">
        <div class="userimg"><image :src="userInfo.avatarUrl" background-size="cover"></image></div>
        <div class="userright">
          <span>{{userInfo.nickName}}</span>
          <div class="usercase">{{lvidname}}</div>
        </div>
      </div>
     <div class="mybrand"  v-else> <button  open-type="getUserInfo" @click="getUserInfo"> 点击授权登录 </button></div>
    </div>
    <!--myBrand end-->
   
   <div class="myorder">
     <div class="ordertitle"><span>我的订单</span><span>查看全部订单<image class="indent-img" :src="indent"></image></span></div>
      <div class="orderItem">
        <ul>
          <li><image :src='df'></image><div>待付款</div></li>
          <li><image :src='dfh'></image><div>待发货</div></li>
          <li><image :src='ds'></image><div>待收货</div></li>
          <li><image :src='ywc'></image><div>已完成</div></li>
        </ul>
      </div>
   </div>
   <!--myorder end-->

   <div class="orderList">
       <div class="listwarp">
          <div class="listleft">
              <image :src='myping'></image>
          </div>
          <div class="listRight">
                <div class="listtiel">微分销会员</div>
              <image :src="indent"></image>
          </div>
        </div>
        <!--微分销会员-->
       <div class="listwarp">
          <div class="listleft">
              <image :src='int'></image>
          </div>
          <div class="listRight" @click="tojifen()">
                <div class="listtiel">积分</div>
              <image :src="indent"></image>
          </div>
        </div>
                <!--积分-->
       <div class="listwarp" @click="toaddres">
          <div class="listleft">
              <image :src='inter'></image>
          </div>
          <div class="listRight">
                <div class="listtiel">地址管理</div>
              <image :src="indent"></image>
          </div>
        </div>
                <!--地址管理-->
       <div class="listwarp">
          <div class="listleft">
              <image :src='integra'></image>
          </div>
          <div class="listRight">
                <div class="listtiel">会员卡</div>
              <image :src="indent"></image>
          </div>
        </div>
                <!--微分销会员-->
       <div class="listwarp">
          <div class="listleft">
              <image :src='youhui'></image>
          </div>
          <div class="listRight">
                <div class="listtiel">优惠券</div>
              <image :src="indent"></image>
          </div>
        </div>
                <!--微分销会员-->
       <div class="listwarp">
          <div class="listleft">
              <image :src='myping'></image>
          </div>
          <div class="listRight">
                <div class="listtiel">我的拼团</div>
              <image :src="indent"></image>
          </div>
        </div>
                <!--微分销会员-->
        <div class="listwarp">
          <div class="listleft">
              <image :src='shouhou'></image>
          </div>
          <div class="listRight">
                <div class="listtiel">收藏</div>
              <image :src="indent"></image>
          </div>
        </div>

                         <!--微分销会员-->
         <div class="listwarp">
          <div class="listleft">
              <image :src='youhui'></image>
          </div>
          <div class="listRight">
                <div class="listtiel">售后</div>
              <image :src="indent"></image>
          </div>
        </div>
   </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";

export default {
  data () {
    return {
       head:globalStore.state.imgapi+'/image/wode/zu17.png',
       df: globalStore.state.imgapi + "/image/wode/qianbao.png",
       dfh: globalStore.state.imgapi + "/image/wode/shouhuo.png",
       ds: globalStore.state.imgapi + "/image/wode/pingjia.png",
       ywc: globalStore.state.imgapi + "/image/wode/tuihuo.png",
       indent: globalStore.state.imgapi + "/image/wode/kao6.png",
       myping: globalStore.state.imgapi + "/image/wode/pingtuan.png", //分销图标
       int: globalStore.state.imgapi + "/image/wode/jifen.png", //积分
       inter: globalStore.state.imgapi + "/image/wode/dizhi.png", //地址管理
       integra: globalStore.state.imgapi + "/image/wode/huiyuan.png", //会员卡
       youhui: globalStore.state.imgapi + "/image/wode/youhuiquan.png", //优惠券
       shouhou: globalStore.state.imgapi + "/image/wode/shoucang.png",//收藏
       userInfo:[],
       isUse: true,
       hasmemberId:false,
       lvidname:""
      }
  },

  components: {
  
  },

  methods: {
    geiMemberInfo:function(memberId){//获取会员信息例如代付款，已付款
      let that=this;
      if(memberId=="00"){//meberid未00及是未登陆状态
        that.hasmemberId=false;
      }
      else{//否则就是登陆状态
         that.hasmemberId=true;
         //请求代付款，已付款信息
         let parms={};
         parms.memberId=memberId;
         console.log(parms);
         wx.request({
          url: globalStore.state.api + '/api/member/memberIndex', 
          data: {
            parms: parms
          },
          headers: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            console.log("获取用户待款信息已执行")
            console.log(res.data);
            if(res.data.code==0){
              if(res.data.memberDO.mp==null){
                var mp=0;
              }else{
                var mp=res.data.memberDO.mp;
              }
              that.statuscount=res.data.statuscount,//未付款
              that.freightstatuscount=res.data.freightstatuscount,//待收货
              that.finishstatuscount=res.data.finishstatuscount,//已完成
              that.shippedstatuscount=res.data.shippedstatuscount,//已发货
              that.lvidname=res.data.memberDO.lvidname,//会员
              that.mp=mp,
              that.vouchercount=res.data.vouchercount
              //res代表success函数的事件对，data是固定的
              wx.setStorageSync("point",mp);
            }
            console.log(that.lvidname)
          }
        })
      }
    },
    //跳转至地址管理
    toaddres(){
      let that=this;
      let url='../address/main';
      that.jumps(url);
    },
    //跳转到积分
    tojifen(){
     console.log("6666")
      let that=this;
      let url='../jifen/main';
      that.jumps(url);
    },
    //判断登录才可跳转
    jumps(url){
      let that=this;
      if(that.hasmemberId&&that.isUse){
        wx.navigateTo({
          url:url
        })
      }else{
        wx.showToast({
          title:'为授权登录',
          icon:'loading',
          duration:2000
        })
      }
    },

    getUserInfo(e){//获取用户信息
    console.log("655555")
       let that=this;
       that.onshow();
       if(that.memberId=="00"){
         wx.login({//登陆获取code
           success:res=>{
              if(res.code){
                wx.getUserInfo({
                  success:function(res_user){
                  wx.request({
                      url: globalStore.state.api + '/api/weCatLogin',
                      data: {
                        code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
                        headurl: res_user.userInfo.avatarUrl,//这些是用户的图片信息
                        nickname: res_user.userInfo.nickName,//获取昵称
                        sex: res_user.userInfo.gender,//获取性别
                        country: res_user.userInfo.country,//获取国家
                        province: res_user.userInfo.province,//获取省份
                        city: res_user.userInfo.city//获取城市
                      },
                      success: function(res) {
                        that.hasmemberId=true;
                        wx.setStorageSync("openid", res.data.openid)//可以把openid保存起来,以便后期需求的使用
                        wx.setStorageSync("memberId", res.data.memberId)
                        wx.setStorageSync("memberIdlvId", res.data.memberIdlvId)
                        that.onshow();
                      }
                    })
                  }
                })
              }
           }
         })
       }
    },

  },
   //请求基本用户信息(头像名称)
   onShow(){
     let that=this;
     let memberId= wx.getStorageSync('memberId');
     that.memberId=memberId;  //设置memberId
     that.geiMemberInfo(memberId);//执行获取代付款，已付款
     wx.getSetting({
       success:function(res){
         if(res.authSetting['scope.userInfo']){//已授权判断
           //已经授权，才可以调用getUserInfo获取头像昵称
           wx.getUserInfo({
               success:function(res){
                 console.log("获取头像信息已执行")
                 that.userInfo=res.userInfo;
                 that.isUse=true;
               }
           })
         }else{//未授权判断
           that.isUse=false;
         }
       }
     })
   },

  created () {
   
  }
}
</script>

<style scoped>
/*myBrand*/
.myBrand{position: relative;height: 260rpx;}
.myBrand image{height: 100%;width: 100%;}
.userinfo{position: absolute;top:0;left: 0;height: 260rpx;width: 100%}
.userinfo{display: flex;align-items: center;}
.userimg{width:220rpx;margin-right: 20rpx;}
.userimg image{width: 150rpx;height: 150rpx;float: right;border-radius: 50%;border:1px solid #fff;}
.userright{text-align: center;}
.userright span{color:#fff;font-size: 34rpx;}
.usercase{margin-top:20rpx;text-align:center;width: 160rpx;padding-left: 12rpx;padding-right: 12rpx;border-radius: 45rpx;background:#f9ffff;color:#71b5ff;font-size:30rpx;height:48rpx;line-height:50rpx;}

/*myorder*/
.ordertitle{display: flex;justify-content: space-between;padding-left: 15rpx;padding-right: 15rpx;line-height: 92rpx;border-bottom: 1px solid #F2F2F2;}
.ordertitle span{font-size: 28rpx;}
.orderItem{padding:20rpx 0rpx;}
.orderItem ul{display: flex;}
.orderItem li{width: 25%;text-align: center;}
.orderItem div{text-align: center;color:#666;font-size: 28rpx;}
.orderItem image{width: 62rpx;height: 62rpx;}
.indent-img{width:15rpx;height:22rpx;margin-left: 5rpx;}

/*orderList*/
.listwarp{display: flex;justify-content: center;height: 100rpx;padding-left: 10rpx;padding-right: 10rpx;}
.listleft{width: 10%;display: flex;justify-content: center;align-items: center;}
.listleft image{height: 34rpx;width: 39rpx;}
.listRight{width: 90%;display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #f2f2f2;}
.listRight image{width:15rpx;height:22rpx;}
.listtiel{font-size: 28rpx;}

/*orderList*/
.orderList{border-top:5px solid #f2f2f2;}

/*mybrand*/
.mybrand{position: absolute;top: 35%;width: 100%;text-align:center;}
.mybrand button{display: inline-block;width: 260rpx;height: 80rpx;font-size: 30rpx;
}
</style>
