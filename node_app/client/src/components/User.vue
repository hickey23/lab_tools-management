<template>
  <div>
    <div>
      <el-container>
        <el-header>
          <div class="box">
            <div class="picbox">
              <a href="http://localhost:8081/login">
                <img src="../assets/img/hubu.png" alt="hubu">
              </a>
            </div>
            <div class="textbox"><h3>实验室设备管理系统</h3></div>
          </div>
  
          <!-- 退出按钮 -->
          <div class="button"><el-button type="primary" class="exitbtn" @click="exit()">退出</el-button></div>
          <!-- //用户信息 -->
          <div class="userinfo">
            <div id="textbox"><h3>欢迎使用！</h3></div>
            <div id="picbox"><a href="#"><img src="../assets/img/avatar.jpg" alt="avatar"></a></div>
          </div>
        </el-header>
        <!-- /////// -->
        <!-- 侧边栏 -->
        <el-container>
          <el-aside width="200px">
            <el-row>
              <el-col>
                <!-- //侧边栏菜单区 -->
                <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                  <el-menu-item index="0" @click="toHome()" id="indexSpan">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                  </el-menu-item>
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <!-- <span>导航一</span> -->
                    </template>
                  <!-- ////////////////////////////////////////////////////// -->
                    <template slot="title">选项</template>
                    <template v-for="item in items">
                      <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template slot="title">
                          <i :class="'fa-margin '+item.icon"></i>
                          <span slot="title">{{item.name}}</span>
                        </template>

                        <router-link v-for="(childrenItem,childrenIndex) in item.children" 
                        :to="childrenItem.path" :key="childrenIndex">
                          <el-menu-item :index="childrenItem.path">
                            <span slot="title">{{childrenItem.name}}</span>
                          </el-menu-item>
                        </router-link>
                      </el-submenu>
                    </template>
                  </el-submenu>

                  <!-- //写死的其他导航栏 -->
                  <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                  </el-menu-item>
                  <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                  </el-menu-item>
                  <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>  
          </el-aside>
          
          <!-- 主体 -->
          <el-main>
            <!-- 面包屑 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表 </el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- //卡片视图 -->
            <el-card>
              <el-row>
                <el-col :span="10">
                  <el-input placeholder="请输入要查询的用户信息">
                    <el-button icon="el-icon-search" slot="append" type="primary"></el-button>
                    <!-- <el-button type="primary" slot="append">添加设备信息</el-button> -->
                  </el-input>
                </el-col>
                <!-- //添加按钮 -->
                <el-button type="primary" class="addUsersBtn">添加用户信息</el-button>
              </el-row>
              <!-- // -->
              <!-- //主体表格区域 -->
              <el-table :data="tableData" stripe style="width: 100%" border>
                <el-table-column
                  prop="id"
                  label="ID"
                  width="300">
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="用户名"
                  width="230">
                </el-table-column>
                <el-table-column
                  prop="password"
                  label="密码"
                  width="230">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                  width="300">
                  <template v-slot="scope">
                    <el-switch
                      v-model="scope.row.status">
                    </el-switch>
                  </template>
                </el-table-column>
              </el-table>
           
            </el-card>
            
            <!-- //分页 -->
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[1,3,5,8,10,20]"
              :page-size="queryInfo.pagesize"
              :current-page.sync="queryInfo.pagenum"
              >
            </el-pagination>
        
            
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
    export default {
        name:'User',
        created(){
          this.getUserInfo()
        },
        data(){
          return{
            items:[
                  {
                    icon:'fa-money',
                    name:'设备管理',
                    path:'/device',
                    children:[
                      {path:'/home/deviceInfo',name:'设备信息'},
                    ]
                  },
                  {
                    icon:'fa-asterisk',
                    name:'信息管理',
                    path:'/user',
                    children:[
                      {path:'/home/userInfo',name:'用户信息'},
                    ]
                  },
              ],
            queryInfo:{
              query:'',
              pagenum:1,
              pagesize:8,
            },
            //保存用户信息，数组对象
            tableData:[],
            //
            total:0,

          }
        },
        methods:{
          //获取用户信息
          async getUserInfo(){
              const result=await this.$http.get('/api/profile/user',{params:{pagenum:this.queryInfo.pagenum,pagesize:this.queryInfo.pagesize}})
              console.log('--------result:',result)
              if(result.data.status!==0){
                return this.$message.error('获取用户信息失败')
              }
              //获取成功
              this.tableData=result.data.data
              console.log('@@@tableData:',this.tableData);
              this.total=result.data.total
              this.$message.success('获取用户信息成功')

          },
          //处理当前页展示个数变化的函数
          handleSizeChange(newsize){
            this.queryInfo.pagesize=newsize
            console.log('this.queryInfo.pagesize:',this.queryInfo.pagesize)
            this.getUserInfo()


          },
          //处理当前页码变化函数
          handleCurrentChange(newpage){
            this.queryInfo.pagenum=newpage;
            console.log('this.queryInfo.pagenum:',this.queryInfo.pagenum)
            this.getUserInfo();
            // // this.tableData=this.allTableData
          },




          //首页跳转
          toHome(){
            var indexSpan=document.getElementById('indexSpan')
            console.log('indexSpan:',indexSpan)
            //如果换成http://127.0.0.1:8081/home会跳转到登录页面?,不知道为什么
            location.href="http://localhost:8081/login#/home";

          },
          //退出按钮函数
          exit(){
            location.href='http:127.0.0.1:8081' 
          },
        }
    }
</script>

<style lang="less" scoped>
  .el-header{
      width:100%;
      height: 200px;
      // background-color: rgb(100, 100, 100);
      background-color: rgb(84, 92, 100);
    }
    .el-aside{
      width:500px;
      height: 650px;
      // background-color: rgb(100, 100, 100);
      background-color: rgb(84, 92, 100);
    }
    .box{
      float: left;
      width: 300px;
      height: 60px;
      // background-color: pink;
    }
    .picbox{
      float: left;
      width: 60px;
      height: 60px;
      
      img{
        width: 100%;
        border-radius: 50%;
      }
    }
    .textbox{
      float: right;
      width: 240px;
      height: 60px;
      h3{
        text-align: center;
        color: #fff;
      }
    }
    .userinfo{
      float: right;
      width: 200px;
      height: 60px;
      // background-color: aquamarine;
      // margin-left: 10px;
    }
    #textbox{
      float: left;
      width: 140px;
      height: 60px;
      h3{
        text-align: center;
        color: #fff;
      }
    }
    #picbox{
      float: right;
      width: 60px;
      height: 60px;
      img{
        width: 100%;
        border-radius: 50%;
      }
    }
    .button{
      float: right;
      position:relative;
      width: 90px;
      height: 60px;
      // margin-right: 30px;
    }
    .exitbtn{
      text-align: center;
      font-size: 14px;
      // line-height: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    // main的样式
    .el-breadcrumb{
      margin-bottom: 20px;

    }

    
    .addUsersBtn{
      float:right;
    }
    .el-table{
      margin-top: 20px;
    }
    .el-pagination{
      text-align: center;
      margin-top:10px;
    }

</style>