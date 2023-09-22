// 定义用户模块相关数据ts类型
// 登录接口需要携带的参数
export interface loginFormData {
  username: string;
  password: string;
}
// 所有接口响应数据都拥有的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
// 登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string;
}

export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}
