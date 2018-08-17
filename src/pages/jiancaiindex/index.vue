<template>
   <div class="jcContainer">
     <div class="jc-brand"><image src="https://shop.guqinet.com/html/images/shanquan/jcbrand.jpg"></image></div>

     <div class="jcList">
       <ul>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/jcitem01.jpg"></image><span>家具团队</span></li>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/jcbrand02.jpg"></image><span>品牌建材</span></li>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/jcitem03.jpg"></image><span>家具</span></li>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/jcitem04.jpg"></image><span>家纺</span></li>
         <li><image src="https://shop.guqinet.com/html/images/shanquan/jcitem05.jpg"></image><span>窗帘</span></li>
       </ul>
     </div>
     <!--jcList end-->

    <div class="jcCase">
        <div class="jcCase-item"></div><div class="jcCase-item"><image src="https://shop.guqinet.com/html/images/shanquan/jccase01.jpg"></image></div>
        <div class="jcCase-item"></div><div class="jcCase-item"><image src="https://shop.guqinet.com/html/images/shanquan/jccase02.jpg"></image></div>
    </div>
    <!--jcCase end-->

  </div>
 <!--jccontainer end-->
</template>

<script>

export default {
  data () {
    return {
      imageHeigth:'',
      imageWidth:'',
     }
  },

  components: {

  },

  methods: {
   },

onLoad(){
   var that=this;
    var windWidth=wx.getSystemInfoSync().windowWidth;
    var imageWidth=windWidth+"px";
    that.imageWidth=imageWidth+"px";
    that.imageHeigth=windWidth*3.64+'px';
  }
}
</script>

<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.jc-brand{
  padding-left: 5%;
  padding-right: 5%;
  height: 255rpx;
}

/*jcList*/
.jcList{margin-top: 30rpx;
  padding-left: 6%;
  padding-right: 6%;
}
.jcList ul{
 display: flex;
 flex-wrap:wrap;

}
.jcList li{
  width: 20%;
  height: 76rpx;

}
.jcList li image{
    margin: auto;
  width: 65rpx;
  height: 65rpx;
}
.jcList li span{
  margin-top: 13rpx;
  display: block;
  text-align: center;
  color: rgb(29, 29, 29);
  font-size:24rpx;
}
/*jcaCase*/
.jcCase{
  height: 250rpx;
  display: block;
}

</style>
