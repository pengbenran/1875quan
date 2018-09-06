import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        count:0,
        api:"https://www.guqinjiujiang.xyz:8444/guqinzhen",
<<<<<<< HEAD
        imgapi:"https://shop.guqinet.com/html/images/shanquan/"
=======
        imgapi:"https://shop.yogain.cn/simages",
        guqinimgapi:"https://shop.guqinet.com/html/images/shanquan"
>>>>>>> 55ec8608f68bd936ee7ec3b00528f496f02c1c67
    },
    mutations:{
    //   increment:(state)=>{
    //      state.count+=1
    //   },
    //   decrement:(state)=>{
    //       state.count-=1
    //   }
    },
})