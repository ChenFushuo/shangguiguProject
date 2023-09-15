import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "virtual:svg-icons-register";

import App from "@/App.vue";

createApp(App)
  .use(ElementPlus, {
    locale: zhCn, // element-plus国际化配置（默认英文）
  })
  .mount("#app");
