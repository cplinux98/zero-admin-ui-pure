/**
 * 系统监控-登录日志的API
 */

import { http } from "@/utils/http";
import { baseURLApiV1 } from "@/api/utils";
import type {
  LoginLogListResult,
  LoginLogQuery
} from "@/api/monitor/loginLog/type";

/** 列表 */
export const getLoginLogList = (params?: LoginLogQuery) => {
  return http.request<LoginLogListResult>(
    "get",
    baseURLApiV1("/monitor/loginLog"),
    {
      params
    }
  );
};
