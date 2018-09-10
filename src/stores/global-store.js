import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        count:0,
<<<<<<< HEAD
       // api:"https://www.guqinjiujiang.xyz:8444/guqinzhen",
       api:'http://192.168.2.208/1875',
        imgapi:"https://shop.guqinet.com/html/images/shanquan/",
=======
        // api:"https://www.guqinjiujiang.xyz:8444/guqinzhen",
        api:'http://192.168.2.131/1875',
        imgapi:"https://shop.guqinet.com/html/images/shanquan/",
        guqinimgapi:"https://shop.guqinet.com/html/images/shanquan"
>>>>>>> c70150b58825c4ff57937d3f994e1012995e8b4a
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