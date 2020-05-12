<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>筛选</span>
      </div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-for="(v,k) in screen" :key="k" :label="v.label">
          <el-input v-if="v.type == 'input'" v-model="v.content" :placeholder="v.placeholder || '请输入'"></el-input>

          <el-date-picker v-else-if="v.type == 'date'" v-model="v.content" type="datetime"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" default-time="00:00:00"></el-date-picker>

          <el-select class="select" v-else-if="v.type == 'select'" v-model="v.content" placeholder="请选择">

          <el-option v-for="item in v.option" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['screen'],
  data(){
    return {

    }
  },
  mounted(){

  },
  methods: {
    onQuery(){
      let data = this.screen,
      len=data.length,
      param = {};
      for(let i=0;i<len;i++){
        param[data[i].ref] = data[i].content
      }
      this.$emit('query',param)
    }
  }
}
</script>

<style scoped>

</style>
