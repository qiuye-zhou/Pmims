<script>
// 先引入echarts
import * as echarts from "echarts";
// vue3 引入对应功能
import { onMounted, ref } from "vue";

export default {
  props: ["list"],
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
          text: "用户年龄发布图",
        //   subtext: "小标题",
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
            data: ["18以下", "19-26", "27-38", "39-52", "53-72", "72以上"],
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
            name: "人数",
            type: "bar",
            barWidth: "60%",
            data: [
              props.list.a18,
              props.list.b26,
              props.list.c38,
              props.list.d52,
              props.list.e72,
              props.list.fmax,
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
  <div ref="chart1" class="char" style="width: 1000px; height: 300px"></div>
</template>