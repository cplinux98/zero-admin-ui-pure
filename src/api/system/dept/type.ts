import type { Result } from "@/api/utils";

/**
 * 部门查询参数
 */
export interface DeptQuery {
  /** 名称关键字 */
  name?: string;
  /** 状态 */
  status?: boolean;
}

/**
 * 部门视图对象
 */
export interface DeptVO {
  /** 唯一标识 */
  id: number;
  /** 上级部门 */
  parentId: number;
  /** 部门名称 */
  name: string;
  /** 管理人 */
  leader: number[];
  /** 显示排序 */
  sort: number;
  /** 状态 */
  status: boolean;
  /** 描述 */
  description: string;
  /** 创建时间 */
  createTime: number;
  /** 更新时间 */
  updateTime: number;
}

/**
 * 部门列表方法返回结果类型
 */
export type DeptListResult = Result<DeptVO[]>;

/**
 * 部门表单类型
 */
export interface DeptForm {
  /** 唯一标识 */
  id?: number;
  /** 上级部门 */
  parentId: number;
  /** 部门名称 */
  name: string;
  /** 管理人 */
  leader: number[];
  /** 显示排序 */
  sort: number;
  /** 状态 */
  status: boolean;
  /** 描述 */
  description: string;
}
/**
 * 部门详情方法返回结果类型
 */
export type DeptDetailResult = Result<DeptForm>;
