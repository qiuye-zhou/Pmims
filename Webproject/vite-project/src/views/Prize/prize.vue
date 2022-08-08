<script lang="ts" setup>
import storage from "../../localstorage/localstorage";
import { ref, reactive, onBeforeMount } from "vue";
import { getawards, subprize } from "../../api/user";
import { Search } from "@element-plus/icons-vue";

const user = reactive({
  list: [],
  oldlist: [],
});
const userex = reactive({
  name: null,
  li: null,
  time: null,
});
const formLabelWidth = ref("140px");
let search = ref("");
let dialogFormVisible = ref(false);
onBeforeMount(() => {
  getawards({ id: storage.get("data").id })
    .then((res) => {
      if (res.code == 200) {
        user.list = res.data;
        for (const item of user.list) {
          item.aw_time = item.aw_time.slice(0, 10);
        }
        user.oldlist = user.list;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//查询
const user_search = () => {
  user.list = [];
  if (search.value == "") {
    user.list = user.oldlist;
  } else {
    for (const item of user.oldlist) {
      if (item.aw_name.indexOf(search.value) >= 0) {
        user.list.push(item);
      }
    }
  }
  search.value = "";
};
const subshow = () => {
  dialogFormVisible.value = true;
};
const hide_sub = () => {
  userex.name = null;
  userex.li = null;
  userex.time = null;
  dialogFormVisible.value = false;
};
const subapi = () => {
  subprize({
    id: storage.get("data").id,
    ex_name: userex.name,
    ex_li: userex.li,
    ex_time: userex.time,
  }).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: res.msg,
        type: "success",
      });
    } else {
      ElMessage.error(res.msg);
    }
  });
  dialogFormVisible.value = false;
};
</script>

<template>
  <div class="con">
    <div class="top">
      <el-input
        v-model="search"
        class="search"
        placeholder="请输入要查询的获奖信息..."
        :prefix-icon="Search"
        size="large"
      />
      <el-button type="primary" @click="user_search">查询</el-button>
      <el-button type="primary" @click="subshow">提交审核</el-button>
    </div>
    <el-table
      :data="user.list"
      :default-sort="{ prop: 'date', order: 'descending' }"
      empty-text="暂无获奖信息"
      style="width: 100%"
    >
      <el-table-column prop="aw_name" label="获奖项目名" />
      <el-table-column prop="aw_prize" label="所获奖项" />
      <el-table-column prop="aw_time" label="获奖时间" sortable />
    </el-table>
    <el-dialog
      v-model="dialogFormVisible"
      title="提交审核"
      @close="hide_sub"
      width="620px"
    >
      <el-form :model="userex">
        <el-form-item label="获奖名" :label-width="formLabelWidth">
          <el-input
            v-model="userex.name"
            autocomplete="off"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="奖项" :label-width="formLabelWidth">
          <el-input
            v-model="userex.li"
            autocomplete="off"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="获奖时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="userex.time"
            type="date"
            placeholder="选择日期"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="hide_sub">取消</el-button>
          <el-button type="primary" @click="subapi">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.con {
  padding: 20px;
  height: auto;
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
