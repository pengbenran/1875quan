<template>
  <div class="orderdetailContainer">
    <Tab :find_item="find_item" v-on:listenToChildEvent="showMsgFromChild"></Tab>
    <!-- 订单列表 -->
    <div class='box' v-for="(item,index) in mytuanData" :key="key" :index="index">
      <div class="spell-down" @click='pin'>
        <div class="spell-left">
          <image :src="item.thumbnail"></image>
        </div>
        <div class="spell-right">
          <div class="spell-top">
            <text class='spelltext'>{{item.goodsName}}</text>
          </div>
          <div class=" spell-bottom">
            <div class="spe-left">
              <text class=" spetext-one">￥{{item.price}}</text>
              <text class=" spetext-two">￥{{item.goodsPrice}}</text>
            </div>
            <block v-if="item.isCollage==0">
              <div class="spell-btn" style="color:#ccc">
                拼团失败
              </div>
            </block>
            <block v-if="item.isCollage==1">
              <div class="spell-btn" style="color:red">
                拼团成功
              </div>
            </block>
            <block v-if="item.isCollage==2">
              <div class="spell-btn" style="color:#59d867">
                等待拼团
              </div>
            </block>
          </div>
        </div>
      </div>
      <div class='clustering'>
      <div class='clustering-left'></div>
        <div class='clustering-right'>
          <div class='btn-details'  @click='cantuan(index)'>拼团详情</div>
          <!-- <block wx:if="{{item.isCollage==0}}">
            <button class='btn-attend' @click='qing'>再次开团</button>
          </block>
          <block wx:if="{{item.isCollage==1}}">
            <button class='btn-attend' @click='qing'>再次开团</button>
          </block>
          <block wx:if="{{item.isCollage==2}}">
            <button class='btn-attend' open-type='share'>邀请好友</button>
          </block> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from '../../components/tabbar'
import globalStore from "../../stores/global-store"
export default {
  data () {
    return {
    find_item:[
      {name:"全部",selected:false},
      {name:"等待拼团",selected:false},
      {name:"拼团成功",selected:false},
      {name:"拼团失败",selected:false},
      ],
      mytuanData:[]
     }
  },

  components: {
   Tab
  },

  methods: {
    cantuan:function(id){
      let that = this;
      let pingtuanObj = that.mytuanData[id]
      var parmss = {}
      parmss.price = pingtuanObj.goodsPrice
      parmss.activityPrice = pingtuanObj.activityPrice
      parmss.goodsId = pingtuanObj.goodsId
      parmss.goodsName = pingtuanObj.goodsName
      parmss.iscollage = pingtuanObj.isCollage
      parmss.memberCollageId = pingtuanObj.memberCollageId
      parmss.img = pingtuanObj.thumbnail
      parmss.shortPerson = pingtuanObj.shortPerson
      parmss.collageGoodsId = pingtuanObj.collageGoodsId
      parmss= JSON.stringify(parmss)
      wx.navigateTo({
        url: '../groupdetail/main?shops= ' + parmss,
      })
    }
  },
  onLoad(options){
  var that = this
  var memberId = wx.getStorageSync('memberId')
  that.memberId=memberId
  wx.request({
    url: globalStore.state.api +'/api/collage/allMemberCollage',
    data: {
      memberId: that.memberId
    },
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      that.mytuanData=res.data  
    },
  })
  }
}

  
</script>

<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.spell-down{
  background: #fff;
  height: 300rpx;
  display: flex;
  justify-content: space-between;
  margin-top: 15rpx;
}
.spell-left{
  width: 300rpx;
  height: 300rpx;
  padding:20rpx;
  box-sizing: border-box;
  overflow: hidden;
}

.spelltext{
  display:-webkit-box;
word-break:break-all;
text-overflow:ellipsis;
overflow:hidden;
-webkit-box-orient:vertical;
-webkit-line-clamp:2;

}
.spot{
  width: 80rpx;
  height: 80rpx;
  background: #ff4546;
  color: #fff;
  border-radius: 50%;
  font-size: 28rpx;
  text-align: center;
  line-height: 80rpx;
  position: absolute;
  left: 20rpx;
  top: 18rpx;
}
.spell-right{
 padding: 30rpx 0;
 display: flex;
 flex-direction: column;
 flex: 1;
 justify-content: space-around;
}

.spell-top{
  width: 70%;
  /* height: 100rpx; */
  font-size: 32rpx;
}
.spell-conten{
  width: 30%;
  font-size:30rpx;
  color: #2f96fd;
}
.spell-bottom{
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.spetext-one{
 font-size: 32rpx;
 color: red;
}
.spetext-two{
  margin-left: 20rpx;
  font-size: 28rpx;
  color: #ccc;
  text-decoration:line-through;
}
.spell-btn{
  width: 35%;
  font-size: 30rpx;
  color: #59d867;
}

.spe-left{
 width:56%;
}
/*订单喊人按钮 */
.clustering{
height: 100rpx;
background: #fff;
display: flex;
justify-content: center;
align-items: center;
border-top:1rpx solid #eee;
}
.clustering-left{
width: 43%;
margin-left: 20rpx;
font-size:30rpx;
}
.clustering-left text{
 color: #ff3e3f;
}
.clustering-right{
width: 57%;
padding-left:20rpx;
box-sizing: border-box; 
align-items: center;
}
.btn-details{
width: 40%;
height: 60rpx;
font-size: 28rpx;
text-align: center;
line-height:58rpx;
border: 2rpx solid #b4b4b4;
border-radius: 45rpx;
float: right;
margin-right:40rpx; 
}
.btn-attend{
width: 40%;
height: 60rpx;
font-size: 28rpx;
text-align: center;
line-height: 58rpx;
border-radius: 45rpx;
background: #3394ff;
color: #fff;
padding: 0;
}
.textone{
color: #ff3e3f;
}
.texttwo{
  color: #ccc;
}
.right-details{
width: 57%;
display: flex;
justify-content: flex-end;
align-items: center;
}
.btn-deta{
width: 40%;
height: 58rpx;
font-size: 28rpx;
text-align: center;
line-height: 60rpx;
border: 2rpx solid #b4b4b4;
border-radius: 45rpx;
margin-right: 20rpx;
}
.swbox{
  height: 200rpx;
  }

</style>
