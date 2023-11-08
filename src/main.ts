import { createApp } from "vue";
import App from "@/App.vue";
import "@/styles/index.scss"; // 引入全局样式
import ElementPlus from "element-plus"; // 引入element-plus组件库=
import "element-plus/dist/index.css"; // 引入element组件库
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs"; // element-plus 国际化引入
import "element-plus/theme-chalk/dark/css-vars.css"; // 暗黑模式需要的样式
import "virtual:svg-icons-register"; // svg插件配置代码
import globallyComponents from "@/components"; // 引入自定义插件对象
import router from "@/router"; // 引入路由注册
import "./permission"; // 引入路由守卫
import pinia from "@/store"; // 引入仓库

import { isHasButton } from "./directive/has"; // 引入自定义指令

let app = createApp(App);
isHasButton(app);
app
  .use(ElementPlus, {
    locale: zhCn, // element-plus国际化配置（默认英文）
  })
  .use(globallyComponents)
  .use(pinia)
  .use(router)
  .mount("#app");
