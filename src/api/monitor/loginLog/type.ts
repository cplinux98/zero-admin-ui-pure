import type { ResultTable, PageQuery } from "@/api/utils";

/**
 * 接口查询参数
 */
export interface LoginLogQuery extends PageQuery {
  /** 用户名关键字查询 */
  username?: string;
  /** 登录状态 */
  status?: boolean;
  /** 登录时间范围-开始时间 */
  startTime?: string;
  /** 登录时间范围-结束时间 */
  endTime?: string;
}

/**
 * 接口视图对象
 */
export interface LoginLogVO {
  /** 用户名 */
  username: string;
  /** 登录IP地址 */
  ip: string;
  /** 登录地址 */
  location: string;
  /** 操作系统 */
  system: string;
  /** 浏览器 */
  browser: string;
  /** 登录状态 */
  status: boolean;
  /** 登录类型 */
  action: number;
  /** 用户id */
  userId: number;
  /** 登录时间 */
  loginTime: number;
}

/**
 * 接口列表方法返回结果类型
 */
export type LoginLogListResult = ResultTable<LoginLogVO[]>;

/**
 * 在线用户列表查询参数
 */
export interface OnlineUserQuery extends PageQuery {
  /** 用户名关键字查询 */
  username?: string;
}

/**
 * 接口视图对象
 */
export interface OnlineUserVO {
  /** 会话id */
  sessionUUID: string;
  /** 用户名 */
  username: string;
  /** 登录IP地址 */
  ip: string;
  /** 登录地址 */
  location: string;
  /** 操作系统 */
  system: string;
  /** 浏览器 */
  browser: string;
  /** 登录类型 */
  action: number;
  /** 用户id */
  userId: number;
  /** 登录时间 */
  loginTime: number;
}

/**
 * 接口列表方法返回结果类型
 */
export type OnlineUserListResult = ResultTable<OnlineUserVO[]>;

/**
 * 强退用户请求
 */
export interface ForceLogoutOnlineUserData {
  /** 会话id */
  sessionUUID: string;
}
