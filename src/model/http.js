import Vue from 'vue';
import VueResource from 'vue-resource';
import baseUrl from './config';
Vue.use(VueResource);

export default {
    get(url,params){
        return new Promise((resolve,reject)=>{
            Vue.http.get(
                baseUrl+url,
                {
                    emulateJSON: true,
                    params:{
                        ...params,
                        access_token:localStorage.getItem('token')
                }
            }
            )
            .then((res)=>{
                let {auth,head,body} = res.body;
                if(auth&&auth.timeout){
                    // message.error('登录超时，请重新登录');
                    location.hash = '#/login';
                }
                if(head == undefined){
                    return resolve(response.data);
                }
                if(head.retCode=='0000'){
                    return resolve(body);
                }else if(head.retCode=='9000'){
                    if(localStorage.getItem('isAuth')){
                        message.error(head.msg);
                    }
                    localStorage.clear('isAuth');
                    return Promise.reject(head);
                }
            })
            .catch((err)=>{
                reject(err);
            })
        })
    },
    post(url, params,option) {
        return new Promise((resolve, reject) => {
          Vue.http.post(
            baseUrl+url,
            params,
            {emulateJSON: true}
          )
            .then((res)=>{
                let {auth,head,body} = res.body;
                if(head == undefined){
                    return resolve(response.data);
                }
                if(head.retCode=='0000'){
                    return resolve(body);
                }
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
}
