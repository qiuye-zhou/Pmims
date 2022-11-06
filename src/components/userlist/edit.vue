<script lang="ts" setup>// @ts-nocheck
import { reactive, ref } from "vue";
defineProps<{
  dialogFormVisible?: boolean;
  id?: string;
  name?: string;
  password?: string;
  sex?: string;
  department?: string;
  jointime?: string;
  grade?: string;
}>();
const accuser = reactive({
  id: null,
  name: "",
  password: "",
  sex: "",
  department: "",
  jointime: "",
  grade: null,
});
const emit = defineEmits(["hide_edit", "subedit"]);
const hide_edit = () => {
  //调用父组件的方法显示活动详情
  emit("hide_edit");
};
const subedit = () => {
  console.log(accuser);
  emit("subedit");
};
const formLabelWidth = "140px";
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      title="修改用户信息"
      @close="hide_edit"
    >
      <el-form :model="accuser">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="accuser.id" :placeholder="id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input
            v-model="accuser.name"
            :placeholder="name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="accuser.password"
            :placeholder="password + '(密码长度大于5)'"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input
            v-model="accuser.sex"
            :placeholder="sex"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input
            v-model="accuser.department"
            :placeholder="department"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="入党时间" :label-width="formLabelWidth">
          <el-input
            v-model="accuser.jointime"
            :placeholder="jointime"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="权限等级" :label-width="formLabelWidth">
          <el-select
            v-model="accuser.grade"
            :placeholder="grade"
            placeholder="选择权限等级"
          >
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="hide_edit">取消</el-button>
          <el-button type="primary" @click="subedit">修改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 500px;
}
.el-input {
  width: 500px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>