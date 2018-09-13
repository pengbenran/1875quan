<template>
  <div class="ruzhu">
    <form @submit='fromsub'>
    <div class="ruzhubrand"><img :src="strongimg"></div>
    <div class="item itemname"><span>姓 名：</span><input name='username' type="text" placeholder="请输入商家姓名" placeholder-style='#ccc'/></div>
    <div class="item"><span>商家名称：</span><input name='shopname' type="text" placeholder="请输入商家名称" placeholder-style='#ccc'/></div>
    <div class="listitem"><span>行业分类：</span><div class="list">
       <picker @change="changpick" :value='index' :range='listmenu'>
          <div class="picker">{{listmenu[index]}}</div>
       </picker>
      <img style="transform:rotate(-90deg)" :src="downimg"></div></div>
    <div class="item"><span>联系电话：</span><input name='phone' type="text" placeholder="请输入您的电话" placeholder-style='#ccc'/></div>
    <div class="item"><span>详细地址：</span><input name='aress' type="text" placeholder="请输入详细地址" placeholder-style='#ccc'/></div>
    
    <div class="btn"><button form-type='submit'>申请入驻</button></div>      
    </form>  
  </div>
  </template>

<script>
import globalStore from "../../stores/global-store";

export default {
  data () {
    return {
       downimg:globalStore.state.imgapi+'image/down.png', 
       strongimg:globalStore.state.imgapi+'image/store01.png', 
       index:0,
       menus:[],
       listmenu:[]
    }
  },   


  components: {
 
  },

  methods: {
     changpick(e){
       let that=this;
      console.log(e); 
      console.log(e.mp.detail.value);
      that.index=e.mp.detail.value;
  },

  fromsub(s){
    let that=this;
    let e=s.mp;
    console.log(e);
    var params={};
    // var name=e.detail.value.username;
    // var shopName=e.detail.value.shopname;
    // var shopType=that.listmenu[that.index];
    // var mobile=e.detail.value.phone;
    // var address=e.detail.value.aress;
    // var state=2;
    params.name=e.detail.value.username;
    params.shopName=e.detail.value.shopname;
    params.shopType=that.listmenu[that.index];
    params.mobile=e.detail.value.phone;
    params.address=e.detail.value.aress;
    params.state=2;
    var memberId=wx.getStorageSync('memberId');
    // console.log("===========");
    // console.log(shopType)
    console.log(memberId);
    if(memberId!='00'){
        if(e.detail.value.username==''){
        wx.showToast({
                title: '姓名为空',
                icon:'loading'
            })
          return;
      }else if(e.detail.value.shopname==''){
        wx.showToast({
              title: '店铺为空',
              icon:'loading'
          })
      }else if(e.detail.value.phone==''){
          wx.showToast({
              title: '电话为空',
              icon:'loading'
            })
      }else if(e.detail.value.aress==''){
          wx.showToast({
              title: '地址为空',
              icon:'loading'
            })
      }else{
          wx.request({
          url:globalStore.state.api + '/api/index/shopApply', 
            data: {
            param:params
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              console.log(res);
              if(res.data.code){
                wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 3000
                  })
              }else{
                wx.showToast({
                    title: '提交失败',
                    icon: 'success',
                    duration: 3000
                  })
              }
            }
          })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '你还没有登录',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({ url: '../my/main' });
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.navigateTo({ url: '../group/main' });
          }
        }
      })
    }
  
  
  },
  fenlei(){
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
         console.log(that.menus.length);
          var arr=[];
          for(var i=0;i<that.menus.length;i++){
            arr.push(that.menus[i].name);
           }
          console.log(arr);
          that.listmenu=arr;
      },
      fail: function () {
        wx.showToast({
          title: '网络异常',
        })

      }
    })


  }

  },

 onLoad(){
    let that=this;
    that.fenlei();
 }
}
</script>

<style scoped>
.ruzhubrand{height: 382rpx;margin-bottom: 12rpx;}
.ruzhubrand img{width: 100%;height: 100%;}
.ruzhu{background: #fff;height: 100vh;}
.item{display: flex;align-items: center;border-bottom: 1px solid #f5f5f5;height: 90rpx;line-height: 90rpx;padding-left: 20rpx;padding-right: 20rpx;}
.item span{font-size: 32rpx;width: 25%;}
.item input{font-size: 28rpx;width: 75%;}

.listitem{display: flex;align-items: center;padding-left: 20rpx;padding-right: 20rpx;border-bottom: 1px solid #f5f5f5;}
.listitem span{font-size: 32rpx;height: 90rpx;line-height: 90rpx;width: 25%;}
.listitem div{width: 75%;}
.listitem .list picker{width: 160rpx}
.list{display: flex;justify-content: space-between;align-items: center;width: 75%;}
.list img{width: 30rpx;height: 30rpx;}
.list .picker{color: #666;font-size: 28rpx;}
.itemname span{letter-spacing:18rpx;}

.infoinput{padding-left: 20rpx;padding-right: 20rpx;}
.infoinput textarea{background: #f5f5f5;border-radius: 8rpx;}

.dagou{position: relative;padding-left: 70rpx;justify-content: center;align-items: center;font-size: 32rpx;height: 80rpx;line-height: 80rpx;}
.dagou icon{position: absolute;left: 25rpx;top: 18rpx;}
.dagou span{font-size: 28rpx;color: #666;}

.btn{padding:20rpx 30rpx 0;text-align: center;}
.btn button{display: inline-block;width: 80%;margin: auto;text-align: center;
height: 70rpx;line-height: 75rpx;border-radius: 10rpx;font-size: 34rpx;background: #e93429;color: #fff;}

</style>
