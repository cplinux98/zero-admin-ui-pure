import type { Result } from "@/api/utils";

/**
 * 登录相应数据结构
 */
export interface LoginResultData {
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
  /** `accessToken`的过期时间（秒级时间戳） */
  expires: number;
}

/**
 * 登录返回类型
 */
export type LoginResult = Result<LoginResultData>;

/**
 * 登录验证码相应数据结构
 */
export interface LoginCaptchaResultData {
  /** 验证码缓存key */
  captchaKey: string;
  /** 验证码图片Base64字符串 */
  captchaBase64: string;
}

/**
 * 登录验证码返回类型
 */
export type LoginCaptchaResult = Result<LoginCaptchaResultData>;

/**
 * 登录请求参数
 */
export interface LoginRequest {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 验证码缓存key */
  captchaKey: string;
  /** 验证码 */
  captchaCode: string;
}

/**
 * 刷新token请求参数
 */
export interface RefreshTokenRequest {
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
}
