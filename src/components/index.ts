// 引入所有全局组件组件
import SvgIcon from "@/components/SvgIcon/index.vue";
import Pagination from "@/components/Pagination/index.vue";

// 全局组件集合
const allGlobalComponents = {
  SvgIcon,
  Pagination,
};
// 暴露插件对象
export default {
  install(app) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key]);
    });
  },
};
