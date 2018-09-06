<template>
  <div class="switch">
    <div v-for="(item,index) in find_swich" :index='index' :key="item">
      <switch :checked='item.isOn' @click="switchTap(item.isOn)" class="wx-switch-input"/>
    </div>
  </div>
</template>

<script>

export default {
  props: ['find_swich'],
  data () {
    return {
 
     }
  },    

  methods: {
    switchTap(isOn){
     let that=this;
     that.find_swich[0].isOn=!isOn;
     console.log(that.find_swich[0].isOn);
    }

   },
  onLoad(){
   console.log();
  }
}
</script>
<style scoped>
image{
  width: 100%;
  height: 100%;
  display: block;
}

</style>
