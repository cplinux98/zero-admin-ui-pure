import { http } from "@/utils/http";
import type {
  LoginCaptchaResult,
  LoginRequest,
  LoginResult
} from "@/api/login/type";
import { baseURLApiV1 } from "@/api/utils";
// import type { LogoutRequest } from "@/api/login/type";
/** 登录 */
export const login = (data?: LoginRequest) => {
  return http.request<LoginResult>("post", baseURLApiV1("/system/login"), {
    data
  });
};

/** 获取登录验证码 **/
export const getLoginCaptcha = () => {
  return http.request<LoginCaptchaResult>(
    "get",
    baseURLApiV1("/system/login/captcha")
  );
};

/** 刷新`token` */
export const refreshToken = (data: object) => {
  return http.request<LoginResult>(
    "post",
    baseURLApiV1("/system/login/refreshToken"),
    {
      data
    }
  );
};

/** 注销 */
export const logout = () => {
  return http.request<LoginResult>(
    "delete",
    baseURLApiV1("/system/login/logout")
  );
};
