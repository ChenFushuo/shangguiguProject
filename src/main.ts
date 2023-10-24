import { createApp } from "vue";
import App from "@/App.vue";
// 引入全局样式
import "@/styles/index.scss";
// 引入element-plus组件库
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// element-plus 国际化引入
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// svg插件配置代码
import "virtual:svg-icons-register";
// 引入自定义插件对象
import globallyComponents from "@/components";
// 引入路由注册
import router from "@/router";
// 引入路由守卫
import "./permission";
// 引入仓库
import pinia from "@/store";

createApp(App)
  .use(ElementPlus, {
    locale: zhCn, // element-plus国际化配置（默认英文）
  })
  .use(globallyComponents)
  .use(pinia)
  .use(router)
  .mount("#app");
