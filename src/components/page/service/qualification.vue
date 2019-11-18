<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>服务管理</el-breadcrumb-item>
        <el-breadcrumb-item>账户资质列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--<el-button class="add fr" type="primary" icon="el-icon-plus" @click="showCard()">添加供应商</el-button>-->
    </div>

    <!--<v-screen :screen="screenQuery" @query="onQuery" ></v-screen>-->

    <el-table :data="list" border style="width: 99%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="company_name" label="主办单位（主办人）"></el-table-column>
      <el-table-column prop="company_type" label="主办单位性质"></el-table-column>
      <el-table-column prop="investor" label="	投资人（主管单位）"></el-table-column>
      <el-table-column prop="entity_responsible_person_name" label="负责人姓名"></el-table-column>
      <el-table-column prop="entity_responsible_person_mobile_phone" label="联系方式"></el-table-column>
      <el-table-column prop="entity_responsible_person_msn" label="应急联系电话"></el-table-column>
      <el-table-column prop="_status" label="审核状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="getOne(scope.row.id)">查看</el-button>
          <el-button type="primary" v-if='scope.row.status == 1' size="small" @click="audit(scope.row.id)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination @pageChange="pageChange" :num='num' :total="total" :page="page"></v-pagination>

    <v-card name='审核' width="120" :cardStatus="cardStatus" :ruleType="ruleType" :ruleForm="ruleForm" :rules="rules"
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
        rules: ['status'],
        ruleForm: {},
        ruleType: {},
        screen: {
          page: 1,
          page_num: 10
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
      this.page = this.screen.page
      this.qualification()
    },
    methods: {
      qualification() {
        let that = this
        that.$request({
          url: 'administrator/getUserQualificationRecord',
          data: that.screen,
          success(res) {
            that.list = that.disQua(res.Business)
            that.total = res.total || 0
          }
        })
      },
      disQua(data){
        let text = ''
        for (let i = 0;i<data.length;i++){
          switch (parseInt(data[i].status)) {
            case 1:
              text = '已提交';
              break;
            case 2:
              text = '审核中';
              break;
            case 3:
              text = '已通过';
              break;
            case 4:
              text = '未通过';
              break;
          }
          data[i]._status = text
        }
        return data
      },
      audit(id) {
        this.ruleForm = {}
        this.ruleType = {
          'status': {
            type: 'select',
            label: '是否通过审核',
            placeholder: '请选择',
            option: [
              {
                value: 3,
                label: '通过'
              }, {
                value: 4,
                label: '不通过'
              }
            ]
          }
        }
        this.ruleForm.id = id
        this.cardStatus = true
      },
      getOne(id){
        this.$router.push({path:'/qualificationDetail',query:{id:id}})
      },
      showCard() {
        this.ruleForm = {}
        this.cardStatus = true
      },
      hideCard() {
        this.cardStatus = false
      },
      sumbit(data) {
        data.ruleForm.id ? this.auditSubmit(data.ruleForm) : ''
      },
      auditSubmit(data){
        let that = this
        that.$request({
          url:'administrator/auditUserQualificationRecord',
          data:data,
          form:4,
          success(res) {
            that.ruleForm = {}
            that.cardStatus = false
            that.qualification()
            that.ruleType = {}

          }
        })
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
        this.qualification()
      }
    }
  }
</script>

<style scoped>
</style>
