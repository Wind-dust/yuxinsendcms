<template>
  <div class="flex-cen pagination">
      <el-pagination :hide-on-single-page="true" :page-size="vPageSize" background @current-change="pageChange"  ref="pagination"  layout="prev, pager, next" :total="vTotal"> </el-pagination>
    </div>
</template>

<script>
export default {
  props: ['total','num','page','pageSize'],
  data(){
    return {
      vTotal:0,
      vPage:1,
      vPageSize:10
    }
  },
  watch: {
    'total': function(newVal){
        // this.$refs.pagination.internalCurrentPage = 1;
        this.vTotal = this.total
    },
    'num': function(newVal){
        this.$refs.pagination.internalCurrentPage = 1;
    },
    'page': function(newVal){
        this.$refs.pagination.internalCurrentPage = this.page;
    },
    'pageSize'(newVal){
      this.vPageSize = newVal
    }
  },
  mounted(){
    this.vTotal = this.total
    this.vPageSize = this.pageSize
  },
  methods: {
    pageChange(val){
      console.log('pageChange',val)
      this.$emit('pageChange',{
        page: val
      })
    }
  }
}
</script>

<style scoped>

</style>
