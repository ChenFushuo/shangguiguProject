<template>
  <div class="year_box">
    <div class="title">
      <p>年度游客量对比</p>
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
      text: "散点图",
      left: "40%",
      textStyle: {
        color: "white",
      },
    },
    xAxis: { type: "category", show: true },
    yAxis: { show: false },
    grid: {
      left: 40,
      right: 20,
      top: 60,
      bottom: 30,
    },
    series: [
      {
        type: "scatter",
        data: [100, 1000, 300, 400, 900, 200, 800, 260],
        symbol: "diamond",
        label: {
          show: true,
          position: "top",
          color: "cyan",
        },
        itemStyle: {
          color: "cyan",
          fontSize: "20px",
        },
      },
    ],
  };
  myCharts.setOption(option);
});
</script>

<style lang="scss" scoped>
.year_box {
  width: 100%;
  height: 100%;
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 0 5px 0;
  .title {
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
