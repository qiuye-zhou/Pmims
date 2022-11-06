<script lang="ts" setup>// @ts-nocheck
import { ref,reactive,onBeforeMount } from 'vue'
import router from '../../router/index'
import storage from "../../localstorage/localstorage";
import useMeunStore from "../../store/meun";
const store = useMeunStore();
import { initmeun } from '../../util/asidemeun'
import { user,admin,supadmin } from '../../config/routercon'

let grade = reactive({
  grade: "0",
});
let meun = {}
onBeforeMount(() => {
  grade.grade = storage.get("data").grade;
  if(grade.grade == 3) {
    initmeun(meun,user)
  } else {
    if(grade.grade == 2) {
      initmeun(meun,admin)
    } else {
      initmeun(meun,supadmin)
    }
  }
});
const tabclick = (pane: TabsPaneContext, ev: Event) => {
  if(router.options.history.location != pane.paneName) {
    router.push({path: '/'+pane.paneName})
  }
}
</script>
<template>
  <el-tabs
    :model-value="store.meunshow"
    type="card"
    class="demo-tabs"
    stretch
    @tab-click="tabclick"
  >
    <el-tab-pane
      v-for="item in meun"
      :key="item.name"
      :label="item.meta.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs > .el-tabs__header {
  margin-bottom: 0px;
}
</style>
