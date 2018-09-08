<template>
  <div class="sminfoContainer">
     <div class="sminfoBrand">
          <swiper autoplay="true" interval="5000" duration="1000" indicator-dots="true">
            <swiper-item v-for="(item,index) in Gallery" :key="item" :index="index">
              <image :src="item.original"></image>
            </swiper-item>
          </swiper>    
      </div>
     <!--sminfoBrand end-->

     <div class="Shopinfo">
         <div class="shoppir"><label>￥</label>{{goodDetail.price}}</div>
         <div class="shopinfotitel">{{goodDetail.name}}</div>
         <div class="shopinfotab"><span>快递：免运费</span><span>库存：{{goodDetail.enableStore}}</span><span>江西南昌</span></div>
     </div>
     <!--Shopinfo end-->

     <div class="shopcontent">
       <div class="shopcontenttop">
         <ul>
           <li v-for="(item,index) in tags" :key="item" :index="index">
             <image :src="gimg"></image>{{item.tagName}}
           </li>
         </ul>
       </div>
      <!--shopcontenttop end-->
      
      <div class="shpocontenxq">
        <div class="shoptitle"> <span>商品详情</span></div>
        <div class="shopcontents01">
          <wxParse :content="article" @preview="preview" @navigate="navigate" />
        </div>
     </div>

      <div class="shpocontenxq bordertop"><!--产品概要暂无-->
        <div class="shoptitle shoptitle2"> <span>产品概要</span><image src="https://shop.guqinet.com/html/images/shanquan/shumainfo/huawei.jpg"></image></div>
        <div class="shopcontents02"><image src="https://shop.guqinet.com/html/images/shanquan/shumainfo/conten01.jpg"></image></div>
        <div class="shoprcoinfo">
          <strong>包装清单</strong>
          <div class="shopbaozhang">手机*1，电池（内置）*1，快速指南*1，充电器*1，三包凭证*1,3.5mm耳机*1，USB数据线*1，取卡针*1，TPU保护壳*1
            （最终以实物为准）
          </div>
        </div>
     </div>

     <div class="shpocontenxq bordertop"><!--参数对比暂无-->
        <div class="shoptitle shoptitle2"> <span>参数对比</span><image src="https://shop.guqinet.com/html/images/shanquan/shumainfo/huawei.jpg"></image></div>
        <div class="shopcontents03"><image src="https://shop.guqinet.com/html/images/shanquan/shumainfo/conten02.jpg"></image></div>
     </div>
     </div>
     <!--shopcontent end-->

     <div class="shopmodel" v-if="showModalStatus" :animation="animationData">
       <div class="modelwarp">
         <div class="warpleft"><image :src="goodDetail.thumbnail"></image></div>
         <div class="warpright">
           <div class="warprighttop"><span>{{goodDetail.name}}</span><div class="col-img"><image :src="xximg" @click="colModel"></image></div></div>
          <div class="warprightbottom"><span>￥{{goodDetail.price}}</span><span>库存{{goodDetail.enableStore}}件</span></div>
         </div>
       </div>
       <div class="modelNum">
          <span>购买数量</span>
          <div class="btn">
            <div class="del1" @click="less">-</div>
            <input type="number" :value="pic" @change="inputchange">
            <div class="add1"  @click="plus">+</div>
          </div>
       </div>
       <div class="modelbtn">
         <div class="cart" @click="toCart">加入购物车</div>
         <div class="buy" @click="next">立即购买</div>
       </div>
     </div>
     <!--model end-->

     <div class="shopbottom">
       <div class="shopbottomleft">
         <div class="span" @click="tohome"><image src="https://shop.guqinet.com/html/images/shanquan/shumainfo/home.png"></image><small>首页</small></div>
         <div class="span"><image src="https://shop.guqinet.com/html/images/shanquan/shumainfo/lt.png"></image><small>客服</small></div>
         <div class="span" @click="collection">
           <image v-if="posts" src="https://shop.guqinet.com/html/images/shanquan/shumainfo/xin1.png"></image>
           <image v-else src="https://shop.guqinet.com/html/images/shanquan/shumainfo/xx.png"></image>
           <small>收藏</small>
         </div>
      </div>
       <div class="shopbottomright">
         <image src="https://shop.guqinet.com/html/images/shanquan/shumainfo/btn.png"></image>
         <div class="btnlist">
           <div class="btnlistleft" @click="showmodel">加入购物车</div>
           <div class="btnlistright" @click="showmodel">立即购买</div>
         </div>
       </div>
     </div> 
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse' 
import globalStore from "../../stores/global-store";

