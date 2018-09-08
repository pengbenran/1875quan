import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        count:0,
        api:"https://www.guqinjiujiang.xyz:8444/guqinzhen",
        imgapi:"https://shop.guqinet.com/html/images/shanquan/",
<<<<<<< HEAD
       // imgapi:"https://shop.yogain.cn/simages",
        guqinimgapi:"https://shop.guqinet.com/html/images/shanquan"

=======
>>>>>>> c09a192297443696c5d8bfc32f2417ffeb48cb1d
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
