<script lang="ts" setup>
import storage from "../../localstorage/localstorage";
import { reactive, ref, onMounted } from "vue";
import { getall_list } from "../../api/admin";
import { Plus, Delete, Search, Edit } from "@element-plus/icons-vue";

const account = reactive({
  list: [],
  oldlist: [],
});
let search = ref("");
onMounted(() => {
  getall_list().then((res) => {
    account.list = res.data;
    for (const item of account.list) {
      item.jointime = item.jointime.slice(0, 10);
    }
    account.oldlist = account.list;
    console.log(account.list);
  });
});
const ac_search = () => {
  if (search.value == "") {
    account.list = account.oldlist;
  } else {
    account.list = [];
    for (const item of account.oldlist) {
      if (item.name.indexOf(search.value) >= 0) {
        account.list.push(item);
      }
    }
  }
  search.value = "";
};
</script>

<template>
  <div class="userlistcon">
    <div class="top">
      <el-input
        v-model="search"
        class="search"
        placeholder="请输入要搜索的活动名..."
        :prefix-icon="Search"
        size="large"
      />
      <el-button type="primary" @click="ac_search">搜索</el-button>
      <el-button type="primary" class="add">添加</el-button>
      <el-tooltip
        content="3->普通用户权限; 2->普通管理员权限; 1->高级管理员权限;"
        placement="top"
      >
        <el-button>关于权限等级</el-button>
      </el-tooltip>
    </div>
    <div>
      <el-table :data="account.list" height="500" style="width: 100%">
        <el-table-column prop="number" label="账号" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="department" label="部门" />
        <el-table-column prop="jointime" label="入党时间" />
        <el-table-column prop="grade" label="权限等级" />
        <el-table-column prop="id" label="操作">
          <template #default="scope">
            <el-button type="primary" :icon="Edit" circle />
            <el-button type="danger" :icon="Delete" circle class="danger" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="less" scoped>
.userlistcon {
  padding: 20px;
  min-height: 600px;
  .top {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    .add {
      margin-right: 30px;
    }
    .search {
      width: 300px;
      margin-right: 16px;
    }
  }
}
.el-button + .el-button {
  margin-left: 10px;
}
</style>
