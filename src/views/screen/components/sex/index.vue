<template>
  <div class="sex_box">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rateOrCharts">
      <div class="rate">
        <p>男士58%</p>
        <p>女士42%</p>
      </div>
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

let charts = ref();
onMounted(() => {
  let myCharts = echarts.init(charts.value);
  myCharts.setOption({
    title: {
      text: "男女比例图表",
      textStyle: {
        color: "skyblue",
      },
      left: "40%",
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      type: "category",
      show: false,
    },
    series: [
      {
        type: "bar",
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: "#3478f5",
          borderRadius: 20,
        },
      },
      {
        type: "bar",
        data: [100],
        barWidth: 20,
        barGap: "-100%",
        itemStyle: {
          color: "#ec5a7b",
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 0,
      right: 0,
    },
  });
});
</script>

<style lang="scss" scoped>
.sex_box {
  width: 100%;
  height: 100%;
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;

  .title {
    margin: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }
  .sex {
    display: flex;
    justify-content: center;
    .man {
      width: 111px;
      height: 115px;
      margin: 20px;
      background: url("../../images/man-bg.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .woman {
      width: 111px;
      height: 115px;
      margin: 20px;
      background: url("../../images/woman-bg.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rateOrCharts {
    width: 75%;
    margin: 0 auto;

    .rate {
      display: flex;
      justify-content: space-evenly;
      color: white;
    }
    .charts {
      margin-top: 10px;
      height: 100px;
    }
  }
}
</style>
