<script lang="ts" setup>
import { reactive, ref } from "vue";
import { baseURL } from "../../config/request";
defineProps<{
  showlist?: boolean;
  fileres?: boolean;
  ac_name?: string;
  list?: object;
  ac_inte?: number;
}>();
const emit = defineEmits(["hide_activ_result","sub_ac_res"]);
const hide = () => {
  emit("hide_activ_result");
};
const download = (data) => {
  const activ_name = data.activ_name
  const name = data.name
  const id = data.id;
  const acid = data.activ_id;
  window.open(baseURL + "/file/download" + `?name=ac${acid}user${id}&filename=${name}&activname=${activ_name}&acid=${acid}`, "_self");
};
const sub_result = () => {
    emit("sub_ac_res")
    emit("hide_activ_result");
}
</script>
<template>
  <el-dialog
    v-model="showlist"
    :title="`用户参与活动信息—(${ac_name})`"
    @close="hide"
  >
    <el-table :data="list" empty-text="暂无用户参与活动" height="300">
        <el-table-column property="name" label="姓名" />
        <el-table-column
            v-if="fileres"
            prop="activ_id"
            label="附件"
            >
            <template #default="scope">
                <el-button
                    type="success"
                    class="danger"
                    size="small"
                    @click="download(scope.row)"
                >附件下载</el-button>
            </template>
        </el-table-column>
        <el-table-column 
            v-if="fileres"
            prop="add_inte"
            label="得分"
            >
            <template #default="scope">
                <el-form :model="scope.row">
                    <el-form-item label="" label-width="10px">
                            <el-select v-model="scope.row.add_inte" placeholder="请选择数值">
                            <el-option v-if="ac_inte>=0" label="0" value="0" />
                            <el-option v-if="ac_inte>=1" label="1" value="1" />
                            <el-option v-if="ac_inte>=2" label="2" value="2" />
                            <el-option v-if="ac_inte>=3" label="3" value="3" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column 
            v-if="!fileres"
            prop="add_inte"
            label="得分"
            >
            <template #default="scope">
                <el-form :model="scope.row">
                    <el-form-item label="" label-width="10px">
                            <el-select v-model="scope.row.add_inte" placeholder="请选择数值">
                            <el-option label="已参加" value="已参加" />
                            <el-option label="未参加" value="未参加" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
    </el-table>
    <div class="subdiv">
    <el-button
        type="success"
        class="danger sub"
        size="small"
        @click="sub_result()"
    >提交</el-button>
    </div>
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
.subdiv {
    margin: 0.2rem;
    display: flex;
    justify-content: flex-end;
}
</style>