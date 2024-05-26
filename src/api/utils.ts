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

export type ResultTable = {
  code: number;
  msg: string;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

export const baseURLApiV1 = (url: string) => {
  return `/api/v1${url}`;
};

export const baseURLApiV2 = (url: string) => {
  return `/api/v2${url}`;
};
