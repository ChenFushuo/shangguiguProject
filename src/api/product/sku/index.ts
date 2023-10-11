// SKU管理模块
import request from "@/utils/request";
import type { SkuResponseData } from "./type";

enum API {
  HASSKU_URL = "/admin/product/list/", // 获取已有(商品)SKU属性
  SALE_URL = "/admin/product/onSale/", // 商品上架接口
  CANCElSALE_URL = "/admin/product/cancelSale/", // 商品下架接口
}

// 获取已有(商品)SKU属性
export const reqHasSku = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.HASSKU_URL + `${page}/${limit}`);

// 已有商品上架请求
export const reqSaleSku = (skuId: number) =>
  request.get<any, any>(API.SALE_URL + skuId);

// 已有商品下架请求
export const reqCancelSale = (skuId: number) =>
  request.get<any, any>(API.CANCElSALE_URL + skuId);
