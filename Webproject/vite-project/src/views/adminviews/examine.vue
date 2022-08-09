<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { reactive, ref, onMounted } from "vue";
import { getallex, exsub } from "../../api/admin";
onMounted(() => {
  get_ex();
});
let search = ref("");
const exlist = reactive({
  list: [],
  oldlist: [],
});
//所有用户审核信息列表
const get_ex = () => {
  getallex().then((res) => {
    exlist.list = res.data;
    exlist.oldlist = res.data;
  });
};
//查询
const user_search = () => {
  exlist.list = [];
  if (search.value == "") {
    exlist.list = exlist.oldlist;
  } else {
    for (const item of exlist.oldlist) {
      if (item.name.indexOf(search.value) >= 0) {
        exlist.list.push(item);
      }
    }
  }
  search.value = "";
};
//打开审核框
const ex_subshow = (data) => {
  form.id = data.id;
  form.name = data.name;
  form.ex_name = data.ex_name;
  form.ex_li = data.ex_li;
  form.ex_time = data.ex_time;
  dialogFormVisible.value = true;
};
//暂时不需要删除审核信息
// const ex_remove = () => {
//   console.log("ex_remove");
//   ElMessageBox.confirm(
//     "你确认要删除这个审核信息?",
//     "警告",
//     {
//       confirmButtonText: "确认",
//       cancelButtonText: "取消",
//       type: "warning",
//     }
//   )
//     .then(() => {
//       ElMessage({
//         type: "success",
//         message: "确认删除",
//       });
//     })
//     .catch(() => {
//       ElMessage({
//         type: "info",
//         message: "取消",
//       });
//     });
// };

let dialogFormVisible = ref(false);
const formLabelWidth = ref("120px");
let branch_result = ref(false);
const form = reactive({
  id: null,
  name: null,
  ex_name: null,
  ex_li: null,
  ex_time: null,
  branch: null,
  ex_result: null,
});
//提交审核
const ex_subapi = () => {
  if (form.ex_result) {
    if (form.ex_result == "通过") {
      if (form.branch) {
        //审核通过
        exsub_api();
        dialogFormVisible.value = false;
      } else {
        ElMessage.error("审核通过但是未选择分值");
      }
    } else {
      //审核拒绝
      exsub_api();
      dialogFormVisible.value = false;
    }
  } else {
    ElMessage.error("你未进行审核");
  }
};
const exsub_api = () => {
  exsub({
    id: form.id,
    ex_name: form.ex_name,
    ex_result: form.ex_result,
    ex_time: form.ex_time,
    ex_li: form.ex_li,
    branch: form.branch,
  }).then((res) => {
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: res.msg,
      });
    } else {
      ElMessage.error(res.msg);
    }
  });
};
const hide_sub = () => {
  form.ex_result = null;
  form.branch = null;
  dialogFormVisible.value = false;
};
const changed = () => {
  if (form.ex_result == "拒绝") {
    branch_result.value = true;
    form.branch = null;
  } else {
    branch_result.value = false;
  }
};
</script>

<template>
  <div class="userexamine">
    <!-- top部分 -->
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
    <!-- 列表 -->
    <el-table
      :data="exlist.list"
      :default-sort="{ prop: 'ex_time', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="ex_name" label="获奖名" min-width="110px" />
      <el-table-column prop="ex_li" label="奖项" />
      <el-table-column
        prop="ex_time"
        label="获奖时间"
        sortable
        min-width="110px"
      />
      <el-table-column
        prop="ex_result"
        label="审核状态"
        sortable
        min-width="110px"
      />
      <el-table-column prop="id" label="操作" min-width="120px">
        <template #default="scope">
          <el-button
            v-if="scope.row.ex_result === '待审核'"
            type="primary"
            size="small"
            @click="ex_subshow(scope.row)"
            >审核</el-button
          >
          <el-button v-else type="primary" size="small" disabled
            >已审核</el-button
          >
          <!-- <el-button type="danger" size="small" @click="ex_remove"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 审核提交框 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="审核"
      width="520px"
      @close="hide_sub"
    >
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            style="width: 220px"
            disabled
          />
        </el-form-item>
        <el-form-item label="获奖名" :label-width="formLabelWidth">
          <el-input
            v-model="form.ex_name"
            autocomplete="off"
            style="width: 220px"
            disabled
          />
        </el-form-item>
        <el-form-item label="积分" :label-width="formLabelWidth">
          <el-select
            v-model="form.branch"
            placeholder="请选择数值"
            :disabled="branch_result"
          >
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="审核" :label-width="formLabelWidth">
          <el-select
            v-model="form.ex_result"
            placeholder="待审核"
            @change="changed"
          >
            <el-option label="通过" value="通过" />
            <el-option label="拒绝" value="拒绝" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="ex_subapi">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.userexamine {
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

