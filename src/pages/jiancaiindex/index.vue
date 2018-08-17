<template>
   <div >
    <div class="jiancaiImg" :style="{width:imageWidth,height:imageHeigth}">
      <image src="https://shop.guqinet.com/html/images/shanquan/jiazhuang.jpg"></image>
    </div>
  </div>
 
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
</style>
