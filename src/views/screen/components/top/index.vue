<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome()"> 首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间 {{ time }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

let $router = useRouter();
let time = ref<string>(moment().format("YYYY年MM月DD日 hh:mm:ss"));
let timer = ref(0);

// 页面挂在完成，创建定时器
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format("YYYY年MM月DD日 hh:mm:ss");
  }, 1000);
});

// 组件销毁之前清楚定时器
onBeforeUnmount(() => {
  clearInterval(timer.value);
});

const goHome = () => {
  $router.push("/home");
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 40px;
  display: flex;
  .left {
    flex: 1.5;
    background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
    background-size: cover;

    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url("../../images/dataScreen-header-btn-bg-l.png") no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color: #29fcff;
      cursor: pointer;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url("../../images/dataScreen-header-center-bg.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
      letter-spacing: 15px;
    }
  }
  .right {
    flex: 1.5;
    background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rbtn {
      width: 150px;
      height: 40px;
      float: left;
      background: url("../../images/dataScreen-header-btn-bg-r.png") no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color: #29fcff;
      cursor: pointer;
    }
    .time {
      color: #29fcff;
      margin: 0 auto;
      font-size: 20px;
    }
  }
}
</style>
