// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from "vue-router";
import { constantRouter } from "@/router/router";

// 创建路由器，返回路由器对象
const router = createRouter({
  // 路由模式，默认为history
  history: createWebHashHistory(),
  routes: constantRouter,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
