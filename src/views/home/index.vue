<template>
  <div><img :src="userStore.avatar" alt="" />{{ userStore.username }}</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// 获取用户仓库
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
