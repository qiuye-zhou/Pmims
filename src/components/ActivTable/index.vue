<script lang="ts" setup>// @ts-nocheck
defineProps<{
  name?: string,
  id?: string,
  time?: string,
  result?: string
}>()

const ac_details = (id: string) => {
    console.log(id);
}
const join_activ = (id: string) => {
    console.log(id);
}
</script>

<template>
  <div class="con">
    <h3>{{ name }}</h3>
    <div class="timetxt"><el-icon><Clock /></el-icon><p>活动开始时间：{{ time }}</p></div>
    <div class="btn">
        <div v-if="result == 0">
            <el-button type="primary" round @click="ac_details(id)">活动详情</el-button>
            <el-button type="success" round @click="join_activ(id)">参加活动</el-button>
        </div>
        <el-button v-if="result == 1" type="danger" round disabled>活动已结束</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    height: 200px;
    margin: 20px;
    border-radius: 2%;
    box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.2);
    h3 {
        color: rgb(120, 120, 120);
        text-align: center;
    }
    .timetxt {
        display: flex;
        justify-content: center;
        align-items: center;
        p {
            margin-left: 10px;
            color: rgb(121, 127, 131);
        }
    }
    .btn {
        margin: 10px;
        display: flex;
        justify-content: center;
    }
}
</style>