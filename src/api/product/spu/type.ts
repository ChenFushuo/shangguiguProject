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
  tmId: number | string;
  description: string;
  spuImageList: null | SpuImg[];
  category3Id: string | number;
  spuSaleAttrList: null | SaleAttr[];
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
export interface SpuImg {
  id?: number;
  imgName?: string;
  imgUrl?: string;
  name?: string;
  url?: string;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
}
// 已有Spu照片，接口返回数据ts类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[];
}

// 已有销售属性对象ts类型
export interface SaleAttrValue {
  id?: number;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrValueName: string;
  saleAttrName?: string;
  isChecked?: null;
}

// 已有销售属性数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];

// 销售属性对象ts类型
export interface SaleAttr {
  id?: number;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValueList;
  saleAttrValue?: string;
  flag?: boolean;
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

export interface Attr {
  attrId: string | number;
  valueId: string | number;
}

export interface SlaeAttr {
  saleAttrId?: string | number;
  saleAttrValueId?: string | number;
}

export interface SkuData {
  category3Id: string | number; // 三级分类Id
  spuId: string | number; // spu的id
  tmId: string | number; // SPU品牌的Id
  skuName: string; // SKU的名字
  price: string | number; // SKU价格
  weight: string | number; // SKU重量
  skuDesc: string; // SKU描述
  skuAttrValueList?: Attr[]; // 平台属性
  skuSaleAttrValueList?: SlaeAttr[]; // 销售属性
  skuDefaultImg: string; // SKU默认图片地址
}

// 获取SKU数据接口TS类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[];
}
