<template>
  <!-- 路由组件出口位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout以及路由的子路由 -->
      <component v-if="isDestroy" :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import useLayoutSettingStore from "@/store/modules/setting";

let layoutSettingStore = useLayoutSettingStore();
//控制当前路由组件是否销毁重建
let isDestroy = ref(true);
// 监听仓库内部数据是否发生变化，若变化，说明惦记了刷新按钮
watch(
  () => layoutSettingStore.refsh,
  () => {
    // 点击刷新按钮，路由组件销毁，重建
    isDestroy.value = false;
    nextTick(() => {
      isDestroy.value = true;
    });
  }
);
</script>
<script lang="ts">
export default {
  name: "Main",
};
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
