<template>
  <div class="mycontainer">
    <div class="myBrand">
      <image class="brandimg" :src="head"></image>
      <div class="userinfo" v-if="hasmemberId&&isUse">
        <div class="userimg"><image :src="userInfo.avatarUrl" background-size="cover"></image></div>
        <div class="userright">
          <span>{{userInfo.nickName}}</span>
          <div class="member" :hidden="!isMember">{{lvidname}}</div>
        </div>
      </div>
     <div class="mybrand"  v-else> <button  open-type="getUserInfo" @click="getUserInfo"> 点击授权登录 </button></div>
    </div>
    <!--myBrand end-->
   
   <div class="myorder">
     <div class="ordertitle"><span>我的订单</span><span @click=jumporderdetail(-1)>查看全部订单<image class="indent-img" :src="indent"></image></span></div>
      <div class="orderItem">
        <ul>
          <li @click=jumporderdetail(index) v-for="(item,index) in itemlist" :index='index' :key='key' >
            <image :src='item.imgUrl'></image>
            <div class="itemname">{{item.name}}</div>
            <div class='yuan' v-if="item.statuscount!=0">{{item.statuscount}}</div>
          </li>
          <li>
            <button class='shouhoubtn' open-type="contact" session-from="weapp"> 
             <image :src='shouhouimg'></image>
             <div class="itemname">售后</div>
             </button>
          </li>
        </ul>
      </div>
   </div>
   <!--myorder end-->
    <div class='menu'>
      <div class='df nav'>
        <div class='df_1'  v-for="(item,index) in kind" @click=jump(item.jumpurl,item.menuid) :index='index' :key='key'>
          <image :src='item.imageurl'></image>
          {{item.name}}
        </div>
      </div>
    </div>
   
   <div class="footer">
     <div class="item"></div>
   </div>

  </div>
</template>

<script>
import globalStore from "../../stores/global-store";

