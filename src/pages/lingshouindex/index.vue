<template>
  <div class="hunshaContainer">
    <div class="hunshaImg" :style="{width:imageWidth,height:imageHeigth}">
      <!-- <img src="https://shop.guqinet.com/html/images/shanquan/lingshou.jpg"> -->
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
    that.imageWidth=windWidth+"px";
    that.imageHeigth=windWidth*2.434+'px';
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
