// SPU管理模块
import request from "@/utils/request";
import type {
  AllTradeMark,
  HasSaleAttrResponseData,
  HasSpuResponseData,
  SaleAttrResponseData,
  SkuData,
  SkuInfoData,
  SpuData,
  SpuHasImg,
} from "./type";

enum API {
  HASSPU_URL = "/admin/product/", // 获取已有SPU属性
  ALLTRADEMARK_UPL = "/admin/product/baseTrademark/getTrademarkList", // 获取全部品牌数据
  IMAGE_URL = "/admin/product/spuImageList/", // 获取某一个SPU下全部售卖商品图片数据
  SPUHASSALEATTR_URL = "/admin/product/spuSaleAttrList/", // 获取某一个SPU下全部已有销售属性数据
  ALLSALEATTR_URL = "/admin/product/baseSaleAttrList", // 获取整个项目全部的销售属性
  ADDSPU_URL = "/admin/product/saveSpuInfo", // 添加一个新的SPU
  UPDATESPU_URL = "/admin/product/updateSpuInfo", // 更新已经存在的SPU
  ADDSKU_URL = "/admin/product/saveSkuInfo", // 追加一个新增的SKU
  SKUINFO_URL = "/admin/product/findBySpuId/", // 查看某一个已有SPU的SKU
  REMOVESPU_URL = "/admin/product/deleteSku/", // 删除某一个已有SPU
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

// 添加一个新的SPU | 更新已经存在的SPU  data:新增的SPU | 已有的SPU
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data);
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
};

// 添加SKU请求方法
export const reqAddSku = (data: SkuData) =>
  request.post<any, any>(API.ADDSKU_URL, data);

// 获取sku数据
export const reqSkuList = (spuId: number | string) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId);

// 删除已有的SPU
export const reqRemoveSpu = (spuId: number | string) =>
  request.delete<any, any>(API.REMOVESPU_URL + spuId);
