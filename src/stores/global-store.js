import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        count:0,
       //api:"https://www.guqinjiujiang.xyz:8444/guqinzhen",
        //api:'http://192.168.2.208/1875',
        // api:"https://www.guqinjiujiang.xyz:8444/guqinzhen",
       api:'http://192.168.2.131/1875',
       imgapi:"https://shop.guqinet.com/html/images/shanquan/",
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
