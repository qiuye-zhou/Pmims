<script lang="ts" setup>
import { ArrowRight,Fold,Expand,ArrowDown  } from "@element-plus/icons-vue";
import { reactive, toRefs } from "vue";
import router from '../../router/index'

//store
import useMeunStore from '../../store/meun'
const store = useMeunStore()
import storage from '../../localstorage/localstorage'

const state = reactive({
  squareUrl:
    "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  sizeList: ["small", "", "large"] as const,
});

const { squareUrl, sizeList } = toRefs(state);

function handleMenu() {
  store.isCollapse = !store.isCollapse
}

function gohome() {
  router.push({ path: "/user" });
}
function logout() {
  router.push({ path: "/login" });
  store.Data = null;
  store.Token = null;
  storage.remove('token')
}
</script>

<template>
  <header>
    <div class="l-content">
      <el-icon :size="20" v-show="!store.isCollapse" @click="handleMenu" class="button-icon"><Fold /></el-icon>
      <el-icon :size="20" v-show="store.isCollapse" @click="handleMenu" class="button-icon"><Expand /></el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: 'home' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: 'activ' }">活动中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: 'prize' }">所获奖项</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: 'user' }">个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar shape="square" :size="sizeList[1]" :src="squareUrl" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="gohome">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .button-icon {
    margin-right: 20px;
    cursor: pointer;
  }
}
.r-content {
  margin-right: 30px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>