/**
 * 系统管理-角色管理的API
 */

import { http } from "@/utils/http";
import { baseURLApiV1, type Result } from "@/api/utils";
import type {
  RoleQuery,
  RoleListResult,
  RoleDetailResult,
  RoleViewAuthData,
  RoleViewAuthDataSubmitObject,
  RoleApiAuthData,
  RoleApiAuthDataSubmitObject
} from "@/api/system/role/type";
import type { GetRoleOptionResult } from "@/api/system/role/type";

/** 列表 */
export const getRoleList = (params?: RoleQuery) => {
  return http.request<RoleListResult>("get", baseURLApiV1("/system/role"), {
    params
  });
};

/** 创建 */
export const createRole = (data: object) => {
  return http.request<Result>("post", baseURLApiV1("/system/role"), { data });
};

/** 详情 */
export const getRole = (id: number) => {
  return http.request<RoleDetailResult>(
    "get",
    baseURLApiV1("/system/role/" + id)
  );
};

/** 更新 */
export const updateRole = (id: number, data: object) => {
  return http.request<Result>("put", baseURLApiV1("/system/role/" + id), {
    data
  });
};

/** 删除 */
export const deleteRole = (id: number) => {
  return http.request<Result>("delete", baseURLApiV1("/system/role/" + id));
};

/** 获取角色的视图授权信息 */
export const getRoleViewAuthData = (id: number) => {
  return http.request<Result<RoleViewAuthData>>(
    "get",
    baseURLApiV1("/system/role/" + id + "/viewAuthData")
  );
};
/** 更新角色的视图授权信息 */
export const updateRoleViewAuthData = (
  id: number,
  data: RoleViewAuthDataSubmitObject
) => {
  return http.request<Result>(
    "put",
    baseURLApiV1("/system/role/" + id + "/viewAuthData"),
    {
      data
    }
  );
};

/** 获取角色的接口授权信息 */
export const getRoleApiAuthData = (id: number) => {
  return http.request<Result<RoleApiAuthData>>(
    "get",
    baseURLApiV1("/system/role/" + id + "/apiAuthData")
  );
};
/** 更新角色的接口授权信息 */
export const updateRoleApiAuthData = (
  id: number,
  data: RoleApiAuthDataSubmitObject
) => {
  return http.request<Result>(
    "put",
    baseURLApiV1("/system/role/" + id + "/apiAuthData"),
    {
      data
    }
  );
};

/** 获取角色选项数据 */
export const getSysRoleOption = () => {
  return http.request<GetRoleOptionResult>(
    "get",
    baseURLApiV1("/system/role/option")
  );
};
