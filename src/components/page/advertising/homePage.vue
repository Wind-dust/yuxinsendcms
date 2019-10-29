<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb"  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>广告位管理</el-breadcrumb-item>
        <el-breadcrumb-item>首页广告位管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  <div class="tabs">
    <template>
      <el-tabs class="eltabs" value="first" type="card" >
        <el-tab-pane label="轮播图" name="first">
          <home-table :data='recommends[1]' modelId='1' @getInfo="getRecommendInfo" @showCard="showCard" @getModel="getRecommendInfoModel"></home-table>
        </el-tab-pane>
        <el-tab-pane label="标题图标" name="second">
          <home-table :data='recommends[2]' modelId='2' @getInfo="getRecommendInfo" @showCard="showCard" @getModel="getRecommendInfoModel"></home-table>
        </el-tab-pane>
        <el-tab-pane label="活动" name="third">
          <home-table :data='recommends[3]' modelId='3' @getInfo="getRecommendInfo" @showCard="showCard" @getModel="getRecommendInfoModel"></home-table>
        </el-tab-pane>
        <el-tab-pane label="推荐一" name="fourth">
          <home-table :data='recommends[4]' modelId='4' @getInfo="getRecommendInfo" @showCard="showCard" @getModel="getRecommendInfoModel"></home-table>
        </el-tab-pane>
        <el-tab-pane label="星期活动" name="five">
          <home-table :data='recommends[5]' modelId='5' @getInfo="getRecommendInfo" @showCard="showCard" @getModel="getRecommendInfoModel"></home-table>
        </el-tab-pane>
        <el-tab-pane label="推荐二" name="six">
          <home-table :data='recommends[6]' modelId='6' @getInfo="getRecommendInfo" @showCard="showCard" @getModel="getRecommendInfoModel"></home-table>
        </el-tab-pane>
        <el-tab-pane label="推荐三" name="seven">
          <home-table :data='recommends[7]' modelId='7' @getInfo="getRecommendInfo" @showCard="showCard" @getModel="getRecommendInfoModel"></home-table>
        </el-tab-pane>
        <el-tab-pane label="推荐四" name="eight">
          <home-table :data='recommends[8]' modelId='8' @getInfo="getRecommendInfo" @showCard="showCard" @getModel="getRecommendInfoModel"></home-table>
        </el-tab-pane>
        <el-tab-pane label="推荐五" name="nine">
          <home-table :data='recommends[9]' modelId='9' @getInfo="getRecommendInfo" @showCard="showCard" @getModel="getRecommendInfoModel"></home-table>
        </el-tab-pane>
        <el-tab-pane label="专题推荐" name="ten">
          <home-table :data='recommends[10]' modelId='10' @getInfo="getRecommendInfo" @showCard="showCard" @getModel="getRecommendInfoModel"></home-table>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
    <v-card name='设置' :cardStatus="cardStatus" :ruleType="ruleType" :ruleForm="ruleForm" :rules="rules" @sumbit="sumbit" @hideCard="hideCard"></v-card>
  </div>
</template>

