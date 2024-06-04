import type { Result } from "@/api/utils";
import type { ResultTable, PageQuery } from "@/api/utils";

/**
 * 角色查询参数
 */
export interface RoleQuery extends PageQuery {
  /** 角色名称关键字查询 */
  name?: string;
  /** 状态 */
  status?: boolean;
}

/**
 * 角色视图对象
 */
export interface RoleVO {
  /** 唯一标识 */
  id: number;
  /** 角色名称 */
  name: string;
  /** 显示排序 */
  sort: number;
  /** 状态 */
  status: boolean;
  /** 数据权限范围 */
  dataScope: boolean;
  /** 描述信息 */
  description: string;
  /** 创建时间 */
  createTime: number;
  /** 更新时间 */
  updateTime: number;
}

/**
 * 角色列表方法返回结果类型
 */
export type RoleListResult = ResultTable<RoleVO[]>;

/**
 * 角色表单类型
 */
export interface RoleForm {
  /** 唯一标识 */
  id?: number;
  /** 角色名 */
  name: string;
  /** 排序 */
  sort: number;
  /** 状态 */
  status: boolean;
  /** 描述 */
  description: string;
  /** 数据权限范围 */
  dataScope: number;
  /** 自定义部门权限范围 */
  customDataScope: number[];
}
/**
 * 角色详情方法返回结果类型
 */
export type RoleDetailResult = Result<RoleForm>;

/**
 * 角色视图授权数据
 */
export type RoleViewAuthData = number[];

/**
 * 角色接口授权数据
 */
export type RoleApiAuthData = number[];

/**
 * 角色视图授权提交数据
 */
export interface RoleViewAuthDataSubmitObject {
  menuIds: number[];
}

/**
 * 角色接口授权提交数据
 */
export interface RoleApiAuthDataSubmitObject {
  apiIds: number[];
}
