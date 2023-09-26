// 商品分类全局组件小仓库
import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import { CategoryResponentsData } from "@/api/product/attr/type";
import { CategoryState } from "./types/type";

let useCategoryStore = defineStore("Category", {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: "",
      c2Arr: [],
      c2Id: "",
      c3Arr: [],
      c3Id: "",
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
    // 获取二级分类
    async getC2() {
      let result: CategoryResponentsData = await reqC2(this.c1Id);
      if (result.code === 200) {
        this.c2Arr = result.data;
      }
    },
    // 获取三级分类
    async getC3() {
      let result: CategoryResponentsData = await reqC3(this.c2Id);
      if (result.code === 200) {
        this.c3Arr = result.data;
      }
    },
  },
  getters: {},
});

export default useCategoryStore;
