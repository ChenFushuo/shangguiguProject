<template>
  <div class="age_box">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 图表容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

let charts = ref();
onMounted(() => {
  let myCharts = echarts.init(charts.value);
  let option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "center",
      right: "30",
      orient: "vertical", // 图例组件方向设置，默认水平
      textStyle: {
        color: "while",
        fontSize: "14px",
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#ccc",
          borderWidth: 1,
        },
        label: {
          show: true,
          position: "inside",
          color: "white",
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        left: "-30%",
      },
    ],
    // 调整图表位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  };
  myCharts.setOption(option);
});
</script>

<style lang="scss" scoped>
.age_box {
  width: 100%;
  height: 100%;
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: 260px;
  }
}
</style>
