<template>
  <div><h2>上海钰晰科技信息</h2></div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    components: {},
    computed: {},
    mounted() {
      this.getuserInfo()
    },
    methods: {
      getuserInfo() {
        let that = this;
        that.$request({
          url: 'admin/getadmininfo',
          success: function (res) {
            that.$glbalData.userInfo = res.data || {};
            that.name = res.data.admin_name
          },
          complete:function (res) {
            if (res.code == 5000) {
              that.$router.push({path:'/login'})
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
