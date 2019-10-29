<template>
  <div class="cen-card" v-if="cardStatus">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>{{cName}}</span>
          </div>
        <el-form :label-width="cWidth+'px'" :model="cRuleForm" ref="cRuleForm"  :rules="cRules">
          
          <el-form-item v-for="(v,k) of cRuleType" :key="k" :label="v.label" :prop="k" v-show="!v.hdplay" >
            <el-input v-if="v.type === 'input'" v-model="cRuleForm[k]" :type='v.inpType || "text"' :placeholder="v.placeholder"></el-input>
            
            <el-input v-if="v.type === 'number'" v-model.number="cRuleForm[k]" type='number' :placeholder="v.placeholder"></el-input>

            <el-select v-if="v.type === 'select'" :filterable="v.filterable || false" class="" v-model="cRuleForm[k]" :placeholder="v.placeholder" :multiple="v.multiple || false">
              <el-option v-for="item in v.option" :key="item.value  || item[v.val]" :label="item.label || item[v.lab]" :value="item.value || item[v.val]">
              </el-option>
            </el-select>

            <el-cascader v-if="v.type === 'cascader'" :options="v.option"  :props="v.props"  v-model="cRuleForm[k]" :show-all-levels="v.levels" :filterable="v.filterable" :collapse-tags="v.collapse" :clearable="v.clearable" ></el-cascader>

            <el-date-picker v-if="v.type === 'date'" v-model= "cRuleForm[k]" type="datetime"  value-format="yyyy-MM-dd HH:mm:ss" :placeholder="v.placeholder" default-time="00:00:00"></el-date-picker>

            <v-upload v-if="v.type === 'image'" @upresult='upresult' :num='k' :image="cRuleForm[k]"></v-upload>

            <p class="chart" v-if="v.type === 'p'">{{cRuleForm[k]}}</p>

          </el-form-item>
          <el-form-item class="flex-cen">
            <el-button  type="primary" @click="sumbit('cRuleForm')">确定</el-button>
            <el-button  @click="cHideCard()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
import vUpload from './upload';
export default {
  props: ['name','width','cardStatus','ruleForm','rules','ruleType'],
  data(){
    return {
      toggleCard:false,
      cWidth:80,
      cName:'',
      cRuleForm:{},
      cRuleType:{},
      cRules:{}
    }
  },
  watch: {
    'name':function(newVal){
        this.cName = this.name
    },
    'width':function(newVal){
        this.cWidth = this.width
    },
    'ruleType':function(newVal){
        this.cRuleType = this.ruleType
    },
    'ruleForm': function(newVal){
        this.cRuleForm = JSON.parse(JSON.stringify(this.ruleForm)) 
    },
    'rules': function(newVal){
         this.disrules()
    },
  },
  mounted(){
    this.cName = this.name;
    this.cWidth = this.width || 80;
    this.cRuleType = this.ruleType;
    this.cRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
    this.disrules()
  },
  components:{    
      vUpload
  },
  methods: {
    upresult(data){
      this.cRuleForm[data.num] = data.image_path
    },
    disrules(){
      let rules=this.rules,len=rules.length;
      for(let i=0;i<len;i++){
        this.cRules[rules[i]]=[];
        console.log(this.cRuleType[rules[i]])
        let trigger = this.getType(this.cRuleType[rules[i]].type)
        this.cRules[rules[i]].push({
          required:true,
          message:this.cRuleType[rules[i]].placeholder,
          trigger:trigger
        })
      }
    },
    getType(str){
      let text = '';
      switch(str){
        case 'input':
          text = 'blur'
          break;
        case 'number':
          text = 'blur'
          break;
        case 'select':
          text = 'change'
          break;
      }
      return text
    },
    cHideCard(){
      this.$emit('hideCard')
    },
    sumbit(name){
      let that= this;
      that.$refs[name].validate((valid) => {
        if (valid) {
          let cRuleForm_copy = that.wipeImage()
          that.$emit('sumbit',{
            ruleForm: cRuleForm_copy
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    wipeImage(){
      let cRuleType_copy= this.cRuleType,cRuleForm_copy = JSON.parse(JSON.stringify(this.cRuleForm));
      for(let item in cRuleType_copy){
        (cRuleType_copy[item].type == 'image') && (cRuleForm_copy[item] === this.ruleForm[item]) && (cRuleForm_copy[item]='')
        // (cRuleType_copy[item].type == 'cascader') && (cRuleForm_copy[item]=cRuleForm_copy[item][cRuleForm_copy[item].length])
      }
      return cRuleForm_copy
    }
  }
}
</script>

<style scoped>
.chart{
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  background-color: #FFF;
  text-indent: 10px;
  color: #DCDFE6;
}
</style>
