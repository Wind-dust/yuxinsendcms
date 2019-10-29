<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb"  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>组管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="collapse">
    <el-collapse class="elcollapse" accordion >
      <el-collapse-item v-for="(v,k) in menuList" :key="k">
          <template slot="title">
          <el-button type="text" @click="showupdateMenu(v.id,v.name)" icon="el-icon-edit">{{v.name}}</el-button>
        </template>
          <el-table :data="v._child" border style="width: 100%">
            <el-table-column  label="页面名称" width="150" >
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit el-icon--right" @click="showupdateMenu(scope.row.id,scope.row.name)">{{scope.row.name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="功能" >
              <template slot-scope="scope">
                <el-button type="text"  v-for="(v2,k2) in scope.row.child" :key="k2" @click="getpermissionsapione(v2.api_id)" icon="el-icon-edit">{{v2.cn_name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" >
              <template slot-scope="scope" >
                <!-- <el-switch  v-model="scope.row.status"> </el-switch> -->
                <el-button type="primary" @click="showFun(scope.row.id)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-collapse-item>
    </el-collapse>
    </div>

    <div class="cen-card" v-if="modal.updateMenu">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>菜单名称修改</span>
          </div>
        <el-form label-width="80px" :model="menu" ref="menu" >
          <el-form-item  label="菜单名称" prop="menuName" :rules="[{ required: true, message: '菜单名称不能为空', trigger: 'blur' }]">
            <el-input v-model="menu.menuName" @change="nameChange"   placeholder="请输入菜单名称"></el-input>
          </el-form-item>
          <el-form-item class="flex-cen">
            <el-button  type="primary" @click="sumbit('menu')">确定</el-button>
            <el-button  @click="hideCard('updateMenu')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div class="cen-card" v-if="modal.updateFun">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>组管理</span>
          </div>
        <el-form label-width="80px" :model="fun" ref="fun" >
          <el-form-item  label="名称" prop="cn_name" :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]">
            <el-input v-model="fun.cn_name"   placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item  label="描述">
            <el-input v-model="fun.content"  placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item class="flex-cen">
            <el-button  type="primary" @click="sumbit('fun')">确定</el-button>
            <el-button  @click="hideCard('updateFun')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div class="cen-card" v-if="modal.addFun">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>功能添加</span>
        </div>
        <el-form label-width="80px" :model="action" ref="action" >
          <el-form-item  label="接口url" prop="api_name" :rules="[{ required: true, message: '请输入接口url', trigger: 'blur' }]">
            <el-input v-model="action.api_name"   placeholder="请输入接口url"></el-input>
          </el-form-item>
          <el-form-item  label="权限名称" prop="cn_name" :rules="[{ required: true, message: '请输入权限名称', trigger: 'blur' }]">
            <el-input v-model="action.cn_name"   placeholder="请输入权限名称"></el-input>
          </el-form-item>
          <el-form-item  label="接口类型" prop="stype" :rules="[{ required: true, message: '请选择接口类型', trigger: 'change' }]">
            <el-select class="" v-model="action.stype" placeholder="请选择接口类型">
              <el-option v-for="item in type" :key="item.id" :label="item.type_name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="描述">
            <el-input v-model="action.content"  placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item class="flex-cen">
            <el-button  type="primary" @click="sumbit('action')">确定</el-button>
            <el-button  @click="hideCard('addFun')">取消</el-button>
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
      menuList:[],
      activeName:'1',
      menu:{
        menuId: '',
        menuName:'',
      },
      fun:{},
      action:{},
      modal: {
          updateFun: false,
          updateMenu: false,
          addFun: false
      },
      type:[{
        id: 1,
        type_name: '增'
    }, {
        id: 2,
        type_name: '删'
    }, {
        id: 3,
        type_name: '改'
    }]
    }
  },
  watch: {
    'menu': function(newVal){
        console.log(newVal)
    },
  },
  mounted(){
    this.getpermissionslist()
  },
  methods: {
    nameChange(){
        console.log('nameChange')
    },
    hideCard(name){
      console.log(name)
      this.modal[name] = false
    },
    showupdateMenu(id,name){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        this.menu.menuId = id
        this.menu.menuName = name
        this.modal['updateMenu'] = true
    },
    showFun(id){
      this.action.menu_id = id
      this.modal['addFun'] = true
    },
    getpermissionsapione(id = ''){
      let that =this
      that.$request({
        data: {
            id: id,
        },
        url: 'admin/getpermissionsapione',
        success(res){
           that.fun = res.data || {}
          that.modal['updateFun'] = true
        }
      })
    },
    editmenu(){
      let that =this;
      that.$request({
        data: {
            id: that.menu.menuId,
            name: that.menu.menuName
        },
        form:3,
        url: 'admin/editmenu',
        success(res){
          that.getpermissionslist();
          that.modal['updateMenu'] = false
        }
      })
    },
    editpermissionsapi(){
      let that =this
      that.$request({
        data: that.fun,
        form:3,
        url: 'admin/editpermissionsapi',
        success(res){
          that.getpermissionslist();
          that.modal['updateFun'] = false
        }
      })
    },
    addpermissionsapi(){
      let that =this
      that.$request({
        data: that.action,
        form:1,
        url: 'admin/addpermissionsapi',
        success(res){
          that.action = {}
          that.getpermissionslist();
          that.modal['addFun'] = false
        }
      })
    },
    sumbit(name){
      let that= this;
      that.$refs[name].validate((valid) => {
        if (valid) {
          if(name == 'menu'){
            that.editmenu()
          }else if(name == 'fun'){
            that.editpermissionsapi()
          }else if(name = 'action'){
            that.addpermissionsapi()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getpermissionslist(){
      let that =this
      that.$request({
        url: 'admin/getpermissionsapi',
        success(res){
          that.menuList = res.data
        }
      })
    },
  }

}
</script>

<style scoped>
.collapse{
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
  overflow: auto;
}
.elcollapse{
  width: 95%;
  margin: 5px auto;
} 
.btn-amend {
    width: 38px;
    height: 36px;
}

</style>
