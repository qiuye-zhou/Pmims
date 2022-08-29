<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { join_active } from "../../api/user";
import storage from "../../localstorage/localstorage";
defineProps<{
  name?: string;
  id?: number;
  time?: string;
  result?: number;
  userjoin?: boolean;
  file?: number;
}>();
let joinbtn = reactive({
  res: false,
});
const emit = defineEmits(["show_activ"]);
const ac_details = (id: number) => {
  //调用父组件的方法显示活动详情
  emit("show_activ", id);
};
const join_activ = (
  id: number,
  name: string,
  user_id: number,
  file: number
) => {
  //不需要提交文件的参加活动
  if (file == 0) {
    ElMessageBox.confirm(`你确认要参加—${name}?`, "确认", {
      confirmButtonText: "确定参加",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        joinbtn.res = true;
        join_active({ id: user_id, activ_id: id }).then((res) => {
          ElMessage({
            type: "success",
            message: res.msg,
          });
        });
        setTimeout(() => location.reload(), 3000);
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消",
        });
      });
  } else {
    //需要提交文件的参加活动
    join_file.showlist = true;
  }
};
const join_file = reactive({
  showlist: false,
});
const hide = () => {
  join_file.showlist = false;
};
</script>

<template>
  <div class="con">
    <h3>{{ name }}</h3>
    <div class="timetxt">
      <el-icon><Clock /></el-icon>
      <p>活动开始时间：{{ time }}</p>
    </div>
    <div class="btn">
      <div v-if="result == 0">
        <el-button type="primary" round @click="ac_details(id)"
          >活动详情</el-button
        >
        <el-button
          v-if="!userjoin"
          type="success"
          round
          :disabled="joinbtn.res"
          @click="join_activ(id, name, storage.get('data').id, file)"
          >参加活动</el-button
        >
        <el-button v-if="userjoin" type="warning" round disabled
          >已参加</el-button
        >
      </div>
      <el-button v-if="result == 1" type="danger" round disabled
        >活动已结束</el-button
      >
    </div>
    <el-dialog
      v-model="join_file.showlist"
      :title="`用户参加活动`"
      @close="hide"
    >
      cc
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.con {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 200px;
  margin: 20px;
  border-radius: 2%;
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.2);
  h3 {
    color: rgb(120, 120, 120);
    font-size: 15px;
    text-align: center;
  }
  .timetxt {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin-left: 10px;
      color: rgb(121, 127, 131);
    }
  }
  .btn {
    margin: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>