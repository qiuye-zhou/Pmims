<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { Delete, Search, Edit } from "@element-plus/icons-vue";
import {
  getactiv_alldep,
  add_activ,
  edit_activ,
  result_activ,
  getevlist,
  getjoinac_list,
} from "../../api/admin";
import ActivList from "../../components/adminactiv/ActivList.vue";
import ActivUserList from "../../components/adminactiv/ActivUserList.vue";
import ActivResult from '../../components/adminactiv/ActivResult.vue'
const showlist = ref(false);
const evaluatelist = reactive({
  list: [],
  name: null,
});
const hide_list = () => {
  evaluatelist.list = [];
  evaluatelist.name = null;
  showlist.value = false;
};
const show_ex = (data) => {
  getevlist({
    activ_id: data.activ_id,
  }).then((res) => {
    evaluatelist.list = res.data;
    for (const item of evaluatelist.list) {
      if (item.deta_evaluation == "") {
        item.deta_evaluation = "未评价";
      }
    }
  });
  evaluatelist.name = data.activ_name;
  showlist.value = true;
};

let search = ref("");
let dialogFormVisible = ref(false);
const formLabelWidth = ref("130px");
const activlist = reactive({
  list: [],
  oldlist: [],
});
onMounted(() => {
  getactiv_alldep().then((res) => {
    //深拷贝防止出现odllist与list相同的情况
    activlist.list = JSON.parse(JSON.stringify(res.data));
    activlist.oldlist = JSON.parse(JSON.stringify(res.data));
    formatlist();
  });
});
//数据处理
const formatlist = () => {
  for (const item of activlist.list) {
    if (item.file == 0) {
      item.file = "否";
    } else {
      item.file = "是";
    }
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
  forms.type = "add";
  dialogFormVisible.value = true;
};
//编辑活动框显示
const show_edit = (data) => {
  forms.activ_id = data.activ_id;
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
//结束活动部分逻辑
const activ_result_show = reactive({
  result: false,
  ac_name: null,
  list: null,
  file: false,
  ac_inte: null,
})
const res_ac_btn = ref(false)
const show_acres = (data) => {
  const date = new Date(data.activ_time);
  const newdate = new Date();
  if (newdate > date) {
    //结束活动逻辑
    activ_result_show.result = true
    activ_result_show.file = data.file == '否' ? false : true
    activ_result_show.ac_name = data.activ_name
    activ_result_show.ac_inte = data.activ_integral
    activ_result_show.ac_time = data.activ_time
    getjoinac_list({ activ_id: data.activ_id }).then((res) => {
      activ_result_show.list = res.data;
      activ_result_show.list.forEach(e => {
        e.add_inte = 0
        if(!activ_result_show.file) e.add_inte = '未参加'
      });
    });
  } else {
    ElMessage.error("活动时间未过");
  }
};
const hide_activ_result = () => {
  activ_result_show.result = false
}
const sub_ac_res = () => {
  res_ac_btn.value = true
  activ_result_show.list.forEach(e => {
    if(!activ_result_show.file) e.add_inte = e.add_inte == '未参加' ? 0 : activ_result_show.ac_inte
  })
  //提交活动结束所需要的数据列表
  let sub_list = []
  activ_result_show.list.forEach((e,i) => {
    let obj_user = {
      id : e.id,
      activ_id : e.activ_id,
      add_inte : e.add_inte
    }
    sub_list.push(obj_user)
  })
  result_activ({
    activ_id: sub_list[0].activ_id,
    activ_time: activ_result_show.ac_time,
    list: sub_list,
  }).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: res.msg,
        type: "success",
      });
    } else {
      ElMessage.error(res.msg);
    }
    setTimeout(() => location.reload(), 3000);
  }).catch((err) => {
    setTimeout(() => location.reload(), 3000);
  });
}
//————
const forms = reactive({
  type: null,
  activ_name: null,
  activ_integral: null,
  activ_time: null,
  activ_describe: null,
  form: null,
  activ_id: null,
  file: null,
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
    if (forms.type == "add") {
      if (forms.file) {
        add_activapi();
        formsclear();
      } else {
        ElMessage.error("请填完所有选项");
      }
    }
    if (forms.type == "edit") {
      edit_activapi();
      formsclear();
    }
  } else {
    ElMessage.error("请填完所有选项");
  }
};
//提交清除关闭
const formsclear = () => {
  forms.activ_name = null;
  forms.activ_integral = null;
  forms.activ_time = null;
  forms.activ_describe = null;
  forms.form = null;
  forms.file = null;
  dialogFormVisible.value = false;
  setTimeout(() => location.reload(), 3000);
};
const add_activapi = () => {
  add_activ({
    activ_name: forms.activ_name,
    activ_time: forms.activ_time,
    activ_integral: forms.activ_integral,
    activ_describe: forms.activ_describe,
    form: forms.form,
    file: forms.file,
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
const edit_activapi = () => {
  edit_activ({
    activ_id: forms.activ_id,
    activ_name: forms.activ_name,
    activ_time: forms.activ_time,
    activ_integral: forms.activ_integral,
    activ_describe: forms.activ_describe,
    form: forms.form,
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
const hide_sub = () => {
  forms.activ_name = null;
  forms.activ_integral = null;
  forms.activ_time = null;
  forms.activ_describe = null;
  forms.form = null;
  (forms.activ_id = null), (dialogFormVisible.value = false);
};
const acuserlist = reactive({
  list: null,
  name: null,
  result: false,
  fileres: null,
});
const show_userlist = (data) => {
  //api
  getjoinac_list({ activ_id: data.activ_id }).then((res) => {
    acuserlist.list = res.data;
    acuserlist.list.forEach(e => {
      e.activ_name = data.activ_name
    });
  });
  acuserlist.fileres = data.file == "否" ? false : true;
  acuserlist.name = data.activ_name;
  acuserlist.result = true;
};
const hide_userlist = () => {
  acuserlist.list = [];
  acuserlist.name = null;
  acuserlist.result = false;
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
        <el-table-column prop="activ_name" label="活动名" min-width="80px" />
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
        <el-table-column prop="form" label="活动详情" min-width="160px" />
        <el-table-column prop="file" label="提交文件" />
        <el-table-column prop="activ_id" label="操作" min-width="200px">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Edit"
              size="small"
              @click="show_edit(scope.row)"
              circle
            />
            <el-button
              v-if="scope.row.activ_result == '未结束'"
              :disabled="res_ac_btn"
              type="danger"
              class="danger"
              size="small"
              @click="show_acres(scope.row)"
              >结束活动</el-button
            >
            <el-button
              v-else
              type="warning"
              class="danger"
              size="small"
              @click="show_ex(scope.row)"
              >评价Info</el-button
            >
            <el-button
              type="info"
              class="danger"
              size="small"
              @click="show_userlist(scope.row)"
              >参与Info</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 审核提交框 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="forms.type == 'add' ? '发布活动' : '编辑活动'"
      width="920px"
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
          />
        </el-form-item>
        <el-form-item label="活动详情" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="forms.form" autocomplete="off" />
        </el-form-item>
        <el-form-item
          v-if="forms.type == 'add'"
          label="是否需要提交文件"
          :label-width="formLabelWidth"
        >
          <el-select v-model="forms.file" placeholder="请选择是否需要提交文件">
            <el-option label="否" value="0" />
            <el-option label="是" value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="ac_subapi">提交</el-button>
        </span>
      </template>
    </el-dialog>
    <ActivList
      :showlist="showlist"
      @hide_list="hide_list"
      :name="evaluatelist.name"
      :list="evaluatelist.list"
    />
    <ActivUserList
      :showlist="acuserlist.result"
      @hide_userlist="hide_userlist"
      :name="acuserlist.name"
      :list="acuserlist.list"
      :fileres="acuserlist.fileres"
    />
    <ActivResult 
      :showlist="activ_result_show.result"
      :ac_name="activ_result_show.ac_name"
      @hide_activ_result="hide_activ_result"
      :list="activ_result_show.list"
      :fileres="activ_result_show.file"
      :ac_inte="activ_result_show.ac_inte"
      @sub_ac_res="sub_ac_res"
    />
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
