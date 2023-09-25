// 定义属性管理米开的接口参数以及响应数据类型
export interface ResponentsData {
  code: number;
  message: string;
  ok: boolean;
}

// 分类ts类型
export interface CategoryObj {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

// 相对应的分类接口响应数据类型
export interface CategoryResponentsData extends ResponentsData {
  data: CategoryObj[];
}
