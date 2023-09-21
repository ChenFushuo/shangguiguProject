import type { RouteRecordRaw } from "vue-router";

// 定义小仓库state数据类型
interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}

export default UserState;
