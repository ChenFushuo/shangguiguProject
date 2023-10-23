// 用户管理模块接口
import request from "@/utils/request";
import type {
  AllRoleResponseData,
  SetRoleData,
  User,
  UserResponseData,
} from "./type";

enum API {
  ALLUSER_URL = "/admin/acl/user/", // 获取全部已有用户账号信息
  ADDUSER_URL = "/admin/acl/user/save", // 新增用户账号信息
  UPDATEUSER_URL = "/admin/acl/user/update", // 更新已有用户账号信息
  ALLROLE_URL = "/admin/acl/user/toAssign/", // 获取全部角色以及当前账号拥有的角色接口
  SETROLE_URL = "/admin/acl/user/doAssignRole", // 给已有用户分配角色
  DELETEUSER_URL = "/admin/acl/user/remove/", // 删除单个用户
  DELETEUSERLIST_URL = "/admin/acl/user/batchRemove", // 删除多个用户（批量删除）
}

// 获取用户账号信息
export const reqUserInfo = (page: number, limit: number, username?: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`
  );

// 新增、更新用户账号信息
export const reqAddOrUpdateUserInfo = (data: User) => {
  if (!data.id) {
    return request.post<any, any>(API.ADDUSER_URL, data);
  } else {
    return request.put<any, any>(API.UPDATEUSER_URL, data);
  }
};

// 获取全部角色以及当前账号拥有的角色接口
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId);

// 分配角色
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data);

// 删除某一个账号信息
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + userId);

// 批量删除用户信息
export const reqRemoveUserList = (idList: number[]) =>
  request.delete<any, any>(API.DELETEUSERLIST_URL, { data: idList });
