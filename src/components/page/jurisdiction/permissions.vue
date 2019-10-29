<template>
  <div  class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb"  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/group' }">组管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限设置</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="add fr" type="primary" @click="addpermissionsgrouppower()">保存</el-button>
    </div>
    <div class="collapse">
    <el-collapse class="elcollapse" accordion >
      <el-collapse-item v-for="(v,k) in menuList" :key="k" :title="v.name" >
          <el-table :data="v._child" border style="width: 100%">
            <el-table-column  prop="name" label="页面名称" width="120" ></el-table-column>
            <el-table-column label="功能" >
              <template slot-scope="scope">
                <el-checkbox class="checkbox" v-model="v2.status" v-for="(v2,k2) in scope.row.child" :true-label="1" :false-label="0" :key="k2">{{v2.cn_name}}</el-checkbox>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" >
              <template slot-scope="scope" >
                <el-switch  v-model="scope.row.status" active-value="1" inactive-value="0"> </el-switch>
              </template>
            </el-table-column>
          </el-table>
      </el-collapse-item>
    </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      group_id:'',
      menuList:[],
      activeName:'1'
    }
  },
  mounted(){
    this.group_id = this.$route.query.id;
    this.getpermissionslist()
  },
  methods: {
    addpermissionsgrouppower(){
      let that=this;
      let permissions = JSON.stringify(that.sumbitMenuList(that.menuList))
      that.$request({
          data: {
            group_id:that.group_id,
            permissions:permissions
          },
          url: 'admin/addpermissionsgrouppower',
          success(res){
            that.$message({message:'保存成功',type:'success' });
            that.getpermissionslist()
          }
      })
    },
    sumbitMenuList(data = []) {
        let list = data,
            permissions = {},
            len = list.length;
        for (let i = 0; i < len; i++) {
            let len1 = list[i]._child.length
            for (let x = 0; x < len1; x++) {
                if (list[i]._child[x].status == 1) {
                    permissions[list[i]._child[x].id] = {}
                    let len2 = list[i]._child[x].child.length
                    for (let y = 0; y < len2; y++) {
                      if(list[i]._child[x].child[y].status == 1){
                        permissions[list[i]._child[x].id][list[i]._child[x].child[y].id] = 1
                      } else{
                        permissions[list[i]._child[x].id][list[i]._child[x].child[y].id] = 0
                      }
                    }
                }
            }
        }
        return permissions
      },
    getpermissionslist(){
      let that =this
      that.$request({
        data: {
          group_id:that.group_id
        },
        url: 'admin/getpermissionslist',
        success(res){
          that.menuList = res.data
        }
      })
    }
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
