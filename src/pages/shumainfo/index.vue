<template>
  <div class="sminfoContainer">
     <div class="sminfoBrand">
          <swiper autoplay="true" interval="5000" duration="1000" indicator-dots="true" :style="{width:imageWidth,height:imageHeigth}">
            <swiper-item v-for="(item,index) in Gallery" :key="item" :index="index">
              <image :src="item.original"></image>
            </swiper-item>
          </swiper>    
      </div>
     <!--sminfoBrand end-->

     <div class="Shopinfo">
        <div class="shopinfotitel">{{goodDetail.name}}</div>
        <div class="price"> 
          <div class="priceleft">
              会员价
          </div>
          <div class="priceright">
            <div class="shoppir"><label>￥</label>{{goodDetail.price}}</div>
            <div class="shoppir"><label>￥</label>{{goodDetail.cost}}+{{goodDetail.memberPoint}} <span>1875链</span></div>
          </div>
          <div class="sharing" @click="sharemodel">
            <image :src='shaimg'></image>
          </div>
        </div>
        <div class="shopinfotab"><span>快递：免运费</span><span>库存：{{goodDetail.enableStore}}</span></div>
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
          <wxParse :content="article" @prediv="prediv" @navigate="navigate" />
        </div>
     </div>
     </div>
     <!--shopcontent end-->
     <!-- 分享模态框 -->
  <div class="commodity_screen" @click="hideshareModal" v-if="showshareModal"></div>
  <div :animation="animationData" class="sharemodel" v-if="showshareModal">  
     <div class='sharemodel-left'>
      <button open-type='share' class="sharebtn">
       <div class='sharicon'>
          <image src='/static/images/wetchat.png'></image>
        </div>
        分享好友
      </button>    
     </div>
      <div class='sharemodel-right' @click='jumpshare(goodDetail.thumbnail,goodDetail.name,goodDetail.goodsId,goodDetail.price)'>
      <div class='sharicon'>
          <image src='/static/images/postshare.png'></image>
        </div>
        生成海报
     </div>
    </div>
     <!-- 立即购买模态框 -->
     <div class="commodity_screen"  v-if="showModalStatus" @click="colModel"></div>
     <div class="shopmodel" v-if="showModalStatus" :animation="animationData">
       <div class="modelwarp">
         <div class="warpleft"><image :src="goodDetail.thumbnail"></image></div>
         <div class="warpright">
           <div class="warprighttop"><span class="spantitle">{{goodDetail.name}}</span><div class="col-img"><image :src="xximg" @click="colModel"></image></div></div>
           <div class="warprightbottom"><span>￥<small>{{goodDetail.cost}}+{{goodDetail.memberPoint}}</small></span></div>
          <div class="warprightbottom"><span>￥<small>{{goodDetail.price}}</small></span><span>库存{{goodDetail.enableStore}}件</span></div>

         </div>
       </div>
        <!--规格  -->
        <div class='commodity-box2' v-for="(spaceOut,spaceValueindex) in spaceValue" :index="index" :key="key">
            <text class="guigetitle">{{spaceOut.specName}}</text>
            <div class='spebox'>
              <div class='specification' v-for=' (spaceInner, spaceInnerindex) in spaceOut.value' @click='chooseSpace(spaceValueindex,spaceInnerindex)'>
                <button class="spebtn" v-bind:class="{active:spaceInner.isSelect}">{{spaceInner.specvalue}}</button>
              <!--   <button class="spebtn {{current == item.specValueId?'active':''}}" data-text='{{item.specvalue}}' data-id="{{item.specValueId}}" wx:for-index="index" wx:for-item="j" bindtap='changs'>{{item.specvalue}}</button> -->
              </div>
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
       <div>
       
       </div>
       <div class="modelbtn">
         <div class="cart" @click="toCart">加入购物车</div>
         <div class="buy" @click="next">立即购买</div>
       </div>
     </div>


     <div class="shopbottom">
       <div class="shopbottomleft">
         <div class="span" @click="tohome"><image :src="shopimg"></image><small>首页</small></div>
         <div class="span" @click="kefu"><image :src="kefu"></image><small>客服</small></div>
         <div class="span" @click="collection">
           <image v-if="!posts" :src="xin"></image>
           <image v-else :src="selctxin"></image>
           <small>收藏</small>
         </div>
      </div>
       <div class="shopbottomright">
         <image :src="shopbtnimg"></image>
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
     spaceValue:[],
     Gallery:[],
     tags:[],
     article:"",
     shaimg:"https://shop.guqinet.com/html/images/guqinzhen/image/group/5.png",
     elesimg:globalStore.state.imgapi+"/image/group/10.png",
     shopbtnimg: globalStore.state.imgapi+'image/shopbtn.png',
     shopimg: globalStore.state.imgapi+'image/shophome01.png',
     xin: globalStore.state.imgapi+'image/shopxin.png',
     selctxin: globalStore.state.imgapi+'image/selectxin.png',
     gimg:globalStore.state.imgapi+"image/zhichi.jpg",
     xximg:globalStore.state.imgapi+"/image/xx.png",
     kefu:globalStore.state.imgapi+"/image/weixing02.png",
     showModalStatus: false,
     animationData:{},
     pic:1,
     posts:false,
     imageWidth:'',
     imageHeigth:'',
     goodname:'',
     specValueId:'',
     goodsId:'',
     space:'',
     count:0,
     showshareModal:false

     }
  },

  components: {
    wxParse
  },

  methods: {
    jumpshare:function(thumbnail,name,goodsId,price){
    var that=this;
    if (wx.getStorageSync('memberId')=="00"){
      wx.showModal({
        title: '提示',
        content: '你还未登录，是否登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../my/my',
            })
          } else if (res.cancel) {
            that.hideshareModal()
          }         
        }
      })
    }else{
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.request({
              url: globalStore.state.api + '/api/distribe/whetherDistribe',
              headers: {
                'Content-Type': 'application/json'
              },
              data: {
                memberId: wx.getStorageSync('memberId')
              },
              success: function (res) {
                console.log(res.data)
                if (res.data.code == 1) {
                  wx.navigateTo({
                  url: '../postersharing/main?goodid=' + goodsId + '&goodimg=' +thumbnail + '&goodname=' + name + '&goodprice=' + price+'&distribeId='+res.data.distribeId,
                  })
                }
                else {
                wx.navigateTo({
                   url: '../postersharing/main?goodid=' + goodsId + '&goodimg=' +thumbnail + '&goodname=' + name + '&goodprice=' + price+'&distribeId=null',
                  })
                }
                // wx.navigateTo({
                //   url: '../postersharing/postersharing?goodid=' + e.currentTarget.dataset.goodid + '&goodimg=' + e.currentTarget.dataset.goodimg + '&goodname=' + e.currentTarget.dataset.goodname + '&goodprice=' + e.currentTarget.dataset.goodprice,'
                // })
              }
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '你还未登录，是否登录',
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../my/my',
                  })
                } else if (res.cancel) {
                  that.hideshareModal()
                }
              }
            })
          }
        }
      })
    }  
  },
    hideshareModal:function(){
    var that=this;
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateY(300).step()
    that.animationData=animation.export()
    setTimeout(function () {
      animation.translateY(0).step()  
      that.animationData=animation.export()
      that.showshareModal=false
    }, 200)
    },
    sharemodel:function(){
    var that=this
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateY(300).step()    
    that.animationData= animation.export()
    that.showshareModal = true
    setTimeout(function () {
      animation.translateY(0).step() 
      that.animationData=animation.export()
    }, 200)
    },
    chooseSpace:function(spaceValueindex,spaceInnerindex){
      var that =this;
 
      for(var i in that.spaceValue){
        for(var j in that.spaceValue[i].value){
          that.spaceValue[spaceValueindex].value[j].isSelect=false
        }
      }
      that.spaceValue[spaceValueindex].value[spaceInnerindex].isSelect=true
 
      let count=0;
      // 遍历数组，如果所有规格都有选项则发起请求拿到商品详情
      for(var i in that.spaceValue){
        for(var j in that.spaceValue[i].value){
          if(that.spaceValue[i].value[j].isSelect==true){
            count++
          }
        }
      }
      that.count=count;
      if(count==that.spaceValue.length){  
       that.specValueId=""
       that.space=""
       for(var i in that.spaceValue){
        for(var j in that.spaceValue[i].value){
          if(that.spaceValue[i].value[j].isSelect==true){
            that.specValueId+=that.spaceValue[i].value[j].specValueId+','
            that.space+=that.spaceValue[i].value[j].specvalue
          }
        }
       }
      let goodparms={}
      //that.memberId=wx.getStorageSync('memberId');//此处定义了memberId
      goodparms.goodsId=that.goodsId;
      goodparms.specs= that.specValueId.slice(0,-1);
       wx.request({
        url: globalStore.state.api  + '/api/Goods/getProduct',
        data: {
          parms: goodparms
        },
        header: {
          'Content-Type': 'json'
        },
        success: function (res) {
           if(res.data.code==0){
            that.productId=res.data.product.productId
            that.goodDetail.price=res.data.product.price;
            that.goodDetail.cost=res.data.product.cost;
            that.goodDetail.memberPoint=res.data.product.isPack;
            that.goodDetail.enableStore=res.data.product.enableStore;
           }
           else{
             that.goodDetail.enableStore=0;
           }
        
        }
      })
      }
    },
    //请求页面初始数据
    getShopinfo(goodid){
      let that=this;
      wx.showLoading({
      title: '加载中',
      })
      let goodparms={}
      that.memberId=wx.getStorageSync('memberId');//此处定义了memberId
      goodparms.goodsId=goodid;
      goodparms.memberId= that.memberId;//此为变量为异步缓存过来的参数
   
     wx.request({
        url:  globalStore.state.api +'/api/Goods/getGoods',
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
           // 判断是否有规格
           if(res.data.Goods.haveSpec!=0){
            let adjuncts=JSON.parse(res.data.Goods.adjuncts)
            for(var i in adjuncts){
              for(var j in adjuncts[i].value){
                adjuncts[i].value[j].isSelect=false
              }

            }
            that.spaceValue = adjuncts;

          }else{
             wx.request({
              url: globalStore.state.api  + '/api/Goods/getProduct',
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
            that.spaceValue = [];
          }
         
          }
    
          that.article = res.data.Goods.intro;
          

        }
      })
      //请求获取productId
      
    },

     showmodel(){

      this.showModle();
    },
    colModel(){

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
    
    //联系客服
    kefu(){
        wx.makePhoneCall({
          phoneNumber: '13767842228', //仅为示例，并非真实的电话号码
          success:function(){
            console.log("拨打成功")
          },
          fail:function(){
            console.log("拨打失败")
          }
      })
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
            cartparms.point = that.goodDetail.memberPoint
            cartparms.weight = that.goodDetail.cost,
            cartparms.name = that.goodDetail.name,
            cartparms.price = that.goodDetail.price,
            cartparms.cart = 1//判断购物车订单
            if(that.goodDetail.haveSpec==0){
             cartparms.specvalue=null;
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
            }else{
              if(that.count==that.spaceValue.length){
               cartparms.specvalue=that.space;
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
              }else{
               wx.showToast({
                title:"请选择规格",
                icon:'none',
                duration:1000
              })
              }
            }



            
           
        }
      }
     },
    
    //点击立即购买
    next(){
     let that=this;
     if(wx.getStorageSync("memberId")=='00'){

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
         goodlist.num=that.pic;
         goodlist.name=that.goodDetail.name;
         goodlist.goodsId = that.goodDetail.goodsId;
         goodlist.productId = that.productId;
         goodlist.price=that.goodDetail.price;
         goodlist.cost=that.goodDetail.cost;
         goodlist.memberPoint=that.goodDetail.memberPoint;
         goodlist.image=that.goodDetail.thumbnail
         if(that.goodDetail.haveSpec==0){
           goodlist.specvalue=null
           goodarr[0]=goodlist;
            wx.navigateTo({//跳转并且带参数传输
             url: "../dingdan/main?goodlist=" + JSON.stringify(goodarr)+'&cart=0'+'&goodname='+that.goodDetail.brandName
            })
         }
         else{
            if(that.count==that.spaceValue.length){
              goodlist.specvalue=that.space
              goodarr[0]=goodlist;
      
              wx.navigateTo({//跳转并且带参数传输
               url: "../dingdan/main?goodlist=" + JSON.stringify(goodarr)+'&cart=0'+'&goodname='+that.goodDetail.brandName
              })
            }
            else{
              wx.showToast({
                title:"请选择规格",
                icon:'none',
                duration:1000
              })
            }
         }    
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
    var that=this
    var windWidth=(wx.getSystemInfoSync().windowWidth);
     that.imageWidth=windWidth+"px";
     that.imageHeigth=windWidth*9/16+'px';
     that.getShopinfo(options.goodsId);
     that.goodsId=options.goodsId;
     that.goodname=options.goodname;
  },
  onShow:function(){
    var that=this;
    that.showModalStatus=false;
    that.showshareModal=false;
  },
 onShareAppMessage: function () {
   withShareTicket: true
 },
}
</script>



