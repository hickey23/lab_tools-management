import Vue from "vue"
import VueRouter from "vue-router"
import Login from '../src/components/Login.vue'
import Register from '../src/components/Register.vue'
import Home from '../src/components/Home.vue'
import Device from '../src/components/Device.vue'
import User from '../src/components/User.vue'


Vue.use(VueRouter)

//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

const router =new VueRouter({
    mode:'hash',
    routes:[
        {
            path:'/',
            redirect:'/login', 
        },
        {
            path:'/login',
            component:Login,
        },
        {
            path:'/register',
            component:Register,
        },
        {
          path:'/home',
          component:Home,
        },
        {
          path:'/home/deviceInfo',
          component:Device,
        },
        {
          path:'/home/userInfo',
          component:User,
        }
          
        
    ] 
})

// module.exports = router 

//路由守卫
router.beforeEach((to,from,next)=>{
    console.log('全局前置路由守卫启动');
    if(to.path=='/login'){
      next()
    }
    //如果访问home页面需要有token
    //根据键来获得值
    //这里注意home并不是login页面的子页面，是一个独立的页面
    if(to.path=='/home'){
      const tokenStr=window.sessionStorage.getItem('token')
      //如果tokenstr存在
      if(tokenStr){
        next()
      }
      else{
        alert('权限不够，即将调回登录页面')
        next('/login')
      }
    }
    if(to.path=='/home/deviceInfo'){
      const tokenStr=window.sessionStorage.getItem('token')
      console.log(111);
      // window.sessionStorage.setItem('token',tokenStr)
      if(tokenStr){
        next()
      }
      else{
        alert('token失效，请重新登录！')
        next('/login')
      }
    }
    else{
      next()
    }
})


export default router