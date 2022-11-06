<script setup lang="ts">// @ts-nocheck
import useMainStore from '../store/index'
// import {
//   Check,
//   Delete,
//   Edit,
//   Message,
//   Search,
//   Star,
// } from '@element-plus/icons-vue'

const store = useMainStore()

function handleClick() {
  store.count++
}
</script>

<template>
  <h1>home</h1>
  <h2>{{ store.count }}</h2>
  <button @click="handleClick">count++</button>
  <el-button type="primary">Primary</el-button>
</template>

<style scoped>
</style>
