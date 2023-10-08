// 服务器接口返回数据类型
export interface ResponseData {
  code: number;
  messsage: string;
  ok: boolean;
}

// SPU数据的ts类型
export interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: string | number;
  tmId: number;
  spuSaleAttrList: null;
  spuImageList: null;
}

// 数组包含元素都是已有的spu的数据类型
export type Records = SpuData[];

// 定义获取已有spu接口返回数据类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
    searchCount: boolean;
  };
}

// 所有品牌数据的ts类型
export interface Trademark {
  id: number;
  tmName: string;
  logoUrl: string;
}

// 品牌接口返回数据ts类型
export interface AllTradeMark extends ResponseData {
  data: Trademark[];
}

// 商品图片ts类型
export interface SpuImage {
  id: number;
  createTime: string;
  updateTime: string;
  spuId: number;
  imgName: string;
  imgUrl: string;
}
// 已有Spu照片，接口返回数据ts类型
export interface SpuHasImg extends ResponseData {
  data: SpuImage[];
}

// 已有销售属性对象ts类型
export interface SaleAttrValue {
  id?: number;
  createTime: null;
  updateTime: null;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  isChecked: null;
}

// 已有销售属性数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];

// 销售属性对象ts类型
export interface SaleAttr {
  id?: number;
  createTime: null;
  updateTime: null;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValueList;
}

// SPU已有销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

// 已有全部SPU返回数据ts类型
export interface HasSaleAttr {
  id: number;
  name: string;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}
