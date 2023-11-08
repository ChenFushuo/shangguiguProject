import { PermissionList } from "@/api/acl/menu/type";
import Layout from "@/layout/index.vue";
// 对外暴露配置常量路由
export const constantRouter = [
  // 登录
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login", // 命名路由
    meta: {
      title: "登录",
      hidden: true, // 路由标题在菜单中是否隐藏 false不隐藏
    },
  },
  // 首页
  {
    path: "/",
    component: Layout,
    name: "Layout",
    meta: {
      title: "",
      icon: "",
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "HomeFilled",
        },
      },
    ],
  },
  // 数据大屏幕
  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "Screen",
    meta: {
      hidden: false,
      title: "数据大屏",
      icon: "Platform",
    },
  },
  // 404
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
];

// 异步路由
export const asyncRoute = [
  // 权限管理
  {
    path: "/acl",
    component: Layout,
    name: "Acl",
    meta: {
      title: "权限管理",
      icon: "Lock",
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          icon: "UserFilled",
        },
      },
      {
        path: "/acl/permission",
        component: () => import("@/views/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          icon: "Monitor",
        },
      },
    ],
  },
  // 商品管理
  {
    path: "/product",
    component: Layout,
    name: "Product",
    meta: {
      title: "商品管理",
      icon: "Goods",
    },
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          icon: "ShoppingCartFull",
        },
      },
      {
        path: "/product/attr",
        component: () => import("@/views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          title: "属性管理",
          icon: "ChromeFilled",
        },
      },
      {
        path: "/product/spu",
        component: () => import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "spu管理",
          icon: "Calendar",
        },
      },
      {
        path: "/product/sku",
        component: () => import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "sku管理",
          icon: "Orange",
        },
      },
    ],
  },
];

// 无页面路由
export const anyRoute = {
  path: "/:pathMatch(.*)*",
  meta: {
    hidden: true,
  },
  redirect: "/404",
};
