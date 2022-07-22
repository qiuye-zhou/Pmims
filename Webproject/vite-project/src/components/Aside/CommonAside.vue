<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="1"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <h5 class="title-aside">用户界面</h5>
    <el-menu-item index="1">
      <el-icon><icon-menu /></el-icon>
      <span>Home</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>其他</span>
      </template>
      <el-menu-item index="2-1">item</el-menu-item>
      <el-menu-item index="2-2">item</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">
      <el-icon><icon-menu /></el-icon>
      <span>其他2</span>
    </el-menu-item>
    <el-menu-item index="4" disabled>
      <el-icon><document /></el-icon>
      <span>Navigator Three</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="less" scoped>
.title-aside {
  margin: 0px;
  text-align: center;
  font-size: 1rem;
  color: #ffffff;
  padding: 20px 0px;
}
</style>
