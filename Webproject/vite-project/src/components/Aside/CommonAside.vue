<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  // Location,
  // Setting,
} from "@element-plus/icons-vue";
import router from "../../router/index";
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
  router.push({ path: keyPath[0] });
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

//store
import useMeunStore from '../../store/index'
const store = useMeunStore()

</script>

<template>
  <div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="/home"
      text-color="#fff"
      :collapse="store.isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <h5 class="title-aside">{{ !store.isCollapse ? '用户界面' : '界面' }}</h5>
      <el-menu-item index="/home">
        <el-icon><icon-menu /></el-icon>
        <span>Home</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>其他1</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><icon-menu /></el-icon>
        <span>其他2</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><icon-menu /></el-icon>
        <span>404</span>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
    </el-menu>
  </div>
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
