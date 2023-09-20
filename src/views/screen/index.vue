<template>
  <div @click="goRoute">回去</div>
</template>

<script setup lang="ts">
// 获取路由器对象
import { useRouter } from "vue-router";
let $router = useRouter();

const goRoute = () => {
  $router.push("/");
};
</script>

<style lang="scss" scoped></style>
