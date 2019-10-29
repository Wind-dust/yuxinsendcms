<template>
 <div  class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb"  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/group' }">组管理</el-breadcrumb-item>
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="add fr" type="primary" icon="el-icon-plus" @click="toggleCard(true)">添加组成员</el-button>
    </div>

    <el-table :data="peopleList" border style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column  prop="admin_name" label="组成员名称" ></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <t-icon @iClick="deladminpermissions" :param="{id:scope.row.id}" content="删除" icon="delete"></t-icon>
        </template>
      </el-table-column>
    </el-table>

    <div class="cen-card" v-if="peopleCard">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>添加组成员</span>
          </div>
        <el-form label-width="80px" :model="people" ref="people" >
          <el-form-item  label="组成员" prop="adminid" :rules="[{ required: true, message: '请选择组成员', trigger: 'change' }]">
            <el-select class="" v-model="people.adminid" placeholder="请选择组成员">
              <el-option v-for="item in adminSel" :key="item.id" :label="item.admin_name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="flex-cen">
            <el-button  type="primary" @click="sumbit('people')">确定</el-button>
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
      group_id:'',
      peopleList:[],
      people:{},
      adminSel:[],
      peopleCard:false
    }
  },
  components:{
      tIcon
  },
  mounted(){
    this.group_id = this.$route.query.id;
    this.getAdminUsers()
    this.getpermissionsgroupadmin()
  },
  methods: {
    toggleCard(bl){
      this.people = {}
      this.peopleCard=bl
    },
    sumbit(name){
      let that= this;
      that.$refs[name].validate((valid) => {
        if (valid) {
          that.addadminpermissions()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addadminpermissions(){
      let that =this
      that.$request({
        data: {
          group_id:that.group_id,
          add_admin_id:that.people.adminid
        },
        form:1,
        url: 'admin/addadminpermissions',
        success(res){
          that.peopleCard=false
          that.getpermissionsgroupadmin()
        }
      })
    },
    getpermissionsgroupadmin(){
      let that =this
      that.$request({
        data: {
          group_id:that.group_id
        },
        url: 'admin/getpermissionsgroupadmin',
        success(res){
          that.peopleList = res.data || []
        }
      })
    },
    deladminpermissions(param){
      let that =this
      that.$request({
        data: {
          group_id:that.group_id,
          del_admin_id:param.id
        },
        url: 'admin/deladminpermissions',
        success(res){
        that.$message({message:'删除成功',type:'success' });
          that.getpermissionsgroupadmin()
        }
      })
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
          that.adminSel = res.data;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
