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
       item:{
           provinces:[],
           citys:[],
           countys:[]
       }
     }
  },    

  methods: {
    updateAreaData(that,status,e){
        //获取省份数据
       var getProvinceData=function(){
           var s;
           var num=0;
           var lets=that.areaInfo.length;
            for (var i = 0; i < lets; i++) {
                s = that.areaInfo[i];
                if (s.di == "00" && s.xian == "00") {
                that.provinces[num] = s; //赋值省级
                num++;
                }
            }
        //初始化调用一次
        //初始化地级市数据
              getCityArr();
                //获取区县数据
                getCountyInfo();
        //模型赋值
        // that.info = {    
        //     item: {
        //     provinces: provinces,
        //     citys: citys,
        //     countys: countys,
        //     value: value
        //     }
        // }
       // that.animationEvents(that, 200, false, 0);

       }
        // 获取地级市数据
        var getCityArr = function (count = 0) {
        var c;
        var num = 0;
        for (var i = 0; i < that.areaInfo.length; i++) {
            c = that.areaInfo[i];
            if (c.xian == "00" && c.sheng == that.provinces[count].sheng && c.di != "00") {
            that.citys[num] = c;//赋值城市
            num++;
            }
        }
        if (that.citys.length == 0) {
            that.citys[0] = { name: '' };
        }
        }

          // 获取区县数据
            var getCountyInfo = function (column0 = 0, column1 = 0) {
            //定义
            var c;
            var num = 0;
            for (var i = 0; i < that.areaInfo.length; i++) {
                c = that.areaInfo[i];
                if (c.xian != "00" && c.sheng == that.provinces[column0].sheng && c.di == that.citys[column1].di) {
                that.countys[num] = c;//赋值区级
                num++;
                }
            }   
            if (that.countys.length == 0) {
                that.countys[0] = { name: '' };
            }
            that.value = [column0, column1, 0];
            }

          //滑动事件
            var valueChange = function(e,that){
            var val = e.mp.detail.value
            console.log(e.mp)
            //判断滑动的是第几个column
            //若省份column做了滑动则定位到地级市和区县第一位
            if (that.value[0] != val[0]) {
                val[1] = 0;
                val[2] = 0;
                getCityArr(val[0]);//获取地级市数据
                getCountyInfo(val[0], val[1]);//获取区县数据
            } else {    //若省份column未做滑动，地级市做了滑动则定位区县第一位
                if (that.value[1] != val[1]) {
                val[2] = 0;
                getCountyInfo(val[0], val[1]);//获取区县数据
                }
            }
            that.value = val;

            //assignmentData(that, that.data.item.show)

            console.log(val);
            
            //回调
            //callBack(val);
            }
           if (status == 0){
                that.areaInfo=Area.state.areainfo;
                //获取省份数据
                getProvinceData();
            }
            //滑动事件
            else{
            valueChange(e,that);
            }
    },
    

    //滑动事件
    bindChange(e){
         console.log(e.mp);
            let that=this;
            that.updateAreaData(this, 1, e);
           
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
  onLoad(){
  },
  onReady(e){
      var that=this;
      this.updateAreaData(that,0,e)
  }
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
