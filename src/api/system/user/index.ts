/**
 * 系统管理-部门管理的API
 */

import { http } from "@/utils/http";
import { baseURLApiV1, type Result } from "@/api/utils";
import type {
  UserQuery,
  UserListResult,
  UserDetailResult,
  UserResetPasswordForm
} from "@/api/system/user/type";

/** 列表 */
export const getUserList = (params?: UserQuery) => {
  return http.request<UserListResult>("get", baseURLApiV1("/system/user"), {
    params
  });
};

/** 创建 */
export const createUser = (data: object) => {
  return http.request<Result>("post", baseURLApiV1("/system/user"), { data });
};

/** 详情 */
export const getUser = (id: number) => {
  return http.request<UserDetailResult>(
    "get",
    baseURLApiV1("/system/user/" + id)
  );
};

/** 更新 */
export const updateUser = (id: number, data: object) => {
  return http.request<Result>("put", baseURLApiV1("/system/user/" + id), {
    data
  });
};

/** 删除 */
export const deleteUser = (id: number) => {
  return http.request<Result>("delete", baseURLApiV1("/system/user/" + id));
};

/** 重设用户密码 */
export const resetUserPassword = (id: number, data: UserResetPasswordForm) => {
  return http.request<Result>(
    "post",
    baseURLApiV1("/system/user/" + id + "/resetPassword"),
    { data }
  );
};

/** 上传用户头像 */
export const uploadUserAvatar = (id: number, data: object) => {
  return http.upload<Result, any>(
    baseURLApiV1("/system/user/" + id + "/uploadAvatar"),
    {},
    data
  );
};
