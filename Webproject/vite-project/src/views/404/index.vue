<script setup lang="ts">
import router from '../../router/index'
function Refresh() {
  location.reload()
}
function backhome() {
  router.push('/')
}
</script>

<template>
  <div class="notfound">
    <h1>
      <span class="left">404</span>
      <span class="mid">|</span>
      <span class="rig">抱歉啦, 页面走丢了</span>
    </h1>
    <div class="but">
      <el-button type="danger" round @click="backhome">回到首页</el-button>
      <el-button type="warning" round @click="Refresh">刷新</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.notfound {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 0.8rem;
    line-height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    span {
      margin: 0 10px;
    }
    .left {
      font-size: 1.5rem;
      color: rgb(70, 70, 70);
    }
    .mid {
      font-size: 1.5rem;
      color: rgb(178, 178, 178);
    }
    .rig {
      font-size: 0.8rem;
      color: rgb(97, 97, 97);
    }
  }
  .but {
    margin-top: 2rem;
  }
}
</style>
