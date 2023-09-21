<template>
  <!-- 顶部左侧静态 -->
  <el-icon style="margin-right: 10px" @click="changeIcon"><Expand /></el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator=">">
    <!-- 动态展示路由名字和标题 -->
    <el-breadcrumb-item
      v-for="item in $router.matched"
      :key="item.path"
      v-show="item.meta.title"
      :to="item.path">
      <el-icon>
        <component :is="item.meta.icon" v-if="item.meta.icon" />
      </el-icon>
      <span style="margin: 0px 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import useLayoutSettingStore from "@/store/modules/setting";

// 定义响应式数据，控制图标切换
let LayoutSettingStore = useLayoutSettingStore(); // 一级路由仓库数据

let $router = useRoute();
// 点击图标的方法
const changeIcon = () => {
  LayoutSettingStore.collapse = !LayoutSettingStore.collapse;
};
</script>

<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  .el-breadcrumb__item {
    .el-breadcrumb__inner {
      color: #000000;
    }
    .el-breadcrumb__separator {
      color: white;
    }
  }
}
</style>
