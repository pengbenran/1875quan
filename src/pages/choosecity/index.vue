<template>
  <div>
    <scroll-view scroll-y="true" :style="{height:winHeight}" :scroll-top="scrollTop">
      <div class="title">热门城市</div>
      <div class="hotcity">
        <div class="hotcityList" v-for="(item,index) in hotcityList" :key="key" :index="index" @click="hotCity(item.city,item.cityCode)">{{item.city}}</div>
      </div>
      <div class="searchLetter touchClass">
        <div v-for="(item,index) in searchLetter" :style="{height:itemH}" @touchstart="searchStart($event,item.name)" @touchmove="searchMove($event)" @touchend="searchEnd">{{item.name}}</div>
      </div>
      <block v-if="isShowLetter">
        <div class="showSlectedLetter">
          {{showLetter}}
        </div>
      </block>
      <!--     <div  class="title">当前选择城市：{{city}}</div> -->

      <div class="selection" v-for="(item,index) in cityList" :key="key" :index="index">
        <div class="item_letter">{{item.initial}}</div>
        <div class="item_city" v-for="(itemcityname ,itemcityindex) in item.cityInfo" :key="itemcityname" :index="itemcityindex"  @click="bindCity(itemcityname.city,itemcityname.code)">
          {{itemcityname.city}}  
        </div>
      </div>
    </scroll-view>
  </div>

</template>

<script>
import globalcity from '../../utils/city';
export default {
  data () {
    return {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    tHeight: 0,
    bHeight: 0,
    startPageY: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,
    city: "" ,
    hotcityList: [{ cityCode: 110000, city: '北京市' }, { cityCode: 310000, city: '上海市' }, { cityCode: 440100, city: '广州市' }, { cityCode: 440300, city: '深圳市' }, { cityCode: 330100, city: '杭州市' }, { cityCode: 320100, city: '南京市' }, { cityCode: 420100, city: '武汉市' }, { cityCode: 410100, city: '郑州市' }, { cityCode: 120000, city: '天津市' }, { cityCode: 610100, city: '西安市' }, { cityCode: 510100, city: '成都市' }, { cityCode: 500000, city: '重庆市' }]
  }
  },

  components: {
 
  },

  methods: {
   bindCity:function(cityname,citycode){
    var that=this;
    that.globalData.cityname = cityname 
    that.globalData.citycode = citycode 
    wx.switchTab({
    url: '../index/main',
   })
   },
    searchStart: function (e,letter) {
    var that=this;
    var showLetter = letter;
    var pageY = e.touches[0].pageY;
    that.setScrollTop(this, showLetter);
    that.nowLetter(pageY, this);
    
    that.showLetter=showLetter;
    that.startPageY= pageY;
    that.isShowLetter= true;
    
  },
  searchMove: function (e) {
     var pageY = e.touches[0].pageY;
    var startPageY = this.startPageY;
    var tHeight = this.tHeight;
    var bHeight = this.bHeight;
    var showLetter = 0;
    console.log(pageY);
    if (startPageY - pageY > 0) { //向上移动
      if (pageY < tHeight) {
        // showLetter=this.mateLetter(pageY,this);
        this.nowLetter(pageY, this);
      }
    } else {//向下移动
      if (pageY > bHeight) {
        // showLetter=this.mateLetter(pageY,this);
        this.nowLetter(pageY, this);
      }
    }
  },
  searchEnd: function (e) {
    // console.log(e);
    // var showLetter=e.currentTarget.dataset.letter;
    var that = this;
    setTimeout(function () {  
      that.isShowLetter= false     
    }, 1000)

  },
    nowLetter: function (pageY, that) {//当前选中的信息
    var letterData = this.searchLetter;
    var bHeight = 0;
    var tHeight = 0;
    var showLetter = "";
    for (var i = 0; i < letterData.length; i++) {
      if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
        bHeight = letterData[i].bHeight;
        tHeight = letterData[i].tHeight;
        showLetter = letterData[i].name;
        break;
      }
    }

    this.setScrollTop(that, showLetter);
      that.bHeight= bHeight;
      that.tHeight=tHeight;
      that.showLetter= showLetter;
      that.startPageY= pageY;
    
  },
    setScrollTop: function (that, showLetter) {
    var scrollTop = 0;
    var cityList = that.cityList;
    var cityCount = 0;
    var initialCount = 0;
    for (var i = 0; i < cityList.length; i++) {
      if (showLetter == cityList[i].initial) {
        scrollTop = initialCount * 30 + cityCount * 41;
        break;
      } else {
        initialCount++;
        cityCount += cityList[i].cityInfo.length;
      }
    } 
     that.scrollTop= scrollTop+196;
  },
  hotCity: function (cityname,citycode) {
   this.globalData.cityname = cityname 
   this.globalData.citycode = citycode 
   wx.switchTab({
    url: '../index/main'
   })
  }
  },

  onLoad () {
      // 生命周期函数--监听页面加载
      var that=this
    var searchLetter = globalcity.searchLetter;
    var cityList = globalcity.cityList();
    // console.log(cityInfo);

    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;

    //添加要匹配的字母范围值
    //1、更加屏幕高度设置子元素的高度
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;

      tempObj.push(temp)
    }

    
      that.winHeight=winHeight+'px';
      that.itemH=itemH+'px';
      that.searchLetter= tempObj;
      that.cityList= cityList;
  

    

  }
}
</script>

<style scoped>
.title{
  height: 80rpx;
  line-height: 80rpx;
}
.hotcity{
display: flex;
flex-wrap: wrap;
justify-content: space-around;
padding-right: 60rpx;
box-sizing: border-box;
font-size: 0.9em;
}
.hotcityList{
  width: 20%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border: 1rpx solid #ddd;
  margin-bottom: 20rpx;
  background: #fff;
}
.searchLetter{
    position: fixed;
    right: 0;
    width: 30px;
    height: 100%;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    color: #666;
    z-index: 1
}
.searchLetter div{
    height: 70rpx;
}
.touchClass{
    background-color: rgba(0, 0, 0,0.5);
    color: #fff;
    position: fixed;
    top:0;
    right: 0;
}
.showSlectedLetter{
    background-color: rgba(0, 0, 0,0.5);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    top:50%;
    left: 50%;
    margin: -50px;
    width: 100px;
    height: 100px;
    border-radius:10px; 
    font-size: 26px;
    z-index: 1
}
.selection{
    display: flex;
    width: 100%;
    flex-direction: column;
}
.item_letter{
    display: flex;
    background-color: #f8f8f8;
    height: 30px;
    padding-left: 10px;
    align-items: center;
}
.item_city{
    display: flex;
    background-color: #fff;
    height: 40px;
    padding-left: 10px;
    align-items: center;
    border-bottom: 1px solid #f8f8f8
}
</style>
