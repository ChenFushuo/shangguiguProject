// 导入请求对象
import request from "@/utils/request";
// 引入接口参数 ts 类型
import type {
  loginFormData, // 登录参数类型
  loginResponseData, // 登录响应数据类型
  userResponseData, // 用户信息相应数据类型
} from "./type";
// 统一管理接口请求
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "user/info",
}
// 导出请求函数
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);

export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL);
