<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { reactive, ref, onMounted } from "vue";
import { getuser_list, getexlist } from "../../api/admin";
import { getechartspie } from "../../api/user";
import Examine from "../../components/userdetails/Examine.vue";
import HomePie from "../../views/Home/HomePie.vue";
const getuserlist = () => {
  getuser_list().then((res) => {
    userlist.list = res.data;
    userlist.oldlist = res.data;
  });
};
onMounted(() => {
  getuserlist();
});
let search = ref("");
let ActivDeshow = ref(false);
let Examineeshow = ref(false);
const userone = reactive({
  name: null,
  id: null,
  num: null,
  join_num: null,
  result: false,
});
const userex = reactive({
  name: null,
  id: null,
  list: [],
});
const hide_ex = () => {
  Examineeshow.value = false;
};
const show_ex = (data) => {
  userex.name = data.name;
  userex.id = data.id;
  get_ex();
};
const hide_ac = () => {
  ActivDeshow.value = false;
  userone.result = false;
};
const show_ac = (data) => {
  userone.name = data.name;
  userone.id = data.id;
  getpie();
  ActivDeshow.value = true;
};
const userlist = reactive({
  list: [],
  oldlist: [],
});
//pie数据获取
const getpie = () => {
  getechartspie({ id: userone.id }).then((res) => {
    userone.num = res.data.active_num;
    userone.join_num = res.data.join_num;
    userone.result = true;
  });
};
//用户审核信息列表
const get_ex = () => {
  getexlist({ id: userex.id }).then((res) => {
    userex.list = res.data;
    Examineeshow.value = true;
  });
};
//查询
const user_search = () => {
  userlist.list = [];
  if (search.value == "") {
    userlist.list = userlist.oldlist;
  } else {
    for (const item of userlist.oldlist) {
      if (item.name.indexOf(search.value) >= 0) {
        userlist.list.push(item);
      }
    }
  }
  search.value = "";
};
</script>

<template>
  <div class="userdetacon">
    <div class="top">
      <el-input
        v-model="search"
        class="search"
        placeholder="请输入要查询的姓名..."
        :prefix-icon="Search"
        size="large"
      />
      <el-button type="primary" @click="user_search">查询</el-button>
    </div>
    <el-table
      :data="userlist.list"
      :default-sort="{ prop: 'jointime', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="integral" label="积分" sortable />
      <el-table-column prop="jointime" label="入党时间" sortable min-width="110px" />
      <el-table-column prop="department" label="部门" />
      <el-table-column prop="id" label="操作" min-width="180px">
        <template #default="scope">
          <el-button type="primary" size="small" @click="show_ac(scope.row)"
            >活动信息</el-button
          >
          <el-button type="primary" size="small" @click="show_ex(scope.row)"
            >审核信息</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <ActivDe
      :dialogTableVisible="ActivDeshow"
      :name="userone.name"
      :num="userone.num"
      :join_num="userone.join_num"
      :result="userone.result"
      @hide_ac="hide_ac"
    ></ActivDe>
    <Examine
      :dialogTableVisible="Examineeshow"
      :name="userex.name"
      :list="userex.list"
      @hide_ex="hide_ex"
    ></Examine>
  </div>
</template>

<style lang="less" scoped>
.userdetacon {
  padding: 20px;
  min-height: 600px;
  .top {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    .search {
      width: 300px;
      margin-right: 16px;
    }
  }
}
</style>
