// 属性相关API文件
import request from "@/utils/request";
import { CategoryResponentsData } from "./type";

enum API {
  C1_URL = "/admin/product/getCategory1", // 获取一级分类接口
  C2_URL = "/admin/product/getCategory2/", // 获取二级分类接口
  C3_URL = "/admin/product/getCategory3/", // 获取三级分类接口
}

// 获取一级分类
export const reqC1 = () => request.get<any, CategoryResponentsData>(API.C1_URL);
// 获取二级分类
export const reqC2 = (category1Id: number) =>
  request.get<any, CategoryResponentsData>(API.C2_URL + category1Id);
// 获取三级分类
export const reqC3 = (category2Id: number) =>
  request.get<any, CategoryResponentsData>(API.C2_URL + category2Id);
