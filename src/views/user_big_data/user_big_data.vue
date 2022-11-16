<script lang="ts" setup>import { onMounted, reactive, ref } from 'vue';
import { baseURL } from '../../config/request';
import storage from '../../localstorage/localstorage';
import { getPerInfo, getactivjoinbar } from '../../api/bigData'
import HomeActiv from "./each/Activ.vue";
import { getactivbar } from "../../api/admin";
import rightDom from './rightDom/index.vue'

const userInfo = reactive({
    name: '',
    department: '',
    sex: '',
    integral: 0,
    userjoin: 0,
    rightDomList: [],
    month_activ_num: 0,
})

const avatarurl = ref(`${baseURL}/head_image/user_img${storage.get('data').id}.png`)
onMounted(() => {
    getPerInfo({ id: storage.get('data').id }).then(res => {
        console.log(res)
        Object.keys(res.data[0]).forEach((e: string) => {
            // @ts-ignore
            userInfo[e] = res.data[0][e]
        })
        userInfo.userjoin = res.data.userjoin
        userInfo.month_activ_num = res.data.month_activ_num
        userInfo.rightDomList = res.data.month_activ_join
    })
    // 检查头像是否存在
    let imgObj = new Image();
    imgObj.src = `${baseURL}/head_image/user_img${storage.get('data').id}.png`;
    if (imgObj.width == 0) {
        avatarurl.value = `${baseURL}/head_image/user_img${storage.get('data').id}.jpg`
   }
   // 活动分布图获取数据
   getactivbar_data(activbar.year.getFullYear())
})
// 活动分布图
const activbar = reactive({
  year: new Date(),
  list: null,
  result: false,
  listright: null,
  resultright: false,
});
const getactivbar_data = (year: any) => {
  activbar.result = false
  getactivbar({year: year}).then(res => {
    activbar.list = res.data
    activbar.result = true
  })
  getactivjoinbar({ year: year, id: storage.get('data').id }).then(res => {
    activbar.listright = res.data
    activbar.resultright = true
  })
}
</script>
<template>
    <div class="con">
        <div class="top">
            <h1>活动参与数据概览</h1>
        </div>
        <div class="midcon">
            <div class="bottomCon">
                <div class="leftdiv">
                    <rightDom :activ_num="userInfo.month_activ_num" :list="userInfo.rightDomList" />
                </div>
                <div class="leftdiv">
                        <div class="activbar">
                            <HomeActiv v-if="activbar.result" :list="activbar.list" :title="'活动分布图'" :year="activbar.year.getFullYear()"></HomeActiv>
                        </div>
                </div>
            </div>
            <div class="bottomCon mid">
                <div class="mid_con">
                    <div class="rad">
                        <span class="title">活动参与率</span>
                        <span>{{ `${userInfo.userjoin}%` }}</span>
                    </div>
                </div>
                <div class="mid_con">
                    <el-avatar shape="square" :size="160" fit="cover" :src="avatarurl" />
                </div>
                <div class="mid_con">
                    <div class="bottom_info">
                        <span>{{ userInfo.department }}</span>
                        <span class="weg">{{ userInfo.name }}</span>
                        <span>{{ userInfo.sex }}</span>
                    </div>
                </div>
            </div>
            <div class="bottomCon">
                <div class="leftdiv">
                    <rightDom :activ_num="userInfo.month_activ_num" :list="userInfo.rightDomList" />
                </div>
                <div class="leftdiv">
                    <div class="activbar">
                        <HomeActiv v-if="activbar.resultright" :list="activbar.listright" :title="'用户参与活动分布图'" :year="activbar.year.getFullYear()"></HomeActiv>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.con {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .top {
        user-select: none;
        text-align: center;
        height: 10%;
        color: rgb(31, 169, 255);
    }
    .midcon {
        height: 90%;
        width: 100%;
        display: flex;
        .bottomCon {
            height: 100%;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .leftdiv {
                width: 100%;
                flex-grow: 1;
            }
        }
        .mid {
            .mid_con {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-grow: 1;
                .rad {
                    .title {
                        font-size: larger;
                    }
                    user-select: none;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 3rem;
                    width: 8rem;
                    border-radius: 6%;
                    box-shadow: 0 0 0.8rem 0.2rem rgb(154, 155, 155);
                }
            }
        }
        .bottom_info {
            user-select: none;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                margin: 0 1rem;
                color: rgb(173, 173, 174);
                font-size: large;
                padding: 0.5rem;
                border-radius: 10%;
                box-shadow: 0 0 0.3rem 0.1rem rgb(177, 191, 194);
            }
            .weg {
                font-weight: 900;
                color: rgb(95, 98, 100);
            }
        }
    }
}
.activbar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>