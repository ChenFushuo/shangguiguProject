<template>
  <div class="line_box">
    <div class="title">
      <p>未来30天游客流量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
let line = ref();
onMounted(() => {
  let myCharts = echarts.init(line.value);
  let option = {
    title: {
      text: "访问量",
      color: "white",
      top: "10px",
    },
    xAxis: {
      type: "category",
      boundaryGap: false, // 两侧不留白
      splitLine: false,
      // 轴线
      axisLine: {
        show: true,
      },
      // 刻度
      axisTick: {
        show: true,
      },
      data: [
        "1日",
        "2日",
        "3日",
        "4日",
        "5日",
        "6日",
        "7日",
        "8日",
        "9日",
        "10日",
        "11日",
        "12日",
        "13日",
        "14日",
        "15日",
        "16日",
        "17日",
        "18日",
        "19日",
        "20日",
        "21日",
        "22日",
        "23日",
        "24日",
        "25日",
        "26日",
        "27日",
        "28日",
        "29日",
        "30日",
      ],
    },
    yAxis: {
      splitLine: false,
      // 轴线
      axisLine: {
        show: true,
      },
      // 刻度
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      right: 0,
      top: 50,
      bottom: 30,
    },
    series: [
      {
        type: "line",
        data: [
          100, 30, 200, 50, 420, 30, 328, 100, 30, 200, 50, 420, 30, 328, 100,
          30, 200, 50, 420, 30, 328, 100, 30, 200, 50, 420, 30, 328, 30, 328,
        ],
        // 平滑曲线配置
        smooth: true,
        // 区域样式填充
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgb(241, 176, 24)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "transparent", // 100% 处的颜色
              },
            ],
            global: false,
          },
        },
      },
    ],
  };
  myCharts.setOption(option);
});
</script>

<style lang="scss" scoped>
.line_box {
  width: 100%;
  height: 100%;
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 10px;
  .title {
    margin-left: 10px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 40px);
  }
}
</style>
