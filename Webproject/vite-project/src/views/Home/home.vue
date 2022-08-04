<script lang="ts" setup>
import storage from "../../localstorage/localstorage";
import { ref, reactive, onBeforeMount } from "vue";
import { getUsername } from "../../api/useradmin";
const value = ref(new Date());

let user = reactive({
  grade: "0",
  role: "超级管理员",
  name: "",
});
onBeforeMount(() => {
  user.grade = storage.get("data").grade;
  user.id = storage.get("data").id
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
});
</script>

<template>
  <div class="con">
    <h3>欢迎{{ `${user.role}—${user.name}` }}登入</h3>
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
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>