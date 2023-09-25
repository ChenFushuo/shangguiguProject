import request from "@/utils/request";
import { Trademark, TrademarkResponseData } from "./type";

// 品牌管理模块的接口
enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/", // 获取已有品牌 get
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save", // 添加品牌 post
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update", // 修改品牌 put
  DELETE_URL = "/admin/product/baseTrademark/remove/", // 删除已有品牌
}
// 获取已有品牌的接口
// page  页码
// limit  条数
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`
  );

// 添加与修改已有品牌方法
export const reqAddorEditTrademark = (data: Trademark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data);
  }
};
// 删除已有品牌
export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETE_URL + id);
};
