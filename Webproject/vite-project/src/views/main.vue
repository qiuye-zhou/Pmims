<script setup lang="ts">
import CommonAside from "../components/Aside/CommonAside.vue";
import CommonHeader from "../components/Header/CommonHeader.vue";
</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-aside width="auto" style="background-color: #545c64">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader></CommonHeader>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
* {
  margin: 0px;
  padding: 0px;
}
.el-header {
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 2px 0px;
}
.el-main {
  padding-top: 0;
}
</style>
