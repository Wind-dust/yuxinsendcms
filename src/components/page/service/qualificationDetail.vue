<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb"  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>服务管理</el-breadcrumb-item>
        <el-breadcrumb-item>资质详情</el-breadcrumb-item>
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
              <el-form-item label="负责人证件类型:"><span>{{detail._entity_responsible_person_identity_types}}</span></el-form-item>
              <el-form-item label="负责人证件号码:"><span>{{detail.entity_responsible_person_identity_num}}</span></el-form-item>
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
  import vUpload from '../../component/upload';
  import vCard from '../../component/card'
  import {imageDeal} from '../../../assets/js/common';
  // import {hideTabBarRedDot} from "./index";
  export default {
    data(){
      return {
        detail:{},
        id:'',
        province:'',
        city:'',
        county:''
      }
    },
    components:{
      vUpload,
      vCard
    },
    mounted(){
      console.log(this.$route.query)
      this.id = this.$route.query.id;
      this.getOne()
      // this.getProvince(this.detail.province_id,this.detail.city_id,this.detail.county_id)

    },
    methods: {
      getOne(){
        let id = this.id
        let that = this
        that.$request({
          url:'administrator/getUserQualificationRecord',
          data:{id:id},
          success(res){
            let result = that.disResult(res.Business)
            that.detail = result
            that.getArea(result.city_id,result.county_id)
            that.getProvince(result.province_id,result.city_id)

          }
        })
      },
      disResult(data){
        let _company_type = ''
        switch (parseInt(data.company_type)) {
          case 1:
            _company_type = '国防机构';
            break;
          case 2:
            _company_type = '政府机关';
            break;
          case 3:
            _company_type = '事业单位';
            break;
          case 4:
            _company_type ='企业';
            break;
          case 5:
            _company_type = '个人';
            break;
          case 6:
            _company_type = '社会团体';
            break;
          case 7:
            _company_type = '民办非企业单位';
            break;
          case 8:
            _company_type = '基金会';
            break;
          case 9:
            _company_type = '律师执业机构';
            break;
          case 10:
            _company_type = '外国在华文化中心';
            break;
          case 11:
            _company_type = '群众性团体组织';
            break;
          case 12:
            _company_type = '司法鉴定机构';
            break;
          case 13:
            _company_type = '宗教团体';
            break;
          case 14:
            _company_type = '境外机构';
            break;
          case 15:
            _company_type = '医疗机构';
            break;
          case 16:
            _company_type = '公证机构';
            break;
        }
        let _company_certificate_type = ''
        switch (parseInt(data.company_certificate_type)) {
          case 1:
            _company_certificate_type = '营业执照';
            break;
          case 5:
            _company_certificate_type = '部队代号';
            break;
          case 23:
            _company_certificate_type = '军队单位对外有偿服务许可证';
            break;
          case 9:
            _company_certificate_type = '组织机构代码证';
            break;
          case 13:
            _company_certificate_type = '统一社会信用代码证书';
            break;
          case 3:
            _company_certificate_type = '组织机构代码证';
            break;
          case 4:
            _company_certificate_type = '事业单位法人证书';
            break;
          case 12:
            _company_certificate_type = '组织机构代码证';
            break;
          case 27:
            _company_certificate_type = '外国企业常驻代表机构登记证';
            break;
          case 2:
            _company_certificate_type = '居民身份证';
            break;
          case 7:
            _company_certificate_type = '护照';
            break;
          case 11:
            _company_certificate_type = '台湾居民来往大陆通行证';
            break;
          case 14:
            _company_certificate_type = '港澳居民来往内地通行证';
            break;
          case 30:
            _company_certificate_type = '外国人永久居留身份证';
            break;
          case 41:
            _company_certificate_type = '港澳居民居住证';
            break;
          case 42:
            _company_certificate_type = '台湾居民居住证';
            break;
          case 6:
            _company_certificate_type = '社会团体法人登记证书';
            break;
          case 10:
            _company_certificate_type = '组织机构代码证';
            break;
          case 16:
            _company_certificate_type = '组织机构代码证';
            break;
          case 17:
            _company_certificate_type = '民办非企业单位登记证书';
            break;
          case 36:
            _company_certificate_type = '社会服务机构登记证书';
            break;
          case 37:
            _company_certificate_type = '民办学校办学许可证';
            break;
          case 18:
            _company_certificate_type = '组织机构代码证';
            break;
          case 19:
            _company_certificate_type = '基金会法人登记证书';
            break;
          case 20:
            _company_certificate_type = '组织机构代码证';
            break;
          case 21:
            _company_certificate_type = '律师事务所执业许可证';
            break;
          case 22:
            _company_certificate_type = '外国在华文化中心登记证';
            break;
          case 34:
            _company_certificate_type = '外国政府旅游部门常驻代表机构批准登记';
            break;
          case 40:
            _company_certificate_type ='北京外国驻华使馆人员子女学校办学许可';
            break;
          case 24:
            _company_certificate_type = '统一社会信用代码证书';
            break;
          case 28:
            _company_certificate_type = '司法鉴定许可证';
            break;
          case 25:
            _company_certificate_type = '宗教活动场所登记证';
            break;
          case 35:
            _company_certificate_type = '境外机构证件';
            break;
          case 38:
            _company_certificate_type = '医疗机构执业许可证';
            break;
          case 39:
            _company_certificate_type = '公证机构执业证';
            break;
        }
        let _entity_responsible_person_identity_types = ''
        switch (parseInt(data.entity_responsible_person_identity_types)) {
          case 1:
            _entity_responsible_person_identity_types = '营业执照';
            break;
          case 5:
            _entity_responsible_person_identity_types = '部队代号';
            break;
          case 23:
            _entity_responsible_person_identity_types = '军队单位对外有偿服务许可证';
            break;
          case 9:
            _entity_responsible_person_identity_types = '组织机构代码证';
            break;
          case 13:
            _entity_responsible_person_identity_types = '统一社会信用代码证书';
            break;
          case 3:
            _entity_responsible_person_identity_types = '组织机构代码证';
            break;
          case 4:
            _entity_responsible_person_identity_types = '事业单位法人证书';
            break;
          case 12:
            _entity_responsible_person_identity_types = '组织机构代码证';
            break;
          case 27:
            _entity_responsible_person_identity_types = '外国企业常驻代表机构登记证';
            break;
          case 2:
            _entity_responsible_person_identity_types = '居民身份证';
            break;
          case 7:
            _entity_responsible_person_identity_types = '护照';
            break;
          case 11:
            _entity_responsible_person_identity_types = '台湾居民来往大陆通行证';
            break;
          case 14:
            _entity_responsible_person_identity_types = '港澳居民来往内地通行证';
            break;
          case 30:
            _entity_responsible_person_identity_types = '外国人永久居留身份证';
            break;
          case 41:
            _entity_responsible_person_identity_types = '港澳居民居住证';
            break;
          case 42:
            _entity_responsible_person_identity_types = '台湾居民居住证';
            break;
          case 6:
            _entity_responsible_person_identity_types = '社会团体法人登记证书';
            break;
          case 10:
            _entity_responsible_person_identity_types = '组织机构代码证';
            break;
          case 16:
            _entity_responsible_person_identity_types = '组织机构代码证';
            break;
          case 17:
            _entity_responsible_person_identity_types = '民办非企业单位登记证书';
            break;
          case 36:
            _entity_responsible_person_identity_types = '社会服务机构登记证书';
            break;
          case 37:
            _entity_responsible_person_identity_types = '民办学校办学许可证';
            break;
          case 18:
            _entity_responsible_person_identity_types = '组织机构代码证';
            break;
          case 19:
            _entity_responsible_person_identity_types = '基金会法人登记证书';
            break;
          case 20:
            _entity_responsible_person_identity_types = '组织机构代码证';
            break;
          case 21:
            _entity_responsible_person_identity_types = '律师事务所执业许可证';
            break;
          case 22:
            _entity_responsible_person_identity_types = '外国在华文化中心登记证';
            break;
          case 34:
            _entity_responsible_person_identity_types = '外国政府旅游部门常驻代表机构批准登记';
            break;
          case 40:
            _entity_responsible_person_identity_types ='北京外国驻华使馆人员子女学校办学许可';
            break;
          case 24:
            _entity_responsible_person_identity_types = '统一社会信用代码证书';
            break;
          case 28:
            _entity_responsible_person_identity_types = '司法鉴定许可证';
            break;
          case 25:
            _entity_responsible_person_identity_types = '宗教活动场所登记证';
            break;
          case 35:
            _entity_responsible_person_identity_types = '境外机构证件';
            break;
          case 38:
            _entity_responsible_person_identity_types = '医疗机构执业许可证';
            break;
          case 39:
            _entity_responsible_person_identity_types = '公证机构执业证';
            break;
        }
        data._entity_responsible_person_identity_types = _entity_responsible_person_identity_types
        data._company_certificate_type = _company_certificate_type
        data._company_type = _company_type
        return data
      },
      getProvince(proId,cityId){
        let that = this
        that.$request({
          url: 'provinces/getProvinceCity',
          success(res) {
            that.disArea(res.data,proId,cityId)

          }
        })
      },
      disArea(data,proId,cityId){
        for (let i=0;i<data.length;i++){
          if (data[i].id == proId){
            console.log(data[i].area_name)
              this.province = data[i].area_name
            for (let c=0;c<data[i]._child.length;c++){
              if (data[i]._child[c].id == cityId){
                this.city = data[i]._child[c].area_name
              }
            }
          }
        }
      },
      getArea(cityId,countyId){
        let that = this
        that.$request({
          url:'provinces/getArea',
          data:{
            cityId:cityId
          },
          success(res){
            let data = res.data
            for (let j = 0;j<data.length;j++){
              if (data[j].id == countyId){
                console.log(data[j].area_name)
                that.county = data[j].area_name
              }
            }
          }
        })
      }

    }
  }
