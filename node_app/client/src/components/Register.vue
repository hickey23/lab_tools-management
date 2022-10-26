<template>
    <div class="registerDiv">
        <div class="registerBox">
            <h2>注册用户信息</h2>
            <div class="registerForm">
                <el-form :model="registerform"  :rules="registerformRules" ref="registerformRulesRef" label-width="100px">
                    <el-form-item label-width="80px" label="用户名" prop="username">
                        <el-input v-model="registerform.username" placeholder="请输入用户名" id="username" name="username">用户名</el-input>
                    </el-form-item>
                    <el-form-item label-width="80px" label="密码" prop="password">
                        <el-input type="password" v-model="registerform.password" placeholder="请输入密码" id="password" name="password">密码</el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" class="refreshBtn" @click="backWard()">重置</el-button>
                        <el-button type="primary" class="submitBtn" @click="submit()">提交</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>

<script>
 
    export default {
        name:'Register',
        data(){
            return{
                //注册表单的数据对象
                registerform:{
                    username:'',
                    password:'',
                },
                //这是表单的规则对象
                registerformRules:{
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
            submit(){
                this.$refs.registerformRulesRef.validate(async(valid)=>{
                    if(!valid){
                        console.log('注册提交失败');
                        this.$message.error('注册提交失败')
                        return false
                    }
                    var username=document.getElementById('username').value
                    var password=document.getElementById('password').value
                    this.registerform.username=username
                    this.registerform.password=password
                    // var data={}
                    console.log('registerform:',this.registerform)
                    console.log('------------------:',typeof(this.registerform));

                    const form=this.$qs.stringify(this.resgisterform)
                    console.log('@@@@@@@@@@@@@@@@@@form:',form);

                    // const result=await this.$http.post('/api/register',this.resgisterform)
                    const result=await this.$http({
                                        method: 'post',
                                        url:'/api/register',
                                        data:this.registerform,
                                        headers: {
                                            'Content-Type':'application/x-www-form-urlencoded'
                                        },
                                    })
                                    // params是添加到url的请求字符串中的，一般用于get请求。
                                    // data是添加到请求体（body）中的， 一般用于post请求。

                    console.log('@result:',result);
                    if(result.data.meta.status==1){
                        return this.$message.error('注册失败！')
                    }
                 
                    this.$message.success('注册成功！')
                    this.$router.push('/login')
                    // this.$router.push('/login')

                })
            },
            backWard(){
                this.$router.push('/login')
            }
        }

    }
</script>

<style lang="less" scoped>
    .registerDiv{
        width: 100%;
        height: 100%;
        // background-color: pink;
        background-image: url(../assets/img/720.jpg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .registerBox{
        position: absolute;
        width: 500px;
        height: 400px;
        background-color:rgba(228, 227, 227, 0.5);
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
    .registerForm{
        width:300px;
        height: 300px;
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
        margin-top: 50px;
        
    }
    h2{
        margin-top: 40px;
        text-align: center;
        margin-left: 40px;
    }
    .refreshBtn{
        float: right;
    }
    .submitBtn{
        float: right;
        margin-right: 20px;
    }

</style>