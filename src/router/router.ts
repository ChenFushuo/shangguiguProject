// 对外暴露配置常量路由
export const constantRouter = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout",
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login", // 命名路由
  },
  {
    path: "/index",
    component: () => import("@/views/home/index.vue"),
    name: "Index", // 命名路由
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404", // 命名路由
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "redirect404",
  },
];