export default {
  data () {
    return {
     goodDetail:[],
     Gallery:[],
     tags:[],
     article:"",
     elesimg:globalStore.state.imgapi+"/image/group/10.png",
     gimg:globalStore.state.imgapi+"/image/group/6.png",
     xximg:globalStore.state.imgapi+"/images/guige/xx.png",
     showModalStatus: false,
     animationData:{},
     pic:1,
     posts:false
     }
  },

  components: {
    wxParse
  },

  methods: {
    //请求页面初始数据
    geiShopinfo(goodid){
      let that=this;
      wx.showLoading({
      title: '加载中',
      })
      const api="https://www.guqinjiujiang.xyz:8444/guqinzhen";
      let goodparms={}
      that.memberId=wx.getStorageSync('memberId');//此处定义了memberId
      goodparms.goodsId=goodid;
      goodparms.memberId= that.memberId;//此为变量为异步缓存过来的参数
      console.log(goodparms)
     wx.request({
        url:  api+'/api/Goods/getGoods',
        data: {
          parms:goodparms
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          if(res.data.code==0){
           //判断是否收藏
           if(res.data.count==0){
             that.posts=false;
           }else{
             that.posts=true;
           }
           wx.hideLoading();
           that.goodDetail=res.data.Goods;
           that.Gallery=res.data.Gallery;
           that.tags=res.data.tags;
          }
          that.article = res.data.Goods.intro;
          
          console.log(res.data)
        }
      })
      //请求获取productId
      wx.request({
        url: api + '/api/Goods/getProduct',
        data: {
          parms: goodparms
        },
        header: {
          'Content-Type': 'json'
        },
        success: function (res) {
            that.productId=res.data.product.productId

        }
      })
    },

     showmodel(){
      console.log("55555")
      this.showModle();
    },
    colModel(){
         console.log("9666")
      this.hidemodel();
    },
    //显示模拟框
    showModle(){
      let that=this;
      let animation=wx.createAnimation({//设置动画
      duration: 200,
      timingFunction: "linear",
      delay: 0
      })
      this.animation = animation;//设置开始动画
      animation.translateY(300).step();
      that.animationData=animation.export();
      that.showModalStatus=true;
      setTimeout(function(){//设置动画结束
        animation.translateY(0).step();
        this.animationData=animation.export()
      }.bind(this),200)
    },
    //隐藏模拟框
    hidemodel(){
      let that=this;
      let animation=wx.createAnimation({//设置动画
      duration: 200,
      timingFunction: "linear",
      delay: 0
      })
      this.animation = animation;//设置开始动画
      animation.translateY(300).step();
      that.animationData=animation.export();
      setTimeout(function(){//设置动画结束
        animation.translateY(0).step();
        this.animationData=animation.export()
        that.showModalStatus=false;
      }.bind(this),200)
    },
    
     //加入购物车
     toCart(){
      let that=this;
      if(wx.getStorageSync('memberId') == "00"){
        wx.showModal({
          title:'提示',
          content:'你还未登录，是否登录',
          success:function(res){
            if(res.confirm){
              wx.switchTab({
                url:'../my/main',//路径需更改
              })
            }else if(res.cancel){
              that.colModel();
            }
          }
        })
      }else{
        if(that.goodDetail.enableStore == 0){
          wx.showToast({
            title:'商品无库存',
            icon:'succcess',
            durantion:2000
          })
        }else{
            var cartparms = {};
            cartparms.productId = that.productId
            cartparms.original = that.goodDetail.thumbnail
            cartparms.memberId = that.memberId
            cartparms.goodsId = that.goodDetail.goodsId,
            cartparms.itemtype = that.goodDetail.typeId,
            cartparms.image = that.goodDetail.thumbnail
            cartparms.num = that.pic,
            cartparms.point = that.goodDetail.point
            cartparms.weight = that.goodDetail.weight,
            cartparms.name = that.goodDetail.name,
            cartparms.price = that.goodDetail.price,
            cartparms.cart = 1//判断购物车订单
            wx.request({
              url: globalStore.state.api + '/api/shoppingCart/save',
              method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                parms: JSON.stringify(cartparms)
              },
              success: function (res) {
                wx.showToast({
                title: "添加成功",
                icon: "success",
                durantion: 2000
              })
               that.colModel()
              }
            })
        }
      }
     },
    
    //点击立即购买
    next(){
     let that=this;
     if(wx.getStorageSync("memberId")=='00'){
       console.log("555");
      wx.showModal({
        title:'提示',
        content: '你还未登录，是否登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../my/main',
            })
          } else if (res.cancel) {
            that.colModel()
          }
        }
      })

     }else{
       if(that.pic>that.goodDetail.enableStore){
         wx.showToast({
           title:"库存不够！",
           icon:"success",
           durantion:2000
         })
       }
       else{
         let goodarr=[];
         let goodlist={};
         goodlist.pic = that.pic;
         goodlist.goodsId = that.goodDetail.goodsId;
         goodlist.productId = that.productId;
         goodarr[0]=goodlist;
         wx.navigateTo({//跳转并且带参数传输
         url: "../dingdan/main?goodlist=" + JSON.stringify(goodarr)+'&cart=0'
        })
       }
     }
    },
    //收藏
    collection(){
      let that=this;
      if(wx.getStorageSync('meberId')=="00"){//第一步判断是是否登录
        wx.showModal({
          title:'提示',
          contnt:'你还没有登录，是否登录',
          success:function(res){
            if(res.confirm){//点击确定是直接跳转到用用户页进行登录
                wx.switchTab({
                  url:'../my/main'
                })
            }else if(res.cancel){}
          }
        })
      }else{//若已经登录则请求收藏的字段信息
        let parms={};
        let favorite={};
        favorite.memberId=that.memberId;
        favorite.goodsId=that.goodDetail.goodsId;
        parms.favorite=favorite;
        console.log(favorite);
        parms=JSON.stringify(parms);
        if(that.posts==false){//若未收藏点击则收藏
          wx.request({
            url:globalStore.state.api+'/api/favorite/add', //仅为示例，并非真实的接口地址
             method: 'POST',
            data: {
               parms: parms
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            success: function(res) {
              that.posts=!that.posts;
              wx.showToast({
                title:'收藏成功',
                icon:'success',
                durantion:2000
              })
              console.log("收藏已经执行")
            }
          })
        }else{//若已收藏则点击取消收藏
          wx.request({
            url:globalStore.state.api+'/api/favorite/delete', 
            method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                parms: parms
              },
            success: function(res) {
              that.posts=!that.posts;
                wx.showToast({
                title:'收藏已取消',
                icon:'success',
                durantion:2000
              })
              console.log("取消收藏已经执行")
            }
          })
        }
      }
    },

    //绑定加的数量
    plus(){
      let pic=this.pic;
      pic+=1;
      this.pic=pic;
    },
    //绑定减数量
    less(){
      let pic=this.pic;
      if(pic<=1){
        return;
      }
      pic-=1;
      this.pic=pic;
    },
    //当input的框输入的时候
    inputchange(e){
      this.pic=parseInt(e.target.value);
    },
    //跳转至首页
    tohome(){
      wx.switchTab({
        url:'../index/main'
      })
    }
   },

   onLoad:function(options){
     this.geiShopinfo(options.goodid);
  }
}
</script>



