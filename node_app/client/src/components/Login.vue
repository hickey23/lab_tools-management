<template>
  <div class="AllDiv">
    <div class="bgpic"></div>
    <div class="loginbox">
        <div class="userinfo_input">
            <h2>实验室设备管理系统</h2>
            <!-- 用户名 -->
            <!-- username -->
            <!-- //通过ref拿到表单的引用对象，身上的validate属性验证 -->
            <!-- prop表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
            <el-form  label-width="80px" :model="loginform" :rules="loginformRules" ref="loginFormRef">
                <el-form-item label="用户名" class="username" prop="username">
                    <el-input prefix-icon="el-icon-user-solid" v-model="loginform.username">用户名</el-input>
                </el-form-item>
            </el-form>  
            <!-- 密码 -->
            <el-form  label-width="80px" :model="loginform" :rules="loginformRules" ref="loginFormRef">
                <el-form-item label="密码" class="password" prop="password"> 
                    <el-input prefix-icon="el-icon-s-goods" v-model="loginform.password" type="password">密码</el-input>
                </el-form-item>
            </el-form>      
            <!-- <br> -->
            <!-- //登录页面下面的按钮 -->
            <el-button type="info" class="registerButton" @click="toRegister()">注册</el-button>
            <el-button type="primary" class="loginButton" @click="login()">登录</el-button>
        </div>
    
    </div>
  </div>
</template>

<script>
    export default {
        name:'Login',
        data(){
            return{
                //登录表单的数据对象
                loginform:{
                    username:'',
                    password:'',
                },
                //这是表单的规则对象
                loginformRules:{
                    //验证用户名是不是合法
                    username:[
                        //参考elementUI
                        {required:true,message:'请输入登录名称',trigger:'blur'},
                        {min:3,max:10,message:'长度在3到10字符之间',trigger:'blur'},
                    ],
                    password:[
                        {required:true,message:'请输入密码',trigger:'blur'},
                        {min:3,max:10,message:'长度在3到10之间',trigger:'blur'},
                    ],
                }
            }
        },
        methods:{
            toRegister(){
                location.href="http://127.0.0.1:8081/#/register";
            },
            login(){
                this.$refs.loginFormRef.validate(async (valid)=>{
                    if(!valid){
                        console.log('注册提交失败');
                        return this.$message.error('注册提交失败')         
                    }
                    //valid==true
                    console.log('@@@loginform:',this.loginform)
                    //
                    const result=await this.$http({
                        method: 'post',
                        url:'/api/login',
                        data:this.loginform,
                        headers: {
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                    })
                    console.log('#######result:',result);
                    if(result.data.meta.status==1){
                        return this.$message.error('登录失败，请重新输入用户名与密码！')
                    }
                    //登录成功
                    this.$message.success('登录成功！')
                    window.sessionStorage.setItem('token', result.data.meta.token);
                    //跳转到home页面
                    this.$router.push('/home')
                })
            }
            
        }

    }
</script>

<style lang="less" scoped>
    .AllDiv{
        width: 100%;
        height:100%;
    }
    .loginbox{
        position:absolute;
        width:500px;
        height: 400px;
        background-color:rgba(228, 227, 227, 0.5);
        // opacity:0.9;
        border-radius: 10%;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        box-shadow: 0px 15px 25px rgba(151, 150, 150, 0.5);
        -webkit-filter: blur(0.1px);
        -moz-filter: blur(0.1px);
        -ms-filter: blur(0.1px);
        -o-filter: blur(0.1px);
        filter: blur(0.1px);
    }
    .bgpic{
        height: 100%;
        width: 100%;
        background-image: url(../assets/img/background.jpg);
        // background-color: skyblue;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        // filter: blur(0.5px);
    }
    .userinfo_input{
        width: 300px;
        height: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .el-form{
        margin-top: 50px;
        margin-right: 10px;
        font-size: 14px;
    }
    h2{
        color: #606266;
        text-align: center;
    }
    .loginButton{
        float:right;
        margin-right: 20px;
    }
    .registerButton{
        float:right;
    }

</style>