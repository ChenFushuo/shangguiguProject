<template>
  <div class="layotu_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu background-color="#001529" text-color="white">
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar"></div>
    <!-- 内容展示区域 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 引入logo，菜单、mian主题组件
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Main from "./main/index.vue";
// 取仓库的数据
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
</script>

<style lang="scss" scoped>
.layotu_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    position: fixed;
    top: 0;
    left: 0;
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    color: $base-color-white;
    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: $base-tabbar-background;
    top: 0;
    left: $base-menu-width;
    border-bottom: 1px solid #ccc;
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: $base-appmain-background;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
  }
}
</style>
