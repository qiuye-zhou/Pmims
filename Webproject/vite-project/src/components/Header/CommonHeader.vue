<script lang="ts" setup>
import { reactive, toRefs } from "vue";
import router from '../../router/index'
import Tabs from '../Tabs/CommonTabs.vue'

//store
import useMeunStore from '../../store/meun'
const store = useMeunStore()
import storage from '../../localstorage/localstorage'
import useUserStore from "../../store/user";
const storeuser = useUserStore();

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
  storeuser.Data = null;
  storeuser.Token = null;
  storage.removeAll()
  router.push({ path: "/login" });
}
</script>

<template>
  <header>
    <div class="l-content">
      <el-icon :size="20" v-show="!store.isCollapse" @click="handleMenu" class="button-icon"><Fold /></el-icon>
      <el-icon :size="20" v-show="store.isCollapse" @click="handleMenu" class="button-icon"><Expand /></el-icon>
      <Tabs></Tabs>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar shape="square" :size="sizeList[1]" :src="squareUrl" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="gohome">个人信息</el-dropdown-item>
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