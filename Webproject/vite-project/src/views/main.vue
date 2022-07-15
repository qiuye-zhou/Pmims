<script setup lang="ts">
import useMainStore from '../store/index'

const store = useMainStore()
</script>

<template>
  <h1>main</h1>
  <h1>{{ store.count }}</h1>
</template>

<style scoped>
</style>
