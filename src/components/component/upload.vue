<template>
    <div class="" :id='num'>
      <div v-if="imaegList.length > 0" class="imgList">
        <div v-for="(v,k) in imaegList" :key="k" class="imgli">
          <span v-if="multiple" class="imgDel" @click="delImg(v[name] || v['image'])">X</span>
          <img  :src="v[name] || v['image']" @click="fileShow" class="avatar">
          <input v-if="multiple" class="orderby" type="text" @keyup.enter="orderby(v[name] || v['image'],$event)" :value="v.order_by">
        </div>
      </div>

      <i v-if="imaegList.length === 0 && !multiple" class="el-icon-plus avatar-uploader-icon"  @click="fileShow"></i>
      <i v-if="multiple" class="el-icon-plus avatar-uploader-icon"  @click="fileShow"></i>

      <input class="hide" type="file" :multiple="multiple"  @change="fileChange" name="" :id="'fileinp'+num">
  </div>
</template>

<script>
import {imageDeal} from '../../assets/js/common';
export default {
  props: ['num','image','name','multiple'],
  data(){
    return{
      imaegList:[]
    }
  },
  watch: {
    'image': function(newVal){
        this.takeImage()
    },
  },
  mounted(){
    this.takeImage()
  },
  methods: {
    takeImage(){
      if(!this.image) return
      !this.multiple ?(this.imaegList =[{image:this.image}]):(this.imaegList = this.image)
    },
    delImg(path){
      this.$emit('delImg',{
        path: path,
        num:this.num
      })
    },
    orderby(path,ev){
      this.$emit('orderby',{
        path: path,
        order_by:ev.target.value,
        num:this.num
      })
    },
    fileShow(){
      document.querySelector('#fileinp'+this.num).click()
    },
    fileChange(e){
      let files = e.target.files || e.dataTransfer.files,that =this;
      let formdata = new FormData();
      if(this.multiple){
        let x = 0,len = files.length;
        for (let i = 0; i < len; i++) {
            imageDeal(files[i], function(file) {
                x++
                formdata.append('images[]', file)
            })
        }
        let interval = setInterval(function() {
            if (len === x) {
                clearInterval(interval)
                that.uploadmultifile(formdata)
            }
        }, 100)
      }else{
        imageDeal(files[0],function(file) {
          formdata.append('image', file);
          that.uploadfile(formdata)
        })
      }
      
    },
    uploadmultifile(formdata){
      let that = this;
      that.$request({
        data: formdata,
        url: 'upload/uploadmultifile',
        success(res){
           let data = res.data;
           for(let i=0,len=data.length;i<len;i++){
             that.imaegList.push({
                image: data[i]
              })
           }
           that.$emit('upresult',{
            image_path: res.data,
            num:that.num
          })
        },
        complete(res){
            document.querySelector('#fileinp'+that.num).value = ''
        },
        error(){
          that.$emit('upresult',{num:that.num})
        }
      })
    },
    uploadfile(formdata){
      let that = this;
      that.$request({
        data: formdata,
        url: 'upload/uploadfile',
        success(res){
          that.imaegList =[{image:res.image_path}]
          console.log(that.imaegList)
          that.$emit('upresult',{
            image_path: res.image_path,
            num:that.num
          })
        },
        complete(res){
            document.querySelector('#fileinp'+that.num).value = ''
        },
        error(){
          that.$emit('upresult',{num:that.num})
        }
      })
    },

  }
}
</script>
<style scoped>
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
.imgList{

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
.orderby{
  width: 60px;
  line-height: 20px;
  text-align: center;
  /* border: 1px solid #999; */
}
</style>

