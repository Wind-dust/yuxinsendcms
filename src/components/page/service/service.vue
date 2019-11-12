<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>服务管理</el-breadcrumb-item>
        <el-breadcrumb-item>服务列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="add fr" type="primary" icon="el-icon-plus" @click="showCard()">添加服务</el-button>
    </div>

    <!--<v-screen :screen="screenQuery" @query="onQuery" ></v-screen>-->

    <el-table :data="list" border style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="donate_num" label="赠送数量"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="getServiceInfo(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination @pageChange="pageChange" :num='num' :total="total" :page="page"></v-pagination>

    <v-card name='添加服务' width="120" :cardStatus="cardStatus" :ruleType="ruleType" :ruleForm="ruleForm" :rules="rules"
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
        list: [],
        total: 0
      }
    },
    components: {
      vScreen,
      vPagination,
      vCard
    },
    mounted() {
      this.screen.page = parseInt(localStorage.getItem("supplier")) || 1
      this.page = this.screen.page
      this.getService()
    },
    methods: {
      getService(){
        let that = this
        that.$request({
          url:'administrator/getBusiness',
          data:that.screen,
          success(res) {
            console.log(res)
            that.ruleForm = {}
            that.list = res.Business
            that.cardStatus = false
            that.total = res.total
          }
        })
      },
      getServiceInfo(id){
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
      goCourier(id) {
        this.$router.push({
          path: '/supplier/courier', query: {
            id: id
          }
        })
      },
      getsupplierdata(id) {
        let that = this;
        that.$request({
          data: {
            supplierId: id
          },
          url: 'suppliers/getsupplierdata',
          success(res) {
            that.ruleForm = res.data
            that.cardStatus = true
          }
        })
      },
      showCard() {
        this.ruleForm = {}
        this.cardStatus = true
      },
      hideCard() {
        this.cardStatus = false
      },
      sumbit(data) {
        data.ruleForm.id ? this.editService(data.ruleForm) : this.addService(data.ruleForm)
      },
      addService(data) {
        let that = this
        that.$request({
          url: 'administrator/addBusiness',
          data: data,
          form:1,
          success(res) {
            console.log(res)
            that.ruleForm = {}
            that.getService()
            that.cardStatus = false
          }
        })
      },
      editService(data){
        let that = this
        that.$request({
          url:'administrator/updateBusiness',
          data:data,
          form:3,
          success(res) {
            that.ruleForm = {}
            that.getService()
            that.cardStatus = false
          }
        })
      },
      onQuery(screen) {
        this.extend(this.screen, screen);
        this.screen.page = 1;
        localStorage.setItem("supplier", 1)
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
        localStorage.setItem("supplier", obj.page)
        this.getsuppliers()
      },
      getsuppliers() {
        let that = this;
        that.$request({
          data: that.screen,
          url: 'suppliers/getsuppliers',
          success(res) {
            that.suppliersList = res.data
            that.total = res.totle || 0;
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>
