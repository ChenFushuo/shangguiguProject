// 创建自定义指令
import pinia from "@/store";
import useUserStore from "@/store/modules/user";
let userStore = useUserStore(pinia);

export const isHasButton = (app: any) => {
  app.directive("has", {
    // 使用这个自定义全局指令的DOM或组件挂在一次，就执行一次
    mounted(el: any, options: any) {
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el);
      }
    },
  });
};