</script>

<style scoped>
  .tabs{
    background-color: #fff;
  }
  .eltabs{
    min-height: 700px;
  }
  .box-card{
    margin-top: 20px;
    width: 500px;
    margin-left: 20px;;
  }
  .table{
    width: 95%;
    margin: 20px auto;
  }
  .primary{
    margin-left: 30px;
  }
  .chart{
    display: inline-block;
    width: 98%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    background-color: #FFF;
    font-size: 14px;
    text-indent: 10px;
  }
  .banner{
    margin-top: 20px;
  }
  .imageTit{
    float: left;
    margin-left: 20px;
    font-size: 18px;
    line-height: 62px;
  }

  .el-icon-plus {
    float: left;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-icon-plus:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .tags{
    padding: 20px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 100px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .table{
    border-collapse: separate;
    border-spacing: 10px;
  }
  .table-cell {
    display: table-cell !important;
  }
  .pl-li {
    position: relative;
    width: 20%;
    min-width: 100px;
    max-width: 300px;
    height: auto;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #e9e9e9;
    overflow: auto;
  }
  .hierarchy {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: 20px;
    text-align: center;
    color: #3bb4f2;
    font-weight: bold;
    font-size: 18px;
  }
  .pl-image {
    width: 100%;
    min-height: 50px;
  }
  .trpl .pl-image{
    display: none;
  }
  .pl-manage {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    opacity: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .pl-li:hover .pl-manage {
    opacity: 1;
  }
  .order_by{
    margin-top: 10px;
  }
  .trpl {
    display: table-row!important;
    height: 1px;
    overflow: hidden;
    padding: 0;
  }
  .preview{
    cursor: pointer;
    margin-right: 50px;
  }
  .infoList{
    width: 100%;
    max-height: 700px;
    overflow: auto;
  }
  .infoList img{
    display: inline-block;
    float: left;
    width: 100%;
  }
  .infoList::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
  }
  .preview-box{
    width:700px;
  }

  .el-icon-plus {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-icon-plus:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: auto;
    min-width: 60px;
    height: 60px;
    display: block;
    cursor: pointer;
  }
  .imgli{
    position: relative;
    display: inline-block;
    padding: 0 10px;
    float: left;
  }
  .imgDel{
    position: absolute;
    top: 0;
    right: 10px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    margin-right: 0;
    cursor: pointer;
    color: #000;
    font-weight: bold;
  }
  .add{
    margin-bottom: 20px;
  }
</style>
