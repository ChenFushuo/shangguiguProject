<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <span>{{ setting.title }}</span>
  </div>
</template>

<script lang="ts" setup>
import setting from "@/setting";
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  img {
    width: 40px;
    height: 40px;
  }
  span {
    font-size: $base-logo-title-fontSize;
    margin: 10px;
  }
}
</style>
