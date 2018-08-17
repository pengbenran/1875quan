<template>
   <div class="peixunContainer">
    <div class="peixunImg" :style="{width:imageWidth,height:imageHeigth}">
      <image src="https://shop.guqinet.com/html/images/shanquan/yinyue.jpg"></image>
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
    that.imageHeigth=windWidth*3.567+'px';
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
