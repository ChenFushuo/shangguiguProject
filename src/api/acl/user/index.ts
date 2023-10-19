// 用户管理模块接口
import request from "@/utils/request";
import type { User, UserResponseData } from "./type";

enum API {
  ALLUSER_URL = "/admin/acl/user/", // 获取全部已有用户账号信息
  ADDUSER_URL = "/admin/acl/user/save", // 新增用户账号信息
  UPDATEUSER_URL = "/admin/acl/user/update", // 更新已有用户账号信息
}

// 获取用户账号信息
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`);

// 新增、更新用户账号信息
export const reqAddOrUpdateUserInfo = (data: User) => {
  if (!data.id) {
    return request.post<any, any>(API.ADDUSER_URL, data);
  } else {
    return request.put<any, any>(API.UPDATEUSER_URL, data);
  }
};
