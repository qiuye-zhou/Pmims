<script lang="ts" setup>
import { reactive, ref } from "vue";
import { baseURL } from "../../config/request";
defineProps<{
  showlist?: boolean;
  fileres?: boolean;
  name?: string;
  list?: object;
}>();
const emit = defineEmits(["hide_userlist"]);
const hide = () => {
  //调用父组件的方法关闭
  emit("hide_userlist");
};
const formLabelWidth = "140px";
const download = (data) => {
  const name = data.name
  const id = data.id;
  const acid = data.activ_id;
  window.open(baseURL + "/file/download" + `?name=ac${acid}user${id}&filename=${name}`, "_self");
};
</script>
<template>
  <el-dialog
    v-model="showlist"
    :title="`用户参与活动信息—(${name})`"
    @close="hide"
  >
    <el-table :data="list" empty-text="暂无用户参与活动" height="300">
      <el-table-column property="name" label="姓名" />
      <el-table-column property="sex" label="性别" />
      <el-table-column property="department" label="部门" />
      <el-table-column
        v-if="fileres"
        prop="activ_id"
        label="文件"
        min-width="190px"
      >
        <template #default="scope">
          <el-button
            type="success"
            class="danger"
            size="small"
            @click="download(scope.row)"
            >文件下载</el-button
          >
        </template>
      </el-table-column>
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