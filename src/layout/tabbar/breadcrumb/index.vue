<template>
  <!-- 顶部左侧静态 -->
  <el-icon style="margin-right: 10px" @click="changeIcon"><Expand /></el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator=">">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
// 定义响应式数据，控制图标切换
let LayoutSettingStore = useLayoutSettingStore();
// 点击图标的方法
const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold;
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
