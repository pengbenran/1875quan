<template>
  <div class="smlistContainer">
     <div class="listItem"><span>联系人</span><input  type="text" placeholder="请输入联系人" placeholder-style='color:#ccc'/></div>
     <div class="listItem"><span>联系电话</span><input  type="number" placeholder="请输入联系电话" placeholder-style='color:#ccc'/></div>
     <div class="listItem listItemcity" >
         <div class="lian" @click="clickListarea" ><span>省 市 区</span></div>
         <div class="lianbox"><image :src='iconed'></image></div>
         <Areainfo :area="areaitem"></Areainfo>
     </div>
     <div class="listItem">
         <textarea placeholder="请输入详细地址信息" name="textarea" placeholder-style='color:#ccc'/>
     </div>
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
import Areainfo from '../../components/areaModel';
import Swich from '../../components/swich';
import globalStore from "../../stores/global-store";


export default {
  data () {
    return {
      iconed: globalStore.state.imgapi +"/images/myaddress/8.png",
      switchData:[{
          id:1,
          color: '#26b4fe',
          isOn: false,
      }],
      areaitem:{
            show:false,
            animationData:{}
        },
             
     }
  },

  components: {
   Swich,
   Areainfo
  },

  methods: {
    
    //点击显示地址
    clickListarea(){
      // let that=this;
      // that.areaitem.show=true;
      // console.log("666");
      //  that.animationEvents()
      wx.navigateTo({ url: '../map/main' });
    },
    //动画
    animationEvents() {
      let that=this;
      that.areaitem.animationData = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 400,
        timingFunction: "ease",
        delay: 0
      })
      that.areaitem.animationData.translateY(0).step();
      that.areaitem.animationData=that.areaitem.animationData.export();
   },
   //点击确定按钮
   add(){
     let that=this;
     let parms={};
     
     let address={};
     let defaddr=this.switchData[0].isOn;
     try{
      var memberId= wx.getStorageSync('memberId');
      if(memberId){memberId: memberId}
     }catch(e){}
     parms.memberId = memberId
    if(defAddr==true){
      defAddr=1
        }else{
          defAddr=0
        }

    // 判断手机号合格
    let userName = this.data.userName;
    let mobile = this.data.mobile;
    let phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    
    if(mobile==''){
      wx.showToast({
      title: '号码不能为空',
      icon: 'loading',
      })

      return false
    }else if(mobile.length != 11){
        wx.showToast({
        title: '号码长度有误',
        icon: 'loading',
        duration: 1500
        })
        return false;
    }

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
.smlistContainer{background: #fff;height: 100vh;}
.listItem{display: flex;line-height: 100rpx;border-top: 1px solid #f2f2f2;}
.listItem span{width: 25%;padding-left: 18rpx;font-size: 32rpx;}
.listItem input{width: 75%;height: 100rpx;line-height: 100rpx;font-size: 30rpx;}
.listItem .lianbox{width: 20rpx;height: 32rpx;} 
.listItemcity{position: relative;justify-content: space-between;align-items: center;padding-right: 15rpx;}
.lian span{font-size: 30rpx;}
.listItem textarea{font-size: 28rpx;height: 200rpx;width: 100%;padding:15rpx;}

/*listItemaddres*/
.listItemaddres{display: flex;justify-content: space-between;align-items:center;}
.listItemaddres span{width: 40%;font-size: 30rpx;}

.listbtn{border-top: 1px solid #f2f2f2;}
.listbtn div{width: 80%;margin: auto;text-align: center;margin-top: 25rpx;height: 80rpx;line-height: 80rpx;}
.btnquren{border-radius:45rpx;background:#26b4fe;color:#ffffff;}
.btnquxiao{border:1px solid #ababab;color: #ababab;border-radius:45rpx;}



</style>
