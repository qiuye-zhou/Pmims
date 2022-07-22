<script setup lang="ts">
import CommonAside from '../components/Aside/CommonAside.vue'
import CommonHeader from '../components/Header/CommonHeader.vue'
</script>

<template>
  <div class="common-layout">
    <el-container  style="height: 100%">
      <el-aside width="200px">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader></CommonHeader>
        </el-header>
        <el-main>Main<router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
*{
  margin: 0px;
  padding: 0px;
}
</style>
