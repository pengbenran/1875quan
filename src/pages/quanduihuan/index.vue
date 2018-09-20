<template>
  <div class="chongzhi">
    <div class="header"><image :src="headerimg"></image></div>
    <div class="headerbtn">
         <ul>
           <li v-for="(item,index) in quanquanDOList" :index='index' :key='item' :class="{'selects':item.liststu}" @click="change(index)"><span >{{item.quanAmount}}圈圈兑换{{item.cash}}元</span></li>
         </ul>
    </div>
    <div class="tijiao" @click="exchange()"><span>兑换</span></div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"

export default {
  data () {
    return {
       headerimg: globalStore.state.imgapi+'image/quanbran01.jpg',
       quanquanDOList:[] ,

    }
  },

  components: {
 
  },

  methods: {
 exchange:function(){
  var that=this
  let memberId=wx.getStorageSync('memberId');  
  let count=0;
  for(var i in that.quanquanDOList){
    if(that.quanquanDOList[i].liststu==true){
      wx.request({
          url:globalStore.state.api+'/api/member/judgeQuanCash', //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'application/json' // 默认值
          },
          data:{
            memberId:memberId
          },
          success: function(res) {
            if(res.data.code==0){
             wx.request({
                url:globalStore.state.api+'/api/member/quanquanCash', //仅为示例，并非真实的接口地址
                header: {
                  'content-type': 'application/json' // 默认值
                },
                data:{
                  memberId:memberId,
                  quanId:that.quanquanDOList[i].quanId
                },
                success: function(res) {
                 if(res.data.status==0){
                    wx.showToast({
                      title:'提交成功',
                      icon:'success',
                      during:2000
                    })
                    setTimeout(function(){
                      wx.switchTab({
                        url: '../my/main',
                      })
                    },2000)
                 }
                 else{
                  wx.showToast({
                    title: res.data.msg,
                    icon:'none',
                  })
                 }
               }
             })
            }
          
          }
        })
    }
     else{
      count=count+1
      console.log(count)
      if(count==that.quanquanDOList.length){
         wx.showToast({
          title: '请选择兑换的数量',
          icon:'none'
        })
      }   
      }
  }
 },
  change(index){
      let that=this;  
      for(var i=0;i<that.quanquanDOList.length;i++){
        that.quanquanDOList[i].liststu=false;
      }
      that.quanquanDOList[index].liststu=true;
   }
  },

  onLoad(){
    let that=this;
    wx.request({
          url:globalStore.state.api+'/api/member/quanquanCashList', //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            if(res.data.code==0){
              for(var i in res.data.quanquanDOList){
                res.data.quanquanDOList[i].liststu=false
              }
              that.quanquanDOList=res.data.quanquanDOList
            }
          }
        })
  }
}
</script>

<style scoped>
image{display: block;width: 100%;height: 100%;}
.chongzhi{background: #fff;height: 100vh;}

.header{height: 350rpx;}
.headerbtn{margin-top: 35rpx;}
.headerbtn ul{width: 76%;margin: auto;display: flex;align-items: center;flex-wrap: wrap;}
.headerbtn li{width: 45%;margin-left: 2%;margin-right: 2%;border-top:1px solid #f8f8f8;margin-top: 35rpx;line-height: 110rpx;border-radius: 10rpx;text-align: center;    
box-shadow: 0 10px 30px rgba(0,0,0,0.1);}
.headerbtn li span{font-size: 25rpx;}
.headerbtn .selects{background: #f33f40;color: #fff;}

.tijiao{text-align: center;padding-top: 40rpx;}
.tijiao span{display:inline-block;background: #e7213c;color: #fff;padding: 10rpx 45rpx;border-radius: 12rpx;}
</style>
