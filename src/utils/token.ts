// 封装本地存取数据的方法
// 本地存储token方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
};
// 本地获取token方法
export const GET_TOKEN = () => {
  return localStorage.getItem("TOKEN");
};
// 本地删除token方法
export const REMOVE_TOKEN = () => {
  return localStorage.removeItem("TOKEN");
};
