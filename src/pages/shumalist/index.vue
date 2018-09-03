<template>
  <div class="smlistContainer">
      <div class="showList" v-if="Goods!=0">
    <ul class="smlistUl">
        <li v-for="(item,index) in Goods" :key='item' :index='index'>
            <a :href="'../shumainfo/main?goodid='+item.goodsId+'&catid='+item.catId+''">
            <div class="smlistimg"><image :src="item.thumbnail"></image></div>
            <div class="smlistinfo">
                <div class="infotitle">{{item.name}}</div>
                <div class="smlistpri">
                  <small>￥{{item.price}} <label>848人购买</label></small><small class="smallLeft">....</small>
                </div>
            </div>
            </a>
        </li>
        <!--template内以上为动态代码 以下均可删除-->
    </ul>
    </div>
    <div v-else class="hideList"><span>~~该分类商品暂时为空</span></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      Goods:[]
     }
  },

  components: {

  },

  methods: {
      //跳转事件
      jump:function(){
           wx.navigateTo({
           url: '../shumainfo/main',
       })
     },
      geiShoplist(brandid){
        wx.showLoading({
        title: '加载中',
        })
          let that=this;
          let api="https://www.guqinjiujiang.xyz:8444/guqinzhen";
          let parms={};
          let goods={};
          goods.brandId = brandid; //后期设置为变量（测试阶段）
          goods.catId=undefined;//后期设置为变量（测试阶段）
          parms.goods=goods;
          wx.request({
            url: api+'/api/Goods/getGoodsAll', 
            data: {parms:parms},
            header: {
                'content-type': 'application/json' // 默认值
              },
            success: function(res) {
                wx.hideLoading();//关闭加载弹框
                that.Goods=res.data.Goods//赋值
                console.log(res.data)
              }
            })
      }
   },

   onLoad(options){
       //现在只设置了品牌分类
       console.log(options.brandid);
     this.geiShoplist(options.brandid);
  }
}
</script>





<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}
.smlistContainer{height: 100vh;background:#f2f2f2;}

.smlistUl{display: flex;flex-wrap: wrap;}
.smlistUl li{width: 48.6%;border-top: 20rpx solid #f2f2f2;}
.smlistUl li:nth-child(1){border-right: 10rpx solid #f2f2f2;}
.smlistUl li:nth-child(2n){border-left: 10rpx solid #f2f2f2;}
.smlistUl li:nth-child(3n){border-right: 10rpx solid #f2f2f2;}
.smlistimg{height:360rpx;}
.smlistpri{display: flex;align-items: center;justify-content: space-between;margin-top: 20rpx;} 
.smlistinfo{padding-left: 15rpx;padding-right: 15rpx;padding-bottom: 20rpx;background: #fff;}
.infotitle{font-size: 21rpx;}
.smlistinfo small{margin-right: 15rpx;font-size: 26rpx;color:red;}
.smlistinfo label{color:#666;font-size: 20rpx;}
.smlistinfo .smallLeft{color:#666;width: 30rpx;letter-spacing: 1rpx;}

/*hideList*/
.hideList{text-align: center;line-height: 50rpx;}
.hideList span{font-size: 30rpx;color:#ccc;}
</style>
