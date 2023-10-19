// 用户管理模块接口
import request from "@/utils/request";
import type { UserResponseData } from "./type";

enum API {
  ALLUSER_URL = "/admin/acl/user/", // 获取全部已有用户账号信息
}

// 获取用户账号信息
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`);
