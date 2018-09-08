<template>
  <div class="fenxiaouser">
    <div class='micromemberContain'>
        <div class='micromemberhead'>
            <div class='micromemberBcg' >
            <image :src='distribeDo.lvpicurl'></image>
            </div>
            <div class='userInfo'>
            <div class='useravator'>
                <image :src='memberDo.face'></image>
            </div>
            <div class='username'>
                <view>{{distribeDo.wechat}}</view>
                <view @click='distribeposter'>我的推广海报</view>
            </div>
            </div>
            <div class='userbanlance'>
            <div>账户余额(元)</div>
            <div class='banlance'>{{distribeDo.balance}}</div>
            </div>
            <div class='putforwardbtn' @click='jumpputforward'>提现</div>
        </div>
        <!-- 累计到账与资产总计 -->
        <div class="kbPanel"></div>

        <div class='micromemberPanel'>
            <div class='micromemberPanelLeft'>
            <div class="pricetitle">累计到账收益（元）</div>
            <div class='panelBalance'>{{total}}</div>
            </div>
            <div class='line'></div>
            <div class='micromemberPanelLeft'>
            <div class="pricetitle">资产总计（元）</div>
            <div class='panelBalance'>{{totalAssets}}</div>
            </div>
        </div>
        <div class='micromemberdomain'>
            <div class='micromemberItem' v-for="(item,index) in micromemberItem" :index='index' :key='item'  @click='jumpfenrungood(item.url)' >
            <div class='micromemberIcom'>
                <image :src='item.itemImg'></image>        
            </div>
            <div class='micromemberItemIntro'>
                <div class="micromemberItemIntrotitle">{{item.itemName}}</div>
                <div class="introinfo">{{item.itemintro}}</div>
            </div>
            </div>
        </div>
        <div class='memberContain'>
            <div class='membertitle'>新增会员</div>
            <div class='memberList' v-for="(item,index) in memberDOList" :index='index' :key="item" >
            <div class='memberuser'>
                <div class='memberuseravator'>
                <image :src='item.face'></image>
                </div>
                <div class='memberName'>{{item.uname}}</div>
            </div>
            </div>  
            <div v-if="!hasmember" class='tip'>
            还没有会员哦
            </div> 
        </div>
    </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";

export default {
  data () {
    return {
     hasmember:false,
     micromemberItem:[
      { itemImg: "https://shop.guqinet.com/html/images/shanquan/icon1.jpg", itemName: '会员升档', itemintro: '升级会员提高分润', url:'../membershioup/main'},
      { itemImg: "https://shop.guqinet.com/html/images/shanquan/icon2.jpg", itemName: '分润商品', itemintro: '分润商品详情', url: '../fengrungood/main' },
      { itemImg: "https://shop.guqinet.com/html/images/shanquan/icon3.jpg", itemName: '推荐', itemintro: '推荐用户/会员', url: '../memberlist/main'  },
      { itemImg: "https://shop.guqinet.com/html/images/shanquan/icon4.jpg", itemName: '账户管理', itemintro: '会员账户管理', url: '../membermanage/main'  }
      ],
      ImageWidth:0,
      ImageHeight:0,
      distribeDo:[],
      memberDo:[],
      total:0,
      totalAssets:0
    }
  },

  components: {
 
  },

  methods: {
    distribeposter(){
        var that=this;
            wx.navigateTo({
            url: '../distribeposter/distribeposter?distribeId=' + that.distribeDo.distribeId,
        })
    },
    jumpfenrungood(url){
         var that=this;
        if (url =="../membershioup/main"){
        wx.request({
            url: globalStore.state.api + '/api/distribe/memberLvList',
            headers: {
            'Content-Type': 'application/json'
            },
            success: function (res) {
            if (res.data.code == 0) {
                var flag=true;
                for (var i = 0; i < res.data.memberLvList.length;i++){
                if (res.data.memberLvList[i].discount > that.distribeDo.discount) {
                    flag=true
                }
                else{
                    flag=false
                }
                }
                if (flag) {
                wx.redirectTo({
                    url: '../membershioup/membershioup?name=' + that.distribeDo.name + '&face=' + that.memberDo.face,
                })
                }
                else {
                wx.showToast({
                    title: '您已是最高等级',
                    icon:"none"
                })
                }
            }
            }
        })
        }
        else{
        wx.navigateTo({
            url: url,
        })
        }  
    },
    //提现事件触发
    jumpputforward(){
         var that=this;
        if (that.distribeDo.balance==0){
        wx.showToast({
            title: '账号余额不足',
            icon:"none"
        })
        }
        else{
        wx.redirectTo({
            url: '../putforward/main?balance=' + that.distribeDo.balance + '&cardno=' + that.distribeDo.cardno + '&depositBank=' + that.distribeDo.depositBank,
        })
        }
    
    }
  },
  //监听页面加载
  onShow: function (options) {
    var that=this;
    var memberId = wx.getStorageSync('memberId')
      that.memberId=memberId,
    wx.getSystemInfo({
      success: function (res) {
          that.ImageWidth=res.screenWidth + 'px';
          that.ImageHeight=res.screenWidth / 2.02 + 'px';
      }
    })
    wx.request({
      url: globalStore.state.api + '/api/distribe/distribe',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        memberId: that.memberId
      },
      success: function (res) {
        if (res.data.memberDOList.length==0){
            that.hasmember=false
        }
        else{
            that.hasmember=true
        }
          that.distribeDo=res.data.distribeDo;
          that.total=res.data.total; //累计到账金额
          that.totalAssets=res.data.totalAssets;//资产总计
          that.memberDo=res.data.memberDo; //会员信息
          that.memberDOList=res.data.memberDOList; //下级会员信息
      }
    })

  },
  onLoad: function(options) {

  },
}
</script>

