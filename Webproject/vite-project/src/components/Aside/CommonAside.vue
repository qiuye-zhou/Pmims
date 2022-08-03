<script setup lang="ts">
import router from "../../router/index";
import storage from "../../localstorage/localstorage";
import { onBeforeMount, reactive, ref } from "vue";
import useMeunStore from "../../store/meun";
const store = useMeunStore();
import useUserStore from "../../store/user";
const storeuser = useUserStore();
import { user,admin,supadmin } from '../../config/routercon'
import { initmeun } from '../../util/asidemeun'

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
  router.push({ path: keyPath[0] });
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};

const clickmeun = (path: string) => {
  router.push({ path: path });
};

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
      <h5 class="title-aside">
        {{
          !store.isCollapse
            ? grade.grade == 3
              ? "用户界面"
              : "管理员界面"
            : "界面"
        }}
      </h5>
      <el-menu-item v-for="item in meun" :index="item.path" @click="clickmeun(item.name)">
        <el-icon><component :is="item.meta.icon"/></el-icon>
        <span>{{item.meta.title}}</span>
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
