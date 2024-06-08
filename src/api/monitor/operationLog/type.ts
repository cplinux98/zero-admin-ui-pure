import type { ResultTable, PageQuery } from "@/api/utils";

/**
 * 接口查询参数
 */
export interface OperationLogQuery extends PageQuery {
  // /** 用户名关键字查询 */
  // username?: string;
  // /** 登录状态 */
  // status?: boolean;
  // /** 登录时间范围-开始时间 */
  // startTime?: string;
  // /** 登录时间范围-结束时间 */
  // endTime?: string;
}

/**
 * 接口视图对象
 */
export interface OperationLogVO {
  /** 唯一标识 */
  id: number;
  /** 模块名称 */
  module: string;
  /** 请求路径 */
  path: string;
  /** 请求方法 */
  method: string;
  /** 请求 */
  body: string;
  /** 客户端地址 */
  ip: string;
  /** 浏览器 */
  browser: string;
  /** 操作系统 */
  system: string;
  /** 响应码 */
  httpStatus: number;
  /** 响应 */
  httpResponse: string;
  /** 操作人id */
  userId: number;
  /** 操作人用户名 */
  username: string;
  /** 耗时 */
  useTime: number;
  /** 操作时间 */
  createTime: number;
}

/**
 * 列表方法返回结果类型
 */
export type OperationLogListResult = ResultTable<OperationLogVO[]>;

/**
 * 详情方法返回结果类型
 */
export interface OperationLogDetail {
  /** 唯一标识 */
  id: number;
  /** 模块名称 */
  module: string;
  /** 请求路径 */
  path: string;
  /** 请求方法 */
  method: string;
  /** 请求 */
  body: string;
  /** 客户端地址 */
  ip: string;
  /** 浏览器 */
  browser: string;
  /** 操作系统 */
  system: string;
  /** 响应码 */
  httpStatus: number;
  /** 响应 */
  httpResponse: string;
  /** 操作人id */
  userId: number;
  /** 操作人用户名 */
  username: string;
  /** 耗时 */
  useTime: number;
  /** 请求头信息 */
  requestHeaders: string;
  /** 响应头信息 */
  responseHeaders: string;
  /** 链路追踪id */
  traceId: string;
  /** 操作地点 */
  location: string;
}

export type OperationLogDetailResult = ResultTable<OperationLogDetail>;
