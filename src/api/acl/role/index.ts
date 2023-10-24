// 用户管理模块接口
import request from "@/utils/request";
import { MenuResponseData, RoleData, RoleResponseData } from "./type";

enum API {
  ALLROLE_URL = "/admin/acl/role/", // 获取全部角色信息
  ADDROLE_URl = "/admin/acl/role/save", // 新增一个新的角色
  UPDATEROLE_URl = "/admin/acl/role/update", // 更新一个已有角色
  ALLPERMISSION_URL = "/admin/acl/permission/toAssign/", // 获取全部菜单与按钮数据
  SETPERMISSION_URL = "/admin/acl/permission/doAssign", // 给相应角色下发权限
  REMOVEROLE_URL = "/admin/acl/role/remove/", // 删除一个已有角色
}

// 获取全部角色接口
export const reqAllRoleList = (
  page: number,
  limit: number,
  roleName?: string
) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`
  );

// 新增新的角色 或 修改已有角色
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (!data.id) {
    return request.post<any, any>(API.ADDROLE_URl, data);
  } else {
    return request.put<any, any>(API.UPDATEROLE_URl, data);
  }
};

// 获取所有菜单与按钮的数据
export const reqAllMenuList = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId);

// 给相应角色下发权限
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.SETPERMISSION_URL + `?roleId=${roleId}&permissionId=${permissionId}`
  );

// 删除一个已有角色
export const reqRemoveRole = (id: number) =>
  request.delete<any, any>(API.REMOVEROLE_URL + id);
