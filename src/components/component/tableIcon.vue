<template>
  <div class="tIcon" @click="iconClick">
    <el-tooltip class="item" effect="dark" :content="content" placement="top">
      <span class="table-icon">
        <i :class="'el-icon-'+icon" ></i>
      </span>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: ['content','icon','param'],
  methods: {
    iconClick(){
      this.$emit('iClick',this.param || {})
    }
  }
}
</script>

<style scoped>
.tIcon{
  display: inline-block;
  cursor: pointer;
}
</style>
