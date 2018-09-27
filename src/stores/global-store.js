import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        count:0,
       //api:'http://192.168.2.131:8080/1875',
       //api:"https://qx.guqinet.com:8444/1875",
       //api:"http://47.104.169.174:8090/1875",
       //api:'http://192.168.2.208/1875',
       api:"https://www.etuetf.com",
       //api:'http://192.168.2.131:8090',
      // api:'http://192.168.2.111/1875',
       //api:"https://www.guqinjiujiang.xyz:8444/guqinzhen",
       //api:'http://192.168.2.131:8090/1875',
       //api:'http://192.168.2.159/1875',
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
