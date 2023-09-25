export interface ResponeseData {
  code: number;
  message: string;
  ok: boolean;
}

// 已有品牌数据类型
export interface Trademark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

// 包含品牌信息的TS类型
export type Records = Trademark[];

// 获取已有全部品牌数据的TS类型
export interface TrademarkResponseData extends ResponeseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