<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");

.sminfoContainer{background:#fff;}

image{
  display: block;
}
/*Shopinfo*/
.Shopinfo{padding: 0 25rpx 15rpx;}
.shoppir{color:#fb4901;font-size: 28rpx;}
.shoppir label{font-size: 22rpx;}
.shopinfotab{display: flex;justify-content: space-between;margin-top: 18rpx;}
.shopinfotab span{color:#9e9e9e;font-size: 20rpx;}
.shopinfotitel{font-size: 30rpx;}
.sminfoBrand swiper{height: 500rpx;}
.sminfoBrand image{width: 100%;}
/*shopcontent*/
.shopcontent{border-top:25rpx solid #f5f5f5;margin-bottom: 110rpx;}
.shopcontenttop{padding:15rpx 25rpx;;}
.shopcontenttop ul{display: flex;justify-content: space-between}
.shopcontenttop li image{width: 38rpx;height: 38rpx;margin-right: 8rpx;}  
.shopcontenttop li{font-size: 20rpx;display: flex;align-items: center;justify-content: center;  }
.shpocontenxq{margin-top: 25rpx;}
.shoptitle{padding-left: 25rpx;padding-bottom: 15rpx;}
.shoptitle span{border-left: 3px solid #0d68f4;padding-left: 10rpx;font-size: 28rpx;}
.shoptitle2{display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #d52939;}
.shoptitle2 span{border-left: 3px solid #d52939;}
.shoptitle2 image{width: 130rpx;height: 43rpx;}
.shopcontents01{display: block;}
.shopcontents01 image{width: 100%;height: 950rpx;}
.shopcontents02 image{width: 100%;height: 550rpx;}  
.shoprcoinfo{padding-left: 20rpx;padding-right: 20rpx;padding-top: 25rpx;border-top: 1px dashed #666;}
.shoprcoinfo strong{display: block;font-weight:bold;font-size: 30rpx;}
.shopbaozhang{color:#666;font-size: 20rpx;margin-top: 10rpx;}

.shopcontents03 image{height: 370rpx;width: 100%;}

/*shopbottom*/
.shopbottom{display: flex;position: fixed;bottom: 0;left: 0;background: #ffffff;width: 100%;padding-top: 15rpx;padding-bottom: 15rpx;border-top:1px solid #f8f8f8;}
.shopbottom .shopbottomleft{width: 40%;}
.shopbottomleft{display: flex;align-items: center;padding-left: 40rpx;}
.shopbottomleft .span{margin-right: 45rpx;}
.shopbottomleft .span image{width: 50rpx;height: 50rpx;}
.shopbottomleft .span small{font-size: 22rpx;}
.shopbottom .shopbottomright{width: 60%;}
.shopbottomright{display: flex;justify-content: center;align-items: center;}
.shopbottomright image{width: 374rpx;height: 73rpx;}
.shopbottomright{position: relative;}
.btnlist{position: absolute;left: 0;top: 0;width: 84%; display: flex;align-items: center;height: 74rpx;margin-left: 8%;}
.btnlist div{height: 100%;line-height: 74rpx;}
.btnlistleft{width: 50%;color:#ffffff;font-size: 28rpx;text-align: center;}
.btnlistright{width: 50%;color:#ffffff;font-size: 28rpx;text-align: center;}
.bordertop{border-top:20rpx solid #f5f5f5;padding-top: 15rpx  ;}

/*模拟框样式*/
.shopmodel{padding-top: 20rpx;position: fixed;bottom: 0;width: 100%;left: 0;background: #ffffff;border-top: 1px solid #f8f8f8;z-index:2;
}
.modelwarp{display: flex;padding-left: 20rpx;padding-right: 20rpx;}
.warpleft{width: 20%;margin-right: 2%;}
.warpleft image{width: 100%;height: 160rpx;}
.col-img{width: 100rpx;}
.col-img image{width: 45rpx;height: 45rpx;float:right;}
.warpright{width: 78%;}
.warpright span{font-size: 30rpx;}
.warprighttop{display: flex;justify-content: space-between;}
.warprightbottom{display: flex;justify-content: space-between;margin-top: 25rpx;border-bottom: 1px solid #f8f8f8;}
.warprightbottom span:nth-child(1){color:red;}
.warprightbottom span:nth-child(2){color:#666;}
.modelNum{display: flex;justify-content: space-between;height: 120rpx;line-height: 120rpx;padding-left: 20rpx;padding-right: 20rpx;}
.modelNum span{font-size: 30rpx;color:#666;}
.btn{display: flex;align-items: center;}

.modelNum input{margin:0;width:30px;display:flex;justify-content:center;align-items:center;text-align:center;border-top:1px solid #eee;border-bottom:1px solid #eee;font-size:15px;height:50rpx;min-height:40rpx;color:#000;}
.del1{display:flex;justify-content:center;align-items:center;border-top-left-radius:50px;border-bottom-left-radius:50px;border-bottom-right-radius:0px;border-top-right-radius:0px;height:50rpx;width:55rpx;border:1px solid #DDD;font-size:18px;}
.add1{display:flex;justify-content:center;align-items:center;border-top-left-radius:0px;border-bottom-left-radius:0px;border-bottom-right-radius:45%;border-top-right-radius:45%;height:50rpx;width:55rpx;border:1px solid #DDD;font-size:18px;}

.modelbtn{margin-left: -20rpx;margin-right: -20rpx;}
.modelbtn{display: flex;height: 76rpx;}
.modelbtn div{width: 50%;text-align: center;line-height:66rpx;color: #ffffff;font-size: 32rpx;}
.modelbtn .cart{background:#feba33;}
.modelbtn .buy{background:#ff4f4f;}


</style>
