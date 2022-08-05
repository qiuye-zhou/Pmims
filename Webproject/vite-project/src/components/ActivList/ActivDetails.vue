<script lang="ts" setup>
defineProps<{
  id?: number;
  userjoin?: boolean;
}>();
const emit = defineEmits(["hide_activ"]);
const hide = () => {
  emit("hide_activ");
};
const join_activ = (id: number) => {
  console.log(id + "参加活动");
};
</script>

<template>
  <div class="con">
    <h3>{{ id }}</h3>
    <el-button class="hide" icon="CloseBold" circle @click="hide"></el-button>
    <el-button v-if="!userjoin" type="success" round @click="join_activ(id)">参加活动</el-button>
    <el-button v-if="userjoin" type="warning" round disabled>已参加</el-button>
  </div>
</template>

<style lang="less" scoped>
.con {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  top: 50%;
  left: 50%;
  backdrop-filter: blur(6px) saturate(1.8);
  transform: translate(-50%, -50%);
  width: 98%;
  height: 98%;
  .hide {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>