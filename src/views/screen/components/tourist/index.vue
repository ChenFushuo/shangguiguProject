<template>
  <div class="box">
    <div class="top">
      <div>
        <p class="title">实时游客统计</p>
        <p class="bg"></p>
      </div>
      <p class="right">可预约总量<span>100000</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- echarts展示图形图表区域 -->
    <div class="charts" ref="charts">123</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill"; // 水球图 echarts拓展插件

let people = ref<string>("216908人");
let charts = ref();
onMounted(() => {
  // 获取echarts类实例
  let myCharts = echarts.init(charts.value);
  myCharts.setOption({
    // 标题配置
    title: {
      text: "水球图",
    },
    // 系列：决定展示什么样的图形图表
    series: {
      type: "liquidFill",
      radius: "80%",
      data: [0.4, 0.35, 0.3],
      waveAnimation: true,
      animationDuration: 3,
      animationDurationUpdate: 0,
      label: {
        position: ["50%", "40%"],
        formatter: function () {
          return "预约量";
        },
        fontSize: 30,
        fontWeight: 400,
      },
    },
  });
});
</script>

<style lang="scss" scoped>
.box {
  margin-top: 10px;
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 0;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url("../../images/dataScreen-title.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    width: 100%;
    padding: 0 20px;
    margin-top: 40px;
    display: flex;
    span {
      flex: 1;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: url("../../images/total.png") no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-weight: 500;
    }
  }
  .charts {
    width: 100%;
    height: 200px;
  }
}
</style>
