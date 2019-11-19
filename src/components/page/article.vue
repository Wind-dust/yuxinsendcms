<template>
  <div>
    <!-- <quill-editor v-model="content" :options="editorOption" ref="myTextEditor"> -->
<!-- </quill-editor> -->
      <div class="editor" ref="editor" contenteditable="true" id="rich-editor"></div>
      <el-button class="add" type="primary" @click="addhtml()">保存</el-button>
  </div>
</template>

<script>
import {ajaxImg} from '../../assets/js/imgTakeOut'
export default {
  data () {
    return {
      con:''
    }
  },
  mounted(){
    // console.log(Server)
  },
  methods:{
    addhtml(){
      ajaxImg()
      // var imgReg = /<img.*?(?:>|\/>)/gi;
      // // var imgReg = /<img.*?(?:>|\/>)/gi;
      // var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/gi;
      // var urlReg = /(\"|\').*(\"|\')/gi;
      // var arr = this.$refs.editor.innerHTML.match(srcReg);  // arr 为包含所有img标签的数组
      // for(let i=0,len=arr.length;i<len;i++){
      //     //  console.log(arr[i].match(urlReg))
      // }
      // console.log(arr[0].match(urlReg))
      // ajaxImg(arr[0].match(urlReg)[0])
    }
  },
  components: {
    
  }
}
</script>

<style scoped>
.editor{
  width: 500px;
  height: 800px;
  overflow: auto;
  background-color: #fff;
}
</style>
