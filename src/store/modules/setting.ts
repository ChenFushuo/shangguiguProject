// Layout相关配置
import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore("settingStore", {
  state: () => {
    return {
      collapse: false, // 控制菜单是否收起
      refsh: false, // 控制刷新效果
    };
  },
});

export default useLayoutSettingStore;
