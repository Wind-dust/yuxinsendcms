<template>
  <div class="tcontent">
    <div class="tabs">
        <h3 class="goBack" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i>返回上一页</h3>
      <div class="back">
        <el-button type="primary" size="mini" @click="shouqi">展开/收起</el-button>
      </div>
      <div class="box-card">
        <div class="content-content">
          <el-tabs class="eltabs" value="first" type="card">
            <el-tab-pane label="任务详细信息" name="first">
              <el-form class="form" label-width="250px">
                <el-form-item label="任务名称:"><span class="text">{{task.title}}</span></el-form-item>
                <el-form-item label="任务内容:">
                  <div v-for="(v,k) in task.content">
                    <p><img class="thumb" :src="v.image_path" alt=""></p>
                    <p>{{v.content}}</p>
                  </div>
                </el-form-item>
                <el-form-item label="任务编号:"><span>{{task.task_no}}</span></el-form-item>
                <el-form-item label="移动通道:"><span>{{yidong_access}}</span></el-form-item>
                <el-form-item label="联通通道:"><span>{{liantong_access}}</span></el-form-item>
                <el-form-item label="电信通道:"><span>{{dianxin_access}}</span></el-form-item>
                <el-form-item label="来源:"><span>{{task.source}}</span></el-form-item>
                <el-form-item label="发送状态:" v-if="task.send_status == 1"><span>待发送</span></el-form-item>
                <el-form-item label="发送状态:" v-if="task.send_status == 2"><span>发送中</span></el-form-item>
                <el-form-item label="发送状态:" v-if="task.send_status == 3"><span>已发送</span></el-form-item>
                <el-form-item label="发送数量:"><span>{{task.send_num}}</span></el-form-item>
                <el-form-item label="手机号:" :style="zan?'word-break:break-all':''"><span>{{task.mobile_content}}</span>
                </el-form-item>
                <el-form-item label="审核状态:" v-if="task.free_trial == 1"><span>需要审核</span></el-form-item>
                <el-form-item label="审核状态:" v-if="task.free_trial == 2"><span>审核通过</span></el-form-item>
                <el-form-item label="审核状态:" v-if="task.free_trial == 3"><span>审核不通过</span></el-form-item>
                <el-form-item label="创建时间:"><span>{{task.create_time}}</span></el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="right">
          <div class="preview">
            <div class="inner">
              <div class="sms-text">
                <p style="color: #848a9f;font-weight: bold">{{task.title}}</p>
                <div v-for="(v,k) in task.content" :key="k">
                  <p><img class="img" :src="v.image_path" alt=""></p>
                  <p>{{v.content}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mmsTaskDetail",
    data() {
      return {
        zan: false,
        id: 0,
        task: {},
        yidong_access:'',
        liantong_access:'',
        dianxin_access:''
      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.getTask()
      this.getChannel()
    },
    methods: {
      shouqi() {
        this.zan = !this.zan
      },
      getChannel() {
        let that = this
        that.$request({
          url: 'administrator/getChannel',
          success(res) {
            that.disChannel(res.channel_list)
          }
        })
      },
      disChannel(data) {
        let task = this.task
        for (let i = 0; i < data.length; i++) {
          if (parseInt(task.yidong_channel_id) === parseInt(data[i].id)) {
            this.yidong_access = data[i].title
            console.log(this.access)
          }
          if (parseInt(task.liantong_channel_id) === parseInt(data[i].id)) {
            this.liantong_access = data[i].title
            console.log(this.access)
          }
          if (parseInt(task.dianxin_channel_id) === parseInt(data[i].id)) {
            this.dianxin_access = data[i].title
            console.log(this.access)
          }
        }
      },
      getTask() {
        let that = this
        let id = this.id
        console.log(id)
        that.$request({
          url: 'message/getMultimediaMessageTask',
          data: {id: id},
          success(res) {
            that.task = res.data
          }
        })
      }
    }
  }
</script>

<style scoped>
  .goBack{
    padding: 20px;
    color: #222;
    display: inline-block;
    cursor: pointer;
  }
  .goBack:hover{
    color: #409EFF;
  }
  .tabs {
    background: white;
  }

  .back {
    display: inline-block;
    float: right;
    position: relative;
    z-index: 2;
    margin-right: 10px;
    margin-top: 10px;
  }

  .box-card {
    background: #ffffff;
  }

  .content-content {
    width: 50%;
    margin-top: 20px;
    float: left;
  }

  .right {
    width: 50%;
    height: 615px;
    float: right;
    padding-left: 150px;
    box-sizing: border-box;
    margin-top: 100px;
  }

  .preview {
    background-image: url("http://imagesdev.shyuxi.com/preview-phone-bg.bc08f82.png");
    background-size: 300px 615px;
    background-repeat: no-repeat;
    height: 100%;
    width: 300px;
    /*background-position-x: 150px;*/
  }

  .inner {
    width: 100%;
    margin: 0px 20px 0 30px;
    padding-top: 100px;
    max-height: 430px;
  }

  .sms-text {
    margin-bottom: 5px;
    background: #e5e4e9;
    border-radius: 16px;
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    padding: 15px;
    width: 200px;
    min-height: 10px;
    word-break: break-all;
    max-height: 435px;
    overflow: auto;
  }

  .phone-num span {
    color: #1889ff;
  }

  .avatar-uploader {
    width: 160px;
    height: 160px;
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px !important;
    cursor: pointer !important;
    position: relative !important;
    overflow: hidden !important;
    margin-bottom: 10px;
  }

  .avatar-uploader .el-upload {

  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .img {
    width: 90%;
    margin: 10px auto;
    object-fit: contain;
  }

  .thumb {
    width: 60%;
    object-fit: contain;
  }
</style>
