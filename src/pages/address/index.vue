<template>
  <div class="addressContainer">
       <div class="addlist" v-for="(item,index) in memberAddressList" :key="key" :index="index">
          <div class="additem">
            <span class="addname">{{item.name}}</span> <span class="addphone">{{item.mobile}}</span>
            <div class="adddizhi">{{item.addr}}</div>
          </div>
          <div class="addbtnitem">
             <div class="btnitemleft" @click="select(item.addrId,item.defAddr)"><radio value="1" :checked="item.defAddr"/>默认地址</div> 
             <div class="btnitemight"><span class="deit" @click="edit(item.addrId)">编辑</span><span class="dele" @click="del(item.addrId)">删除</span></div>
          </div>
       </div>
       <!--addlist end-->

     <div class="addres" @click="address"><span>新增收货地址</span></div>        
     <!--addres end-->
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";
export default {
  data () {
    return {
      memberAddressList:[]
     }
  },

  components: {

  },

  methods: {
    del:function(addrId){
      var that= this
      wx.showModal({
        title: '提示',
        content: '是否删除该地址',
        success: function (res) {
          if (res.confirm) {
            var parms = {}
            parms.addrId = addrId
            parms = JSON.stringify(parms)
            wx.request({
              url: globalStore.state.api + '/api/address/deleteAddress',
              data: {
                "parms": parms
              },
              method: "POST",
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                  if(res.data.code==0){
                    that.getaddres()
                  }
              }

            })
          } else if (res.cancel) {
          }
        }
      })
    },
     address(){ 
      wx.navigateTo({ url: '../xinaddress/main' });       
     },
     edit: function (addrId) {
      wx.navigateTo({
        url: '../addresschange/main?addrId='+addrId,
      })
    },
    select:function(addrId,defAddr){
      var that = this
      var parms = {}
      var address={}
      var addrId = addrId
      if(defAddr=="0"){
        defAddr="1";
      }
      else{
        defAddr="0"
      }
      address.memberId = that.memberId
      address.defAddr = defAddr
      address.addrId = addrId
      parms.address = address
      parms = JSON.stringify(parms)
      wx.request({
        url: globalStore.state.api + '/api/address/update',
        data: {
          parms: parms
        },
        method:"PUT",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
         that.getaddres()
       }
     })
    },
     getaddres(){
     var that = this
     var parms = {}
     try {
      var memberId = wx.getStorageSync('memberId')
      if (memberId) {  
        that.memberId= memberId
      }
    } catch (e) {
    }
     parms.memberId = memberId
    // parms = JSON.stringify(parms)
    wx.request({
      url: globalStore.state.api + '/api/address/addressAll',
      data: {
        "parms": parms
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var code = res.data.code
        if(code==1){
          res.data.memberAddressList=""
        }
        for(var i in res.data.memberAddressList){
          if(res.data.memberAddressList[i].defAddr==1){
            res.data.memberAddressList[i].defAddr=true
          }
          else{
            res.data.memberAddressList[i].defAddr=false
          }
        }
        that.memberAddressList= res.data.memberAddressList
      }
    })
     }
   },

   onLoad(options){
    var that=this;
    that.getaddres()
  }
    
}
</script>



<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}

.addressContainer{height: 100vh;background: #f2f2f2;}
.addres{line-height: 75rpx;padding-top: 25rpx;padding-bottom: 25rpx;}
.addres span{display: block;width: 85%;text-align: center;line-height: 75rpx;margin: auto;font-size: 30rpx;background: #F64F57;border-radius: 45rpx;color: #ffffff;}

/*additem*/
.addlist{padding-left: 25rpx;padding-right: 25rpx;background: #ffffff; margin-top: 10rpx;}
.additem{padding-top: 15rpx;padding-bottom: 15rpx;}
.additem span{margin-right: 25rpx;font-size: 30rpx;}
.adddizhi{font-size: 30rpx;padding-top: 20rpx;padding-bottom: 20rpx;}
.addbtnitem{display: flex;align-items: center;padding-bottom: 15rpx;padding-top: 15rpx;border-top: 1px solid #f2f2f2;}
.btnitemleft{display: flex;align-items: center;color: #F64F57 ;}
.btnitemleft,.btnitemight{width: 50%;font-size: 30rpx;}
.btnitemight{display: flex;justify-content: space-between;padding-left: 145rpx;padding-right: 20rpx;}
.btnitemight .deit{color: #26b8ff;}
</style>
