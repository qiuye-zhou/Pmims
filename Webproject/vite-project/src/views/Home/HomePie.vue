<script>
// 先引入echarts
import * as echarts from "echarts";
// vue3 引入对应功能
import { onMounted, ref } from "vue";

export default {
  props: ["num", "join_num"],
  setup(props) {
    // 声明chart1，使用ref赋值null
    const chart1 = ref(null);

    // 声明echarts函数
    const chart = () => {
      // 解决echarts在vue中切换到其他页面再返回来就不显示的问题
      chart1.value.setAttribute("_echarts_instance_", "");
      // 这里使用chart1.value的形式获取到dom节点
      let myChart = echarts.init(chart1.value);

      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "个人活动信息",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: props.join_num, name: "参加活动数量" },
              { value: props.num - props.join_num, name: "未参加的活动数" },
            ],
          },
        ],
      });
      // echarts 自适应，如果dom元素是自适应高宽，会随之改变echarts大小
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    };
    // 数据渲染完成后在这里挂载
    onMounted(() => {
      chart();
    });

    return {
      chart1,
    };
  },
};
</script>

<template>
  <div ref="chart1" class="char" style="width: 300px; height: 200px"></div>
</template>