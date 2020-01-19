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
      <el-table-column prop="develop_no" label="扩展码"></el-table-column>
      <el-table-column prop="no_lenth" label="长度"></el-table-column>
      <el-table-column prop="_is_bind" label="	绑定状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="checked(scope.row.develop_no)" v-if="scope.row.is_bind == 2">
            查看绑定关系
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination @pageChange="pageChange" :num='num' :page-size="10" :total="total" :page="page"></v-pagination>

    <v-card :name='name' width="120" :cardStatus="cardStatus" :ruleType="ruleType" :ruleForm="ruleForm" :rules="rules"
            @sumbit="sumbit" @hideCard="hideCard"></v-card>
    <el-dialog title="绑定列表" :visible.sync="dialogVisible" width="30%" center>
      <el-table :data="relationList" border style="width: 100%">
        <el-table-column prop="nick_name" label="用户名"></el-table-column>
        <el-table-column prop="business_id" label="服务"></el-table-column>
        <el-table-column prop="_source" label="服务范围"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="rid(scope.row.id)">
              解绑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
        dialogVisible: false,
        code: '',
        id: 0,
        bind_status: '',
        relationList: []
      }
    },
    components: {
      vScreen,
      vPagination,
      vCard
    },
    mounted() {
      this.screen.page = parseInt(localStorage.getItem("expand")) || 1
      this.page = this.screen.page
      this.getExpand()
    },
    methods: {
      rid(id) {
        let that = this
        that.$request({
          url: 'message/deluserBindDevelopCode',
          data: {
            id,
          },
          success(res) {
            that.$message.success('解除成功')
            that.dialogVisible = false
            that.getExpand()
          }
        })
      },
      checked(num) {
        let that = this
        that.$request({
          url: 'message/getuserBindDevelopCode',
          data: {
            develop_no: num
          },
          success(res) {
            that.relationList = that.disExpand(res.data)
            that.dialogVisible = true
          }
        })
      },
      disExpand(data) {
        for (let i = 0; i < data.length; i++) {
          switch (parseInt(data[i].source)) {
            case 1:
              data[i]._source = '移动';
              break;
            case 2:
              data[i]._source = '联通';
              break;
            case 3:
              data[i]._source = '电信';
              break;
            case 4:
              data[i]._source = '三网';
              break;
            case 5:
              data[i]._source = '移动电信';
              break;
            case 6:
              data[i]._source = '移动联通';
              break;
            case 7:
              data[i]._source = '联通电信';
              break;
          }
        }
        return data
      },
      getExpand: function () {
        let that = this
        that.$request({
          url: 'message/getDevelopCode',
          data: that.screen,
          success(res) {
            that.list = that.disDevelop(res.develop)
            that.total = res.total || 0
          }
        })
      },
      disDevelop(data) {
        for (let i = 0; i < data.length; i++) {
          switch (parseInt(data[i].is_bind)) {
            case 1:
              data[i]._is_bind = '未绑定';
              break;
            case 2:
              data[i]._is_bind = '已绑定';
              break;

          }
        }
        return data
      },
      getService() {
        let that = this
        that.$request({
          url: 'administrator/getBusiness',
          data: {
            getall: 1
          },
          success(res) {
            that.disBusiness(res.Business)
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
              that.getExpand()
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
            that.getExpand()
            that.ruleType = {}
            that.ruleForm = {}
          }
        })
      },
      onQuery(screen) {
        this.extend(this.screen, screen);
        this.screen.page = 1;
        this.num++
        this.getExpand();
      },
      extend(target, options) {
        for (name in options) {
          target[name] = options[name];
        }
        return target;
      },
      pageChange(obj) {
        this.screen.page = obj.page
        localStorage.setItem("expand", obj.page)
        this.getExpand()
      }
    }
  }
</script>

<style scoped>
</style>
