/**
 * 系统监控-登录日志的API
 */

import { http } from "@/utils/http";
import { baseURLApiV1 } from "@/api/utils";
import type {
  LoginLogListResult,
  LoginLogQuery
} from "@/api/monitor/loginLog/type";
import type {
  OnlineUserListResult,
  OnlineUserQuery
} from "@/api/monitor/loginLog/type";
import type { ForceLogoutOnlineUserData } from "@/api/monitor/loginLog/type";

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

/** 在线用户列表 */
export const getOnlineUserList = (params?: OnlineUserQuery) => {
  return http.request<OnlineUserListResult>(
    "get",
    baseURLApiV1("/monitor/loginLog/onlineUsers"),
    {
      params
    }
  );
};

/** 强退用户 */
export const forceLogoutOnlineUser = (data: ForceLogoutOnlineUserData) => {
  return http.request<OnlineUserListResult>(
    "delete",
    baseURLApiV1("/monitor/loginLog/forceLogout"),
    {
      data
    }
  );
};
