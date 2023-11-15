<template>
  <div class="box">
    <div class="main">
      <el-button class="btn" type="text" @click="goHome">首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter();
const goHome = () => {
  $router.push("/home");
};
</script>

<style scoped lang="scss">
.box {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  .main {
    position: absolute;
    width: 400px;
    height: 400px;
    background: url("../../assets/images/error_images/404.png") no-repeat;
    background-size: cover;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
    .btn {
      position: absolute;
      top: 120%;
      left: 45%;
    }
  }
}
</style>
