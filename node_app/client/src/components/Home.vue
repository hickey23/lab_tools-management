<template>
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
        <!-- //用户信息 -->
        <div class="button"><el-button type="primary" class="exitbtn" @click="exit()">退出</el-button></div>
        <div class="userinfo">
          <div id="textbox"><h3>欢迎使用！</h3></div>
          <div id="picbox">
            <a href="#">
              <img src="../assets/img/avatar.jpg" alt="avatar">
            </a>
          </div>
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
                <el-menu-item index="0">
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
          <h1>欢迎使用湖北大学实验室管理系统</h1>
          <!-- <router-view></router-view> -->
          <img style="width: 100%;height: 85%;" src="../assets/img/hububanner.jpg" alt="">
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
        name:'Home',
        data(){
            return {
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
                  }
                ],

            }
        },
        methods:{
          exit(){
            location.href='http:127.0.0.1:8081'
          }
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

  //文字闪烁效果
  h1{ 
      text-align: center;
    	font-size: 40px; 
    	color:#f91810; 
    	margin: 10px;
    	animation: changeshadow 1s  ease-in  infinite ;
    	/* 其它浏览器兼容性前缀 */
	    -webkit-animation: changeshadow 1s linear infinite;
	    -moz-animation: changeshadow 1s linear infinite;
	    -ms-animation: changeshadow 1s linear infinite;
	    -o-animation: changeshadow 1s linear infinite;
    }  
    @keyframes changeshadow {  
        0%{ text-shadow: 0 0 4px #f91810}  
        50%{ text-shadow: 0 0 40px #f91810}  
        100%{ text-shadow: 0 0 4px #f91810}  
    }
    /* 添加兼容性前缀 */
	@-webkit-keyframes changeshadow {
	  0%{ text-shadow: 0 0 4px #f91810}  
          50%{ text-shadow: 0 0 40px #f91810}  
          100%{ text-shadow: 0 0 4px #f91810}  
	}
	@-moz-keyframes changeshadow {
	    0%{ text-shadow: 0 0 4px #f91810}  
            50%{ text-shadow: 0 0 40px #f91810}  
            100%{ text-shadow: 0 0 4px #f91810}  
	}
	@-ms-keyframes changeshadow {
	    0%{ text-shadow: 0 0 4px #f91810}  
            50%{ text-shadow: 0 0 40px #f91810}  
            100%{ text-shadow: 0 0 4px #f91810}  
	}
	@-o-keyframes changeshadow {
	    0%{ text-shadow: 0 0 4px #f91810}  
            50%{ text-shadow: 0 0 40px #f91810}  
            100%{ text-shadow: 0 0 4px #f91810}  
	}


</style>