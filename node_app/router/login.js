//登录模块
const express=require('express')
const router=express.Router()
const bodyParser=require('body-parser');
const db = require('../db/connect_database');
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('../config/config.js')
const passport=require('passport')

var tstr=''

//登录接口
//localhost:8080/api/user  
router.post('/login',(req,res)=>{
    // res.json({msg:'success'})
    console.log(req.body);
    const userinfo=req.body
    //查询数据库中是否有
    const sql1='select * from mydb_one.users'
    db.query(sql1,[req.body.username,req.body.password],(error,result)=>{
        if(error){
            res.json({status:1,msg:error.message})
            return console.log('error1:',error.message);
        }

        //查询成功
        console.log('result1:',result);
        const sql2='select * from mydb_one.users where username=?'
        db.query(sql2,[userinfo.username],(error,result)=>{
            if(error){
                return console.log('error2:',error);
            }
            //////
            if(result.length!==1){
                console.log('执行SQL语句成功，但是获取到的数据条数不等于1',result.length)
                return res.json({status:1,msg:'登录失败'})
            }
            console.log('用户名匹配成功');
            //匹配密码
            if(userinfo.password!==result[0].password){
                console.log('密码错误');
                res.json({status:1,msg:'密码错误，请重新输入用户名和密码'})
            }
            console.log(result[0]);
            //RowDataPacket { id: 1, username: 'zs', password: '123456', status: 0 }
            const user={...result[0],tokenStr:''}
            const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:'10h'})
            console.log('tokenStr:',tokenStr);
            //赋值，方便以后做对比
            tstr='Bearer '+tokenStr
            user.tokenStr='Bearer '+tokenStr
            User=user
            
            console.log(user);
            //响应给客户端
            res.json({
                "meta":{
                    status:0,
                    msg:'登录成功',
                    token:'Bearer '+tokenStr,
                }
            })
        })

        

    })
})
router.get('/current',(req,res)=>{
    console.log(1);
    if(User.tokenStr!==tstr){
        // console.log(2);
        res.send('error')
    }
    else{
        
        res.json({
            id:User.id,
            username:User.username,
        })
    }
    
})


/////注册
//注册功能接口
router.post('/register',(req,res)=>{
    // console.log(111);
    res.setHeader('Access-Control-Allow-origin','*');
    var userinfo={
        username:'',
        password:'',
        status:0,
    }
    console.log('-----------req.body:',req.body);
    userinfo.username=req.body.username
    userinfo.password=req.body.password
    userinfo.status=userinfo.status
    console.log('-----------userinfo:',userinfo);
    // if(userinfo)
    const sql=`insert into mydb_one.users (username,password,status) values ("${userinfo.username}","${userinfo.password}","${userinfo.status}")`
    db.query(sql,(error,result)=>{
        if(error){
            console.log(error);
            return res.json({status:1,msg:error.message})
        }
        if(result.affectedRows!==1){
            console.log('sql语句插入失败');
            return res.json({status:1,msg:'sql语句插入失败'})

        }
        //注册成功
        res.json({
            "meta":{
                status:0,
                msg:'注册成功',
            }
        })
    })
})


module.exports=router