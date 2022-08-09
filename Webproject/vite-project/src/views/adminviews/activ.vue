<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { Delete, Search, Edit } from "@element-plus/icons-vue";
import { getactiv_alldep } from "../../api/admin";

let search = ref("");
const activlist = reactive({
  list: [],
  oldlist: [],
});
onMounted(() => {
  getactiv_alldep().then((res) => {
    console.log(res);
    activlist.list = res.data;
    activlist.oldlist = res.data;
    formatlist();
  });
});
const formatlist = () => {
  for (const item of activlist.list) {
    if (item.form.length > 30) {
      item.form = item.form.slice(0, 30);
      item.form += "...";
    }
    if (item.activ_describe.length > 30) {
      item.activ_describe = item.activ_describe.slice(0, 30);
      item.activ_describe += "...";
    }
  }
};
//查询
const ac_search = () => {
  if (search.value == "") {
    activlist.list = activlist.oldlist;
  } else {
    activlist.list = [];
    for (const item of activlist.oldlist) {
      if (item.activ_name.indexOf(search.value) >= 0) {
        activlist.list.push(item);
      }
    }
  }
  search.value = "";
};
const addactiv_show = () => {
  console.log("addactiv_show");
};
const show_edit = () => {
  console.log("show_edit");
};
const show_acres = () => {
  console.log("show_acres");
};
</script>

<template>
  <div class="activcon">
    <div class="top">
      <el-input
        v-model="search"
        class="search"
        placeholder="请输入要查询的活动名..."
        :prefix-icon="Search"
        size="large"
      />
      <el-button type="primary" @click="ac_search">查询</el-button>
      <el-button type="primary" class="add" @click="addactiv_show"
        >发布活动</el-button
      >
      <el-tooltip content="必须活动时间结束后才能结束活动" placement="top">
        <el-button>关于结束活动</el-button>
      </el-tooltip>
    </div>
    <div>
      <el-table
        :data="activlist.list"
        height="500"
        style="width: 100%"
        empty-text="暂时无活动信息"
        :default-sort="{ prop: 'ex_time', order: 'descending' }"
      >
        <el-table-column prop="activ_id" label="Activ_ID" />
        <el-table-column prop="activ_name" label="活动名" min-width="100px" />
        <el-table-column prop="activ_integral" label="活动积分" />
        <el-table-column
          prop="activ_time"
          label="活动时间"
          min-width="110px"
          sortable
        />
        <el-table-column prop="activ_result" label="活动是否结束" />
        <el-table-column
          prop="activ_describe"
          label="活动简介"
          min-width="170px"
        />
        <el-table-column prop="form" label="活动详情" min-width="180px" />
        <el-table-column prop="activ_id" label="操作" min-width="140px">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Edit"
              size="small"
              @click="show_edit"
              circle
            />
            <el-button
              type="danger"
              class="danger"
              size="small"
              @click="show_acres"
              >结束活动</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="less" scoped>
.activcon {
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
