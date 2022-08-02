<script lang="ts" setup>
import { ref } from 'vue'
import router from '../../router/index'
import useMeunStore from "../../store/meun";
const store = useMeunStore();

const editableTabs = ref([
  {
    title: '主页',
    name: '/home',
  },
  {
    title: '活动中心',
    name: '/activ',
  },
  {
    title: '所获奖项',
    name: '/prize',
  },
  {
    title: '个人信息',
    name: '/user',
  },
])

const tabclick = (pane: TabsPaneContext, ev: Event) => {
  if(router.options.history.location != pane.paneName) {
    router.push({path: pane.paneName})
  }
}
</script>
<template>
  <el-tabs
    :model-value="'/'+store.meunshow"
    type="card"
    class="demo-tabs"
    stretch
    @tab-click="tabclick"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
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
