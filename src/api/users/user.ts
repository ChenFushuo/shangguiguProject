// 导入请求对象
import request from "@/utils/request";
// 引入接口参数 ts 类型
import type {
  loginFormData, // 登录参数类型
  loginResponseData, // 登录响应数据类型
  userInfoResponseData, // 用户信息相应数据类型
} from "../type";
// 统一管理接口请求
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}
// 导出请求函数
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);

export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL);

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);
