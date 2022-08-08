<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { reactive, ref, onMounted } from "vue";
import { getuser_list } from "../../api/admin";
const getuserlist = () => {
  getuser_list().then((res) => {
    userlist.list = res.data;
    userlist.oldlist = res.data;
    console.log(userlist.list);
  });
};
onMounted(() => {
  getuserlist();
});
let search = ref("");
const userlist = reactive({
  list: [],
  oldlist: [],
});
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
        placeholder="请输入要查询的活动名..."
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
      <el-table-column prop="jointime" label="入党时间" sortable />
      <el-table-column prop="department" label="部门" />
      <el-table-column prop="id" label="操作" min-width="120px">
        <template #default="scope">
          <el-button type="primary" size="small">活动信息</el-button>
          <el-button type="primary" size="small">审核信息</el-button>
        </template>
      </el-table-column>
    </el-table>
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
