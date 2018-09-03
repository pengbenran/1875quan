<template>
   <div class="smContainer">
     <div class="smBrand"><image src="https://shop.guqinet.com/html/images/shanquan/3cbrand.jpg"></image></div>
     <!--smBrand end-->

     <div class="smList">
       <ul>
        <li v-for="(item,index) in kind" :key='item' :index='index'  @click="jump(item.jumpurl,item.brandid)" >
           <image :src='item.imgurl'></image>
           <span>{{item.name}}</span>
         </li>
       </ul>
     </div>
     <!--smList end-->
    

    <div class="smMain">
      <div class="smMiantitle"><image src="https://shop.guqinet.com/html/images/shanquan/3cjtitle01.jpg"></image></div>
      <div class="smMainwarp">
        <div class="smMiantop">
         <div class="smMiantopimg"><image src="https://shop.guqinet.com/html/images/shanquan/3cjinpin.jpg"></image></div>
         <span>iphoneX(黑、亮黑、金、玫瑰金、银128G)</span>
         <small>￥8500 <label>9500</label></small>
        </div>
        <!--第一张大图-->
        <div class="smMainlist">
          <ul>
            <li><div class="smMainlistimg"><image src="https://shop.guqinet.com/html/images/shanquan/3cList01.jpg"></image></div>
              <span>vivoX9(黑、亮黑、银128G)</span><small>￥8500</small>
            </li>
            <li><div class="smMainlistimg"><image src="https://shop.guqinet.com/html/images/shanquan/3cList02.jpg"></image></div>
              <span>OPPOX10(黑、亮黑、银128G)</span><small>￥8500</small>
            </li>
            <li><div class="smMainlistimg"><image src="https://shop.guqinet.com/html/images/shanquan/3cList03.jpg"></image></div>
              <span>小米MIX2(黑、亮黑、银128G)</span><small>￥8500</small>
            </li>
            <li><div class="smMainlistimg"><image src="https://shop.guqinet.com/html/images/shanquan/3cList04.jpg"></image></div>
              <span>华为P20(黑、亮黑、银128G)</span><small>￥8500</small>
            </li>
          </ul>
        </div>
        <!--四张图-->
      </div> 
      <!--smMainwarp end-->

      <div class="smMainwarp smMaintj">
        <div class="smMiantop">
         <div class="smMiantopimgtj"><image src="https://shop.guqinet.com/html/images/shanquan/3cjinpin02.jpg"></image></div>
         <span>华为P20(黑、亮黑、金、玫瑰金、银128G)</span>
         <small>￥8500 <label>9500</label></small>
        </div>

        <div >
            <div class="smMiantitle smMiantitletj"><image src="https://shop.guqinet.com/html/images/shanquan/3cjtitle02.jpg"></image></div>
        </div>

        <!--第一张大图-->
        <div class="smMainlist smMainlisttj">
          <ul>
            <li><div class="smMainlistimg"><image src="https://shop.guqinet.com/html/images/shanquan/3cList01.jpg"></image></div>
              <span>vivoX9(黑、亮黑、银128G)</span><small>￥8500</small>
            </li>
            <li><div class="smMainlistimg"><image src="https://shop.guqinet.com/html/images/shanquan/3cList02.jpg"></image></div>
              <span>OPPOX10(黑、亮黑、银128G)</span><small>￥8500</small>
            </li>
            <li><div class="smMainlistimg"><image src="https://shop.guqinet.com/html/images/shanquan/3cList03.jpg"></image></div>
              <span>小米MIX2(黑、亮黑、银128G)</span><small>￥8500</small>
            </li>
            <li><div class="smMainlistimg"><image src="https://shop.guqinet.com/html/images/shanquan/3cList04.jpg"></image></div>
              <span>华为P20(黑、亮黑、银128G)</span><small>￥8500</small>
            </li>
          </ul>
        </div>
        <!--四张图-->
      </div> 
      <!--smMainwarp end-->
    </div>

    <div class="smcompany"><span>谷琴技术支持</span></div>
    <!--smMain end-->
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"; 

