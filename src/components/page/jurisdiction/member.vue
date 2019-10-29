<template>
  <div  class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb"  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>成员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="add fr" type="primary" icon="el-icon-plus" @click="toggleCard(true)">{{inpVisible[2]}}添加成员</el-button>
    </div>

    <el-table :data="adminUsers" border style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column  prop="admin_name" label="用户名" ></el-table-column>
      <el-table-column  prop="group" label="组名称"  ></el-table-column>
      <el-table-column  prop="stypeText" label="权限"  >
      </el-table-column>
      <el-table-column prop="statusText" label="状态" >
      </el-table-column>
    </el-table>
    <div class="cen-card" v-if="userCard">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>成员管理</span>
          </div>
        <el-form label-width="100px" :model="user" ref="user" >
          <el-form-item  label="用户名" prop="admin_name" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
            <el-input v-model="user.admin_name"   placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item  label="密码">
            <el-input v-model="user.passwd"  placeholder="默认：123456"></el-input>
          </el-form-item>
          <el-form-item label="管理员类型">
            <el-select class="" v-model="user.stype" placeholder="请选择管理员类型">
              <el-option v-for="item in stypeSel" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="flex-cen">
            <el-button  type="primary" @click="sumbit('user')">确定</el-button>
            <el-button  @click="toggleCard(false)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      adminUsers:[],
      user:{},
      stypeSel:[{
          value:'1',
          label:'管理员'
        },{
          value:'2',
          label:'超级管理员'
        }],
      inpVisible:{},
      inpModel:{},
      userCard:false,
      page:1
    }
  },
  mounted(){
    this.getAdminUsers()
  },
  methods: {
    toggleCard(bl){
      this.user = {}
      this.userCard = bl
    },
    getAdminUsers(){
      let that =this
      that.$request({
        data: {
          page:that.page,
          page_num:10
        },
        url: 'admin/getAdminUsers',
        success(res){
          that.adminUsers = that.disadminUserList(res.data);
        }
      })
    },
    bindManagerSearchKeyword(id,ev) {
      console.log(ev.srcElement.value)
      if(!ev.srcElement.value) return
      let that =this
      that.$request({
        data: {
          admin_id:id,
          keyword:ev.srcElement.value
        },
        form:1,
        url: 'admin/bindManagerSearchKeyword',
        success(res){
          document.querySelector('.inp-tag-'+id).querySelector('input').value= '';
          that.hideInput(id)
          that.getAdminUsers();
        }
      })
    },
    hideInput(id){
      console.log(document.querySelector('.inp-tag-'+id))
      if(document.querySelector('.inp-tag-'+id).querySelector('input').value) return;
      this.ChangeStyle('.inp-tag-'+id,'none')
      this.ChangeStyle('.btn-tag-'+id,'inline-block')
    },
    showInput(id) {
      this.ChangeStyle('.inp-tag-'+id,'inline-block')
      this.ChangeStyle('.btn-tag-'+id,'none')
      document.querySelector('.inp-tag-'+id).querySelector('input').focus()
    },
    ChangeStyle(el,con){
      document.querySelector(el).style.display = con
    },
    delKeyWord(val,id){
      let that =this
      that.$request({
        data: {
          admin_id:id,
          keyword:val
        },
        form:2,
        url: 'admin/delManagerSearchKeyword',
        success(res){
          that.getAdminUsers();
        }
      })
    },
    sumbit(name){
      let that= this;
      that.$refs[name].validate((valid) => {
        if (valid) {
          that.addadmin()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addadmin(){
      let that =this;
      that.$request({
        data: that.user,
        url: 'admin/addadmin',
        success(res){
          that.userCard = false;
          that.$message({message:'添加成功',type:'success' });
          that.getAdminUsers()
        }
      })
    },
    disadminUserList(data = []) {
        let arr = data,
            len = arr.length
        for (let i = 0; i < len; i++) {
            arr[i].stypeText = this.getstype(arr[i].stype)
            arr[i].statusText = this.getstatus(arr[i].status)
        }
        return arr
    },
    getstype(n) {
        let text = ''
        switch (parseInt(n)) {
            case 1:
                text = '管理员'
                break;
            case 2:
                text = '超级管理员'
                break;
        }
        return text
    },
    getstatus(n) {
        let text = ''
        switch (parseInt(n)) {
            case 1:
                text = '启用'
                break;
            case 2:
                text = '停用'
                break;
        }
        return text
    }
  }
}
</script>

<style scoped>
.add{
  margin-bottom: 20px;
}
.input-new-tag{
  display: none;
  width: 120px;
}
.tags .el-tag:first-child{
  margin-left: 0;
}
.tags .el-tag{
  position: relative;
  /* display: inline-block; */
  float: left;
  margin-top: 3px;
  margin-left: 10px;
  max-width: 500px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.input-new-tag {
  /* display: inline-block; */
  float: left;
  margin-left: 10px;
}
.button-new-tag{
  /* display: inline-block; */
  float: left;
  margin-left: 10px;
}
.tags .el-icon-close{
  position: absolute;
  left: 0;
}
</style>
