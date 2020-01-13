<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>模板管理</el-breadcrumb-item>
        <el-breadcrumb-item>模板列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--<v-screen :screen="screenQuery" @query="onQuery" ></v-screen>-->

    <el-table @selection-change="selectMore" :data="list" style="width: 99%" border>

      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="模板ID" prop="template_id"></el-table-column>
      <el-table-column label="模板名称" show-overflow-tooltip prop="title"></el-table-column>
      <el-table-column label="模板内容" width="438" prop="content"></el-table-column>
      <el-table-column label="提交账号"  prop="uid"></el-table-column>
      <el-table-column label="产品类型"  prop="business_id"></el-table-column>
      <el-table-column label="状态"  prop="_status"></el-table-column>
      <el-table-column label="创建时间" prop="create_time"></el-table-column>
      <el-table-column width="290" label="操作">
        <template slot-scope="scope">
          <!--<el-button type="primary" size="small" @click="getTempInfo(scope.row.id)">查看</el-button>-->
          <el-button type="primary" size="small" v-if="scope.row.status == 1" @click="audittemp(scope.row.id)">审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <v-pagination @pageChange="pageChange" :num='num' :total="total" :page-size="pageSize" :page="page"></v-pagination>

    <v-card :name='name' width="120" :cardStatus="cardStatus" :ruleType="ruleType" :ruleForm="ruleForm" :rules="rules"
            @sumbit="sumbit" @hideCard="hideCard"></v-card>

  </div></template>

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
        rules: [],
        ruleType: {},
        screen: {
          page: 1,
          pageNum: 30
        },
        pageSize:30,
        page: 1,
        list: [],
        total: 0,
        name: '',
        serviceOption: [],
        selected: []
      }
    },
    components: {
      vScreen,
      vPagination,
      vCard
    },
    mounted() {
      this.screen.page = parseInt(localStorage.getItem("temp")) || 1
      this.page = this.screen.page
      this.getTemp()
    },
    methods: {
      selectMore(val) {
        this.selected = val
      },
      getTemp() {
        let that = this
        that.$request({
          url: 'message/getUserModel',
          data: that.screen,
          success(res) {
            that.ruleForm = {}
            that.list = that.distemp(res.result)
            that.cardStatus = false
            that.total = res.total
          }
        })
      },
      distemp(data) {
        for (let i = 0; i < data.length; i++) {
          switch (parseInt(data[i].status)) {
            case 1:
              data[i]._status = '待审核';
              break;
            case 2:
              data[i]._status = '发送中';
              break;
            case 3:
              data[i]._status = '审核通过';
              break;
            case 4:
              data[i]._status = '不通过';
              break;
            case 5:
              data[i]._status = '停用'
          }
        }
        return data
      },
      audittemp(id) {
        this.ruleType = {
          'status': {
            type: 'select',
            label: '审核状态',
            option: [
              {value: 3, label: '通过'},
              {value: 4, label: '不通过'},
              {value: 5, label: '停用'}
            ]
          },
        }
        this.ruleForm = {}
        this.ruleForm.type = 'audit'
        this.ruleForm.id = id
        this.rules.push('status')
        this.name = '审核'
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
        data.ruleForm.type === 'audit' ? this.audit(data.ruleForm) : ''
      },

      audit(data) {
        let that = this
        that.$request({
          url: 'message/auditUserModel',
          data: data,
          form: 4,
          success(res) {
            that.ruleForm = {}
            that.getTemp()
            that.cardStatus = false
          }
        })
      },
      onQuery(screen) {
        this.extend(this.screen, screen);
        this.screen.page = 1;
        localStorage.setItem("temp", 1)
        this.num++
        this.getTemp();
      },
      extend(target, options) {
        for (name in options) {
          target[name] = options[name];
        }
        return target;
      },
      pageChange(obj) {
        this.screen.page = obj.page
        localStorage.setItem("temp", obj.page)
        this.getTemp()
      }
    }
  }
</script>

<style scoped>
  .handle {
    width: 99%;
    background: white;
    border-radius: 2px;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 65px;
    box-sizing: border-box;
    border: 1px solid #EBEEF5;
    font-size: 16px;
  }

  .handle div:first-child {
    margin-right: 16px;
  }
  .el-form--inline .el-form-item__label {
    font-weight: 600!important;
    color: #777777!important;
  }
</style>
