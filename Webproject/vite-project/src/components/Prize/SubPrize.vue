<script lang="ts" setup>
import { reactive, ref } from "vue";
import HomePie from "../../views/Home/HomePie.vue";
defineProps<{
  dialogTableVisible?: boolean;
}>();
const emit = defineEmits(["hide_sub"]);
const hide = () => {
  //调用父组件的方法显示活动详情
  emit("hide_sub");
};
</script>
<template>
  <div>
    <el-dialog v-model="dialogTableVisible" :title="`提交审核`" @close="hide">
        sub
    </el-dialog>
  </div>
</template>

<style lang="less">
</style>
