<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>任务列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <v-screen :screen="screenQuery" @query="onQuery"></v-screen>
    <div class="handle">
      <div>批量操作：</div>
      <div>
        <el-button type="primary" @click="allotAisleMore" size="small">分配通道</el-button>
        <el-button type="primary" @click="auditTaskMore" size="small">审核</el-button>
      </div>
    </div>
    <el-table :data="list" border style="width: 99%" @selection-change="selectMore">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="title" label="任务名称"></el-table-column>
      <el-table-column label="缩略图">
        <template slot-scope="scope">
          <img class="thumb" :src="scope.row.content[0].image_path" alt="">
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="content[0].content" label="缩略内容"></el-table-column>
      <el-table-column prop="task_no" label="任务编号"></el-table-column>
      <el-table-column prop="_send_status" label="发送状态"></el-table-column>
      <el-table-column prop="send_num" label="发送数量"></el-table-column>
      <el-table-column prop="_free_trial" label="审核状态"></el-table-column>
      <el-table-column width="290" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.channel_id === 0" @click="allotAisle(scope.row.id)">
            分配通道
          </el-button>
          <el-button type="primary" size="small" @click="getTaskInfo(scope.row.id)">查看</el-button>
          <el-button type="primary" size="small" v-if="scope.row.free_trial == 1" @click="auditTask(scope.row.id)">审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination @pageChange="pageChange" :num='num' :total="total" :page-size="pageSize" :page="page"></v-pagination>

    <v-card :name='name' width="120" :cardStatus="cardStatus" :ruleType="ruleType" :ruleForm="ruleForm" :rules="rules"
            @sumbit="sumbit" @hideCard="hideCard"></v-card>
    e
  </div>
</template>

<script>
  import vScreen from '../../component/screen'
  import vPagination from '../../component/pagination'
  import vCard from '../../component/card'

  export default {
    data() {
      return {
        screenQuery: [{
          ref: 'title',
          label: '彩信标题',
          placeholder: '请输入标题',
          type: 'input',
        }],
        num: 1,
        cardStatus: false,
        ruleForm: {},
        rules: [],
        ruleType: {},
        screen: {
          page: 1,
          pageNum: 20
        },
        pageSize: 20,
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
      this.screen.page = parseInt(localStorage.getItem("mmstask")) || 1
      this.page = this.screen.page
      this.getTask()
      this.getService()
      this.getAccess()
    },
    methods: {
      //批量分配通道
      allotAisleMore() {
        let selected = this.selected
        if (selected.length <= 0) {
          this.$message({message: '请至少选择一项', type: 'error'})
          return
        }
        let ids = ''
        for (let i = 0; i < selected.length; i++) {
          ids += selected[i].id + ','
        }
        let str = ids.substring(0, ids.lastIndexOf(','))
        this.allotAisle(str)
      },
      //批量审核
      auditTaskMore() {
        let selected = this.selected
        if (selected.length <= 0) {
          this.$message({message: '请至少选择一项', type: 'error'})
          return
        }
        let ids = ''
        for (let i = 0; i < selected.length; i++) {
          ids += selected[i].id + ','
        }
        let str = ids.substring(0, ids.lastIndexOf(','))
        this.auditTask(str)
      },
      selectMore(val) {
        this.selected = val
      },
      getTaskInfo(id) {
        this.$router.push({path: '/mmsTaskDetail', query: {id: id}})
      },
      getTask() {
        let that = this
        that.$request({
          url: 'message/getMultimediaMessageTask',
          data: that.screen,
          success(res) {
            that.ruleForm = {}
            that.list = that.disTask(res.data)
            that.cardStatus = false
            that.total = res.total
          }
        })
      },
      disTask(data) {
        for (let i = 0; i < data.length; i++) {
          switch (parseInt(data[i].send_status)) {
            case 1:
              data[i]._send_status = '待发送';
              break;
            case 2:
              data[i]._send_status = '发送中';
              break;
            case 3:
              data[i]._send_status = '发送成功';
              break;
            case 4:
              data[i]._send_status = '发送失败';
              break;
          }
          switch (parseInt(data[i].free_trial)) {
            case 1:
              data[i]._free_trial = '需要审核';
              break;
            case 2:
              data[i]._free_trial = '通过';
              break;
            case 3:
              data[i]._free_trial = '不通过';
              break;
          }
        }
        return data
      },
      auditTask(id) {
        this.ruleType = {
          'free_trial': {
            type: 'select',
            label: '审核状态',
            option: [
              {value: 2, label: '通过'},
              {value: 3, label: '不通过'}
            ]
          },
        }
        this.ruleForm = {}
        this.ruleForm.type = 'audit'
        this.ruleForm.id = id
        this.rules.push('free_trial')
        this.name = '审核'
        this.cardStatus = true
      },
      allotAisle(id) {
        let that = this
        let option = this.serviceOption
        let access = this.access
        this.ruleType = {
          "business_id": {
            type: 'select',
            label: '服务',
            option: option
          },
          "channel_id": {
            type: 'select',
            label: '通道',
            option: access
          }
        }
        this.ruleForm = {}
        this.ruleForm.id = id
        this.ruleForm.type = 'allot'
        this.rules = ['business_id', 'channel_id']
        this.name = '分配通道'
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
      getAccess() {
        let that = this
        that.$request({
          url: 'administrator/getChannel',
          success(res) {
            that.access = that.disAccess(res.channel_list)
          }
        })
      },
      disAccess(data) {
        let json = {},
          arr = []
        for (let i = 0; i < data.length; i++) {
          json = {
            label: data[i].title,
            value: data[i].id
          }
          arr.push(json)
        }
        return arr
      },

      showCard() {
        this.ruleForm = {}
        this.cardStatus = true
      },
      hideCard() {
        this.cardStatus = false
      },
      sumbit(data) {
        data.ruleForm.type === 'audit' ? this.audit(data.ruleForm) : this.allot(data.ruleForm)
      },

      allot(data) {
        let that = this
        that.$request({
          url: 'administrator/distributionChannel',
          data: data,
          form: 5,
          success(res) {
            that.ruleForm = {}
            that.getTask()
            that.cardStatus = false
          }
        })
      },
      audit(data) {
        let that = this
        that.$request({
          url: 'administrator/auditUserSendTask',
          data: data,
          form: 4,
          success(res) {
            that.ruleForm = {}
            that.getTask()
            that.cardStatus = false
          }
        })
      },
      onQuery(screen) {
        this.extend(this.screen, screen);
        this.screen.page = 1;
        localStorage.setItem("mmstask", 1)
        this.num++
        this.getTask();
      },
      extend(target, options) {
        for (name in options) {
          target[name] = options[name];
        }
        return target;
      },
      pageChange(obj) {
        this.screen.page = obj.page
        localStorage.setItem("mmstask", obj.page)
        this.getTask()
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
  .thumb{
    object-fit: contain;
    max-height: 100px;
  }
</style>
