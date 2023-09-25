import { CategoryObj } from "@/api/product/attr/type";
import type { RouteRecordRaw } from "vue-router";

// 定义小仓库state数据类型
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}

// 定义分类仓库state数据类型
export interface CategoryState {
  c1Id: string;
  c1Arr: CategoryObj[];
}
