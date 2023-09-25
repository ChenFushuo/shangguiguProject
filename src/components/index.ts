// 引入所有全局组件组件
import SvgIcon from "@/components/SvgIcon/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import Category from "@/components/Category/index.vue";
// 引入所有elemet-plus icon图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 全局组件集合
const allGlobalComponents: any = {
  SvgIcon,
  Pagination,
  Category,
};
// 暴露插件对象
export default {
  install(app: { component: (arg0: string, arg1: any) => void }) {
    // 方法名必须是install，意为安装，但是在vue3中并不存在vue实例，参数app代表vue实例进行注册，
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key]);
    });
    // 将element-plus提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
