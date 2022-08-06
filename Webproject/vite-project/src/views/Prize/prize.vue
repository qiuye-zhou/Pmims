<script lang="ts" setup>
import storage from "../../localstorage/localstorage";
import { ref, reactive, onBeforeMount } from "vue";
import { getawards } from "../../api/user";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

interface Userlist {
  aw_time: string;
  aw_name: string;
  aw_prize: string;
}
const formatter = (row: Userlist, column: TableColumnCtx<Userlist>) => {
  return row.aw_prize;
};
let user = reactive({
  list: [],
});
onBeforeMount(() => {
  getawards({ id: storage.get("data").id })
    .then((res) => {
      if (res.code == 200) {
        user.list = res.data;
        for (const item of user.list) {
          item.aw_time = item.aw_time.slice(0, 10);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<template>
  <div class="con">
    <el-table
      :data="user.list"
      :default-sort="{ prop: 'date', order: 'descending' }"
      empty-text="暂无获奖信息"
      style="width: 100%"
    >
      <el-table-column prop="aw_time" label="获奖时间" sortable width="180" />
      <el-table-column prop="aw_name" label="获奖项目名" width="180" />
      <el-table-column
        prop="aw_prize"
        label="所获奖项"
        :formatter="formatter"
      />
    </el-table>
  </div>
</template>

<style lang="less" scoped>
.con {
  padding: 20px;
  height: auto;
  min-height: 600px;
}
</style>
