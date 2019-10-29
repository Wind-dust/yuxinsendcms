<template>
  <div class="tcontent">
    <div class="form">
    <el-form label-width="80px" :model="recommends_info" :ref="'ruleForm'+modelId">
      <el-form-item label="标题">
        <el-input v-model="recommends_info.title"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="recommends_info.model_order"></el-input>
      </el-form-item>
      <el-form-item v-if="showId" label="专题id">
        <el-input v-model="recommends_info.jump_content"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="recommends_info.is_show" active-color="#13ce66" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item  v-if="showImg" label="图片">
        <v-upload @upresult='upresult1' :num="'image_path'+modelId" :image="recommends_info.image_path"></v-upload>
      </el-form-item>
       <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm'+modelId)">保存</el-button>
        <el-button @click="resetForm('ruleForm'+modelId)">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
    <el-button class="add" type="primary" icon="el-icon-plus" @click="showCard()">添加</el-button>
    <el-table :data="tableList" border style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column  prop="image_path" label="图片" >
        <template slot-scope="scope">
          <img :src="scope.row.image_path" width="40"  class="head_pic"/>
        </template>
      </el-table-column>
      <el-table-column  prop="title" label="标题" ></el-table-column>
      <el-table-column v-if="modelId == 10" label="层级--上级id" >
        <template slot-scope="scope">
          <span>{{scope.row.tier}}--{{scope.row.parent_id}}</span>
        </template>
      </el-table-column>
      <el-table-column  prop="typeText" label="跳转类型" ></el-table-column>
      <el-table-column  prop="jump_content" label="跳转内容" ></el-table-column>
      <el-table-column  prop="model_order" label="排序"></el-table-column>
      <el-table-column fixed="right" label="操作"  >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="getRecommendInfo(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="delRecommend(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
import vUpload from '../../component/upload'
export default {
  props: ['data','modelId'],
  data(){
    return {
      tableList:[],
      recommends_info:{},
      recommends_copy:{},
      showImg:false,
      showId:false,

    }
  },
  watch: {
    'data': function(newVal){
        this.disTableList()
    },
  },
  components:{
    vUpload
  },
  mounted(){
    this.disTableList()
    this.isshow()
  },
  methods: {
    isshow(){
      (this.modelId == 4 || this.modelId ==6 || this.modelId ==7 || this.modelId ==8 || this.modelId ==9 )&&(this.showId = true);
      (this.modelId ==7 || this.modelId ==8 )&&(this.showImg = true);
    },
    upresult1(data){
      this.recommends_info['image_path'] = data.image_path
    },
    submitForm(name){
      let that= this;
      that.$refs[name].validate((valid) => {
        if (valid) {
          if(this.data.image_path === that.recommends_info.image_path){
            that.recommends_info.image_path = ''
          }
          that.$request({
            data:that.recommends_info,
            url: 'Recommend/updateRecommend',
            form:3,
            success(res){
              that.$emit('getModel',{id: res.id})
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(){
      this.recommends_info = JSON.parse(JSON.stringify(this.data)
      )
    },
    disTableList(){
      let list = this.modelId ==10?this.project(this.data.son) : (this.data.son || []);
      let type = {'1':'专题','21':'商品图片','22':'商品信息','3':'跳转路径'};
      for(let i=0,len=list.length;i<len;i++){
        let jtype = list[i].jump_type.toString(),stype=list[i].show_type.toString();
        let t = list[i].jump_type != 2 ?jtype : (jtype+stype);
        list[i].typeText = type[t]
      }
      this.tableList = list
      this.recommends_info = JSON.parse(JSON.stringify(this.data))
    },
    delRecommend(id){
      let that =this;
      that.$request({
        data:{
          id:id
        },
        form:2,
        url: 'Recommend/delRecommend',
        success(res){
          that.$emit('getModel',{id: that.recommends_info.id})
        }
      })
    },
    project(data = []){
      let arr = [],len = data.length;
      if(len === 0) return []
      for(let i=0;i<len;i++){
        arr.push(data[i]);
        let len1 = data[i].third.length || 0;
        for(let x=0;x<len1;x++){
          arr.push(data[i].third[x]);
        }
      }
      return arr
    },
    showCard(){
      this.$emit('showCard',{model: this.modelId,pid:this.data.id})
    },
    getRecommendInfo(id){
      this.$emit('getInfo',{id: id})
      
    }
  }
}
</script>

<style scoped>
.tcontent{
  width: 95%;
  margin: 0 auto;
}
.add{
  margin-bottom: 10px;
}
.form{
  margin-top: 20px;
  width: 500px;
}
</style>
