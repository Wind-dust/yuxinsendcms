<template>
  <div class="flex-cen pagination">
      <el-pagination :hide-on-single-page="true" :page-size="pageSize" background @current-change="pageChange"  ref="pagination"  layout="prev, pager, next" :total="vTotal"> </el-pagination>
    </div>
</template>

<script>
export default {
  props: ['total','num','page','page-size'],
  data(){
    return {
      vTotal:0,
      vPage:1,
      pageSize:10
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
    'page-size'(newVal){
      this.pageSize = newVal
    }
  },
  mounted(){
    this.vTotal = this.total
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
