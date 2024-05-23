/**
 * 系统管理-系统菜单的API
 */

import { http } from "@/utils/http";
import { type ArrayResult, baseURLApiV2, type Result } from "@/api/utils";

/** 列表 */
export const getMenuList = (params?: object) => {
  return http.request<ArrayResult>("get", baseURLApiV2("/system/menu"), {
    params
  });
};

/** 创建 */
export const createMenu = (data?: object) => {
  return http.request<Result>("post", baseURLApiV2("/system/menu"), { data });
};

/** 详情 */
export const getMenu = (id: number) => {
  return http.request<Result>("get", baseURLApiV2("/system/menu/" + id));
};

/** 更新 */
export const updateMenu = (id?: number, data?: object) => {
  return http.request<Result>("put", baseURLApiV2("/system/menu/" + id), {
    data
  });
};

/** 删除 */
export const deleteMenu = (id: number) => {
  return http.request<Result>("delete", baseURLApiV2("/system/menu/" + id));
};
