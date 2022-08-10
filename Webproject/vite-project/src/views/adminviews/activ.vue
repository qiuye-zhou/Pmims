<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { Delete, Search, Edit } from "@element-plus/icons-vue";
import { getactiv_alldep, add_activ } from "../../api/admin";

let search = ref("");
let dialogFormVisible = ref(false);
const formLabelWidth = ref("120px");
const activlist = reactive({
  list: [],
  oldlist: [],
});
onMounted(() => {
  getactiv_alldep().then((res) => {
    console.log(res);
    //深拷贝防止出现odllist与list相同的情况
    activlist.list = JSON.parse(JSON.stringify(res.data));
    activlist.oldlist = JSON.parse(JSON.stringify(res.data));
    formatlist();
  });
});
const formatlist = () => {
  for (const item of activlist.list) {
    if (item.activ_result == 1) {
      item.activ_result = "已结束";
    } else {
      item.activ_result = "未结束";
    }
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
  forms.type = "add";
  dialogFormVisible.value = true;
};
//编辑活动框显示
const show_edit = (data) => {
  for (const item of activlist.oldlist) {
    if (item.activ_id == data.activ_id) {
      show_editres(item);
    }
  }

  forms.type = "edit";
  dialogFormVisible.value = true;
};
const show_editres = (data) => {
  forms.activ_name = data.activ_name;
  forms.activ_integral = data.activ_integral;
  forms.activ_time = data.activ_time;
  forms.activ_describe = data.activ_describe;
  forms.form = data.form;
};
const show_acres = () => {
  console.log("结束活动框显示");
};
const forms = reactive({
  type: null,
  activ_name: null,
  activ_integral: null,
  activ_time: null,
  activ_describe: null,
  form: null,
});
//发布活动提交
const ac_subapi = () => {
  if (
    forms.activ_name &&
    forms.activ_integral &&
    forms.activ_time &&
    forms.activ_describe &&
    forms.form
  ) {
    //api
    add_activapi()
    forms.activ_name = null;
    forms.activ_integral = null;
    forms.activ_time = null;
    forms.activ_describe = null;
    forms.form = null;
    dialogFormVisible.value = false;
  } else {
    ElMessage.error("请填完所有选项");
  }
};
const add_activapi = () => {
  add_activ({
      activ_name: forms.activ_name,
      activ_time: forms.activ_time,
      activ_integral: forms.activ_integral,
      activ_describe: forms.activ_describe,
      form: forms.form,
    })
    .then((res) => {
      if(res.code == 200) {
        ElMessage({
        message: res.msg,
         type: 'success',
         })
      } else {
        ElMessage.error(res.msg);
      }
    })
}
const hide_sub = () => {
  forms.activ_name = null;
  forms.activ_integral = null;
  forms.activ_time = null;
  forms.activ_describe = null;
  forms.form = null;
  dialogFormVisible.value = false;
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
        <el-table-column
          prop="activ_result"
          label="活动是否结束"
          sortable
          min-width="96px"
        />
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
              @click="show_edit(scope.row)"
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
    <!-- 审核提交框 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="forms.type == 'add' ? '发布活动' : '编辑活动'"
      width="520px"
      @close="hide_sub"
    >
      <el-form :model="forms">
        <el-form-item label="活动名" :label-width="formLabelWidth">
          <el-input
            v-model="forms.activ_name"
            autocomplete="off"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="积分" :label-width="formLabelWidth">
          <el-select v-model="forms.activ_integral" placeholder="请选择数值">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="forms.activ_time"
            type="date"
            placeholder="选择日期"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="活动简介" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="forms.activ_describe"
            autocomplete="off"
            style="width: 360px"
          />
        </el-form-item>
        <el-form-item label="活动详情" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="forms.form"
            autocomplete="off"
            style="width: 360px"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="ac_subapi">提交</el-button>
        </span>
      </template>
    </el-dialog>
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
