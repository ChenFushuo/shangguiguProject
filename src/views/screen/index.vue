<template>
  <el-button @click="goBack">返回</el-button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter();

const goBack = () => {
  $router.go(-1);
};
</script>

<style scoped></style>
