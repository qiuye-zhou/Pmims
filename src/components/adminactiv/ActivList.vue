<script lang="ts" setup>
import { reactive, ref } from "vue";
defineProps<{
  showlist?: boolean;
  name?: string;
  list?: object;
}>();
const emit = defineEmits(["hide_list"]);
const hide = () => {
  //调用父组件的方法显示活动详情
  emit("hide_list");
};
const formLabelWidth = "140px";
</script>
<template>
  <el-dialog
    v-model="showlist"
    :title="`活动评价信息—(${name})`"
    @close="hide"
  >
    <el-table :data="list" empty-text="暂无评价信息" height="300">
      <el-table-column property="name" label="姓名" />
      <el-table-column property="deta_evaluation" label="评价" />
    </el-table>
  </el-dialog>
</template>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>