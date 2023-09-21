<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <transition name="logoTitle">
      <span v-if="!LayOutSettingStore.fold"> {{ setting.title }}</span>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import setting from "@/setting";
import useLayoutSettingStore from "@/store/modules/setting";
let LayOutSettingStore = useLayoutSettingStore(); //layout全局设置
</script>
<script lang="ts">
export default {
  name: "logo",
};
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
    white-space: nowrap;
    font-size: $base-logo-title-fontSize;
    padding: 10px;
  }
  .logoTitle-enter-from {
    opacity: 0;
  }
  .logoTitle-enter-active {
    transition: all 1s;
  }
  .logoTitle-enter-to {
    opacity: 1;
  }
}
</style>
