<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--<el-button class="add fr" type="primary" icon="el-icon-plus" @click="showCard()">添加供应商</el-button>-->
    </div>

    <v-screen :screen="screenQuery" @query="onQuery"></v-screen>

    <el-table :data="list" border style="width: 99%">
      <el-table-column type="index" label="序号"></el-table-column>
      <!--<el-table-column  prop="image" label="供应商图片" >-->
      <!--<template slot-scope="scope">-->
      <!--<img :src="scope.row.image" width="40"  class="head_pic"/>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="nick_name" label="用户名"></el-table-column>
      <el-table-column prop="_user_type" label="用户类型"></el-table-column>
      <el-table-column prop="mobile" label="	手机号"></el-table-column>
      <el-table-column prop="email" label="email"></el-table-column>
      <el-table-column prop="_user_status" label="账户服务状态"></el-table-column>
      <el-table-column prop="_reservation_service" label="可否预用服务"></el-table-column>
      <el-table-column fixed="right" label="操作" width="450">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="getUserInfoDetail(scope.row.id)">查看</el-button>
          <el-button type="primary" size="small" @click="setUserInfo(scope.row.id)">设置用户信息</el-button>
          <el-button type="primary" size="small" @click="setUserService(scope.row.id)">设置服务项目</el-button>
          <el-button type="primary" size="small" @click="kzCode(scope.row.nick_name)">扩展码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination @pageChange="pageChange" :num='num' :page-size="10" :total="total" :page="page"></v-pagination>

    <v-card :name='name' width="120" :cardStatus="cardStatus" :ruleType="ruleType" :ruleForm="ruleForm" :rules="rules"
            @sumbit="sumbit" @hideCard="hideCard"></v-card>
    <el-dialog title="绑定扩展码" :visible.sync="dialogVisible" width="30%"  center>
        <el-form prop="form">
          <el-form-item label="扩展码：" :rules="[{required:true,message:'请输入扩展码',trigger:'blur'}]">
            <el-input v-model="code" style="width: 30%;" placeholder="请输入扩展码"></el-input>
            <el-button type="primary" size="small" @click="checkedCode">是否已绑定</el-button>
          </el-form-item>
          <el-form-item label="随机抽取："  :rules="[{required:true,message:'请输入扩展码长度',trigger:'blur'}]">
            <el-input v-model="codeLength" style="width: 30%;" placeholder="扩展码长度（可选）" ></el-input>
            <el-button type="primary" size="small" @click="suiji">随机</el-button>
          </el-form-item>
          <el-form-item label="服务："  :rules="[{required:true,message:'请选择服务',trigger:'change'}]">
            <el-select v-model="business_id">
              <el-option v-for="(v,k) in business" :key="k" :value="v.value" :label="v.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务范围：" :rules="[{required:true,message:'请选择服务',trigger:'change'}]">
            <el-select v-model="source">
              <el-option v-for="(v,k) in sourceList" :key="k" :value="v.value" :label="v.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="createCode" size="small">确 定</el-button>
    </el-dialog>

  </div>
</template>

