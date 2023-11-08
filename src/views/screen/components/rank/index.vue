<template>
  <div class="rank_box">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
let charts = ref();

onMounted(() => {
  let myCharts = echarts.init(charts.value);
  let option = {
    title: {
      text: "景区排行",
      left: "50%",
      textStyle: {
        color: "white",
        fontSize: "20px",
      },
      subtext: "各大景区排行",
      subtextStyle: {
        color: "white",
        fontSize: "16px",
      },
    },
    xAxis: {
      type: "category",
    },
    yAxis: {},
    grid: {
      left: 30,
      right: 10,
      top: 100,
      bottom: 30,
    },
    series: [
      {
        type: "bar",
        data: [10, 50, 20, 60, 15, 70, 20],
        // 图形上的文本标签
        label: {
          show: true,
          position: "top", // 文字的位置
          color: "white",
        },
        showBackground: true,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "black" },
              { offset: 1, color: "blue" },
            ],
            global: false,
          },
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        type: "bar",
        data: [10, 50, 20, 60, 15, 70, 20],
        // 图形上的文本标签
        label: {
          show: true,
          position: "top", // 文字的位置
          color: "white",
        },
        showBackground: true,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "black" },
              { offset: 1, color: "blue" },
            ],
            global: false,
          },
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        type: "line",
        data: [10, 50, 20, 60, 15, 70, 20],
        smooth: true,
      },
    ],
  };
  myCharts.setOption(option);
});
</script>

<style lang="scss" scoped>
.rank_box {
  width: 100%;
  height: 100%;
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin: 10px;
  .title {
    margin-left: 5px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 30px);
  }
}
</style>
