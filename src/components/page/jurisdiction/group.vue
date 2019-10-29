<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb"  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>组管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="add fr" type="primary" icon="el-icon-plus" @click="toggleCard(true)">添加组</el-button>
    </div>
    <el-table :data="admingroupList" border style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column  prop="group_name" label="组名称" ></el-table-column>
      <el-table-column  prop="content" label="描述" >
      </el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <t-icon @iClick="getgroupinfo" :param="{id:scope.row.id}" content="编辑" icon="edit"></t-icon>
          <t-icon @iClick="permissions" :param="{id:scope.row.id}" content="权限设置" icon="setting"></t-icon>
          <t-icon @iClick="gopeople" :param="{id:scope.row.id}" content="人员管理" icon="user"></t-icon>
        </template>
      </el-table-column>
    </el-table>

    <div class="cen-card" v-if="groupCard">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>组管理</span>
          </div>
        <el-form label-width="80px" :model="admingroup" ref="admingroup" >
          <el-form-item  label="组名称" prop="group_name" :rules="[{ required: true, message: '请输入组名称', trigger: 'blur' }]">
            <el-input v-model="admingroup.group_name"   placeholder="请输入组名称"></el-input>
          </el-form-item>
          <el-form-item  label="描述">
            <el-input v-model="admingroup.content"  placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item class="flex-cen">
            <el-button  type="primary" @click="sumbit('admingroup')">确定</el-button>
            <el-button  @click="toggleCard(false)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

  </div>
</template>

<script>
import tIcon from '../../component/tableIcon';
export default {
  data(){
    return {
      admingroupList:[],
      admingroup:{},
      groupCard:false,
      page:1
    }
  },
  components:{
      tIcon
  },
  mounted(){
    this.getadmingroup()
  },
  methods: {
    toggleCard(bl){
      this.admingroup = {};
      this.groupCard = bl;
    },
    getgroupinfo(param){
      let that =this
      that.$request({
        data: {
          group_id:param.id || ''
        },
        url: 'admin/getgroupinfo',
        success(res){
          that.admingroup = res.data;
          that.groupCard = true
        }
      })
    },
    permissions(param){
      this.$router.push({ path: '/group/permissions',query:{
          id:param.id
        } })
    },
    gopeople(param){
      this.$router.push({ path: '/group/peoplemanagement',query:{
          id:param.id
      } })
    },
    sumbit(name){
      let that= this;
      that.$refs[name].validate((valid) => {
        if (valid) {
          if(that.admingroup.id){
            that.editpermissionsgroup()
          }else{
            that.addpermissionsgroup()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editpermissionsgroup(){
      let that =this;
      that.admingroup.group_id = that.admingroup.id;
      that.$request({
        data: that.admingroup,
        url: 'admin/editpermissionsgroup',
        success(res){
          that.groupCard = false;
          that.$message({message:'修改成功',type:'success' });
          that.getadmingroup()
        }
      })
    },
    addpermissionsgroup(){
      let that =this
      that.$request({
        data: that.admingroup,
        url: 'admin/addpermissionsgroup',
        success(res){
          that.groupCard = false;
          that.$message({message:'添加成功',type:'success' });
          that.getadmingroup()
        }
      })
    },
    getadmingroup(){
      let that =this
      that.$request({
        data: {
          page:that.page,
          page_num:10
        },
        url: 'admin/getadmingroup',
        success(res){
          that.admingroupList = res.data;
        },
        error(){
        }
      })
    }
  }
}
</script>

<style scoped>
.item{
  cursor: pointer;
}
</style>
