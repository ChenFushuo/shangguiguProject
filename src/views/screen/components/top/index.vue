<template>
  <div class="top">
    <div class="left">
      <span class="lbtn">首页</span>
    </div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 40px;
  display: flex;
  .left {
    flex: 1;
    background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
    background-size: cover;

    .lbtn {
      width: 100px;
      height: 40px;
      float: right;
    }
  }
  .center {
    flex: 2;
  }
  .right {
    flex: 1;
  }
}
</style>
