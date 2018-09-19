<template>
  <div class="smlistContainer">
   
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";
export default {
  data () {
    return {
      Goods:[]
     }
  },

  components: {

  },

  methods: {

   },

   onLoad(options){
     let that=this;
     let memberId=wx.getStorageSync('memberId');
     wx.request({
       url: globalStore.state.api+'/api/order/apiSelectReturnOrderList', //开发者服务器接口地址",
       data: {
           memberId:memberId
       }, 
       method: 'GET',
         header: {
                'content-type': 'application/json' // 默认值
              }, 
       success: res => {
           console.log("获取售后数据")
           console.log(res.data);
       }
     });
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
