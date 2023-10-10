// 属性相关API文件
import request from "@/utils/request";
import { AttrResponseData, CategoryResponentsData, Attr } from "./type";

enum API {
  C1_URL = "/admin/product/getCategory1", // 获取一级分类接口
  C2_URL = "/admin/product/getCategory2/", // 获取二级分类接口
  C3_URL = "/admin/product/getCategory3/", // 获取三级分类接口
  ATTR_URL = "/admin/product/attrInfoList/", // 获取分类下已有属性与属性值接口地址
  ADDOREDITATTR = "/admin/product/saveAttrInfo/", // 新增或者修改三级分类下的属性（一接口多用，参数不同）
  DELETEATTR_URL = "/admin/product/deleteAttr/", // 删除某一个已有属性
}

// 获取一级分类
export const reqC1 = () => request.get<any, CategoryResponentsData>(API.C1_URL);
// 获取二级分类
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponentsData>(API.C2_URL + category1Id);
// 获取三级分类
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponentsData>(API.C3_URL + category2Id);
// 获取对应分类下所有对应的平台属性与属性值
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`
  );
// 新增或者修改已有接口
export const reqAddOrEditAttr = (data: Attr) =>
  request.post<any, any>(API.ADDOREDITATTR, data);

// 删除已有属性的接口 {attrId}
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId);
