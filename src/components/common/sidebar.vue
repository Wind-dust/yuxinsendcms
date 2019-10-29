<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item index="index">
                <span class="sb-cn">首页</span>
            </el-menu-item>
            <el-submenu v-for="(v,k) in menuList" :key="k" :index="k+''">
                <template slot="title">
                    <span class="sb-cn">{{v.name}}</span>
                </template>
                <el-menu-item v-for="(v1,k1) in v._child" :key="k1" :index="'/'+v1.link">{{v1.name}}</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    export default {
        data(){
          return {
            menuList:[]
          }
        },
        mounted(){
          this.cmsmenu()
        },
        methods: {
          cmsmenu(){
            let that =this;
            that.$request({
              url: 'admin/cmsmenu',
              success(res){
                that.menuList = res.data
              }
            })
          }
        },
        computed:{
            onRoutes(){
              // console.log(this.$route.path.match(/(\/[a-zA-Z]*)/))
              // return this.$route.path.replace('/','');
              return '/'+this.$route.path.split('/')[1];
            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 66px;
        bottom:0;
       overflow: auto;
    }
    .sidebar > ul {
        height:100%;
        overflow: auto;
    }

   .el-menu-item, .el-submenu__title{
       font-size:14px;
     
   }
   .material-icons{
         vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size:18px;
   }
</style>
