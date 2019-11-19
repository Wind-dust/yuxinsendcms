<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabs">
      <template>
        <el-tabs class="eltabs" value="first" type="card">
          <el-tab-pane label="资质信息" name="first">
            <el-form class="form" label-width="250px">
              <el-form-item label="主办单位或主办人全名:"><span class="text">{{detail.company_name}}</span></el-form-item>
              <el-form-item label="主办单位性质:"><span>{{detail._company_type}}</span></el-form-item>
              <el-form-item label="主办单位证件类型:"><span>{{detail._company_certificate_type}}</span></el-form-item>
              <el-form-item label="主办单位证件号码:"><span>{{detail.company_certificate_num}}</span></el-form-item>
              <el-form-item label="省份:"><span>{{province}}</span></el-form-item>
              <el-form-item label="城市:"><span>{{city}}</span></el-form-item>
              <el-form-item label="地区:"><span>{{county}}</span></el-form-item>
              <el-form-item label="主办单位或主办人全称:"><span>{{detail.organizers_name}}</span></el-form-item>
              <el-form-item label="主办单位证件住所:"><span>{{detail.identity_address}}</span></el-form-item>
              <el-form-item label="主办单位通讯地址(地区级):"><span>{{detail.mailingAddress_address}}</span></el-form-item>
              <el-form-item label="主办单位通讯地址(街道门牌号级):"><span>{{detail.user_supp_address}}</span></el-form-item>
              <el-form-item label="投资人或主管单位:"><span>{{detail.investor}}</span></el-form-item>
              <el-form-item label="负责人姓名:"><span>{{detail.entity_responsible_person_name}}</span></el-form-item>
              <el-form-item label="负责人证件类型:"><span>{{detail._entity_responsible_person_identity_types}}</span>
              </el-form-item>
              <el-form-item label="负责人证件号码:"><span>{{detail.entity_responsible_person_identity_num}}</span>
              </el-form-item>
              <el-form-item label="联系方式1:"><span>{{detail.entity_responsible_person_mobile_phone}}</span></el-form-item>
              <el-form-item label="联系方式2:"><span>{{detail.entity_responsible_person_phone}}</span></el-form-item>
              <el-form-item label="应急联系电话:"><span>{{detail.entity_responsible_person_msn}}</span></el-form-item>
              <el-form-item label="电子邮件地址:"><span>{{detail.entity_responsible_person_email}}</span></el-form-item>
              <el-form-item label="留言:"><span>{{detail.entity_remark}}</span></el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </template>

    </div>

  </div>
</template>

<script>
  export default {
    name: "accountDetail",
    data() {
      return {
        id: 0,
        info: {}
      }
    },
    mounted() {
      console.log(this.$route.query)
      this.id = this.$route.query.id
      this.getInfo()
    },
    methods: {
      getInfo() {
        let that = this
        let id = this.id
        that.$request({
          url: 'User/getUsers',
          data: {id},
          success(res) {
            this.info = that.result
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
