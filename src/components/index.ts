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
    // 方法名必须是install，意为安装，但是在vue3中并不存在vue实例，参数app代表vue实例进行注册，
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key]);
    });
  },
};
