<template>
  <div class="areamodel" v-show="area.show"  :animation="area.animationData">
     <div class="mode"></div>
       <div class="moedl">
           <div class="modeltop"><span @click="hiddenFloatView">取消</span><span @click="hiddenFloatView">确定</span></div>
           <div class="modelcontent">
               <picker-view @change="bindChange">
                    <picker-view-column>
                        <div v-for="(item,index) in provinces" :index='index' :key='key' >
                            {{item.name}}
                        </div>
                    </picker-view-column>
                     <picker-view-column>
                        <div v-for="(item,index) in citys" :index='index' :key='key' >
                          {{item.name}}
                        </div>
                     </picker-view-column>
                      <picker-view-column>
                            <div v-for="(item,index) in countys" :index='index' :key='key' >
                             {{item.name}}
                            </div>
                      </picker-view-column>
               </picker-view>
           </div>
       </div>
  </div>
</template>

<script>
import Area from '../stores/areainfo';

export default {
  props: ['area'],
  data () {
    return {
       areaInfo:[],//所有省市区县数据
       provinces:[],//省
       citys:[],//城市
       countys:[],//区县
       value:[0,0,0],//数据位置下标
       info:{},
       animation:{},
       // item:{
       //     provinces:[],
       //     citys:[],
       //     countys:[]
       // }
     }
  },    

  methods: {
    async getProvinceData(allareaInfo){
       var s;
       var that=this;
       var num=0;
       var lets=allareaInfo.length;
        for (var i = 0; i < lets; i++) {
            s = allareaInfo[i];
            if (s.level==1) {
              that.provinces[num] = s; //赋值省级
              num++;
            }
        }
    },
    async getCityArr(allareaInfo,provinceCode){
        var c;
        var that=this;
        that.citys=[];
        for (var i = 0; i < allareaInfo.length; i++) {
            c = allareaInfo[i];
            if (c.xian == "00" && c.sheng == that.provinces[provinceCode].sheng && c.di != "00") {
            that.citys.push(c);//赋值城市
            }
        }
        if (that.citys.length == 0) {
            that.citys[0] = { name: '' };
        }
    },
    async getCountyInfo(allareaInfo,provinceCode,cityCode){
        var c;
        var that=this;
        that.countys=[];
        for (var i = 0; i < allareaInfo.length; i++) {
            c = allareaInfo[i];
            if (c.xian != "00" && c.sheng == that.provinces[provinceCode].sheng && c.di == that.citys[cityCode].di) {
            that.countys.push(c);//赋值区级
            }
        } 
        if (that.countys.length == 0) {
                that.countys[0] = { name: '' };
        }
    },
    //滑动事件
    async bindChange(e){
      let that=this;
      console.log()
      var val = e.mp.detail.value
      console.log(val)
      //判断滑动的是第几个column
      //若省份column做了滑动则定位到地级市和区县第一位
      if (that.value[0] != val[0]) {
          val[1] = 0;
          val[2] = 0;
          await that.getCityArr(that.areaInfo,val[0]);//获取地级市数据
          await that.getCountyInfo(that.areaInfo,val[0], val[1]);//获取区县数据
      } else {    //若省份column未做滑动，地级市做了滑动则定位区县第一位
          if (that.value[1] != val[1]) {
          val[2] = 0;
          await that.getCountyInfo(that.areaInfo,val[0], val[1]);//获取区县数据
          }
      }
      that.value = val
      console.log(that.citys);
      console.log(that.provinces);
      console.log(that.countys);
      console.log("加载完成")
      // that.getCityArr(Area.state.areainfo,1)
      // that.updateAreaData(this, 1, e);
     
      // item = this.item;
      // this.setData({
      // province: item.provinces[item.value[0]].name,
      // city: item.citys[item.value[1]].name,
      // county: item.countys[item.value[2]].name
      // });
   },   
   //点击隐藏
   hiddenFloatView(){
      let that=this;
      //that.area.show=false;
      that.area.animationData = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 400,
          timingFunction: "ease",
          delay: 0
      })
      that.area.animationData.translateY(200+'vh').step();
      that.area.animationData=that.area.animationData.export();
   }
 },
  async onLoad(){  
   var that=this;
   that.areaInfo=Area.state.areainfo
   await that.getProvinceData(Area.state.areainfo)
   await that.getCityArr(Area.state.areainfo,0)
   await that.getCountyInfo(Area.state.areainfo,0,0)
    

  },
  // onReady(e){
  //     var that=this;
     //this.updateAreaData(that,0,e)
  // }
}
</script>





<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}


.mode{position:fixed;display: flex;z-index: 1;top: 0;left: 0;height: 100vh;width: 100%;background-color:rgba(0, 0, 0, 0.6);}
.moedl{position: fixed;z-index: 2;bottom: 0;width: 100%;left: 0;background: #ffffff;}
.modeltop{display: flex;justify-content: space-between;padding-left: 20rpx;padding-right: 20rpx;border-bottom: 1px solid #f2f2f2;}
.modeltop span{font-size: 30rpx;color:#ccc;}

.modelcontent picker-view{background-color:white;padding:0;width:100%;height:380rpx;bottom:0;}
.modelcontent picker-view-column div{text-align: center;font-size: 30rpx;line-height: 34px;}
.areamodel{position: fixed;top: 0;z-index:2;height: 100vh;width: 100%;}
</style>
