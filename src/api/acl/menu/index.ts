import request from "@/utils/request";
import type { Permission, PermissionResponseData } from "./type";

enum API {
  ALLPERMISSION_URL = "/admin/acl/permission", // 获取所有菜单按钮权限
  ADDPERMISSION_URL = "/admin/acl/permission/save", // 给某一级新增子级权限数据
  UPDATEPERMISSION_URL = "/admin/acl/permission/update", // 更新某一个权限数据
  REMOVEPERMISSION_URL = "/admin/acl/permission/remove/", // 删除一个已有权限数据
}

// 获取所有菜单按钮权限
export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL);

// 新增一个权限数据 或 修改一个已有权限数据
export const reqAddOrEditPermission = (data: Permission) => {
  if (!data.id) {
    return request.post<any, any>(API.ADDPERMISSION_URL, data);
  } else {
    return request.put<any, any>(API.UPDATEPERMISSION_URL, data);
  }
};

// 删除一个已有权限数据
export const reqRemovePermission = (id: number) =>
  request.delete<any, any>(API.REMOVEPERMISSION_URL + id);