<script>
import vCard from '../../component/card'
import HomeTable from './homeTable'
export default {
  data(){
    return {
      cardStatus:false,
      ruleForm:{},
      rules:['title','typeId','jump_content','image_path'],
      ruleType:{
        'parent_id':{
          type:'select',
          label:'上级',
          placeholder:'请选择上级',
          val:'id',
          lab:'title',
          hdplay:true,
          option:[]
        },
        'title':{
          type:'input',
          label:'标题',
          placeholder:'请输入标题'
        },
        'model_order':{
          type:'number',
          label:'排序',
          placeholder:'请输入排序'
        },
        'typeId':{
          type:'select',
          label:'类型',
          placeholder:'请选择类型',
          option:[{
            value:'1',
            label:'专题'
          },{
            value:'21',
            label:'商品图片'
          },{
            value:'22',
            label:'商品信息'
          },{
            value:'3',
            label:'跳转路径'
          }]
        },
        'jump_content':{
          type:'input',
          label:'类型内容',
          placeholder:'请输入类型内容'
        },
        'image_path':{
          type:'image',
          label:'图片',
          placeholder:'请选择图片'
        }
      },
      type: {
        '1':{
          jump_type:1,
          show_type:''
        },
        '21':{
          jump_type:2,
          show_type:1
        },
        '22':{
          jump_type:2,
          show_type:2
        },
        '3':{
          jump_type:3,
          show_type:''
        }
      },
      recommends:{
        1:{},
        2:{},
        3:{},
        4:{},
        5:{},
        6:{},
        7:{},
        8:{},
        9:{},
        10:{}
      },
      model:'',
      pid:''
    }
  },
  components:{
      HomeTable,
      vCard
  },
  mounted(){
    this.getRecommend()
  },
  methods: {
    showCard(data){
      this.model = data.model;
      if(this.model == 10){
        this.ruleType['parent_id'].hdplay = false
        let arr =  this.recommends[10].son
        arr.unshift({
          id:this.recommends[10].id,
          title: '顶级分类'
        })
        this.ruleType['parent_id'].option = arr
        this.rules=['parent_id','title','typeId','jump_content','image_path']
      }else{
        this.rules=['title','typeId','jump_content','image_path']
        this.ruleType['parent_id'].hdplay = true
      }
      
      this.pid = data.pid;
      this.ruleForm = {};
      this.cardStatus = true;
    },
    hideCard(){
      this.cardStatus = false
    },
    sumbit(data){
      let typeInfo = this.type[data.ruleForm.typeId]
      data.ruleForm.jump_type = typeInfo.jump_type
      data.ruleForm.show_type = typeInfo.show_type
      data.ruleForm.id ?this.updateRecommend(data.ruleForm):this.addRecommend(data.ruleForm)
    },
    updateRecommend(data){
      let that =this;
      that.$request({
        data:data,
        url: 'Recommend/updateRecommend',
        success(res){
          that.getRecommendInfoModel({id:that.recommends[data.model_id].id})
          that.cardStatus = false
        }
      })
    },
    addRecommend(data){
      let that =this;
      data.model_id = this.model;
      data.tier = 2
      data.parent_id = this.pid
      if(data.show_type === 2) data.show_data = data.jump_content
      that.$request({
        data:data,
        url: 'Recommend/addRecommend',
        success(res){
          that.getRecommendInfoModel({id:that.recommends[data.model_id].id})
          that.cardStatus = false
        }
      })
    },
    getRecommendInfo(data){
      let that =this;
      that.$request({
        data:{
          id:data.id
        },
        url: 'Recommend/getRecommendInfo',
        success(res){
          let jtype = res.recommends_info.jump_type.toString(),stype=res.recommends_info.show_type.toString();
          res.recommends_info.typeId = res.recommends_info.jump_type != 2 ?jtype : (jtype+stype);
          that.ruleForm = res.recommends_info || {}
          that.cardStatus = true
        }
      })
    },
    getRecommendInfoModel(data = {}){
      let that =this;
      that.$request({
        data:{
          id:data.id
        },
        url: 'Recommend/getRecommendInfo',
        success(res){
          that.recommends[res.recommends_info.model_id] = res.recommends_info
        }
      })
    },
    getRecommend(){
      let that =this
      that.$request({
        url: 'Recommend/getRecommend',
        success(res){
          that.disrecommends(res.recommends)
        }
      })
    },
    disrecommends(data = []){
      for(let i=0,len=data.length;i<len;i++){
        this.recommends[data[i].model_id] = data[i]
      }
    },
  }
}
</script>

<style scoped>
.tabs{
  background-color: #fff;
}
.eltabs{
  min-height: 700px;
}
.box-card{
  margin-top: 20px;
  width: 500px;
  margin-left: 20px;;
}
.table{
  width: 95%;
  margin: 20px auto;
}
.primary{
  margin-left: 30px;
}
.chart{
  display: inline-block;
  width: 98%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  background-color: #FFF;
  font-size: 14px;
  text-indent: 10px;
}
.banner{
  margin-top: 20px;
}
.imageTit{
  float: left;
  margin-left: 20px;
  font-size: 18px;
  line-height: 62px;
}

.el-icon-plus {
  float: left;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-icon-plus:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.tags{
  padding: 20px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 100px;
  margin-left: 10px;
  vertical-align: bottom;
}
.table{
  border-collapse: separate;
  border-spacing: 10px;
}
.table-cell {
    display: table-cell !important;
}
.pl-li {
    position: relative;
    width: 20%;
    height: auto;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #e9e9e9;
    overflow: auto;
}
.hierarchy {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: 20px;
    text-align: center;
    color: #3bb4f2;
    font-weight: bold;
    font-size: 18px;
}
.pl-image {
    width: 100%;
}
.pl-manage {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    opacity: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.pl-li:hover .pl-manage {
    opacity: 1;
}
.order_by{
  margin-top: 10px;
}
.trpl {
    display: table-row!important;
    height: 1px;
    overflow: hidden;
    padding: 0;
}
.preview{
  cursor: pointer;
  margin-right: 50px;
}
.infoList{
  width: 100%;
  max-height: 700px;
  overflow: auto;
}
.infoList img{
  display: inline-block;
  float: left;
  width: 100%;
}
.infoList::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}
</style>
