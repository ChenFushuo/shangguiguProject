import { defineStore } from "pinia"; // 用户相关的pinia仓库
import { reqLogin, reqUserInfo } from "@/api/users/user"; // 引入接口
import { loginFormData, loginResponseData } from "@/api/users/type"; // 引入类型
import UserState from "./types/type";
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from "@/utils/token"; // 操作本地存储的方法
import { constantRouter } from "@/router/router"; // 引入常量菜单

const useUserStore = defineStore("User", {
  //  数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户的token 身份令牌,内存中取值，持久化存储方案
      menuRoutes: constantRouter, // 仓库存储生成菜单需要的路由信息
      username: "",
      avatar: "",
    };
  },
  //  逻辑
  actions: {
    // 用户登录方法
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code === 200) {
        // login success 200
        // pinia 存储token
        this.token = result.data.token as string;
        // 本地存储，持久化存储
        SET_TOKEN(result.data.token as string);
        // 保证async返回一个成功的promise
        return "ok";
      } else {
        // login error 201
        return Promise.reject(new Error(result.data.message));
      }
    },
    // 获取用户信息
    async userInfo() {
      let result = await reqUserInfo();
      if (result.code == 200) {
        this.username = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
        return result;
      } else {
        return Promise.reject("获取用户信息失败");
      }
    },
    // 退出登录
    async userLogout() {
      // 接口通知服务器，本地用户唯一标识失效
      // 清除本地用户标识、信息
      this.token = "";
      this.username = "";
      this.avatar = "";
      REMOVE_TOKEN();
    },
  },
  getters: {},
});

// 对外暴露获取小仓库方法
export default useUserStore;
