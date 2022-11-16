<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps<{
    list?: any,
    activ_num?: number,
    join_num?: number
}>();
</script>
<template>
<div class="con-con">
    <el-table :data="list" empty-text="本月暂无参加活动信息" max-height="160px">
        <el-table-column type="index" width="100" />
        <el-table-column property="activ_name" label="活动名" />
        <el-table-column property="activ_time" label="活动时间" />
    </el-table>
    <div class="crid">
        <span>本月活动数</span>
        <span>{{ activ_num }}</span>
    </div>
    <div class="crid">
        <span>本月参加活动数</span>
        <span>{{ list!.length }}</span>
    </div>
</div>
</template>
<style lang="scss" scoped>
.con-con {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    .el-table {
        width: 70%;
        border-radius: 1%;
        box-shadow: 0 0 0.5rem 0.1rem rgb(89, 89, 89);
    }
    .crid {
        width: 20%;
        margin: 2% 10%;
        border-radius: 5%;
        box-shadow: 0 0 0.5rem 0.1rem rgb(89, 89, 89);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 0.6em;
        span {
            text-align: center;
        }
    }
}
</style>