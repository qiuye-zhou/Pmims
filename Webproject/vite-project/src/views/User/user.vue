<script lang="ts" setup>
import { onMounted } from 'vue'
import { getUser } from '../../api/user'
import storage from '../../localstorage/localstorage'
onMounted(() => {
    const id = storage.get('data').id
    getUser({
        id: id
    }).then(res => {
        if(res.code == 200) {
            if(res.data.length > 0) {
                // console.log(res.data);
            } else  {
                console.error('用户不存在');
            }
        } else {
            console.log('出现错误');
        }
    }).catch(err => {
        console.log(err);
    })
})
</script>

<template>
    <div>
        user
    </div>
</template>

<style lang="less" scoped>
div {
    border: 1px solid red;
    height: 500px;
}
</style>