<script lang="ts" setup>// @ts-nocheck
import storage from "../../localstorage/localstorage";
import { ref, reactive, onBeforeMount } from "vue";
import { getUsername } from "../../api/useradmin";
import { getechartspie } from "../../api/user";
import {
  getechartspie_useractiv,
  getechartspie_userage,
  getsexpie,
  getactivbar,
} from "../../api/admin";
import HomePie from "./HomePie.vue";
import HomeAdminPie from "./HomeAdminPie.vue";
import HomeBar from "./HomeBar.vue";
import HomeSex from "./HomeSex.vue";
import HomeActiv from "./HomeActiv.vue";
const value = ref(new Date());

let user = reactive({
  grade: "0",
  role: "高级管理员",
  name: "",
});
const pie = reactive({
  num: 0,
  join_num: 0,
  Percent: 0,
  result: false,
});
const barlist = reactive({
  list: [],
  result: false,
});
const sexdata = reactive({
  man: null,
  grol: null,
  result: false,
});
const activbar = reactive({
  year: new Date(),
  list: null,
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
      pie.result = true;
    });
  } else {
    getechartspie_useractiv().then((res) => {
      pie.Percent = res.data.pienum;
      pie.join_num = res.data.users_join_num;
      pie.num = res.data.activjoin_num;
      pie.result = true;
    });
  }
  // 年龄图数据
  getechartspie_userage().then((res) => {
    barlist.list = res.data;
    barlist.result = true;
  });
  //男女比例数据
  getsexpie().then((res) => {
    sexdata.man = res.man;
    sexdata.gril = res.gril;
    sexdata.result = true;
  });
  getactivbar_data(activbar.year.getFullYear())
});
const yearchange = () => {
  getactivbar_data(activbar.year.getFullYear())
}
const getactivbar_data = (year) => {
  activbar.result = false
  getactivbar({year: year}).then(res => {
    activbar.list = res.data
    activbar.result = true
  })
}
</script>

<template>
  <div class="con">
    <h3>欢迎{{ `${user.role}—${user.name}` }}登入</h3>
    <!-- 顶部展示数据 -->
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
        <HomePie
          v-if="pie.result"
          :num="pie.num"
          :join_num="pie.join_num"
        ></HomePie>
      </div>
    </div>
    <div class="piecon" v-else>
      <el-card class="box-card num">
        <p>活动总数</p>
        <el-icon><Flag /></el-icon>{{ pie.num }}
      </el-card>
      <el-card class="box-card join_num">
        <p>参加人次</p>
        <el-icon><Finished /></el-icon>{{ pie.join_num }}
      </el-card>
      <div class="pie">
        <HomeAdminPie
          v-if="pie.result"
          :num="pie.Percent"
          :allnum="100"
        ></HomeAdminPie>
      </div>
    </div>
    <!-- 年龄分部图、性别比例图 -->
    <div class="agebar" v-if="user.grade !== 3">
      <HomeBar v-if="barlist.result" :list="barlist.list"></HomeBar>
      <HomeSex
        v-if="sexdata.result"
        :man="sexdata.man"
        :gril="sexdata.gril"
      ></HomeSex>
    </div>
    <!-- 活动分布图 -->
    <div class="activbar year" v-if="user.grade !== 3">
      <h4>查看年份</h4>
      <el-date-picker
        v-model="activbar.year"
        type="year"
        @change="yearchange"
        placeholder="请选择查看的年份"
      />
    </div>
    <div class="activbar" v-if="user.grade !== 3">
      <HomeActiv v-if="activbar.result" :list="activbar.list" :year="activbar.year.getFullYear()"></HomeActiv>
    </div>
    <el-calendar v-model="value" class="date" />
    <el-backtop :right="20" :bottom="100" />
  </div>
</template>

<style lang="less" scoped>
.con {
  height: auto;
  display: flex;
  flex-direction: column;
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
  .agebar {
    display: flex;
    justify-content: center;
  }
  .activbar {
    display: flex;
    justify-content: center;
  }
  .year {
    margin-top: 20px;
    h4 {
      margin: 0px;
      line-height: 32px;
      margin-right: 10px;
    }
  }
}
</style>