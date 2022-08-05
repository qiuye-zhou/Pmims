<script lang="ts" setup>
import ActivTable from "../../components/ActivList/index.vue";
import ActivDetails from "../../components/ActivList/ActivDetails.vue";
import { ref, reactive, onBeforeMount } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getactivity, getactivitywhole } from "../../api/user";
import storage from "../../localstorage/localstorage";
const activlist = reactive({
  list: [],
  userlist: [],
  activ: {},
  oldlist: [],
});
const search = ref("");
const ac_search = (search: string) => {
  //输入了内容才进行查询
  if (search.length > 0) {
    const reslist = [];
    for (const item of activlist.oldlist) {
      if (item.activ_name.indexOf(search) >= 0) {
        reslist.push(item);
      }
    }
    activlist.list = reslist;
  } else {
    activlist.list = activlist.oldlist;
  }
};
const showdetails = reactive({
  result: false,
  id: 0,
  userjoin: false,
});
const show_activ = (id: number) => {
  showdetails.id = id;
  showdetails.result = !showdetails.result;
  for (const x of activlist.list) {
    if (x.activ_id == showdetails.id) {
      showdetails.userjoin = x.userjoin;
    }
  }
  getactivitywhole({ activ_id: showdetails.id }).then((res) => {
    console.log(res);
    activlist.activ = res.data[0];
    activlist.activ.activ_time = activlist.activ.activ_time.slice(0, 10);
    console.log(activlist.activ);
  });
};
const hide_activ = () => {
  showdetails.result = !showdetails.result;
};
onBeforeMount(() => {
  getactivity({ id: storage.get("data").id })
    .then((res) => {
      activlist.list = res.data;
      activlist.userlist = res.details;
      for (const i of activlist.list) {
        i.activ_time = i.activ_time.slice(0, 10);
        for (const x of activlist.userlist) {
          if (x.activ_id == i.activ_id) {
            i.userjoin = true;
          } else i.userjoin = false;
        }
      }
      activlist.oldlist = activlist.list;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<template>
  <div class="activcon">
    <div class="searchcon">
      <el-input
        v-model="search"
        class="search"
        placeholder="请输入要搜索的活动名..."
        :prefix-icon="Search"
        size="large"
      />
      <el-button type="info" round @click="ac_search(search)">搜索</el-button>
    </div>
    <div class="container">
      <ActivTable
        v-for="item in activlist.list"
        :id="item.activ_id"
        :name="item.activ_name"
        :time="item.activ_time"
        :result="item.activ_result"
        :userjoin="item.userjoin"
        @show_activ="show_activ"
      ></ActivTable>
    </div>
    <ActivDetails
      v-show="showdetails.result"
      :id="showdetails.id"
      :userjoin="showdetails.userjoin"
      :activ="activlist.activ"
      @hide_activ="hide_activ"
    ></ActivDetails>
  </div>
</template>

<style lang="less" scoped>
.activcon {
  position: relative;
  height: auto;
  min-height: 600px;
  .searchcon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    .search {
      width: 300px;
      margin-right: 16px;
    }
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 10px;
    min-height: 600px;
  }
}
</style>