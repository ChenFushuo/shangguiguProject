// SkushujuTS类型
export interface ResponseData {
  code: number;
  messahe: string;
  ok: boolean;
}

// Sku对象TS类型
export interface Attr {
  attrId: string | number;
  valueId: string | number;
}
export interface SlaeAttr {
  saleAttrId?: string | number;
  saleAttrValueId?: string | number;
}
export interface SkuData {
  id?: number;
  isSale?: number; // 控制上架或下架
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

// 获取Sku接口返回数据TS类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[];
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}
