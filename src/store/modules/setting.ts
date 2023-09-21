// Layout相关配置
import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore("settingStore", {
  state: () => {
    return {
      fold: false, // 控制菜单是否收起
    };
  },
});

export default useLayoutSettingStore;
