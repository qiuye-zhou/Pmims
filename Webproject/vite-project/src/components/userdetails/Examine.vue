<script lang="ts" setup>
import { reactive, ref } from "vue";
defineProps<{
  dialogTableVisible?: boolean;
  name?: string;
  list?: object;
}>();
const emit = defineEmits(["hide_ex"]);
const hide = () => {
  //调用父组件的方法显示活动详情
  emit("hide_ex");
};
const formLabelWidth = "140px";
</script>
<template>
  <el-dialog
    v-model="dialogTableVisible"
    :title="`审核信息—(${name})`"
    @close="hide"
  >
    <el-table :data="list" empty-text="暂无审核信息">
      <el-table-column property="ex_name" label="获奖名" />
      <el-table-column property="ex_li" label="奖项" />
      <el-table-column property="ex_time" label="获奖时间" />
      <el-table-column property="ex_result" label="审核状态" />
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
