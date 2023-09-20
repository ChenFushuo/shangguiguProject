// 对外暴露配置常量路由
export const constantRouter = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login", // 命名路由
    meta: {
      title: "登录",
      icon: "Promotion",
      hidden: true, // 路由标题在菜单中是否隐藏 false不隐藏
    },
  },

  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout",
    meta: {
      title: "layout",
      icon: "Promotion",
      hidden: false,
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "HomeFilled",
          hidden: false,
        },
      },
    ],
  },

  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404", // 命名路由
    meta: {
      title: "404",
      icon: "DocumentDelete",
      hidden: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "redirect404",
    meta: {
      hidden: true,
      icon: "DataLine",
    },
  },
];
