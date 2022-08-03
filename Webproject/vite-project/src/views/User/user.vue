<script lang="ts" setup>
import { onMounted } from "vue";
import { getUser, getintegral_rank } from "../../api/user";
import storage from "../../localstorage/localstorage";
import { reactive, ref } from "vue";
let userinfo = reactive({
  department: "",
  integral: "",
  jointime: "",
  name: "",
  sex: "",
  user: false,
});
onMounted(() => {
  const id = storage.get("data").id;
  getUser({
    id: id,
  })
    .then((res) => {
      if (res.code == 200) {
        if (res.data.length > 0) {
          const data = res.data[0];
          userinfo.department = data.department;
          userinfo.integral = data.integral;
          userinfo.jointime = data.jointime.slice(0, 10);
          userinfo.name = data.name;
          userinfo.sex = data.sex;
          userinfo.user = false;
        } else {
          console.error("用户不存在");
        }
      } else {
        console.log("出现错误");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  if (storage.get("data").grade == 3) {
    getintegral_rank({
      id: id,
    })
      .then((res) => {
        if (res.code == 200) {
          const data = res.data;
          userinfo.rank = data.rank;
          userinfo.equal = data.equal;
          userinfo.exceed = data.exceed + "%";
          userinfo.allnum = data.allnum;
          userinfo.user = true;
        } else {
          console.log("出现错误");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
</script>

<template>
  <div class="divcon">
    <div class="info">
      <h3>个人信息</h3>
      <el-form
        label-position="right"
        label-width="100px"
        :model="userinfo"
        style="max-width: 560px; min-width: 460px"
      >
        <el-form-item label="姓名">
          <el-input v-model="userinfo.name" disabled />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="userinfo.sex" disabled />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="userinfo.department" disabled />
        </el-form-item>
        <el-form-item label="入党时间">
          <el-input v-model="userinfo.jointime" disabled />
        </el-form-item>
        <el-form-item label="积分">
          <el-input v-model="userinfo.integral" disabled />
        </el-form-item>
      </el-form>
    </div>
    <div class="info" v-if="userinfo.user">
      <h3>积分详情</h3>
      <el-form
        label-position="right"
        label-width="100px"
        :model="userinfo"
        style="max-width: 560px; min-width: 460px"
      >
        <el-form-item label="排名">
          <el-input v-model="userinfo.rank" disabled />
        </el-form-item>
        <el-form-item label="积分相同人数">
          <el-input v-model="userinfo.equal" disabled />
        </el-form-item>
        <el-form-item label="超过人数(%)">
          <el-input v-model="userinfo.exceed" disabled />
        </el-form-item>
        <el-form-item label="用户总人数">
          <el-input v-model="userinfo.allnum" disabled />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.divcon {
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info {
  margin-bottom: 30px;
  h3 {
    margin: 20px;
  }
}
</style>