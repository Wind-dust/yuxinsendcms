<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>服务管理</el-breadcrumb-item>
        <el-breadcrumb-item>服务充值</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="add fr" type="primary" icon="el-icon-plus" @click="showCard()">服务充值申请</el-button>
    </div>

    <!--<v-screen :screen="screenQuery" @query="onQuery" ></v-screen>-->

    <el-table :data="list" border style="width: 99%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="mobile" label="充值手机号"></el-table-column>
      <el-table-column prop="business_text" label="业务服务"></el-table-column>
      <el-table-column prop="credit" label="	充值条数"></el-table-column>
      <el-table-column prop="_status" label="	审核状态"></el-table-column>
      <el-table-column prop="message" label="审核消息"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="audit(scope.row.id)" v-if="scope.row.status == 1">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination @pageChange="pageChange" :num='num' :total="total" :page-size="10" :page="page"></v-pagination>

    <v-card :name='name' width="120" :cardStatus="cardStatus" :ruleType="ruleType" :ruleForm="ruleForm" :rules="rules"
            @sumbit="sumbit" @hideCard="hideCard"></v-card>

  </div>
</template>

<script>
  import vScreen from '../../component/screen'
  import vPagination from '../../component/pagination'
  import vCard from '../../component/card'

  export default {
    data() {
      return {
        auditCard:false,
        name:'',
        auditForm:{},
        num: 1,
        cardStatus: false,
        ruleForm: {},
        rules: ['mobile','business_id','num'],
        ruleType: {
          'nick_name': {
            type: 'input',
            label: '充值用户名',
            placeholder: '请输入充值的用户名'
          },
          'business_id': {
            type: 'select',
            label: '业务服务',
            placeholder: '请选择充值的业务服务',
            option: []
          },
          'num': {
            type: 'number',
            label: '充值条数',
            placeholder: '请输入充值条数'
          }
        },
        screen: {
          page: 1,
          page_num: 10
        },
        page: 1,
        screenQuery: [{
          ref: 'supplierName',
          label: '供应商名称',
          placeholder: '请输入供应商名称',
          type: 'input',
        }],
        list: [],
        total: 0,
        service:[]
      }
    },
    components: {
      vScreen,
      vPagination,
      vCard
    },
    mounted() {
      this.screen.page = parseInt(localStorage.getItem("servePay")) || 2
      this.page = this.screen.page
      this.getService()
      this.getServicePayList()
    },
    methods: {
      //审核
      audit(id){
        this.name = '审核'
        this.ruleType = {
          'status':{
            type:'select',
            label:'审核状态',
            placeholder:'请选择审核状态',
            option:[{
              value:2,
              label:'通过审核'
            },
              {
                value:3,
                label:'不通过审核'
              }]
          },
          'message':{
            type:'input',
            inpType:'textarea',
            label:'审核回复',
            placeholder:'输入审核回复信息'
          }
        }
        this.ruleForm = {}
        this.rules = ['status']
        this.ruleForm.id = id
        this.cardStatus = true
      },
      //取消审核
      hideAuditCard(){
        this.auditCard = false
      },
      //提交审核
      auditSubmit(data){
        let that = this
        that.$request({
          url:'administrator/aduitRechargeApplication',
          data:data.ruleForm,
          form:4,
          success(res){
            that.ruleForm = {}
            that.ruleType = {}
            that.getServicePayList()
            that.cardStatus = false
          }
        })
      },
      //获取服务列表
      getService() {
        let that = this
        that.$request({
          url: 'administrator/getBusiness',
          data: {
            getall: 1
          },
          success(res) {
            that.disBusiness(res.Business)
            that.service = res.Business
          }
        })
      },
      disBusiness(data) {
        let json = {}
        for (let i = 0; i < data.length; i++) {
          json = {
            label: data[i].title,
            value: data[i].id
          }
          this.ruleType.business_id.option.push(json)
        }
      },

      showCard() {
        this.name = '申请'
        this.ruleForm = {}
        this.cardStatus = true
      },
      hideCard() {
        this.cardStatus = false
      },
      sumbit(data) {
        data.ruleForm.id ? this.auditSubmit(data) : this.addSubmit(data)
      },
      addSubmit(data){
        let that = this
        that.$request({
          url:'administrator/rechargeApplication',
          data:data.ruleForm,
          form:1,
          success(res) {
            that.cardStatus = false
            that.getServicePayList()
            that.ruleForm = {}
          }
        })
      },
      getServicePayList(){
        let that = this
        that.$request({
          url:'administrator/getRechargeApplication',
          data:that.screen,
          success(res){
            that.list = that.disServiceList(res.data)
            that.total = res.total
          }
        })
      },
      disServiceList(data){
        let that = this
        let service = that.service
        for (let i = 0;i<data.length;i++){
          if (data[i].status == 1){
            data[i]._status = '未审核'
          } else if (data[i].status == 2){
            data[i]._status = '已通过'
          } else if (data[i].status == 3){
            data[i]._status = '未通过'
          }
          for (let j=0;j<service.length;j++){
            if (data[i].business_id == service[j].id){
              data[i].business_text = service[j].title
            }
          }
        }
        return data
      },
      onQuery(screen) {
        this.extend(this.screen, screen);
        this.screen.page = 1;
        localStorage.setItem("servePay", 1)
        this.num++
        this.getServicePayList();
      },
      extend(target, options) {
        for (name in options) {
          target[name] = options[name];
        }
        return target;
      },
      pageChange(obj) {
        this.screen.page = obj.page
        localStorage.setItem("servePay", obj.page)
        this.getServicePayList()
      },
    }
  }
</script>

<style scoped>
</style>
