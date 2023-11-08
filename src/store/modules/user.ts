import { defineStore } from "pinia"; // 用户相关的pinia仓库
import { reqLogin, reqLogout, reqUserInfo } from "@/api/users/user"; // 引入接口
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "@/api/users/type";
import { UserState } from "./types/type";
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from "@/utils/token"; // 操作本地存储的方法
import { constantRouter, asyncRoute, anyRoute } from "@/router/router"; // 引入常量菜单

import router from "@/router";

// 异步路由过滤
const filterAsyncRoute = (hasAsyncRoutes: any, routes: any) => {
  return hasAsyncRoutes.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
};

const cloneDeep = (value: any) => {
  if (value === null || typeof value !== "object") {
    return value;
  }

  let cloned: any = Array.isArray(value) ? [] : {};

  for (let key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      cloned[key] =
        typeof value[key] === "object" ? cloneDeep(value[key]) : value[key];
    }
  }

  return cloned;
};

const useUserStore = defineStore("User", {
  //  数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户的token 身份令牌,内存中取值，持久化存储方案
      menuRoutes: [], // 仓库存储生成菜单需要的路由信息
      username: "",
      avatar: "",
      buttons: [],
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
        this.token = result.data as string;
        // 本地存储，持久化存储
        SET_TOKEN(result.data as string);
        // 保证async返回一个成功的promise
        return result;
      } else {
        // login error 201
        return Promise.reject(new Error(result.data));
      }
    },

    // 获取用户信息
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo();
      if (result.code == 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        this.buttons = result.data.buttons;

        //计算当前用户需要展示的异步路由
        let userAsyncRoute: any = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes
        );
        //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRouter, ...userAsyncRoute, anyRoute];
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        [...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route);
        });
        return result;
      } else {
        return Promise.reject(result.message);
      }
    },

    // 退出登录
    async userLogout() {
      // 接口通知服务器，本地用户唯一标识失效
      let result: any = await reqLogout();
      if (result.code === 200) {
        // 清除本地用户标识、信息
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return result;
      } else {
        return Promise.reject(new Error("退出登录失败"));
      }
    },
  },
  getters: {},
});

// 对外暴露获取小仓库方法
export default useUserStore;
