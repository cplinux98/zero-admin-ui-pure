import type { Result } from "@/api/utils";
import type { ResultTable, PageQuery } from "@/api/utils";
import type { OptionType } from "@/api/utils";

/**
 * 接口查询参数
 */
export interface ApiQuery extends PageQuery {
  /** 接口名/昵称/手机号关键字查询 */
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
 * 接口视图对象
 */
export interface ApiVO {
  /** 唯一标识 */
  id: number;
  /** 接口名 */
  name: string;
  /** 接口路径 */
  path: string;
  /** 接口方法 */
  method: string;
  /** 接口分组 */
  group: number;

  /** 是否必须 */
  isRequired: boolean;
  /** 描述 */
  description: string;

  /** 创建时间 */
  createTime: number;
  /** 更新时间 */
  updateTime: number;
}

/**
 * 接口列表方法返回结果类型
 */
export type ApiListResult = ResultTable<ApiVO[]>;

/**
 * 接口表单类型
 */
export interface ApiForm {
  /** 唯一标识 */
  id?: number;
  /** 接口名 */
  apiname: string;
  /** 密码 */
  password: string;
  /** 接口昵称 */
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
 * 接口详情方法返回结果类型
 */
export type ApiDetailResult = Result<ApiForm>;

/**
 * 接口树形数据类型
 */
export interface ApiTreeData {
  /** 树形数据 */
  treeData: object[];
  /** 所有api的id */
  allIds: number[];
}

/**
 * 接口树形数据返回结果类型
 */
export type ApiTreeDataResult = Result<ApiTreeData>;

/**
 * 接口树形数据返回结果类型
 */
export type ApiTreeGroupResult = Result<OptionType[]>;