<style scoped>
/* pages/micromember/micromember.wxss */
image{
  width: 100%;
  height: 100%;
  display: block;
}
.micromemberBcg{padding-right: 30rpx;padding-left: 30rpx;height: 345rpx;}
.micromemberBcg{position: absolute;width: 90%;padding-left: 5%;padding-right: 5%;top:28rpx;}
.kbPanel{width: 100%;height: 100rpx;background: #fff;}
.introinfo{font-size: 28rpx;}
.pricetitle{font-size: 34rpx;}
.putforwardbtn{border-radius: 20rpx;font-size: 36rpx;}

.micromemberhead{position: relative;height: 280rpx;background: #484b54;}
.userInfo{position: absolute;top: 50rpx;left: 60rpx;display: flex;}
.useravator{height: 100rpx;width: 100rpx;overflow: hidden;border-radius: 50%;}
.username{color: #fff;font-size: 32rpx;height: 60rpx;line-height: 60rpx;width: 240rpx;text-align: left;padding-left: 20rpx;box-sizing: border-box;}
.userbanlance{position: absolute;right: 60rpx;bottom: -60rpx;color: #fff;font-size: 32rpx;}
.putforwardbtn{position: absolute;left: 60rpx;bottom: -45rpx;color: #fff;height: 70rpx;line-height: 70rpx;border: 1rpx solid #fff;width: 150rpx;text-align: center;}
.banlance{font-size: 50rpx;}
.micromemberPanel{display: flex; text-align: center;color:#B0B0B0;background: #fff;height: 150rpx;padding:20rpx 0;box-sizing: border-box; border-bottom: 1px solid #F1F1F1;}
.line{height: 100rpx;border: 0.5rpx solid #F1F1F1;}
.micromemberPanelLeft{width: 49.5%;}
.panelBalance{color: #DBC590;font-size: 40rpx;}
.micromemberdomain{display: flex;flex-wrap: wrap;background: #fff;}
.domainLine{height: 340rpx;border: 0.5rpx solid #F1F1F1;}
.micromemberdomainLeft{width: 49.5%;text-align: center;font-size: 32rpx;}
.micromemberIcom{width: 100rpx;height: 100rpx;overflow: hidden;margin: 24rpx 13rpx 29rpx 19rpx;}
.micromemberItem{display: flex;width: 50%;height: 180rpx;border-bottom:1rpx solid #F1F1F1; justify-content: space-between;}
.micromemberItemIntro{flex-grow:1; padding-right:10rpx;box-sizing: border-box; color: #B0B0B0;overflow:hidden; text-overflow:ellipsis;
display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:3; padding-top: 38rpx;box-sizing: border-box;font-size: 32rpx;}
.micromemberItemIntrotitle{color: #000;font-size: 35rpx;}
/* 会员列表 */
.memberContain{background: #fff;margin-top:20rpx;}
.membertitle{height: 80rpx;line-height: 80rpx;padding-left: 20rpx;box-sizing: border-box;}
.memberList{width: 95%;margin: 10rpx auto;border: 1rpx solid #F1F1F1;border-radius:10rpx;}
.memberuser{display: flex;width: 95%;margin: 0 auto;border-bottom:1rpx solid #F1F1F1; }
.memberuseravator{width: 80rpx;height: 80rpx;overflow: hidden;margin: 20rpx;border-radius:50%; }
.memberName{height: 100rpx;line-height: 100rpx;font-size: 0.9rem;}
.membergrade{display: flex;justify-content: space-between;height: 80rpx;line-height: 80rpx;font-size: 0.9rem;color: #B0B0B0;width: 95%;margin: 0 auto;}
.tip{height: 200rpx;line-height: 200rpx;text-align: center;color: #B0B0B0;}
</style>