<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");

.sminfoContainer{background:#fff;}

image{
  display: block;
  width: 100%;height: 100%;
}
.price{
  display: flex;
}
.priceleft{
  height: 80rpx;
  line-height: 80rpx;
  font-size: 0.8em;
/*  width: 150rpx;
  text-align: center;*/
  padding-right: 20rpx;
  box-sizing: border-box;
}
.priceright{
  flex-grow: 1;
}
.commodity_screen {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.2;
  overflow: hidden;
  z-index: 1000;
  color: #fff;
}
.sharebtn{
  background: #fff;
}
.sharebtn::after{
  border: none;
}

/*规格*/
.commodity-box2{
 font-size:32rpx;
 padding-top: 25rpx;
 padding-bottom: 20rpx;
 padding-left: 20rpx;
 box-sizing: border-box;
}
.commodity-box2{border-bottom: 1px solid #f5f5f5;}
.spebtn{
text-align:center;
height: 60rpx;
line-height: 60rpx;
display:inline-table;
padding:5px 10px;
font-size:30rpx;
border-radius:5rpx;
background: #f2f2f2;
color: #000;
box-sizing: border-box; 
}
.spebox{display: flex;
  flex-wrap: wrap;
  padding-top: 6rpx;
}
.spebox button{font-size: 26rpx;color: #666;background: #f5f5f5;height: 44rpx;line-height: 44rpx;}
.spebox button::after{border:none}


.specification{
 margin-top: 10rpx;
 margin-right: 10rpx;
}
/* 规格被选中 */
.spebox .active{
  color:#fff;
  background: #F64F57;
}

/*分享*/
.sharing{
  width: 60rpx;
  height: 60rpx;
  overflow: hidden;
}
.sharemodel{
  display: flex;
  justify-content: space-around;
  height: 300rpx;
  width: 100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background: #fff;
  text-align: center;
}
.sharemodel-left{
  width: 50%;
  
}
.sharemodel-right{
width: 50%;
}
.sharicon{
  width: 150rpx;
  height: 150rpx;
  overflow: hidden;
  margin: 20rpx auto;
}
.sharicon image{
  width: 100%;
  height: 100%;
  display: block;
}
/*Shopinfo*/

.Shopinfo{padding: 0 25rpx 15rpx;}
.shoppir{color:#fb4901;font-size: 28rpx;}
.shoppir label{font-size: 22rpx;}
.shoppir span{border: 1px solid #fb4901;border-radius: 30rpx;background: #fb4901;color: #fff;font-size: 25rpx;padding-left: 15rpx;padding-right: 15rpx;}
.shopinfotab{display: flex;justify-content: space-between;margin-top: 18rpx;}
.shopinfotab span{color:#9e9e9e;font-size: 20rpx;}
.shopinfotitel{font-size: 30rpx;height: 80rpx;text-overflow:ellipsis;overflow: hidden;word-break:break-all;
display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
.sminfoBrand swiper{height: 460rpx;}
.sminfoBrand image{width: 100%;height: 100%;display: block;}
/*shopcontent*/
.shopcontent{border-top:25rpx solid #f5f5f5;margin-bottom: 110rpx;}
.shopcontenttop{padding:15rpx 25rpx;;}
.shopcontenttop ul{display: flex;justify-content: space-between}
.shopcontenttop li image{width: 38rpx;height: 38rpx;margin-right: 8rpx;}  
.shopcontenttop li{font-size: 20rpx;display: flex;align-items: center;justify-content: center;  }
.shpocontenxq{margin-top: 25rpx;}
.shoptitle{padding-left: 25rpx;padding-bottom: 15rpx;}
.shoptitle span{border-left: 3px solid #F64F57;padding-left: 10rpx;font-size: 28rpx;}
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
.shopmodel{padding-top: 20rpx;position: fixed;bottom: 0;width: 100%;left: 0;background: #ffffff;border-top: 1px solid #f8f8f8;z-index:2000;
}
.modelwarp{display: flex;padding-left: 20rpx;padding-right: 20rpx;}
.warpleft{width: 20%;margin-right: 2%;}
.warpleft image{width: 100%;height: 160rpx;}
.col-img{width: 100rpx;}
.col-img image{width: 45rpx;height: 45rpx;float:right;}
.warpright{width: 78%;}
.warpright span{font-size: 30rpx;}
.warprighttop{display: flex;justify-content: space-between;}
.warprighttop .spantitle{font-size: 26rpx;height: 72rpx;text-overflow:ellipsis;overflow: hidden;word-break:break-all;
display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
.warprightbottom{display: flex;justify-content: space-between;}
.warprightbottom small{font-size: 32rpx;font-weight: bold;}
.warprightbottom span{display: flex;align-items: center;}
.guigetitle {font-size: 30rpx;font-weight: bold;}
.warprightbottom span:nth-child(1){color:red;}
.warprightbottom span:nth-child(2){color:#666;}
.modelNum{display: flex;justify-content: space-between;height: 120rpx;line-height: 120rpx;padding-left: 20rpx;padding-right: 20rpx;}
.modelNum span{font-size: 30rpx;color:#666;}
.btn{display: flex;align-items: center;}

.modelNum input{margin:0;width:30px;display:flex;justify-content:center;align-items:center;text-align:center;border-top:1px solid #eee;border-bottom:1px solid #eee;font-size:15px;height:50rpx;min-height:40rpx;color:#000;}
.del1{display:flex;justify-content:center;align-items:center;border-top-left-radius:50px;border-bottom-left-radius:50px;border-bottom-right-radius:0px;border-top-right-radius:0px;height:50rpx;width:55rpx;border:1px solid #DDD;font-size:18px;}
.add1{display:flex;justify-content:center;align-items:center;border-top-left-radius:0px;border-bottom-left-radius:0px;border-bottom-right-radius:45%;border-top-right-radius:45%;height:50rpx;width:55rpx;border:1px solid #DDD;font-size:18px;}

.modelbtn{margin-left: -20rpx;margin-right: -20rpx;}
.modelbtn{display: flex;height: 92rpx;}
.modelbtn div{width: 50%;text-align: center;line-height:92rpx;color: #ffffff;font-size: 32rpx;}
.modelbtn .cart{background:#feba33;}
.modelbtn .buy{background:#ff4f4f;}

.sminfoContainer{position: relative;}
.shoumask{width:100%;height:100vh;position:fixed;top:0;left:0;background:#000;opacity:0.2;overflow:hidden;z-index:1000;color:#fff;z-index: 1;}
</style>
