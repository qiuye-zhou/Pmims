<script setup lang="ts">
import {
  Document,Menu as IconMenu,Flag,HomeFilled,UserFilled,Management,
} from "@element-plus/icons-vue";
import router from "../../router/index";
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
  router.push({ path: keyPath[0] });
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};

const clickmeun = (path: string) => {
  router.push({ path: path })
}

//store
import useMeunStore from '../../store/meun'
const store = useMeunStore()

</script>

<template>
  <div>
    <el-menu
      active-text-color="#66b5fa"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      text-color="#fff"
      :default-active="store.meunshow"
      :collapse="store.isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <h5 class="title-aside">{{ !store.isCollapse ? '用户界面' : '界面' }}</h5>
      <el-menu-item index="home" @click="clickmeun('home')">
        <el-icon><HomeFilled /></el-icon>
        <span>主页</span>
      </el-menu-item>
      <el-menu-item index="activ" @click="clickmeun('activ')">
        <el-icon><Flag /></el-icon>
        <span>活动中心</span>
      </el-menu-item>
      <el-menu-item index="prize" @click="clickmeun('prize')">
        <el-icon><Management /></el-icon>
        <span>所获奖项</span>
      </el-menu-item>
      <el-menu-item index="user" @click="clickmeun('user')">
        <el-icon><UserFilled /></el-icon>
        <span>个人中心</span>
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
