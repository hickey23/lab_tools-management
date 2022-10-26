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
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: 'http://localhost/login#/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="#">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="#">活动列表</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="#">活动详情</a></el-breadcrumb-item>
          </el-breadcrumb>
          <!-- //////////////////////////////////////////////// -->
          <!-- //卡片视图区域 -->
          <el-card>
            <!-- //第一行 -->
            <el-row>
              <el-col :span="10">
                <el-input placeholder="请输入要查询的设备信息">
                  <el-button icon="el-icon-search" slot="append" type="primary"></el-button>
                  <!-- <el-button type="primary" slot="append">添加设备信息</el-button> -->
                </el-input>
              </el-col>
              <el-button type="primary" class="addShebeiBtn" @click="addTools">添加设备信息</el-button>
            </el-row>
            <!-- //表格数据 -->
            <el-table :data="this.tableData" style="width: 100%; margin-top:10px;" :stripe="true" :border="true" :highlight-current-row="true">
                <el-table-column
                  prop="id"
                  label="设备ID"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="toolsName"
                  label="设备名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="toolsUse"
                  label="设备用途"
                  width="180">
                </el-table-column>
                <!-- //开始用el-switch -->
                <el-table-column
                  prop="is_return"
                  label="是否归还"
                  width="180">
                  <template v-slot="scope">
                    <el-switch
                      v-model="scope.row.is_return"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                  </template>
       
                </el-table-column>
                <el-table-column
                  prop="is_borrow"
                  label="是否借出"
                  width="180">
                  <template v-slot="scope">
                    <el-switch
                      v-model="scope.row.is_borrow"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="is_delete"
                  label="是否删除"
                  width="180">
                  <template v-slot="scope">
                    <el-switch
                      v-model="scope.row.is_delete"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="beizhu"
                  label="备注"
                  >
                </el-table-column>
            </el-table>
          </el-card>
          <!-- 、、、、、、、 -->
          <!-- //pagination分页 -->
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
          
          <!-- //添加设备信息对话框 -->
          <el-dialog
            title="添加设备信息对话框"
            :visible.sync="addToolsDialogVisible"
            width="50%"
            >
            <!-- <span>这是一段信息</span> -->
            <!-- -------------------------------------------------------------------------------- -->
            <el-form :model="addToolsRuleForm" status-icon :rules="addToolsRules" ref="RulesForm" label-width="100px">
              <el-form-item label="ID" prop="id">
                <el-input v-model="addToolsRuleForm.id"></el-input>
              </el-form-item>
              <el-form-item label="设备名称" prop="toolsName">
                <el-input v-model="addToolsRuleForm.toolsName"></el-input>
              </el-form-item>
              <el-form-item label="设备用途" prop="toolsUse">
                <el-input v-model="addToolsRuleForm.toolsUse"></el-input>
              </el-form-item>
              <!-- -------------------------------------------------------------------------------- -->
              <el-form-item label="是否归还" prop="is_return">
                <el-select v-model="addToolsRuleForm.is_or_return" placeholder="请选择是否归还">
                  <el-option label="归还" value="true"></el-option>
                  <el-option label="未归还" value="false"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否借出" prop="is_borrow">
                <el-select v-model="addToolsRuleForm.is_or_borrow" placeholder="请选择是否借出">
                  <el-option label="借出" value="true"></el-option>
                  <el-option label="未借出" value="false"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否删除" prop="is_delete">
                <el-select v-model="addToolsRuleForm.is_or_delete" placeholder="请选择是否删除">
                  <el-option label="删除" value="true"></el-option>
                  <el-option label="未删除" value="false"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" prop="beizhu">
                <el-input v-model="addToolsRuleForm.beizhu"></el-input>
              </el-form-item>
            </el-form>
            <!-- -------------------------------------------------------------------------------- -->
            <span slot="footer" class="dialog-footer">
              <el-button @click="addToolsDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addToolsInfo">确 定</el-button>
            </span>
          </el-dialog>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import func from '../../func/func.js'
    export default {
        name:'Device',
        created(){
          //在进入这个模块的时候就调用函数渲染页面
          // created 钩子函数在实例被创建之后被调用
          this.getDeviceInfo();
        },
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
                  },
                ],
                //服务端全部的数据
                allTableData:[],

                //表格数据
                tableData:[],
                //中间变量obj,newObj
                obj:[],
                // newObj:[],
                
                //处理页码变化
                queryInfo:{
                  query:'',
                  pagenum:1,
                  pagesize:8,
                },
                total:0,

                //控制添加设备信息显示与否的变量
                addToolsDialogVisible:false,
                //添加设备信息表单
                addToolsRuleForm:{
                  id:'',
                  toolsName:'',
                  toolsUse:'',
                  is_return:'',
                  is_borrow:'',
                  is_delete:'',//0默认true

                  beizhu:'',
                  is_or_return:'',
                  is_or_borrow:'',
                  is_or_delete:'',
                },

                //
                addToolsRules:{
                    id:[
                        {required:true,message:'请输入设备id'},
                        //这里下面一行不要用trigger：blur，否则会出现鼠标一不聚焦就报错message内容
                        {min:1,max:20,message:'长度在0到20字符之间',trigger:'blur'},
                    ],
                    toolsName:[
                        {required:true,message:'请输入设备名称'},
                        {min:1,max:20,message:'长度在1到20之间',trigger:'blur'},
                    ],
                    toolsUse:[
                      {required:true,message:'请输入设备用途'},
                      {min:1,max:20,message:'长度在1-20之间',trigger:'blur'},
                    ],
                    is_return:[
                      {required:true,message:'选择true代表归还，false代表未归还',trigger:'blur'},
                      
                    ],
                    is_borrow:[
                      {required:true,message:'选择true代表借出，false代表未借出',trigger:'blur'}
                    ],
                    beizhu:[
                      {required:true,message:'请输入备注'},
                      {min:1,max:20,message:'长度在1-20之间',trigger:'blur'},
                    ],
                    is_delete:[
                      {required:true,message:'选择true代表删除，false代表未删除',trigger:'blur'}
                    ],
                    is_or_return: [
                      { required: true, message: '请选择值', trigger: 'change' }
                    ],
                    is_or_borrow: [
                      { required: true, message: '请选择值', trigger: 'change' }
                    ],
                    is_or_delete: [
                      { required: true, message: '请选择值', trigger: 'change' }
                    ],
                }




            }
        },
        methods:{
          async getDeviceInfo(){
            //把后台响应的数据赋给result
            //把响应过来的对象中的data属性给result
            const {data:result}=await this.$http.get('/api/profile/device',{params:{pagenum:this.queryInfo.pagenum,pagesize:this.queryInfo.pagesize}})
            console.log('服务端返回的数据：',result)
            this.total=result.total
            if(result.status!==0){
              return this.$message.error('获取实验室设备信息失败！')
            }
            //获取信息成功！
            //返回的data是一个数组duixiang  
            for (let key in result) {
                this.obj[key] = result[key];
            };
            this.allTableData=this.obj.data;
            // console.log('@@@this.tableData:',this.tableData);
            //转变键的值
            function convertKey(arr,keyMap){
                let tempString = JSON.stringify(arr);
                for(var key in keyMap){
                    var reg = `/"${key}":/g`;
                    tempString = tempString.replace(eval(reg),'"'+keyMap[key]+'":');
                }
                return JSON.parse(tempString);
            }
            // convertKey(this.tableData,{'is_return':false});
            //--------------------------------------------------------------------------------
            //外部引入的js文件，用来对服务端返回的is_return,等等进行0,1数据转换问布尔值
            func(this.allTableData)
            console.log('@@---@@@allTableData:',this.allTableData);
            // console.log(this.tableData.is_return)//undefine
            //--------------------------------------------------------------------------------
            this.tableData=this.allTableData
            this.$message.success('获取实验设备信息成功！')

            
            // ----------------------前端处理分页---------------------------
            // ----------------------处理每一条展示的条数信息---------------------------
            // 每次进入的时候重新清空tableData
            this.tableData=[]
            console.log('---------------分隔符---------------------------------');
            for(let i=0;i<this.allTableData.length;i++){
              if(i<this.queryInfo.pagesize){
                // this.tableData[i]=this.allTableData[i]
                // console.log(i);
                this.tableData.push(this.allTableData[i])
              }
            }
            console.log('========',this.tableData);
            
            //----------------------------------处理页码变化-------
            // this.tableData=[]
            let table=[]
            // console.log('_________________________',this.tableData)
            let newPageNum=this.queryInfo.pagenum*this.queryInfo.pagesize//当前页数*每一页的条数
            for(let j=this.queryInfo.pagesize*(this.queryInfo.pagenum-1);j<newPageNum;j++){
              if(this.allTableData[j]){
                table.push(this.allTableData[j])
              }
              this.tableData=table
            }

          },

          ///-------------------------------------------------
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
          //处理当前页展示个数变化的函数
          handleSizeChange(newsize){
            this.queryInfo.pagesize=newsize
            console.log('this.queryInfo.pagesize:',this.queryInfo.pagesize)
            this.getDeviceInfo()


          },
          //处理当前页码变化函数
          handleCurrentChange(newpage){
            this.queryInfo.pagenum=newpage;
            console.log('this.queryInfo.pagenum:',this.queryInfo.pagenum)
            this.getDeviceInfo();
            // // this.tableData=this.allTableData
          },

          ///添加实验设备函数
          addTools(){
            this.addToolsDialogVisible=true
          },
          //对话框中添加设备信息按钮函数
          async addToolsInfo(){
            console.log('-----addToolsRuleForm:',this.addToolsRuleForm);
            // const result=this.$http.post('/api/profile/add',this.addToolsRuleForm)
            // if(this.addToolsRuleForm.is_return==)
            this.addToolsRuleForm.is_return=this.addToolsRuleForm.is_or_return
            this.addToolsRuleForm.is_borrow=this.addToolsRuleForm.is_or_borrow
            this.addToolsRuleForm.is_delete=this.addToolsRuleForm.is_or_delete
           
            const result=await this.$http({
              method:'post',
              url:'/api/profile/add',
              data:this.addToolsRuleForm,
              headers: {
                  'Content-Type':'application/x-www-form-urlencoded'
              },

            })
            console.log('@@@@@@@@@@',result)
            if(result.data.status!==0){
              return this.$message.error('添加设备信息失败')
            }
            //成功
            this.addToolsDialogVisible=false
            this.$message.success('添加设备信息成功')
            this.getDeviceInfo()
          }
      
        },
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
  .el-card{
    margin-top:20px;
  }

  .el-pagination{
    margin-top: 20px;
    text-align: center;
  }
  .addShebeiBtn{
    float: right;
  }


</style>