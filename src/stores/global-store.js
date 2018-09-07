import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        count:0,
        api:"https://www.guqinjiujiang.xyz:8444/guqinzhen",
        imgapi:"https://shop.guqinet.com/html/images/shanquan/",
        guqinimgapi:"https://shop.guqinet.com/html/images/shanquan"
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