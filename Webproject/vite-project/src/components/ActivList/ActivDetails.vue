<script lang="ts" setup>
import { ref, reactive } from "vue";
import { join_active } from "../../api/user";
import storage from "../../localstorage/localstorage";
defineProps<{
  id?: number;
  userjoin?: boolean;
  activ?: object;
}>();
let joinbtn = reactive({
  res: false,
});
const emit = defineEmits(["hide_activ"]);
const hide = () => {
  emit("hide_activ");
};
const join_activ = (
  id: number,
  name: string,
  user_id: number,
  file: number
) => {
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
const hidefile = () => {
  join_file.showlist = false;
};
</script>

<template>
  <div class="con">
    <el-card shadow="hover">
      <h3>{{ activ.activ_name }}</h3>
    </el-card>
    <el-card shadow="hover">
      <div class="timetxt">
        <el-icon><Clock /></el-icon>
        <p>活动开始时间：{{ activ.activ_time }}</p>
      </div>
    </el-card>
    <el-card shadow="hover">
      <div>活动积分：{{ activ.activ_integral }}</div>
    </el-card>
    <el-card shadow="hover" header="活动简介：">
      <div>
        <span v-html="activ.activ_describe" class="txt"></span>
      </div>
    </el-card>
    <el-card shadow="hover" header="活动详情：">
      <div>
        <span v-html="activ.form" class="txt"></span>
      </div>
    </el-card>
    <el-button class="hide" icon="CloseBold" circle @click="hide"></el-button>
    <el-button
      class="join"
      v-if="!userjoin"
      type="success"
      round
      :disabled="joinbtn.res"
      @click="
        join_activ(id, activ.activ_name, storage.get('data').id, activ.file)
      "
      >参加活动</el-button
    >
    <el-button class="join" v-if="userjoin" type="warning" round disabled
      >已参加</el-button
    >
    <el-dialog
      v-model="join_file.showlist"
      :title="`用户参加活动`"
      @close="hidefile"
    >
      cc
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.con {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  color: rgb(120, 120, 120);
  top: 50%;
  left: 50%;
  backdrop-filter: blur(6px) saturate(1.8);
  transform: translate(-50%, -50%);
  width: 98%;
  height: 98%;
  .hide {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  h3 {
    text-align: center;
  }
  .join {
    position: relative;
    right: -93%;
    bottom: -10px;
  }
  .timetxt {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      margin-left: 10px;
      color: rgb(121, 127, 131);
    }
  }
  .el-card__body {
    div {
      padding: 10px;
      color: rgb(123, 103, 103);
    }
  }
  .txt {
    font-size: 10px;
  }
}
</style>