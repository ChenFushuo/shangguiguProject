// SKU管理模块
import request from "@/utils/request";
import type { SkuInfoData, SkuResponseData } from "./type";

enum API {
  HASSKU_URL = "/admin/product/list/", // 获取已有(商品)SKU属性
  SALE_URL = "/admin/product/onSale/", // 商品上架接口
  CANCElSALE_URL = "/admin/product/cancelSale/", // 商品下架接口
  SKUINFO_URL = "/admin/product/getSkuById/", // 查询所有SKU信息数据
  DELETESKU_URL = "/admin/product/deleteSku/{skuId}", // 删除已有SKU接口
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

// 获取商品（sku）详情
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId);

// 删除已有商品（SKU）信息
export const reqRemoveSku = (skuId: number) =>
  request.delete<any, any>(API.DELETESKU_URL + skuId);