export default {
  data () {
    return {
       head:globalStore.state.imgapi+'image/mybcg.jpg',
       shouhouimg:globalStore.state.imgapi+'image/souhuo.jpg',
       itemlist:[
       {name:"待付款",imgUrl:globalStore.state.imgapi+'image/qianbao.png',statuscount:0},
       {name:"待发货",imgUrl:globalStore.state.imgapi+'image/shouhuo.png',statuscount:0},
       {name:"待收货",imgUrl:globalStore.state.imgapi+'image/fahuo.png',statuscount:0},
       {name:"已完成",imgUrl:globalStore.state.imgapi+'image/tuihuo.png',statuscount:0}
      //  {name:"售后",imgUrl:globalStore.state.imgapi+'image/souhuo.jpg',statuscount:0}
       ],
       userInfo:[],
       isUse: true,
       hasmemberId:false,
       lvidname:"",
       isMember:true,
       hasmemberId: false,
       isUse: true,
       kind: [
      { name: '我的拼团', imageurl: globalStore.state.imgapi+'image/pingtuan.jpg', jumpurl: '../grouplist/main',menuid:1 },
      { name: '签到有礼', imageurl: globalStore.state.imgapi+'image/qiandao.png', jumpurl: '../jifen/main',menuid:2 },
      { name: '我的收藏', imageurl: globalStore.state.imgapi+'image/shoucang.png', jumpurl: '../collection/main',menuid:3 },
      { name: '收货地址', imageurl: globalStore.state.imgapi+'image/address.png', jumpurl: '../address/main',menuid:4 },
      { name: '成为推广商', imageurl: globalStore.state.imgapi+'image/weifenxiao.png', jumpurl: '../membershipdetail/main',menuid:5 },
      { name: '充值圈圈', imageurl:globalStore.state.imgapi+'image/chongzhi.png',jumpurl:'../quanchongzhi/main',menuid:6},
      { name: '商家入驻', imageurl: globalStore.state.imgapi+'image/ruzhu.jpg', jumpurl: '../storeruzhu/main',menuid:7 },
      { name: '招募代理商', imageurl: globalStore.state.imgapi+'image/tuikuangshang.png', jumpurl: '../dailishang/main',menuid:8 },
      { name: '圈圈兑换', imageurl: globalStore.state.imgapi+'image/duihuan.jpg', jumpurl: '../quanduihuan/main',menuid:9 },
      { name: '邀请好友', imageurl: globalStore.state.imgapi+'image/haoyou.png', jumpurl: '../haoyou/main',menuid:10 },
      { name: '联系我们', imageurl: globalStore.state.imgapi+'image/kefu.png', jumpurl: '../storeruzhu/main',menuid:11 },
      { name: '关于我们', imageurl: globalStore.state.imgapi+'image/women.png', jumpurl: '../women/main',menuid:12 },
      ],
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
              that.itemlist[0].statuscount=res.data.statuscount,//未付款
              that.itemlist[1].statuscount=res.data.freightstatuscount,//待收货
              that.itemlist[2].statuscount=res.data.shippedstatuscount,//已完成
              that.itemlist[3].statuscount=res.data.finishstatuscount,//已发货
              that.lvidname=res.data.memberDO.lvidname,//会员
              that.mp=mp,
              that.vouchercount=res.data.vouchercount
              //res代表success函数的事件对，data是固定的
              wx.setStorageSync("point",mp);
              wx.setStorageSync("lvname",that.lvidname);
            }
            console.log(that.lvidname)
          }
        })
      }
    },
    //判断登录才可跳转

     jump:function(url,menuid){
    var that = this;
    // that.onShow();
    if (that.hasmemberId && that.isUse) {
         if(menuid==5){
            //当点击微分销的时候
              wx.request({
              url: globalStore.state.api + '/api/distribe/whetherDistribe',
              data: {
                memberId: that.memberId
              },
              headers: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                if(res.data.code==0){
                  wx.navigateTo({
                        url: url+'?money='+res.data.money,
                  })
                }
                else{
                  wx.navigateTo({
                    url: '../micromember/main',
                  })
                }
              }
            })
          }else if(menuid==11){
              wx.makePhoneCall({
                phoneNumber: '13767842228', //仅为示例，并非真实的电话号码
                success:function(){
                  console.log("拨打成功")
                },
                fail:function(){
                  console.log("拨打失败")
                }
              })
          }
          else{
            wx.navigateTo({
              url: url ,
            })
          }
      } else {
      wx.showToast({
        title: '未授权登录',
        icon: 'loading',
        duration: 2000
      })
    }
  },
    jumporderdetail(e){
       var that = this;
       let id=e+1;
       var url;
       if(id==5){
          url='../souhou/main'
       }else{
          url = '../orderdetail/main?currentTarget=' + id
       }
       that.jump(url)
    },
    getUserInfo(e){//获取用户信息
       let that=this;
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
                        that.getInfo();
                      }
                    })
                  }
                })
              }
           }
         })
       }
    },
    getInfo:function(){
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
    }
  },
   //请求基本用户信息(头像名称)
   onShow(){
    var that=this;
    that.getInfo();
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
.ordertitle{display: flex;justify-content: space-between;padding-left: 15rpx;padding-right: 15rpx;line-height: 92rpx;border-bottom: 1px solid #F2F2F2;background: #fff;}
.ordertitle span{font-size: 28rpx;}
.orderItem{padding:20rpx 0rpx; background: #fff;}
.orderItem ul{display: flex;}
.orderItem li{width: 25%;text-align: center; position: relative;}
.orderItem div{text-align: center;color:#666;font-size: 28rpx;color: #fff;}
.orderItem .itemname{color: #000;}
.orderItem image{width: 62rpx;height: 62rpx;}
.indent-img{width:15rpx;height:22rpx;margin-left: 5rpx;}
.member{
  margin-top: 20rpx;
  border-radius: 45rpx;
  text-align: center;
  min-width:158rpx; 
  background: #f9ffff;
  color: #000;
  font-size: 30rpx;
  height:48rpx;
  line-height: 50rpx;
  padding:0 10rpx 0 10rpx;

}
.yuan{
  width: 35rpx;
  height: 35rpx;
  background: #ff6a6b;
  font-size: 12px;
  color: #fff;
  position: absolute;
  border-radius: 50%;
  line-height: 35rpx;
  top: -5px;
  right: 14px;
}
/* 菜单选项 */
.menu{
  display:block;
  box-shadow: 0px 5rpx #f1f1f1;
  margin-top: 10rpx;
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
  width: 80rpx;
  height: 80rpx;
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

.shouhoubtn{background: #fff;line-height: 44rpx;padding: 0;margin: 0;}
.shouhoubtn::after{border: none;}
</style>
