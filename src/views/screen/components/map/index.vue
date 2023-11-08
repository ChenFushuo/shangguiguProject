<template>
  <div class="map_box" ref="map">地图组件</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import chinaJSON from "./china.json";
let map = ref();

// 注册中国地图
echarts.registerMap("china", chinaJSON);
onMounted(() => {
  let myCharts = echarts.init(map.value);
  let option = {
    // 地图组件设置
    geo: [
      {
        map: "china",
        roam: true, // 鼠标缩放配置
        // 地图位置配置项
        left: 50,
        right: 100,
        top: 50,
        bottom: 50,
        // 文字设置
        label: {
          show: true,
          color: "#eee",
          fontSize: 14,
        },
        // 每一个多边形，地区的样式
        itemStyle: {
          border: 1,
          borderColor: "#ccc",
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#1a408f" },
              { offset: 1, color: "#071c46" },
            ],
            global: false,
          },
        },
        // 鼠标hover时，地图高亮的样式
        emphasis: {
          itemStyle: {
            color: "rgb(0, 187, 255)",
          },
        },
      },
    ],
    // 布局位置
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    series: [
      {
        type: "lines", // 航线系列
        data: [
          {
            coords: [
              [87.617733, 43.792818], // 终点
              [116.405285, 39.904989], // 起点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "#5b7cb6",
              width: 1,
              curveness: 0.2,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "#5b7cb6",
              width: 1,
              curveness: 0.2,
            },
          },
          {
            coords: [
              [101.778916, 36.623178], // 起点
              [113.665412, 34.757975], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "#5b7cb6",
              width: 1,
              curveness: 0.2,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "#5b7cb6",
              width: 1,
              curveness: 0.2,
            },
          },
          {
            coords: [
              [115.892151, 28.676493], // 终点
              [91.132212, 29.660361], // 起点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "#5b7cb6",
              width: 1,
              curveness: 0.2,
            },
          },
        ],
        // 特效配置
        effect: {
          show: true,
          symbol: "arrow",
          color: "#54039d",
          symbolSize: [10, 10],
        },
      },
    ],
  };
  myCharts.setOption(option);
});
</script>

<style lang="scss" scoped>
.map_box {
}
</style>
