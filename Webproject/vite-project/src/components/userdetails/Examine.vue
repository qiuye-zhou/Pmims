<script lang="ts" setup>
import { reactive, ref } from "vue";
defineProps<{
  dialogTableVisible?: boolean;
  name?: string;
}>();
const emit = defineEmits(["hide_ex"]);
const hide = () => {
  //调用父组件的方法显示活动详情
  emit("hide_ex");
};
const formLabelWidth = "140px";

const gridData = [
  {
    date: "2016-05-02",
    name: "John Smith",
    address: "No.1518,  Jinshajiang Road, Putuo District",
  },
  {
    date: "2016-05-04",
    name: "John Smith",
    address: "No.1518,  Jinshajiang Road, Putuo District",
  },
  {
    date: "2016-05-01",
    name: "John Smith",
    address: "No.1518,  Jinshajiang Road, Putuo District",
  },
  {
    date: "2016-05-03",
    name: "John Smith",
    address: "No.1518,  Jinshajiang Road, Putuo District",
  },
];
</script>
<template>
  <el-dialog
    v-model="dialogTableVisible"
    :title="`审核信息—(${name})`"
    @close="hide"
  >
    <el-table :data="gridData">
      <el-table-column property="date" label="Date" width="150" />
      <el-table-column property="name" label="Name" width="200" />
      <el-table-column property="address" label="Address" />
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
