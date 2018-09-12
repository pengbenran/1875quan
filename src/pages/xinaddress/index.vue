<template>
  <div class="smlistContainer">
     <div class="listItem"><span>联系人</span><input  type="text" placeholder="请输入联系人" placeholder-style='color:#ccc' v-model='userName'/></div>
     <div class="listItem"><span>联系电话</span><input  type="number" placeholder="请输入联系电话" placeholder-style='color:#ccc'  v-model='mobile'/></div>
     <div class="listItem" >
        <span>收货地址</span><input type="text" placeholder="请输入收货地址" placeholder-style='color:#ccc' v-model="address"/>
        <b class="addressicon" @click="chooseAddr"><image :src='mapimg'></image></b>
         <!-- <Areainfo :area="areaitem"></Areainfo> -->
     </div>
    <!--  <div class="listItem">
         <textarea placeholder="请输入详细地址信息" name="textarea" placeholder-style='color:#ccc'/>
     </div> -->
     <!--listcity end-->
     <div class="listItem listItemaddres">
       <span>设置默认地址</span>
       <div class="listItemswich">
         <Swich :find_swich="switchData"></Swich>
         <!--swich end-->
       </div>
     </div>
    
    <div class="listbtn">
      <div class="btnquren" @click="add">确认</div>
      <div class="btnquxiao">取消</div>
    </div>
  </div>
</template>

<script>
// import Areainfo from '../../components/areaModel';
import Swich from '../../components/swich';
import globalStore from "../../stores/global-store";


export default {
  data () {
    return {
      // iconed: globalStore.state.imgapi +"/images/myaddress/8.png",
      switchData:[{
          id:1,
          color: '#26b4fe',
          isOn: false,
      }],
     mapimg:globalStore.state.imgapi+'image/listmaap.png',
      address:'' ,
      userName:'' ,
      mobile:''    
     }
  },

  components: {
   Swich,
   // Areainfo
  },

  methods: {
<<<<<<< HEAD
    chooseAddr(){
      var that=this;
      wx.chooseLocation({
        success: function (res) {
        // success
        console.log(res)
        that.address=res.address
        
        
        },
        fail: function () {
        // fail
        },
        complete: function () {
        // complete
        }
        })
=======
    
    //点击显示地址
    clickListarea(){
      // let that=this;
      // that.areaitem.show=true;
      // console.log("666");
      //  that.animationEvents()
      wx.navigateTo({ url: '../map/main' });
>>>>>>> d2e686c5f99d83dcdb9d185c0f8a0a9fb1bd0d24
    },
   add(){
     var that = this
     var parms = {}
     var address = {}  
     var defAddr = that.switchData["0"].isOn
     try {
      var memberId = wx.getStorageSync('memberId')
      if (memberId) {
        memberId: memberId
      }
    } catch (e) {
    }
    parms.memberId = memberId
    if(defAddr==true){
      defAddr=1
    }else{
      defAddr=0
    }
    // 判断手机号合格
    var userName = that.userName;
    var mobile = that.mobile;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (mobile == '') {
      wx.showToast({
        title: '号码不能为空',
        icon: 'none',
      })
      return false
    }
    else if (mobile.length != 11) {
      wx.showToast({
        title: '号码长度有误',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    var province = ''
    var city = ''
    var county = ''
    var addr = that.address
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    address.memberId = memberId
    address.defAddr = defAddr
    address.name = userName
    address.mobile = mobile
    address.province = province
    address.city = city
    address.region = county
    address.addr = addr
    parms.address = address
    parms = JSON.stringify(parms)

    wx.request({
      url: globalStore.state.api  + '/api/address/add',
      data: {
        parms:parms
      },
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1500
        })
        wx.redirectTo({
          url:'../address/main'
        })
      }
    })
   }
},
   onLoad(options){
  }
}
</script>





<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
<<<<<<< HEAD
.addressicon{
  width: 20px;
  height: 27px;
  display: inline-block;
  position: absolute;
  top:20rpx;
  right: 25rpx;
}
.smlistContainer{
  background: #fff;
  height: 100vh;
}
.listItem{display: flex;line-height: 100rpx;border-top: 1px solid #f2f2f2; position: relative;padding-right: 70rpx;box-sizing: border-box;}
=======
.smlistContainer{background: #fff;height: 100vh;}
.listItem{display: flex;line-height: 100rpx;border-top: 1px solid #f2f2f2;}
>>>>>>> d2e686c5f99d83dcdb9d185c0f8a0a9fb1bd0d24
.listItem span{width: 25%;padding-left: 18rpx;font-size: 32rpx;}
.listItem input{height: 100rpx;line-height: 100rpx;font-size: 30rpx; flex-grow: 1;}
.listItem .lianbox{width: 20rpx;height: 32rpx;} 
.listItemcity{position: relative;justify-content: space-between;align-items: center;padding-right: 15rpx;}
.lian span{font-size: 30rpx;}
/*listItemaddres*/
.listItemaddres{display: flex;justify-content: space-between;align-items:center;}
.listItemaddres span{width: 40%;font-size: 30rpx;}

.listbtn{border-top: 1px solid #f2f2f2;}
.listbtn div{width: 80%;margin: auto;text-align: center;margin-top: 25rpx;height: 80rpx;line-height: 80rpx;}
.btnquren{border-radius:45rpx;background:#F64F57;color:#ffffff;}
.btnquxiao{border:1px solid #ababab;color: #ababab;border-radius:45rpx;}



</style>
