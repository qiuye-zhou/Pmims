<script lang="ts" setup>
import ActivTable from "../../components/ActivTable/index.vue";
import { ref, reactive, onBeforeMount } from "vue";
import { Search } from "@element-plus/icons-vue";
const activlist = reactive({
  list: [{ id: '1',name: "第一次运动会",time: '2022-03-03',result: '0' },{ id: '2',name: "第三次运动会",time: '2022-03-04',result: '1' }],
});
const search = ref("");
</script>

<template>
  <div class="activcon">
    <div class="searchcon">
      <el-input
        v-model="search"
        class="search"
        placeholder="请输入要搜索的活动名..."
        :prefix-icon="Search"
        size="large"
      />
      <el-button type="info" round>搜索</el-button>
    </div>
    <div class="container">
        <ActivTable v-for="item in activlist.list" :id="item.id" :name="item.name" :time="item.time" :result="item.result"></ActivTable>
    </div>
  </div>
</template>

<style lang="less" scoped>
.activcon {
  height: auto;
  min-height: 600px;
  .searchcon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    .search {
        width: 300px;
        margin-right: 16px;
    }
  }
  .container {
    display: flex;
    // justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 10px;
    min-height: 600px;
  }
}
</style>