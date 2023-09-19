<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
        >
          <h1>Hello</h1>
          <h2>欢迎来到我的后台</h2>
          <el-form-item prop="username" class="login_form_item">
            <el-input
              class="username_inp"
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login_form_item">
            <el-input
              class="password_inp"
              :prefix-icon="Lock"
              show-password
              type="password"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item class="login_form_item">
            <el-button
              class="login_btn"
              type="primary"
              :loading="loading"
              @click="handleLogin"
            >
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
// 收集表单数据
import { reactive, ref } from "vue";
// 引入pinia仓库
import useUserStore from "@/store/modules/user";
// 引入路由器
import { useRouter } from "vue-router";
// 引入自定义工具方法
import { getTime } from "@/utils/times";
// 引入element-plus提示框
import { ElNotification } from "element-plus";

let useStore = useUserStore(); // 使用pinia仓库
let loginFormRef = ref();
let $router = useRouter(); // 使用路由器
let loading = ref(false); // 控制按钮加载状态
let loginForm = reactive({ username: "admin", password: "111111" }); // 初始化表单绑定数据
// 自定义表单校验规则 账号-密码校验
const validatorUserName = (rule: any, value: any, callback: viod) => {
  // rule：校验规则对象  value: 表单元素文本内容 callback：校验通过与否的回调函数
  if (value.length >= 5 && value.length <= 10) {
    callback();
  } else {
    callback(new Error("账号长度在6 - 10之间"));
  }
};
const validatorPassWord = (rule: any, value: any, callback: viod) => {
  // rule：校验规则对象  value: 表单元素文本内容 callback：校验通过与否的回调函数
  if (value.length >= 6 && value.length <= 15) {
    callback();
  } else {
    callback(new Error("密码长度在6 - 15之间"));
  }
};
const rules = {
  username: [
    {
      validator: validatorUserName,
      trigger: "change",
    },
  ],
  password: [
    {
      validator: validatorPassWord,
      trigger: "change",
    },
  ],
};
// 登录按钮
const handleLogin = async () => {
  await loginFormRef.value.validate();
  loading.value = true;
  try {
    // 通知仓库发登录请求
    await useStore.userLogin(loginForm);
    loading.value = false;
    ElNotification({
      type: "success",
      message: "欢迎登录",
      title: `Hi,${getTime()}好`,
    });
    // 请求成功跳转首页，展示数据
    $router.push("/");
  } catch (error) {
    // 请求失败，弹出提示
    loading.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    padding: 40px;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }
    .login_form_item {
      width: 80%;
      margin: 30px auto;
      .login_btn {
        width: 100%;
      }
    }
  }
}
</style>
