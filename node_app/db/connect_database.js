const mysql=require('mysql')

//建立与数据库的联系
const db=mysql.createPool({
    host:'127.0.0.1',     //数据库的ip地址,端口号3308
    port:'3308',
    user:'root',  //登录数据库账号
    password:'admin', //密码
    database:'mydb_one', //指定操作数据库的名称 
})


 


module.exports=db