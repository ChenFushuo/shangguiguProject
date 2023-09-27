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

// 对应的属性与属性值的数据类型
// 已有属性值对象的数据类型
export interface AttrValue {
  id?: number;
  valueName: string;
  attrId?: number;
}

// 存储每一个属性值的数组类型
export type AttrValueList = AttrValue[];

// data下已有属性对象
export interface Attr {
  id?: number;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: AttrValueList;
}
//存储每一个属性对象的数组的ts类型
export type AttrList = Attr[];

// 属性接口返回的数据类型
export interface AttrResponseData extends ResponentsData {
  data: Attr[];
}
