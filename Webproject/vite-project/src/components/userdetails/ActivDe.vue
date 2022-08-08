<script lang="ts" setup>
import { reactive, ref } from "vue";
import HomePie from "../../views/Home/HomePie.vue";
defineProps<{
  dialogTableVisible?: boolean;
  name?: string;
  num?: number;
  join_num?: number;
  result?: boolean;
}>();
const emit = defineEmits(["hide_ac"]);
const hide = () => {
  //调用父组件的方法显示活动详情
  emit("hide_ac");
};
</script>
<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      :title="`活动信息—(${name})`"
      @close="hide"
    >
      <div class="piecon">
        <el-card class="box-card num">
          <p>活动总数</p>
          <el-icon><Flag /></el-icon>{{ num }}
        </el-card>
        <el-card class="box-card join_num">
          <p>参加总数</p>
          <el-icon><Finished /></el-icon>{{ join_num }}
        </el-card>
        <div class="pie">
          <HomePie v-if="result" :num="num" :join_num="join_num"></HomePie>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="less">
.piecon {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .el-icon {
    margin-right: 10px;
  }
  .box-card {
    width: 100px;
    height: 100px;
    font-size: 26px;
    display: flex;
    justify-content: center;
    p {
      font-size: 10px;
    }
  }
  .pie {
    width: auto;
    height: auto;
  }
  .num {
    color: rgb(87, 87, 87);
  }
  .join_num {
    color: rgb(102, 165, 116);
  }
}
</style>
