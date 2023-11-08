<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="sge"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"> </Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Couter class="couter"></Couter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Top from "./components/top/index.vue";

// 左侧三个相应子组件
import Tourist from "./components/tourist/index.vue";
import Sex from "./components/sex/index.vue";
import Age from "./components/age/index.vue";
// 中间两个组件
import Map from "./components/map/index.vue";
import Line from "./components/line/index.vue";
// 引入右侧三个子组件
import Rank from "./components/rank/index.vue";
import Year from "./components/year/index.vue";
import Couter from "./components/couter/index.vue";

let screen = ref();
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});
// 定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
}
//监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url("./images/bg.png") no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      height: 1040px;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .sge {
          flex: 1;
        }
      }
      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .rank {
          flex: 1.5;
        }
        .year {
          flex: 1;
        }
        .couter {
          flex: 1;
        }
      }
    }
  }
}
</style>
