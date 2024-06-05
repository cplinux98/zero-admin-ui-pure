/**
 * 系统管理-接口管理的API
 */

import { http } from "@/utils/http";
import { baseURLApiV1, type Result } from "@/api/utils";
import type {
  ApiQuery,
  ApiListResult,
  ApiDetailResult,
  ApiTreeDataResult
} from "@/api/system/api/type";
import type { ApiTreeGroupResult } from "@/api/system/api/type";

/** 列表 */
export const getApiList = (params?: ApiQuery) => {
  return http.request<ApiListResult>("get", baseURLApiV1("/system/api"), {
    params
  });
};

/** 创建 */
export const createApi = (data: object) => {
  return http.request<Result>("post", baseURLApiV1("/system/api"), { data });
};

/** 详情 */
export const getApi = (id: number) => {
  return http.request<ApiDetailResult>(
    "get",
    baseURLApiV1("/system/api/" + id)
  );
};

/** 更新 */
export const updateApi = (id: number, data: object) => {
  return http.request<Result>("put", baseURLApiV1("/system/api/" + id), {
    data
  });
};

/** 删除 */
export const deleteApi = (id: number) => {
  return http.request<Result>("delete", baseURLApiV1("/system/api/" + id));
};

/** 获取树形接口列表 */
export const getApiTreeData = () => {
  return http.request<ApiTreeDataResult>(
    "get",
    baseURLApiV1("/system/api/treeData")
  );
};

/** 获取树形分组列表 */
export const getApiTreeGroup = () => {
  return http.request<ApiTreeGroupResult>(
    "get",
    baseURLApiV1("/system/api/treeGroup")
  );
};
