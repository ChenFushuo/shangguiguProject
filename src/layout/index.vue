<template>
  <div class="layotu_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ collapse: LayoutSettingStore.collapse ? true : false }">
      <Logo></Logo>
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :collapse="LayoutSettingStore.collapse ? true : false"
          :default-active="onRouters"
          background-color="#001529"
          text-color="rgb(245, 245, 245)"
          active-text-color="rgb(96, 155, 132)"
          :router="true"
          :collapse-transition="true"
          :unique-opened="true">
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ collapse: LayoutSettingStore.collapse ? true : false }">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ collapse: LayoutSettingStore.collapse ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Logo from "./Logo/index.vue";
import Menu from "./Menu/index.vue";
import Main from "./main/index.vue";
import Tabbar from "./tabbar/index.vue";
import useUserStore from "@/store/modules/user";
import useLayoutSettingStore from "@/store/modules/setting";

let $route = useRoute(); // 路由对象
let userStore = useUserStore(); //用户仓库
let LayoutSettingStore = useLayoutSettingStore(); //layout全局设置
// 设置activeMenu
const onRouters = computed(() => {
  if ($route.meta.activeMenu) return $route.meta.activeMenu;
  return $route.path;
});
</script>

<script lang="ts">
export default {
  name: "Layout",
};
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
    transition: all 0.3s;

    .scrollbar {
      height: $base-slider-scrollbar-height;
      .el-menu {
        border-right: none;
      }
    }
    &.collapse {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: $base-tabbar-width;
    height: $base-tabbar-height;
    color: $base-color-black;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;

    &.collapse {
      width: $base-tabbar-width-collapse;
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: $base-main-width;
    height: $base-main-height;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 15px;
    overflow: auto;
    transition: all 0.3s;
    box-sizing: border-box;

    &.collapse {
      width: $base-main-width-collapse;
      left: $base-menu-min-width;
    }
  }
}
</style>
