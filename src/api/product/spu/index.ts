// SPU管理模块
import request from "@/utils/request";
import type { HasSpuResponseData } from "./type";

enum API {
  HASSPU_URL = "/admin/product/", // 获取已有SPU属性
}

// 获取某个三级分类下已有SPU属性
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`
  );
