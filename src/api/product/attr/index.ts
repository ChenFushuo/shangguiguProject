// 属性相关API文件
import request from "@/utils/request";
import { AttrResponseData, CategoryResponentsData } from "./type";

enum API {
  C1_URL = "/admin/product/getCategory1", // 获取一级分类接口
  C2_URL = "/admin/product/getCategory2/", // 获取二级分类接口
  C3_URL = "/admin/product/getCategory3/", // 获取三级分类接口
  ATTR_URL = "/admin/product/attrInfoList/", // 获取分类下已有属性与属性值接口地址
}

// 获取一级分类
export const reqC1 = () => request.get<any, CategoryResponentsData>(API.C1_URL);
// 获取二级分类
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponentsData>(API.C2_URL + category1Id);
// 获取三级分类
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponentsData>(API.C3_URL + category2Id);
// 获取对应分类下所有对应的属性与属性值
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`
  );
