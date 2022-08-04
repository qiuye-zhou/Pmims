<script lang="ts" setup>
defineProps<{
  id?: string;
}>();
const emit = defineEmits(["hide_activ"]);
const hide = () => {
  emit("hide_activ");
};
const join_activ = (id: string) => {
  console.log(id + "参加活动");
};
</script>

<template>
  <div class="con">
    <h3>{{ id }}</h3>
    <el-button type="danger" round @click="hide">关闭</el-button>
    <el-button type="success" round @click="join_activ(id)">参加活动</el-button>
  </div>
</template>

<style lang="less" scoped>
.con {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 96%;
  height: 96%;
}
</style>