<script lang="ts" setup>
import storage from "../../localstorage/localstorage";
import { ref, reactive, onBeforeMount } from "vue";
import { getUsername } from "../../api/useradmin";
import { getechartspie } from "../../api/user";
import HomePie from "./HomePie.vue";
const value = ref(new Date());

let user = reactive({
  grade: "0",
  role: "高级管理员",
  name: "",
});
const pie = reactive({
  num: 0,
  join_num: 0,
  result: false,
});
onBeforeMount(() => {
  user.grade = storage.get("data").grade;
  user.id = storage.get("data").id;
  if (user.grade == 3) user.role = "用户";
  if (user.grade == 2) user.role = "管理员";
  getUsername({ id: user.id })
    .then((res) => {
      if (res.code == 200) {
        user.name = res.data[0].name;
      } else {
        user.name = "XX";
      }
    })
    .catch((err) => {
      console.log(err);
    });
  if (user.grade === 3) {
    getechartspie({ id: storage.get("data").id }).then((res) => {
      pie.num = res.data.active_num;
      pie.join_num = res.data.join_num;
      //让pie图在获取数据之后加载(否则会出现数据为空的情况)
      pie.result = true
    });
  }
});
</script>

<template>
  <div class="con">
    <h3>欢迎{{ `${user.role}—${user.name}` }}登入</h3>
    <div class="piecon" v-if="user.grade === 3">
      <el-card class="box-card num">
        <p>活动总数</p>
        <el-icon><Flag /></el-icon>{{ pie.num }}
      </el-card>
      <el-card class="box-card join_num">
        <p>参加总数</p>
        <el-icon><Finished /></el-icon>{{ pie.join_num }}
      </el-card>
      <div class="pie">
        <HomePie v-if="pie.result" :num="pie.num" :join_num="pie.join_num"></HomePie>
      </div>
    </div>
    <el-calendar v-model="value" class="date" />
  </div>
</template>

<style lang="less" scoped>
.con {
  height: auto;
  .date {
    box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.2);
    transform: scale(0.8);
    height: 600px;
  }
  h3 {
    text-align: center;
    transform: translateY(25px);
    color: rgba(0, 0, 0, 0.6);
  }
  .piecon {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
    .el-icon {
      margin-right: 10px;
    }
    .box-card {
      width: 130px;
      height: 130px;
      font-size: 26px;
      display: flex;
      justify-content: center;
      p {
        font-size: 16px;
      }
    }
    .pie {
      width: auto;
      height: auto;
    }
    .num {
      color: rgb(87, 87, 87);
    }
    .join_num {
      color: rgb(102, 165, 116);
    }
  }
}
</style>