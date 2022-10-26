import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from '../router/router.js'
//引入全局css文件
import '../src/assets/css/global.css'

//导入axios
import axios from 'axios'
//
import qs from 'qs'

Vue.config.productionTip = false

//使用axios
Vue.prototype.$http=axios;

//使用vuerouter
Vue.use(VueRouter)
//使用elementUI
Vue.use(ElementUI);
//使用qs
Vue.prototype.$qs = qs

axios.defaults.baseURL='http://127.0.0.1:8080';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 通过axios清求拦载添加token，保证拥有获取数据的权限
axios.interceptors.request.use(config=>{
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@config:',config);
  config.headers.Authorization=window.sessionStorage.getItem('token');
  //最后必须return config
  return config
})




const vm=new Vue({
  el:'#app',
  render(p){
    // console.log(p(App4));
    return p(App);
  },
  router:router,
})
console.log('vue启动成功!!!',vm);
