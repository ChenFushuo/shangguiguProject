<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" alt="" class="avatar" />
        <div class="bottom">
          <h3 class="title">{{ getTime() }}好呀{{ userStore.username }}</h3>
          <p class="subtitle">{{ subtitle }}</p>
        </div>
      </div>
    </el-card>
    <div class="bottoms">
      <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getTime } from "@/utils/times";
import useUserStore from "@/store/modules/user"; //引入用户相关的仓库,获取当前用户的头像、昵称
let userStore = useUserStore(); //获取存储用户信息的仓库对象
let subtitle = ref<string>("");

onMounted(() => {
  subtitle.value = import.meta.env.VITE_APP_TITLE;
});
</script>

<style lang="scss" scoped>
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;

    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    .subtitle {
      font-style: italic;
      color: skyblue;
    }
  }
}
.bottoms {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}
</style>
