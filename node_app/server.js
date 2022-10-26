const bodyParser = require('body-parser')
const express=require('express')
const db=require('../node_app/db/connect_database.js')
const app=express()
const login=require('../node_app/router/login.js')
// const passport=require('passport')
const joi=require('joi')
const profile=require('../node_app/router/profile.js')


//body-parser是非常常用的一个express中间件，作用是对post请求的请求体进行解析
//使用bodyparser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



//导入并且配置cors
const cors=require('cors')
app.use(cors())


//一定要在路由之前配置解析
const expressJWT=require('express-jwt')
const config=require('./config/config.js')
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))



// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//定义错误级别中间件
app.use((error,req,res,next)=>{
    //验证失败导致的错误
    if(error instanceof joi.ValidationError){
        // console.log('--------------------');
        return res.send(error)
    }
    //身份认证失败错误
    // console.log(111111);
    if(error.name=='UnauthorizedError'){
        // console.log('@@@@',error);
        return res.send('身份认证失败1111111')
    }
    // res.cc('成功')
    //未知错误
    res.send(error)
})



app.get('/',(req,res)=>{
    res.send('helloworld')
})

//全局注册用户登录的router(login.js)
app.use('/api',login)


//全局注册profile路由组件(profile.js)
app.use('/api/profile',profile)

// app.use()





app.listen('8080',()=>{
    console.log('服务器启动,监听8080端口');
})