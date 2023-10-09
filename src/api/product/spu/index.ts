// SPU管理模块
import request from "@/utils/request";
import type {
  AllTradeMark,
  HasSaleAttrResponseData,
  HasSpuResponseData,
  SaleAttrResponseData,
  SpuHasImg,
} from "./type";

enum API {
  HASSPU_URL = "/admin/product/", // 获取已有SPU属性
  ALLTRADEMARK_UPL = "/admin/product/baseTrademark/getTrademarkList", // 获取全部品牌数据
  IMAGE_URL = "/admin/product/spuImageList/", // 获取某一个SPU下全部售卖商品图片数据
  SPUHASSALEATTR_URL = "/admin/product/spuSaleAttrList/", // 获取某一个SPU下全部已有销售属性数据
  ALLSALEATTR_URL = "/admin/product/baseSaleAttrList", // 获取整个项目全部的销售属性
}

// 获取某个三级分类下已有SPU属性
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`
  );

// 获取全部SPU品牌数据
export const reqAllTradeMark = () =>
  request.get<any, AllTradeMark>(API.ALLTRADEMARK_UPL);

//获取某一个SPU下全部售卖商品图片数据
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + spuId);

// 获取某一个SPU下全部已有销售属性数据
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId);

// 获取全部销售属性
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);
