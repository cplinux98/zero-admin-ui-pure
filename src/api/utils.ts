export type ArrayResult = {
  code: number;
  msg: string;
  data?: Array<any>;
};

export type Result<T = any> = {
  code: number;
  msg: string;
  data?: T;
};

export type ResultTable<T = any> = {
  code: number;
  msg: string;
  data?: {
    /** 列表数据 */
    list: T;
    /** 总条目数 */
    total?: number;
    // /** 每页显示条目个数 */
    // pageSize?: number;
    // /** 当前页数 */
    // currentPage?: number;
  };
};

/** 分页查询参数 **/
export interface PageQuery {
  /** 页码 **/
  page: number;
  /** 页数 **/
  pageSize: number;
}

export const baseURLApiV1 = (url: string) => {
  return `/api/v1${url}`;
};

export const baseURLApiV2 = (url: string) => {
  return `/api/v2${url}`;
};

/** 分页查询参数 **/
export interface OptionType {
  /** 值 **/
  value: string | number;
  /** 文本 **/
  label: string;
  /** 子列表 **/
  children?: OptionType[];
}
