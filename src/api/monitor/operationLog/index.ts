/**
 * 系统监控-操作日志的API
 */

import { http } from "@/utils/http";
import { baseURLApiV1 } from "@/api/utils";
import type {
  OperationLogListResult,
  OperationLogQuery
} from "@/api/monitor/operationLog/type";
import type { OperationLogDetailResult } from "@/api/monitor/operationLog/type";

/** 列表 */
export const getOperationLogList = (params?: OperationLogQuery) => {
  return http.request<OperationLogListResult>(
    "get",
    baseURLApiV1("/monitor/operationLog"),
    {
      params
    }
  );
};

/** 详情 */
export const getOperationLogDetail = (id: number) => {
  return http.request<OperationLogDetailResult>(
    "get",
    baseURLApiV1("/monitor/operationLog/" + id)
  );
};
