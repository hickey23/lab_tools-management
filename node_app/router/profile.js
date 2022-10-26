const express=require('express')
const db = require('../db/connect_database')
const router=express.Router()
// const flag=require('../../node_app/client/func/handle.js')
var url = require("url");


var labInfo=[]
var newData={}
// router.get('/',(req,res)=>{
//     res.json({status:0,msg:'ok'})
// })

//创建信息接口

router.post('/add',(req,res)=>{
    const userinfo=req.body
    // console.log('-@@@@@@@@@',userinfo);
    const profileFields={
        id:'',
        toolsName:'',
        toolsUse:'',
        is_return:'',
        is_borrow:'',
        is_delete:'',
        beizhu:'',
    }
    if(req.body.id) profileFields.id=parseInt(req.body.id)
    if(req.body.toolsName) profileFields.toolsName=req.body.toolsName
    if(req.body.toolsUse) profileFields.toolsUse=req.body.toolsUse
    /////////////////////////////
    if(req.body.is_return){
        if(req.body.is_return=="false"){
            req.body.is_return='1'
            profileFields.is_return=parseInt(req.body.is_return)
        }
        else if(req.body.is_return=="true"){
            req.body.is_return='0'
            profileFields.is_return=parseInt(req.body.is_return)
        }
    }
    if(req.body.is_borrow){
        if(req.body.is_borrow=="false"){
            req.body.is_borrow='1'
            profileFields.is_borrow=parseInt(req.body.is_borrow)//1
        }
        else if(req.body.is_borrow=="true"){
            req.body.is_borrow='0'
            profileFields.is_borrow=parseInt(req.body.is_borrow)
        }
    }
    if(req.body.is_delete){
        if(req.body.is_delete=="false"){
            req.body.is_delete='1'
            profileFields.is_delete=parseInt(req.body.is_delete)
        }
        else if(req.body.is_delete=="true"){
            req.body.is_delete='0'
            profileFields.is_delete=parseInt(req.body.is_delete)
        }
    }
    if(req.body.beizhu) profileFields.beizhu=req.body.beizhu
    console.log('-------------------------------------');
    console.log('profileFields',profileFields);
    // res.json(profileFields)
    // const sql='insert into mydb_one.lab_tools (id,toolsName,toolsUse,is_return,is_borrow,beizhu) values ?'
    const sql1=`insert into mydb_one.lab_tools (id,toolsName,toolsUse,is_return,is_borrow,is_delete,beizhu) values ("${profileFields.id}","${profileFields.toolsName}","${profileFields.toolsUse}","${profileFields.is_return}","${profileFields.is_borrow}","${profileFields.is_delete}","${profileFields.beizhu}")`
    console.log('@@@@@@@@@@@@@@@@@@@@sql1:',sql1)
    db.query(sql1,(error,result)=>{

        if(error){
            console.log(error);
            return res.json({status:1,msg:error.message})
        }
        if(result.affectedRows!==1){
            console.log('sql语句插入失败');
            return res.json({status:1,msg:'sql语句插入失败'})
        }
        //插入数据成功
        res.json({status:0,msg:'添加设备成功'})
    })

})