<script>
  import vScreen from '../../component/screen'
  import vPagination from '../../component/pagination'
  import vCard from '../../component/card'

  export default {
    data() {
      return {
        form:{
          code:'',
          codeLength:''
        },
        sourceList:[{
          label:'移动',
          value:1
        },{
          label:'联通',
          value:2
        },{
          label:"电信",
          value:3
        },{
          label:'三网',
          value:4
        },{
          label:'移动电信',
          value:5
        },{
          label:'移动联通',
          value:6
        },{
          label:'联通电信',
          value:7
        }],
        num: 1,
        name: '',
        cardStatus: false,
        ruleForm: {},
        rules: [],
        ruleType: {},
        screen: {
          page: 1,
          pagenum: 10
        },
        page: 1,
        screenQuery: [{
          ref: 'mobile',
          label: '手机号',
          placeholder: '请输入手机号',
          type: 'input',
        }],
        list: [],
        total: 0,
        dialogVisible:false,
        code:'',
        id:0,
        codeLength:'',
        business:[],
        business_id:'',
        checkList:[],
        source:'',
        nick_name:''
      }
    },
    components: {
      vScreen,
      vPagination,
      vCard
    },
    mounted() {
      this.screen.page = parseInt(localStorage.getItem("account")) || 1
      this.page = this.screen.page
      this.getUser()
    },
    methods: {
      checkedCode(){
        let that = this
        that.$request({
          url:'message/verifyDevelopCode',
          data:{
            develop_no:that.code
          },
          success(res){
              if(res.code == 200){
                that.$message.error('该扩展码可用')
              }
          }
        })
      },
      suiji(){
        let that = this
        that.$request({
          url:'message/getOneRandomDevelopCode',
          data:{
            no_lenth:parseInt(that.codeLength)
          },
          success(e){
              if (e.code == 200){
                that.code = e.develop_no
              }
          }
        })
      },
      createCode(){
        let that = this
        that.$request({
          url:'message/userBindDevelopCode',
          data:{
            develop_no: that.code,
            business_id:that.business_id,
            source:that.source,
            nick_name:that.nick_name
          },
          success(res) {
            that.$message.success('绑定成功')
            that.dialogVisible = false
          }
        })
      },
      kzCode(name) {
        this.nick_name = name
        this.dialogVisible = true
        this.getService(1)
      },
      getUserInfoDetail(id) {
        this.$router.push({path: '/accountDetail', query: {id: id}})
      },
      getUser: function () {
        let that = this
        that.$request({
          url: 'User/getUsers',
          data: that.screen,
          success(res) {
            that.list = that.disUserInfo(res.result)
            that.total = res.totle || 0
          }
        })
      },
      disUserInfo(data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].user_status == 2) {
            data[i]._user_status = '已启用'
          } else if (data[i].user_status == 1) {
            data[i]._user_status = '已停用'
          }
          if (data[i].reservation_service == 1) {
            data[i]._reservation_service = '否'
          } else if (data[i].reservation_service == 2) {
            data[i]._reservation_service = '是'
          }
          if (data[i].user_type == 1) {
            data[i]._user_type = '个人账户'
          } else if (data[i].user_type == 2) {
            data[i]._user_type = '企业账户'
          }
        }
        return data
      },
      setUserInfo(id) {
        this.name = '设置用户信息'
        this.cardStatus = true
        this.ruleForm = {}
        this.ruleType = {
          "user_status": {
            type: 'select',
            label: '账户服务状态',
            placeholder: '请选择服务状态',
            option: [
              {
                value: 1,
                label: '停止服务'
              },
              {
                value: 2,
                label: '开启服务'
              }
            ]
          },
          "reservation_service": {
            type: 'select',
            label: '是否可预用服务',
            placeholder: '请选择',
            option: [
              {
                value: 1,
                label: '不可以'
              }, {
                value: 2,
                label: '可以'
              }
            ]
          },
          "free_trial": {
            type: 'select',
            label: '行业短信审核',
            option: [
              {
                value: 1,
                label: '需要审核'
              }, {
                value: 2,
                label: '不需要审核'
              }
            ]
          },
          "marketing_free_trial": {
            type: 'select',
            label: '营销短信审核',
            option: [
              {
                value: 1,
                label: '需要审核'
              }, {
                value: 2,
                label: '不需要审核'
              }
            ]
          },
          "mul_free_trial": {
            type: 'select',
            label: '图文彩信审核',
            option: [
              {
                value: 1,
                label: '需要审核'
              }, {
                value: 2,
                label: '不需要审核'
              }
            ]
          },
          'need_upriver_api':{
            type:'select',
            label:'是否调用上行',
            option:[{
              value:1,
              label:'否'
            },{
              value:2,
              label:'是'
            }]
          },
          'need_receipt_api': {
            type:'select',
            label:'是否调用回执',
            option:[{
              value:1,
              label:'否',
            },{
              value:2,
              label:'是'
            }]
          },
          'need_receipt_info':{
            type:'select',
            label:'是否开放状态信息',
            option:[{
              value:1,
              label:'否'
            },{
              value:2,
              label:'是'
            }]
          }
        }
        this.ruleForm.type = 1
        this.ruleForm.uid = id
      },
      setUserService(id) {
        this.name = '设置用户服务项目'
        this.cardStatus = true
        this.ruleForm = {}
        this.ruleType = {
          "business_id": {
            type: 'select',
            label: '服务',
            placeholder: '请选择服务',
            option: []
          },
          "agency_price": {
            type: 'input',
            label: '代理价格',
            placeholder: '默认统一服务价格'
          }
        }
        this.ruleForm.type = 2
        this.ruleForm.uid = id
        this.rules = ['business_id']
        this.getService()
      },
      getService(type ='') {
        let that = this
        that.$request({
          url: 'administrator/getBusiness',
          data: {
            getall: 1
          },
          success(res) {
            that.disBusiness(res.Business,type)
          }
        })
      },
      disBusiness(data,type) {
        let json = {}
        for (let i = 0; i < data.length; i++) {
          json = {
            label: data[i].title,
            value: data[i].id
          }
          if (type == 1){
            this.business.push(json)
          } else {
            this.ruleType.business_id.option.push(json)
          }
        }
      },
      showCard() {
        this.ruleForm = {}
        this.cardStatus = true
      },
      hideCard() {
        this.cardStatus = false
      },
      sumbit(data) {
        console.log(data)
        parseInt(data.ruleForm.type) === 1 ? this.setUser(data.ruleForm) : this.setAccount(data.ruleForm)
      },
      setUser(data) {
        let that = this
        that.$request(
          {
            url: 'user/seetingUser',
            data: data,
            form: 3,
            success(res) {
              that.cardStatus = false
              that.getUser()
              that.ruleForm = {}
              that.ruleType = {}
            }
          }
        )
      },
      setAccount(data) {
        let that = this
        that.$request({
          url: 'user/seetingUserEquities',
          data: data,
          form: 3,
          success(res) {
            that.cardStatus = false
            that.getUser()
            that.ruleType = {}
            that.ruleForm = {}
          }
        })
      },
      onQuery(screen) {
        this.extend(this.screen, screen);
        this.screen.page = 1;
        this.num++
        this.getUser();
      },
      extend(target, options) {
        for (name in options) {
          target[name] = options[name];
        }
        return target;
      },
      pageChange(obj) {
        this.screen.page = obj.page
        localStorage.setItem("account", obj.page)
        this.getUser()
      }
    }
  }
</script>

<style scoped>
</style>