export default {
  data () {
    return {
       kind:[
         {name:'iphone',brandid:32,imgurl:'https://shop.guqinet.com/html/images/shanquan/3citem01.jpg',jumpurl:'../shumalist/main'},
         {name:'华为',brandid:30,imgurl:'https://shop.guqinet.com/html/images/shanquan/3citem02.jpg',jumpurl:'../shumalist/main'},
         {name:'vivo',brandid:33,imgurl:'https://shop.guqinet.com/html/images/shanquan/3citem03.jpg',jumpurl:'../shumalist/main'},
         {name:'OPPO',brandid:43,imgurl:'https://shop.guqinet.com/html/images/shanquan/3citem04.jpg',jumpurl:'../shumalist/main'}
         ]
     }
  },

  components: {
 
  },

  methods: {
    jump:function(url,brandid){
      wx.navigateTo({
      url: url+'?brandid='+brandid,
    })
    },
       //获得商品详情
    geiMain(){
      //获取商品详情
      let that=this;
      wx.request({
        url: globalStore.state.api + '/api/index/main',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          that.menus=res.data.data.menus;
          that.brand=res.data.data.brand;
          that.data=res.data.data;
          that.gonggao=res.data.data.indexNotice.content;
         
         //let length = that.data.gonggao.length * that.data.size;//文字长度
         let windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
         //that.length=length;
         that.windowWidth=windowWidth;
         //that.marquee2_margin=length < windowWidth ? windowWidth - length : that.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
         wx.setStorageSync('indexdata', res.data.data.message, )

         console.log(that.brand);
        },
        fail:function(){
            wx.showToast({
              title:'网络异常'
            })
           wx.stopPullDownRefresh()
           wx.hideNavigationBarLoading()
        }
      })
    }

   },

 onLoad(){
    // var that=this;
    // var windWidth=wx.getSystemInfoSync().windowWidth;
    // that.imageWidth=windWidth+"px";
    // that.imageHeigth=windWidth*5.101+'px';
    this.geiMain();
  }
}
</script>

<style scoped>
image{width: 100%;height: 100%;display: block;}
.smBrand{height: 290rpx;}

/*smList*/
.smList ul{padding-left: 15rpx;padding-right: 15rpx;height: 150rpx;}
.smList li{float: left;height: 100rpx;width: 25%;}
.smList image{width: 88rpx;height: 88rpx;margin: auto;}
.smList span{display: block;text-align: center;font-size: 23rpx;margin-top: 13rpx;}

/*smMian*/
.smMain{margin-top: 25rpx;border-top:8px solid #f4f4f4;}
.smMiantitle{text-align: center;margin-top: 38rpx;}
.smMiantitle image{height: 38rpx;width: 202rpx;margin:auto;}
.smMainwarp{text-align: center;}
.smMiantopimg{height:600rpx;} 
.smMiantop span{display: block;font-size: 28rpx;margin-top: 15rpx;}
.smMiantop small{color:#ff882c;font-size: 30rpx;margin-top: 10rpx;}
.smMiantop label{color:#ccc;text-decoration:line-through;font-size: 24rpx;}

/*smMainlist*/
.smMainlist{margin-top:55rpx;}
.smMainlist ul{display: flex;flex-wrap: wrap;}
.smMainlistimg{height:315rpx;}
.smMainlist li{width: 50%;}
.smMainlist li span{font-size: 22rpx;}
.smMainlist li small{font-size: 24rpx;color:#ff882c;}

/*smMaintj*/
.smMiantitletj{margin-top: 50rpx;}
.smMaintj{margin-top:55rpx;}
.smMainlisttj{margin-top:20rpx;}
.smMiantopimgtj{height: 526rpx;}

/*smcompany*/
.smcompany{text-align: center;margin-bottom: 35rpx;}
.smcompany span{color:#666;font-size: 26rpx;margin-top: 25rpx;}

</style>
