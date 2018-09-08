<template>
  <div class="fenrun">
     <div class="smlistContainer">
      <div class="showList" v-if="Goods!=0">
    <ul class="smlistUl">
        <li v-for="(item,index) in goodsList" :key='item' :index='index'>
            <a :href="'../shumainfo/main?goodid='+item.goodsId+'&catid='+item.catId+''">
            <div class="smlistimg"><image :src="item.thumbnail"></image></div>
            <div class="smlistinfo">
                <div class="infotitle">{{item.name}}</div>
                <div class="smlistpri">
                  <small>￥{{item.price}} </small>
                </div>
            </div>
            </a>
        </li>
        <!--template内以上为动态代码 以下均可删除-->
    </ul>
    </div>
    <div v-else class="hideList"><span>~~该分类商品暂时为空</span></div>
  </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store";

export default {
  data () {
    return {
        goodsList:[]    
    }
  },

  components: {
  
  },

  methods: {
    onloads(){
        var that=this
        wx.request({
          url: globalStore.state.api + '/api/distribe/goodsList',
          headers: {
            'Content-Type': 'application/json'
          },
          success:function(res){
            console.log(res.data)
            if(res.data.code==0){
                that.goodsList=res.data.goodsList
            }
          } 
        })
    }  
  },

  onLoad:function(option){
     this.onloads();
  }
}
</script>

<style scoped>
image{width:100%;height:100%;display:block;}

.smlistContainer{height: 100vh;background:#f2f2f2;}

.smlistUl{display: flex;flex-wrap: wrap;}
.smlistUl li{width: 48.6%;border-top: 20rpx solid #f2f2f2;}
.smlistUl li:nth-child(1){border-right: 10rpx solid #f2f2f2;}
.smlistUl li:nth-child(2n){border-left: 10rpx solid #f2f2f2;}
.smlistUl li:nth-child(3n){border-right: 10rpx solid #f2f2f2;}
.smlistimg{height:360rpx;}
.smlistpri{display: flex;align-items: center;justify-content: space-between;margin-top: 20rpx;} 
.smlistinfo{padding-left: 15rpx;padding-right: 15rpx;padding-bottom: 20rpx;background: #fff;}
.infotitle{font-size: 26rpx;}
.smlistinfo small{margin-right: 15rpx;font-size: 35rpx;color:red;}
.smlistinfo label{color:#666;font-size: 20rpx;}
.smlistinfo .smallLeft{color:#666;width: 30rpx;letter-spacing: 1rpx;}

/*hideList*/
.hideList{text-align: center;line-height: 50rpx;}
.hideList span{font-size: 30rpx;color:#ccc;}
</style>
