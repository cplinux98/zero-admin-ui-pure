/**
 * 系统管理-部门管理的API
 */

import { http } from "@/utils/http";
import { baseURLApiV1, type Result } from "@/api/utils";
import type {
  UserQuery,
  UserListResult,
  UserDetailResult,
  UserResetPasswordForm,
  GetUserBindingRoleIdsResult,
  UpdateUserBindingRoleIdsRequest
} from "@/api/system/user/type";
import type {
  SelfUserInfoForm,
  SelfUserInfoResult
} from "@/api/system/user/type";
import type { UploadAvatarForm } from "@/api/system/user/type";

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
export const resetUserPassword = (data: UserResetPasswordForm) => {
  return http.request<Result>(
    "post",
    baseURLApiV1("/system/user/resetPassword"),
    { data }
  );
};

/** 上传用户头像 */
export const uploadUserAvatar = (data: UploadAvatarForm) => {
  const formData = new FormData();
  if (data.id) {
    formData.append("id", data.id.toString());
  }
  formData.append("file", data.file);

  return http.upload<Result, any>(
    baseURLApiV1("/system/user/uploadAvatar"),
    {},
    formData
  );
};

/** 获取当前用户信息 */
export const getSelfUserInfo = () => {
  return http.request<SelfUserInfoResult>(
    "get",
    baseURLApiV1("/system/user/self")
  );
};

/** 更新当前用户信息 */
export const updateSelfUserInfo = (data: SelfUserInfoForm) => {
  return http.request<Result>("patch", baseURLApiV1("/system/user/self"), {
    data
  });
};

/** 获取用户绑定的角色id集合 */
export const getUserBindingRoleIds = (id: number) => {
  return http.request<GetUserBindingRoleIdsResult>(
    "get",
    baseURLApiV1("/system/user/" + id + "/bindingRole")
  );
};

/** 更新用户绑定的角色id集合 */
export const updateUserBindingRoleIds = (
  id: number,
  data: UpdateUserBindingRoleIdsRequest
) => {
  return http.request<GetUserBindingRoleIdsResult>(
    "put",
    baseURLApiV1("/system/user/" + id + "/bindingRole"),
    { data }
  );
};
