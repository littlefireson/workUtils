import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource';
import baseUrl from '../model/config';
Vue.use(Vuex)
Vue.use(VueResource)

/*1.state 在vuex中主要用于存储数据*/

var state = {
    count: 1,
    webconfig: {}
}

/*2.mutations 里面放的是方法，主要用于改变state里面的数据*/
var mutations = {

    incCount () {
        ++state.count;
    },
    getWebConfig (state, data) {
        state.webconfig = data;
    }

}

var actions = {
    getWebConfigList ({ commit }) {

        Vue.http.get(`${baseUrl}websiteConfig/list`).then((res) => {
            let obj = {};
            res.data.body.map((element, index) => {
                if (element.keyName == '备案信息') {
                    obj.recordInfo = element.value
                }
                else if (element.keyName == '联系信息') {
                    obj.phoneInfo = element.value
                }
                else if (element.keyName == '地址信息') {
                    obj.adressInfo = element.value
                }
                else if (element.keyName == 'logo') {
                    obj.logo = baseUrl+'public/file/preview/'+element.value
                }
            })
            commit('getWebConfig', obj)
        });
    }
}

/*
    3.实例化vuex.store
*/
const store = new Vuex.Store({
    state,
    mutations,
    actions
})


export default store;