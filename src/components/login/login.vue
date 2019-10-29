<template>
  <div class="login">
    <el-card class="box-card">
      <img class="logImg" src="../../assets/imgs/logo.png" alt="">
      <!--<p class="title">钰晰科技</p>-->
      <el-form  label-position="top" label-width="80px" :model="userinfo" ref='login'>
        <el-form-item prop="user" label="账号:" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
          <el-input placeholder="请输入账号" @keyup.enter.native="submitForm('login')" v-model="userinfo.user"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" label="密码:" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input placeholder="请输入密码" @keyup.enter.native="submitForm('login')" v-model="userinfo.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm('login')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userinfo:{
          user:'',
          pwd:''
        }

      }
    },
    mounted () {

    },
    methods: {
      submitForm(formName){
        let that =this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$request({
              url:'admin/login',
              login:true,
              data:{
                admin_name:that.userinfo.user,
                passwd:that.userinfo.pwd
              },
              success:function(res){
                localStorage.setItem("cms_con_id",res.cms_con_id)
                that.$router.push({ path: '/index' })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login{
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }
  .box-card{
    width: 400px;
  }
  .btn{
    width:340px;
    margin: 0 10px;
  }
  .logImg {
    display: block;
    width: 190px;
    margin: 0 auto 10px;
  }
  .title{
    font-size: 24px;
    text-align: center;
  }

</style>
