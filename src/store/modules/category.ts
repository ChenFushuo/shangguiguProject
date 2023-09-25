// 商品分类全局组件小仓库
import { defineStore } from "pinia";
import { reqC1 } from "@/api/product/attr";

let useCategoryStore = defineStore("Category", {
  state: () => {
    return {
      c1Arr: [],
      c1Id: "",
    };
  },
  actions: {
    // 获取一级分类
    async getC1() {
      let result: any = await reqC1();
      if (result.code === 200) {
        this.c1Arr = result.data;
      }
    },
  },
  getters: {},
});

export default useCategoryStore;
