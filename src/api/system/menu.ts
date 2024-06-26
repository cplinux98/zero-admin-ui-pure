/**
 * 系统管理-系统菜单的API
 */

import { http } from "@/utils/http";
import { type ArrayResult, baseURLApiV1, type Result } from "@/api/utils";

/** 列表 */
export const getMenuList = (params?: object) => {
  return http.request<ArrayResult>("get", baseURLApiV1("/system/menu"), {
    params
  });
};

/** 创建 */
export const createMenu = (data?: object) => {
  return http.request<Result>("post", baseURLApiV1("/system/menu"), { data });
};

/** 详情 */
export const getMenu = (id: number) => {
  return http.request<Result>("get", baseURLApiV1("/system/menu/" + id));
};

/** 更新 */
export const updateMenu = (id?: number, data?: object) => {
  return http.request<Result>("put", baseURLApiV1("/system/menu/" + id), {
    data
  });
};

/** 删除 */
export const deleteMenu = (id: number) => {
  return http.request<Result>("delete", baseURLApiV1("/system/menu/" + id));
};
