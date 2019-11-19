<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>服务管理</el-breadcrumb-item>
        <el-breadcrumb-item>通道管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <el-table :data="list" border style="width: 99%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <!--<el-table-column prop="price" label="价格"></el-table-column>-->
      <!--<el-table-column prop="donate_num" label="赠送数量"></el-table-column>-->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="setUserAccess(scope.row.id)">分配用户通道</el-button>
          <el-button type="primary" size="small" @click="setService(scope.row.id)">设置归属服务</el-button>
          <!--<el-button type="primary" size="small" @click="edit(scope.row.id)">修改优先级</el-button>-->
          <el-button type="primary" size="small" @click="cancel(scope.row.id)">取消使用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination @pageChange="pageChange" :num='num' :total="total" :page-size="10" :page="page"></v-pagination>

    <v-card name='通道设置' width="120" :cardStatus="cardStatus" :ruleType="ruleType" :ruleForm="ruleForm" :rules="rules"
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
        num: 1,
        cardStatus: false,
        ruleForm: {},
        rules: ['title', 'price'],
        ruleType: {
          'title': {
            type: 'input',
            label: '标题',
            placeholder: '请输入标题'
          },
          'price': {
            type: 'input',
            label: '价格',
            placeholder: '可保留小数点后5位'
          },
          'donate_num': {
            type: 'number',
            label: '赠送条数',
            placeholder: '默认0'
          }
        },
        screen: {
          page: 1,
          pageNum: 10
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
        serviceOption:[]
      }
    },
    components: {
      vScreen,
      vPagination,
      vCard
    },
    mounted() {
      this.screen.page = parseInt(localStorage.getItem("access")) || 1
      this.page = this.screen.page
      this.getAccess()
      this.getService()
    },
    methods: {
      setUserAccess(id) {
        this.ruleForm.id = id
        this.ruleForm.type = 1
        this.ruleType = {
          'user_phone': {
            type: 'input',
            label: '用户手机号'
          },
          'priority': {
            type: 'select',
            label: '优先级',
            option: [
              {value: 1, label: '省网优先'},
              {value: 2, label: '非接入省网外优先'}
            ]
          }
        }
        this.rules = ['user_phone', 'priority']
        this.cardStatus = true
      },
      getService() {
        let that = this
        that.$request({
          url: 'administrator/getBusiness',
          data: {
            getall: 1
          },
          success(res) {
            this.serviceOption = that.disBusiness(res.Business)
            return that.disBusiness(res.Business)
          }
        })
      },
      disBusiness(data) {
        let json = {}
        let arr = []
        for (let i = 0; i < data.length; i++) {
          json = {
            label: data[i].title,
            value: data[i].id
          }
          arr.push(json)
        }
        this.serviceOption = arr
      },
      edit(id) {
        this.ruleForm = {}
        this.ruleForm.id = id
        this.ruleType = {
          'priority': {
            type: 'select',
            label: '优先级',
            option: [
              {value: 1, label: '省网优先'},
              {value: 2, label: '非接入省网外优先'}
            ]
          }
        }
        this.rules = ['priority']
        this.cardStatus = true
      },
      cancel(id) {
        let that = this
        this.$confirm('是否确定取消使用该通道', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$request({
            url: 'administrator/delUserChannel',
            data: {id:id},
            form: 3,
            success(res) {
              that.getAccess()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      },
      getAccess() {
        let that = this
        that.$request({
          url: 'administrator/getChannel',
          success(res) {
            console.log(res)
            that.ruleForm = {}
            that.list = res.channel_list
            that.cardStatus = false
            that.total = res.total
          }
        })
      },
      getServiceInfo(id) {
        let that = this
        that.$request({
          url: 'administrator/getBusiness',
          data: {id: id},
          success(res) {
            console.log(res)
            that.ruleForm = res.Business
            that.cardStatus = true
          }
        })
      },
      setService(id){
        let service = this.serviceOption
        this.ruleType = {
          "business_id":{
            type:'select',
            label:"服务",
            option:service
          }
        }
        this.rules = ['business_id']
        this.ruleForm = {}
        this.ruleForm.channel_id = id
        this.ruleForm.type = 'set'
        this.cardStatus = true
      },
      showCard() {
        this.ruleForm = {}
        this.cardStatus = true
      },
      hideCard() {
        this.cardStatus = false
      },
      sumbit(data) {
        if (data.ruleForm.type === 'set'){
          this.setAllotService(data.ruleForm)
          return
        }
        parseInt(data.ruleForm.type) === 1 ? this.allocation(data.ruleForm) : this.editPriority(data.ruleForm)
      },
      setAllotService(data){
        let that = this
        that.$request({
          url:'administrator/settingChannel',
          data:data,
          form:3,
          success(res){
            console.log(res)
            that.ruleForm = {}
            that.getTask()
            that.cardStatus = false
          }
        })
      },
      allocation(data) {
        let that = this
        that.$request({
          url: 'administrator/distributeUserChannel',
          data: data,
          form: 5,
          success(res) {
            console.log(res)
            that.ruleForm = {}
            that.getAccess()
            that.ruleType = {}
            that.cardStatus = false
          }
        })
      },
      editPriority(data) {
        let that = this
        that.$request({
          url: 'administrator/updateUserChannel',
          data: data,
          form: 3,
          success(res) {
            that.ruleForm = {}
            that.getAccess()
            that.ruleType = {}
            that.cardStatus = false
          }
        })
      },
      onQuery(screen) {
        this.extend(this.screen, screen);
        this.screen.page = 1;
        localStorage.setItem("access", 1)
        this.num++
        this.getsuppliers();
      },
      extend(target, options) {
        for (name in options) {
          target[name] = options[name];
        }
        return target;
      },
      pageChange(obj) {
        this.screen.page = obj.page
        localStorage.setItem("access", obj.page)
      },
    }
  }
</script>

<style scoped>
</style>
