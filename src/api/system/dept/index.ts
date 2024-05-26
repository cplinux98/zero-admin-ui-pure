/**
 * 系统管理-部门管理的API
 */

import { http } from "@/utils/http";
import { baseURLApiV1, type Result } from "@/api/utils";
import type {
  DeptQuery,
  DeptListResult,
  DeptDetailResult
} from "@/api/system/dept/type";

/** 列表 */
export const getDeptList = (params?: DeptQuery) => {
  return http.request<DeptListResult>("get", baseURLApiV1("/system/dept"), {
    params
  });
};

/** 创建 */
export const createDept = (data?: object) => {
  return http.request<Result>("post", baseURLApiV1("/system/dept"), { data });
};

/** 详情 */
export const getDept = (id: number) => {
  return http.request<DeptDetailResult>(
    "get",
    baseURLApiV1("/system/dept/" + id)
  );
};

/** 更新 */
export const updateDept = (id?: number, data?: object) => {
  return http.request<Result>("put", baseURLApiV1("/system/dept/" + id), {
    data
  });
};

/** 删除 */
export const deleteDept = (id: number) => {
  return http.request<Result>("delete", baseURLApiV1("/system/dept/" + id));
};
