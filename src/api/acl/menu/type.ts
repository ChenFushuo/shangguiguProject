export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
// 菜单或按钮数据的TS类型
export interface Permission {
  id?: number;
  createTime?: string;
  updateTime?: string;
  pid: number | string;
  name: string;
  code: string;
  toCode?: string;
  type?: number;
  status?: null;
  level: number | string;
  children?: PermissionList;
  select?: boolean;
}

// 菜单以及按钮数组TS数据类型
export type PermissionList = Permission[];

// 接口返回数据的TS类型
export interface PermissionResponseData extends ResponseData {
  data: PermissionList;
}
