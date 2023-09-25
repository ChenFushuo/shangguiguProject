// 商品分类全局组件小仓库
import { defineStore } from "pinia";
import { reqC1 } from "@/api/product/attr";
import { CategoryResponentsData } from "@/api/product/attr/type";
import { CategoryState } from "./types/type";

let useCategoryStore = defineStore("Category", {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: "",
    };
  },
  actions: {
    // 获取一级分类
    async getC1() {
      let result: CategoryResponentsData = await reqC1();
      if (result.code === 200) {
        this.c1Arr = result.data;
      }
    },
  },
  getters: {},
});

export default useCategoryStore;
