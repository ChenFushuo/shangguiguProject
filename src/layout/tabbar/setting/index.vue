<template>
  <div class="dropdown">
    <el-button plain size="small" icon="Refresh" circle></el-button>
    <el-button plain size="small" icon="FullScreen" circle></el-button>
    <el-button plain size="small" icon="Setting" circle></el-button>
    <img src="../../../../public/logo.png" class="avatar" />
    <!-- 下拉菜单退出登录 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts"></script>

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
    width: 24px;
    height: 24px;
    margin: auto 10px;
  }
  .el-dropdown {
    color: $base-color-white;
  }
}
</style>
