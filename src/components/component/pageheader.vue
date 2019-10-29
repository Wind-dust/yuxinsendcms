<template>
  <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb"  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>金融管理</el-breadcrumb-item>
        <el-breadcrumb-item>充值管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="add fr" type="primary" icon="el-icon-plus" @click="toggleCard(true)">充值</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  components:{
      
  },
  mounted(){
    console.log(this.$route)
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
