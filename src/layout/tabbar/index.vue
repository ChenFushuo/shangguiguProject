<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <!-- 顶部左侧静态 -->
      <el-icon style="margin-right: 10px"><Expand /></el-icon>
      <!-- 左侧面包屑 -->
      <Breadcrumb />
    </div>
    <div class="tabbar_right">
      <el-button plain size="small" icon="Refresh" circle></el-button>
      <el-button plain size="small" icon="FullScreen" circle></el-button>
      <el-button plain size="small" icon="Setting" circle></el-button>
      <img src="../../../public/logo.png" class="avatar" />
      <!-- 下拉菜单退出登录 -->
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to right, #00ced1, #483d8b);

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .avatar {
      width: 24px;
      height: 24px;
      margin: auto 10px;
    }
  }
}
</style>
