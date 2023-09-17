import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "virtual:svg-icons-register";

import App from "@/App.vue";
// 引入自定义插件对象
import globallyComponents from "@/components";
// 引入全局样式
import "@/styles/index.scss";

createApp(App)
  .use(ElementPlus, {
    locale: zhCn, // element-plus国际化配置（默认英文）
  })
  .use(globallyComponents)
  .mount("#app");
