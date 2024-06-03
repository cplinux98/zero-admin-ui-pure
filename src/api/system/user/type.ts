import type { Result } from "@/api/utils";
import type { ResultTable, PageQuery } from "@/api/utils";

/**
 * 用户查询参数
 */
export interface UserQuery extends PageQuery {
  /** 用户名/昵称/手机号关键字查询 */
  keyword?: string;
  /** 状态 */
  status?: boolean;
  /** 所属部门 */
  deptId?: number;
  /** 创建时间范围-开始时间 */
  startTime?: string;
  /** 创建时间范围-结束时间 */
  endTime?: string;
}

/**
 * 用户视图对象
 */
export interface UserVO {
  /** 唯一标识 */
  id: number;
  /** 用户头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 用户昵称 */
  nickname: string;
  /** 状态 */
  status: boolean;
  /** 描述 */
  description: string;
  /** 角色名称列表 */
  roleNames: string[];
  /** 手机号 */
  mobile: string;
  /** 邮箱 */
  email: string;
  /** 所属部门名称 */
  deptName: string;
  /** 创建时间 */
  createTime: number;
  /** 更新时间 */
  updateTime: number;
}

/**
 * 用户列表方法返回结果类型
 */
export type UserListResult = ResultTable<UserVO[]>;

/**
 * 用户表单类型
 */
export interface UserForm {
  /** 唯一标识 */
  id?: number;
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 用户昵称 */
  nickname: string;
  /** 状态 */
  status: boolean;
  /** 描述 */
  description: string;
  // /** 角色名称列表 */
  // roleIds: number[];
  /** 部门id */
  deptId: number;
  // /** 角色名称列表 */
  // roleNames: string[];
  /** 手机号 */
  mobile: string;
  /** 邮箱 */
  email: string;
}
/**
 * 用户详情方法返回结果类型
 */
export type UserDetailResult = Result<UserForm>;

/**
 * 重设密码
 */
export interface UserResetPasswordForm {
  /** 用户id，不传则修改自己 */
  id?: number;
  /** 原始密码 */
  oldPassword?: string;
  /** 新密码 */
  password: string;
}

export interface SelfUserInfo {
  /** 用户头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 描述 */
  description: string;
  /** 角色名称列表 */
  roleNames: string[];
  /** 手机号 */
  mobile: string;
  /** 邮箱 */
  email: string;
  /** 所属部门名称 */
  deptName: string;
  /** 创建时间 */
  createTime: number;
  /** 更新时间 */
  updateTime: number;
}

/**
 * 用户本人信息返回结果类型
 */
export type SelfUserInfoResult = Result<SelfUserInfo>;

/**
 * 用户本人修改基本信息请求表单
 */
export interface SelfUserInfoForm {
  /** 昵称 */
  nickname: string;
  /** 描述 */
  description?: string;
  /** 手机号 */
  mobile: string;
  /** 邮箱 */
  email: string;
}

/**
 * 更新头像表单
 */
export interface UploadAvatarForm {
  /** 用户id，不传则修改自己 */
  id?: number;
  /** 图片文件 */
  file: File;
}
