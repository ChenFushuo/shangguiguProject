// 用户相关的pinia仓库
import { defineStore } from "pinia";
// 引入接口
import { reqLogin } from "@/api/users/user";
// 引入类型
import { loginForm, loginResponseData } from "@/api/users/type";
import UserState from "../types/type";
// 操作本地存储的方法
import { GET_TOKEN, SET_TOKEN } from "@/utils/token";

const useUserStore = defineStore("User", {
  //  数据
  state: (): UserState => {
    return {
      //用户的token 身份令牌,内存中取值，持久化存储方案
      token: GET_TOKEN("TOKEN"),
    };
  },
  //  逻辑
  actions: {
    // 用户登录方法
    async userLogin(data: loginForm) {
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
  },
  getters: {},
});

// 对外暴露获取小仓库方法
export default useUserStore;
