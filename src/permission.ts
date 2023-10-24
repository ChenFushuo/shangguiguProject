// 路由鉴权
import router from "@/router/index";
// 进度条相关
import nprogress from "nprogress";
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false });
// 获取仓库
import pinia from "./store";
import useUserStore from "./store/modules/user";
import { ElMessage } from "element-plus";
import setting from "./setting";

// 用户仓库，判断用户是否登录
let userStore = useUserStore(pinia);

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next) => {
  document.title = `${setting.title + "-" + to.meta.title}`;
  // to 要跳转的路由终点 from 当前跳转之前的起点 next 放行回调函数
  nprogress.start();
  let token = userStore.token;
  // 获取用户名字
  let username = userStore.username;
  if (token) {
    if (to.path === "/login") {
      // 登录成功后，登录页重定向到首页
      next({ path: "/" });
    } else {
      // 登录成功，访问其他路由正常放行
      if (username) {
        next();
      } else {
        try {
          await userStore.userInfo();
          next();
        } catch (error: any) {
          ElMessage.error(error);
          // token过期 || 用户手动更改了token
          // 1. 先退出登录，清空用户数据
          await userStore.userLogout();
          // 退出，重定向到登录页面，携带要去的路由的参数
          next({ path: "login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.path,
        },
      });
    }
  }
});
// 全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done();
});

/**
 * 安装进度条插件 --nprogress
 * 路由鉴权，路由组件访问权限的设置
 * 全部路由组件：登录｜404｜任意路由｜首页｜数据大屏｜权限管理(三个子路由)｜商品管理(四个子路由)
 *
 *
 * 用户未登录：可以访问login，其他指向login
 * 登录成功：不可以访问login(指向首页)，可访问其余路由
 */