//获取数据库中的所有信息
router.get('/device',(req,res)=>{
    // const page={
    //     pagenum:'',
    //     pagesize:'',
    // }
    //params就是get方法携带的参数
    var params = url.parse(req.url, true).query;
    console.log('######params:',params);
    //
    const pagenum=parseInt(params.pagenum)
    const pagesize=parseInt(params.pagesize)

    console.log(typeof(pagenum),typeof(pagesize));

    // SELECT * FROM table WHERE 查询条件 ORDER BY 排序条件 LIMIT ((页码-1)*页大小),页大小;
    const sql='select * from mydb_one.lab_tools'
    db.query(sql,(error,result)=>{
        // console.log('sql:',sql);
        if(error){
            console.log('select_all_error:',error);
            return res.json({status:1,msg:error.message})
        }
        // console.log(result);
        // 获取全部数据成功
        res.json({
            status:0,
            msg:'获取所有信息成功',
            data:result,
            total:result.length,
        })

        // -------------------------------------------------------------------------
        //或者用limit在后端实现分页
        // else{
        //     //////获取全部元素成功
        //     console.log('--------------------------------------------');
        //     console.log(result);//返回所有数据库中的数据
        //     // COUNT(column_name) 函数返回指定列的值的数目（NULL 不计入）：
        //     let sqlTotal=`select * from mydb_one.lab_tools order by id limit ${((pagenum-1)*pagesize)},${pagesize}`
        //     db.query(sqlTotal,(error,result1)=>{
        //         console.log('result1:',result1);
        //         if(error) return console.log(error);

        //         res.json({
        //             status:0,
        //             msg:'获取所有信息成功',
        //             data:result1,
        //             //total这里要返回所有数据的长度，而不是经过筛选后的数据表长度
        //             total:result.length,
        //             paging: {
        //                 page_num: pagenum,
        //                 page_size: pagesize,
        //             }
        //         })

        //     })
        // }
        // ---------------------------------------------------

        // [
        //     {
        //         "id": 1,
        //         "toolsName": "示波器",
        //         "toolsUse": "用于检测数字电路波形",
        //         "is_return": 0,
        //         "is_borrow": 1,
        //         "beizhu": "示波器"
        //     },
        //     {
        //         "id": 2,
        //         "toolsName": "STM32单片机",
        //         "toolsUse": "用于嵌入式开发和测试",
        //         "is_return": 1,
        //         "is_borrow": 0,
        //         "beizhu": "单片机"
        //     },
        //     {
        //         "id": 3,
        //         "toolsName": "数字震荡电路",
        //         "toolsUse": "用于学生实验",
        //         "is_return": 1,
        //         "is_borrow": 0,
        //         "beizhu": "电路"
        //     },
        //     {
        //         "id": 4,
        //         "toolsName": "温度计",
        //         "toolsUse": "测量温度",
        //         "is_return": 1,
        //         "is_borrow": 1,
        //         "beizhu": "温度计"
        //     },
        //     {
        //         "id": 5,
        //         "toolsName": "频谱分析仪",
        //         "toolsUse": "用于做傅里叶变换频谱分析",
        //         "is_return": 1,
        //         "is_borrow": 1,
        //         "beizhu": "频谱分析仪"
        //     }
        // ]

    })
})





//获取用户信息
router.get('/user',(req,res)=>{
    var params = url.parse(req.url, true).query;
    const pagenum=params.pagenum
    const pagesize=params.pagesize

    const sql='select * from mydb_one.users'
    db.query(sql,(error,result)=>{
        if(error){
            return console.log('error:',error);
        }
        ////获取全部数据成功
        else{
            console.log('allResult:',result);
            let sqlTotal=`select * from mydb_one.users order by id limit ${((pagenum-1)*pagesize)},${pagesize}`
            db.query(sqlTotal,(err,result1)=>{
                if(err){
                    console.log('err:',err);
                    return err
                } 
                //获取成功
                res.json({
                    status:0,
                    msg:'获取用户信息成功',
                    total:result.length,
                    data:result1,
                })
            })

        }
        
    })

})







//获取数据库中的单个数据
router.post('/:id',(req,res)=>{
    const sql='select id,toolsName,toolsUse,is_return,is_borrow,beizhu from lab_tools where id=?'
    db.query(sql,req.body.id,(error,result)=>{
        if(error){
            console.log('select_error:',error);
            return res.json({status:1,msg:error.message})
        }
        if(result.length!==1){
            return res.json({status:1,msg:'sql语句获取用户信息失败'})
        }
        newData=result[0]
        //获取指定id用户信息成功
        res.json({
            status:0,
            msg:'获取用户信息成功',
            data:result[0]
        })
    })
})



//编辑修改信息
router.post('/edit/:id',(req,res)=>{
    //更新数据库语句
    const sql='update mydb_one.lab_tools set ? where id=?'
    db.query(sql,[req.body,req.body.id],(error,result)=>{
        if(error){
            console.log('edit_error:',error);
            return res.json({status:1,msg:error.message})
        }
        if(result.affectedRows!==1){
            return res.json({status:1,msg:'sql更新用户信息失败'})
        }
        console.log(result);
        //更新数据成功
        res.json({
            status:0,
            msg:'更新用户信息成功',
            data:newData,//这里返回的是空 ？？？
        })
    })
})


//删除信息
router.get('/delete/:id',(req,res)=>{
    const sql='update mydb_one.lab_tools set is_delete=1 where id=?'
    db.query(sql,req.body.id,(error,result)=>{
        if(error){
            console.log('delete_error:',error);
            return res.json({status:1,msg:error.message})
        }
        if(result.affectedRows!==1){
            return res.json({status:1,msg:'sql语句执行失败，根据id删除用户信息失败'})
        }
        //
        res.json({
            status:0,
            msg:'删除用户信息成功'
        })
    })

})

//分页，根据前端的点击的页码来响应数据
// router.get('/')





module.exports=router