<script lang="ts" setup>
import { getactiv_evalue,activ_evaluate } from "../../api/user";
import storage from "../../localstorage/localstorage";
import { ref, reactive, onBeforeMount } from "vue";

const dialogFormVisible = ref(false);
const form = reactive({
  evaluate_x: "",
  ac_id: null,
});

interface User {
  activ_id: number;
  activ_name: string;
  activ_result: number;
  deta_evaluation: string;
  deta_win: number;
}
const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User;
  rowIndex: number;
}) => {
  if (row.activ_result == "未结束") {
    return "info-row";
  } else if (row.deta_evaluation == "未评价") {
    return "danger-row";
  }
  return "end-row";
};
const evaluate = reactive({
  list: [],
});
onBeforeMount(() => {
  getactiv_evalue({ id: storage.get("data").id }).then((res) => {
    evaluate.list = res.data;
    for (const item of evaluate.list) {
      if (item.activ_result == 0) item.activ_result = "未结束";
      else item.activ_result = "已结束";
      if (item.deta_evaluation == "") item.deta_evaluation = "未评价";
      if (item.deta_win == 0) item.deta_win = "未获奖";
      else item.deta_win = "获奖";
    }
  });
});
const opensub = (id: number) => {
  dialogFormVisible.value = true;
  form.ac_id = id;
};
const Submitvalue = (id: number) => {
  dialogFormVisible.value = false;
  if (form.evaluate_x.toString().length > 3) {
    activ_evaluate({
      id: storage.get("data").id,
      activ_id: form.ac_id,
      evaluate_x: form.evaluate_x,
    }).then((res) => {
      ElMessage({
        message: res.msg,
        type: "success",
      });
    });
  } else {
    ElMessage.error("评论不要少于三个，请多评价一点吧");
  }
  form.evaluate_x = "";
};
</script>

<template>
  <div class="divcon">
    <el-table
      :data="evaluate.list"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="activ_name" label="活动名称" width="180" />
      <el-table-column prop="activ_result" label="活动是否结束" width="180" />
      <el-table-column prop="deta_evaluation" label="活动评价" width="180" />
      <el-table-column prop="deta_win" label="是否获奖" />
      <el-table-column prop="activ_id" label="操作">
        <template #default="scope">
          <el-button
            v-if="scope.row.activ_result == '未结束'"
            type="primary"
            size="small"
            disabled
            >活动未结束</el-button
          >
          <el-button
            v-else-if="scope.row.deta_evaluation == '未评价'"
            type="primary"
            size="small"
            @click.prevent="opensub(scope.row.activ_id)"
            >评价</el-button
          >
          <el-button v-else type="primary" size="small" disabled
            >已评价</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 评价 -->
    <el-dialog v-model="dialogFormVisible" title="活动评价">
      <el-form :model="form">
        <el-form-item label="评价" label-width="60px">
          <el-input
            v-model="form.evaluate_x"
            type="textarea"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="Submitvalue">评价</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style>
.divcon {
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-table .info-row {
  --el-table-tr-bg-color: var(--el-color-info-light-9);
}
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
.el-table .danger-row .el-table_1_column_3 {
  color: rgb(201, 67, 67);
}
.el-table .end-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
  margin-left: 0px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>