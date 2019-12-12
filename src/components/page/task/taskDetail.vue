<template>
  <div class="tcontent">
    <div class="tabs">
      <div class="back">
        <el-button type="primary" size="mini" @click="shouqi">展开/收起</el-button>
      </div>
    <el-tabs class="eltabs" value="first" type="card">
      <el-tab-pane label="任务详细信息" name="first">
        <el-form class="form" label-width="250px">
          <el-form-item label="任务名称:"><span class="text">{{task.task_name}}</span></el-form-item>
          <el-form-item label="任务内容:"><span>{{task.task_content}}</span></el-form-item>
          <el-form-item label="任务编号:"><span>{{task.task_no}}</span></el-form-item>
          <el-form-item label="通道:"><span>{{access}}</span></el-form-item>
          <el-form-item label="来源:"><span>{{task.source}}</span></el-form-item>
          <el-form-item label="发送状态:" v-if="task.send_status == 1"><span>待发送</span></el-form-item>
          <el-form-item label="发送状态:" v-if="task.send_status == 2"><span>发送中</span></el-form-item>
          <el-form-item label="发送状态:" v-if="task.send_status == 3"><span>已发送</span></el-form-item>
          <el-form-item label="发送数量:"><span>{{task.send_num}}</span></el-form-item>
          <el-form-item label="手机号:" :style="zan?'word-break:break-all':''"><span>{{task.mobile_content}}</span></el-form-item>
          <el-form-item label="审核状态:" v-if="task.free_trial == 1"><span>需要审核</span></el-form-item>
          <el-form-item label="审核状态:" v-if="task.free_trial == 2"><span>审核通过</span></el-form-item>
          <el-form-item label="审核状态:" v-if="task.free_trial == 3"><span>审核不通过</span></el-form-item>
          <el-form-item label="创建时间:"><span>{{task.create_time}}</span></el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "taskDetail",
    data() {
      return {
        id: '',
        task: {},
        access:'',
        zan:false
      }
    },
    mounted() {
      console.log(this.$route.query)
      this.id = this.$route.query.id
      this.getTask()
      this.getChannel()
    },
    methods: {
      shouqi(){
        this.zan = !this.zan
      },
      getChannel(){
        let that = this
        that.$request({
          url:'administrator/getChannel',
          success(res) {
            that.disChannel(res.channel_list)
          }
        })
      },
      disChannel(data){
        console.log(123)
        let task = this.task
        for (let i=0;i<data.length;i++){
          if (parseInt(task.channel_id ) === parseInt(data[i].id)) {
            this.access = data[i].title
            console.log(this.access)
          }
        }
      },
      getTask() {
        let that = this
        let id = this.id
        that.$request({
          url: 'administrator/getUserSendTask',
          data: {id},
          success(res) {
            that.task = res.data
          }
        })
      }
    }
  }
</script>

<style scoped>
.tabs{
  background: white;
}
.back{
  display: inline-block;
  float: right;
  position: relative;
  z-index: 2;
  margin-right: 10px;
}
</style>
