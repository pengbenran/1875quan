<template>
  <div class="tab">
    <ul class="find_item" scroll="no">
   		<li class="find_item_list" v-for="(item, index) in find_item" :index="index" :key="key" :class="{'select':item.selected}" v-on:click="changTab(index)">
   			<span>{{item.name}}</span>
   		</li>
   	</ul>
  </div>
</template>

<script>
export default {
  props: ['find_item'],
  data () {
    return {
    	
    }
    },
    methods: {
  		changTab:function(index){
		  	var that=this;
	      	for(var i=0;i<that.find_item.length;i++){
	      		that.find_item[i].selected=false;
	      	}
	      	that.find_item[index].selected=true;
	      	that.$emit("listenToChildEvent",index);
	    }
    }
}
</script>

<style>
.find_item{
	/*border-bottom: 1px solid #F64F57;*/
	width:100%;
	height: 40px; 
	background:  #fff;
	display: flex;
	justify-content: space-around;
}
.find_item li{
	display: inline-block;
	text-align: center;
	height: 40px;
	line-height: 40px;
	font-size: 16px;
	flex-grow: 1;
}
.select{
	font-weight: bold;
	font-size: 22px;
	color: #F64F57;
	border-bottom: 2px solid #F64F57;
}
</style>