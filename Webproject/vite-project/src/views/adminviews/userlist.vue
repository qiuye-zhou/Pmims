<script lang="ts" setup>
import storage from "../../localstorage/localstorage";
import { reactive, ref, onMounted } from "vue";
import { getall_list, adduser_api } from "../../api/admin";
import { Plus, Delete, Search, Edit } from "@element-plus/icons-vue";
// import Commedit from "../../components/userlist/edit.vue";

const account = reactive({
  list: [],
  oldlist: [],
});
let search = ref("");
let dialogFormVisible = ref(false);
const accuser = reactive({
  id: null,
  name: "",
  number: "",
  password: "",
  sex: "",
  department: "",
  jointime: "",
  grade: null,
});
let type = ref("edit");
let gra = ref(false);
let dep = ref(false);
const formLabelWidth = "140px";
onMounted(() => {
  updata();
});
const updata = () => {
  getall_list().then((res) => {
    account.list = res.data;
    for (const item of account.list) {
      item.jointime = item.jointime.slice(0, 10);
    }
    account.oldlist = account.list;
  });
};
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
const remove = (id) => {
  console.log("remove", id);
  ElMessageBox.confirm("你确定要删除此账户?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      updata();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      });
    });
};
const adduser = () => {
  type.value = "add";
  dialogFormVisible.value = true;
};
const edit = (list) => {
  type.value = "edit";
  dialogFormVisible.value = true;
  accuser.id = list.id;
  accuser.name = list.name;
  accuser.password = list.password;
  accuser.sex = list.sex;
  accuser.department = list.department;
  accuser.jointime = list.jointime;
  accuser.grade = list.grade;
};
//edit
const subedit = () => {
  console.log(accuser);
  console.log(type.value);
  if (
    accuser.name &&
    accuser.sex &&
    accuser.department &&
    accuser.jointime &&
    accuser.grade
  ) {
    if (type.value == "edit") {
      if (accuser.password.length <= 5) {
        ElMessage.error("密码长度不能小于5！");
      } else {
        Reset();
        dialogFormVisible.value = false;
      }
    } else {
      if (
        !accuser.number ||
        !accuser.password ||
        accuser.number.length <= 5 ||
        accuser.password.length <= 5
      ) {
        ElMessage.error("账号或者密码长度不能小于5！");
      } else {
        adduser_api_fun();
        Reset();
        dialogFormVisible.value = false;
      }
    }
  } else {
    ElMessage.error("请填好所有的信息！");
  }
};
const adduser_api_fun = () => {
  adduser_api({
    number: accuser.number,
    password: accuser.password,
    grade: accuser.grade,
    name: accuser.name,
    sex: accuser.sex,
    department: accuser.department,
    jointime: accuser.jointime,
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
};
const hide_edit = () => {
  console.log("hide");
  Reset();
  dialogFormVisible.value = false;
};
const change = () => {
  if (accuser.grade != 3) {
    accuser.department = "管理员";
    gra.value = true;
  } else {
    gra.value = false;
  }
};
const changed = () => {
  if (accuser.department == "管理员") {
    accuser.grade = 1;
    dep.value = true;
  } else {
    dep.value = false;
  }
};
const Reset = () => {
  accuser.id = null;
  accuser.name = null;
  accuser.number = null;
  accuser.password = null;
  accuser.sex = null;
  accuser.department = null;
  accuser.jointime = null;
  accuser.grade = null;
};
</script>

<template>
  <div class="userlistcon">
    <div class="top">
      <el-input
        v-model="search"
        class="search"
        placeholder="请输入要查询的活动名..."
        :prefix-icon="Search"
        size="large"
      />
      <el-button type="primary" @click="ac_search">查询</el-button>
      <el-button type="primary" class="add" @click="adduser">添加</el-button>
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
            <el-button
              type="primary"
              :icon="Edit"
              circle
              @click.prevent="edit(scope.row)"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              class="danger"
              @click="remove(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        v-model="dialogFormVisible"
        :title="type == 'edit' ? '修改用户信息' : '添加账户'"
        @close="hide_edit"
      >
        <el-form :model="accuser">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="accuser.name" autocomplete="off" />
          </el-form-item>
          <el-form-item
            v-if="type == 'add'"
            label="账户"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="accuser.number"
              autocomplete="off"
              maxlength="12"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input
              v-model="accuser.password"
              autocomplete="off"
              maxlength="12"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select
              v-model="accuser.sex"
              placeholder="选择性别"
              :disabled="dep"
            >
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="部门"
            :label-width="formLabelWidth"
            @change="changed"
          >
            <el-input
              v-model="accuser.department"
              autocomplete="off"
              :disabled="gra"
            />
          </el-form-item>
          <el-form-item label="入党时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="accuser.jointime"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="权限等级" :label-width="formLabelWidth">
            <el-select
              v-model="accuser.grade"
              placeholder="选择权限等级"
              @change="change"
              :disabled="dep"
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
            <el-button type="primary" @click="subedit">{{
              type == "edit" ? "修改" : "提交"
            }}</el-button>
          </span>
        </template>
      </el-dialog>
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
