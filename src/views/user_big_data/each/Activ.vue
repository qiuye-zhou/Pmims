<script>
// 先引入echarts
import * as echarts from "echarts";
// vue3 引入对应功能
import { onMounted, ref } from "vue";

export default {
  props: ["list","year","title"],
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
        title: {
          text: props.title,
          subtext: props.year+props.title,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "活动数量",
            type: "bar",
            barWidth: "60%",
            data: [
              props.list.y1,
              props.list.y2,
              props.list.y3,
              props.list.y4,
              props.list.y5,
              props.list.y6,
              props.list.y7,
              props.list.y8,
              props.list.y9,
              props.list.y10,
              props.list.y11,
              props.list.y12,
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
  <div ref="chart1" class="char" style="width: 400px; height: 220px"></div>
</template>