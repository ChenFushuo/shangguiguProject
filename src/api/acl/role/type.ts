export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 角色数据类型
export interface RoleData {
  id?: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark?: null;
}

// 全部角色数组的TS类型
export type Records = RoleData[];

// 获取全部角色接口返回值TS类型
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    pages: number;
    current: number;
    optimizeCountSql: boolean;
    hitCount: boolean;
    searchCount: boolean;
    orders: [];
    countId: null;
    maxLimit: null;
  };
}

// 菜单与按钮数据的TS类型
export interface MenuData {
  id: number;
  createTime: string;
  updateTime: string;
  pid: number;
  name: string;
  code: string;
  toCode: string;
  type: number;
  status: null;
  level: number;
  children?: MenuList;
  select: boolean;
}
export type MenuList = MenuData[];

// 菜单权限与按钮权限数据的TS类型
export interface MenuResponseData extends ResponseData {
  data: MenuList;
}
