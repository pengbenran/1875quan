<template>
  <div class="women">
    <div class="header"><img :src="headerimg" /></div>
    <div class="info">
        <div class="title"> <span>关于我们</span> </div>
         <div class="contenter">
             1875圈 是江西谷琴信息产业有限公司（企业代码163881）在C2F模式下对连锁经营和新零售领域进行全新型拓展项目，通过线上购物、线下体验与现代物流完美结合，集形象展示、市场服务、地区化供货系统和门店零售于一体，形成全新商业模式，让商业实现新共享，让商业回归本质----交换（圈子）。
            新金服，新零售，新营销，1875圈 共享商业平台将会提供近数千种概念新颖的生活必需产品（服务），满足多层次需要，真正的
            从圈子里来到圈子中去，实现回归商业本质，创全球梦想的目的。达到从工厂（提供商）直接到社区家庭的一站式产品（服务）的
            效果，产品（服务）涉及生活人们方方面面。同时从各方面多渠道保证会员，供应商，合伙人的利润，引领消费致富的新思维，实现每个人
            的梦想----创全球梦想，实现自我商业价值。
         </div>
    </div>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"

export default {
  data () {
    return {
      headerimg: globalStore.state.imgapi+'image/women.jpg'
    }
  },

  components: {

  },

  methods: {

  },

  onLoad (options) {

  }
}
</script>

<style scoped>
img{width: 100%;height: 100%;display: block;}
.women{background: #fff;min-height: 100vh;}
.header{height: 295rpx;}
.info{padding-left: 25rpx;padding-right: 25rpx;}
.info .title{text-align: center;font-size: 40rpx;font-weight: 200;margin-top: 30rpx;}
.contenter{font-size: 32rpx;font-weight: 100;text-align: justify;color: #666;margin-top: 25rpx;}
.title span{border-bottom: 6rpx solid #eca79c;}
</style> 
