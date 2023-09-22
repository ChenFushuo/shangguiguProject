<template>
  <div class="dropdown">
    <el-button
      plain
      size="small"
      icon="Refresh"
      circle
      @click="uploadRefsh"></el-button>
    <el-button
      plain
      size="small"
      icon="FullScreen"
      circle
      @click="fullscreen"></el-button>
    <el-button plain size="small" icon="Setting" circle></el-button>
    <img :src="userStore.avatar" class="avatar" />
    <!-- 下拉菜单退出登录 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRoute, useRouter } from "vue-router";

let layoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore(); // 用户相关的仓库数据
let $router = useRouter(); // 获取路由器对象
let $route = useRoute(); // 获取路由对象
// 刷新按钮事件
const uploadRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh;
};
// 全屏按钮点击回调
const fullscreen = () => {
  // 定义变量(dom对象的属性，判断当前是否为全屏，true-全屏，null-非全屏)
  let full = document.fullscreenElement;
  if (!full) {
    // 文档根节点方法（requestFullscreen）实现全屏模式
    document.documentElement.requestFullscreen();
  } else {
    // 文档根节点方法（exitFullscreen）退出全屏模式
    document.exitFullscreen();
  }
};
// 退出登录
const logout = () => {
  // 发送服务器退出登录请求
  // 清空本地存储所有用户信息
  userStore.userLogout();
  // 跳转登录页
  $router.push({ path: "/login", query: { redirect: $route.path } });
};
</script>

<script lang="ts">
export default {
  name: "Setting",
};
</script>

<style lang="scss" scoped>
.dropdown {
  display: flex;
  align-items: center;
  .avatar {
    width: 50px;
    height: 50px;
    margin: auto 10px;
    border-radius: 50%;
  }
  .el-dropdown {
    color: $base-color-white;
  }
}
</style>
