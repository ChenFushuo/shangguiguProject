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
    <el-popover
      placement="bottom-start"
      title="主题设置"
      :width="300"
      trigger="hover"
      content="this is content, this is content, this is content">
      <!-- 表单组件 -->
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker v-model="color" show-alpha />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="dark"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
            @change="changeDark" />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button plain size="small" icon="Setting" circle></el-button>
      </template>
    </el-popover>

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
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

let layoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore(); // 用户相关的仓库数据
let $router = useRouter(); // 获取路由器对象
let $route = useRoute(); // 获取路由对象

const color = ref("rgba(255, 69, 0, 0.68)");
let dark = ref<boolean>(false); // 暗黑模式开关状态收集
let html = ref<any>(); // 整个页面的html对象

onMounted(() => {
  html.value = document.documentElement;
  html.value.className = "";
});

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
// switch 切换 更改dark状态 暗黑模式切换
const changeDark = (val: boolean) => {
  // 判断html是否有dark的类名
  html.value.className = val ? "dark" : "";
};
// 退出登录
const logout = async () => {
  // 发送服务器退出登录请求
  // 清空本地存储所有用户信息
  let res = await userStore.userLogout();
  ElMessage({
    type: "success",
    message: "退出" + res.message,
    duration: 1000,
  });
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
}
</style>
