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
