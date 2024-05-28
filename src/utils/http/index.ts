import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer
} from "axios";
import type {
  PureHttpError,
  RequestMethods,
  PureHttpResponse,
  PureHttpRequestConfig
} from "./types.d";
import { stringify } from "qs";
import NProgress from "../progress";
import { getToken, formatToken, removeToken } from "@/utils/auth";
import { useUserStoreHook } from "@/store/modules/user";
// import { ref } from "vue";
import { message } from "@/utils/message";
import router, { resetRouter } from "@/router";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { routerArrays } from "@/layout/types";
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
};
// 是否显示重新登录
// const isRelogin = ref(false);

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** `token`过期后，暂存待执行的请求 */
  private static requests = [];

  /** 防止重复刷新`token` */
  private static isRefreshing = false;

  /** 初始化配置对象 */
  private static initConfig: PureHttpRequestConfig = {};

  /** 保存当前`Axios`实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 重连原始请求 */
  private static retryOriginalRequest(config: PureHttpRequestConfig) {
    return new Promise(resolve => {
      PureHttp.requests.push((token: string) => {
        config.headers["Authorization"] = formatToken(token);
        resolve(config);
      });
    });
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      async (config: PureHttpRequestConfig): Promise<any> => {
        // 开启进度条动画
        NProgress.start();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(config);
          return config;
        }
        if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback(config);
          return config;
        }
        /** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
        const whiteList = [
          "/api/v1/system/login/refreshToken",
          "/api/v1/system/login",
          "/api/v1/system/login/captcha",
          "/api/v1/system/login/logout"
        ];
        return whiteList.some(url => config.url.endsWith(url))
          ? config
          : new Promise(resolve => {
              const data = getToken();
              if (data) {
                const milliseconds = new Date().getTime();
                const now = Math.floor(milliseconds / 1000); // 转换成秒级别时间戳
                // console.log(now);
                const expired = parseInt(data.expires) - now <= 0;
                // console.log(data.expires, expired);
                if (expired) {
                  if (!PureHttp.isRefreshing) {
                    PureHttp.isRefreshing = true;
                    // token过期刷新
                    useUserStoreHook()
                      .handRefreshToken({ refreshToken: data.refreshToken })
                      .then(res => {
                        const token = res.data.accessToken;
                        config.headers["Authorization"] = formatToken(token);
                        PureHttp.requests.forEach(cb => cb(token));
                        PureHttp.requests = [];
                      })
                      .catch(() => {
                        // 刷新token失败，就代表token过期，过期了就应该退出系统
                        useUserStoreHook().logOut();
                      })
                      .finally(() => {
                        PureHttp.isRefreshing = false;
                      });
                  }
                  resolve(PureHttp.retryOriginalRequest(config));
                } else {
                  config.headers["Authorization"] = formatToken(
                    data.accessToken
                  );
                  resolve(config);
                }
              } else {
                resolve(config);
              }
            });
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: PureHttpResponse) => {
        let code = undefined;
        let msg = undefined;

        // 如果data里面没有东西，则提示错误
        if (!response.data) {
          // console.log(response.data);
          // message("响应错误：无响应数据", { type: "error" });
          message("响应错误：响应格式不正确", { type: "error" });
          NProgress.done();
          return Promise.reject(response);
        }

        // 二进制数据则直接返回
        if (response.data instanceof ArrayBuffer) {
          return response;
        } else {
          // 非二进制流，解析code和msg
          code = response.data.code;
          msg = response.data.msg;
        }

        // 处理业务码错误的情况
        if (code === undefined || code !== 200) {
          // console.log("xxxxxxxxxxx");
          msg = `${code}: ${msg}`;
          message(msg, { type: "error" });
          NProgress.done();
          return Promise.reject(msg);
        }

        // 平台自身的拦截处理
        const $config = response.config;
        // 关闭进度条动画
        NProgress.done();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof $config.beforeResponseCallback === "function") {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (PureHttp.initConfig.beforeResponseCallback) {
          PureHttp.initConfig.beforeResponseCallback(response);
          return response.data;
        }

        // // dataAxios 是 axios 返回数据中的 data
        // const code = response.data.code || 200;
        // // 获取错误信息
        // const msg =
        //   errorCode[code] || response.data.message || errorCode["default"];
        //
        // if (code === 401) {
        //   if (!isRelogin.value) {
        //     isRelogin.value = true;
        //     ElMessageBox.confirm(
        //       "登录状态已过期，您可以继续留在该页面，或者重新登录",
        //       "系统提示",
        //       {
        //         confirmButtonText: "重新登录",
        //         cancelButtonText: "取消",
        //         type: "warning"
        //       }
        //     )
        //       .then(async () => {
        //         isRelogin.value = false;
        //         console.log("logout");
        //         await useUserStoreHook().logOut();
        //       })
        //       .catch(() => {
        //         isRelogin.value = false;
        //       });
        //   }
        // } else if (code === 500) {
        //   message(msg, { type: "error" });
        // } else if (code != 200) {
        //   ElNotification.error({ title: msg });
        //   return Promise.reject("error");
        // }

        return response.data;
      },
      (error: PureHttpError) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        // 关闭进度条动画
        NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as PureHttpRequestConfig;

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response);
        })
        .catch(error => {
          // console.log(error);
          // 错误处理：https://github.com/valarchie/AgileBoot-Front-End/tree/main
          // 某些情况网络失效，此时直接进入error流程，所以在这边也进行拦截
          if (!error.response) {
            console.log(error);
            // message("响应错误：无响应数据", { type: "error" });
            reject(error);
          }

          if (error.response && error.response.status >= 500) {
            message(`网络异常：${error}`, { type: "error" });
          }

          if (error.response && error.response.status === 401) {
            // 401后，执行登出相关操作，不能直接使用userStore，会造成死循环
            removeToken();
            useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
            resetRouter();
            router.push("/login");
            message("未认证，请认证后重试", { type: "error" });
          }

          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
          ) {
            message(`请求接口出错：${error}`, { type: "error" });
          }

          reject(error);
        });
    });
  }

  /** 单独抽离的`post`工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: PureHttpRequestConfig
  ): Promise<T> {
    return this.request<T>("post", url, params, config);
  }

  /** 单独抽离的`get`工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: PureHttpRequestConfig
  ): Promise<T> {
    return this.request<T>("get", url, params, config);
  }

  public upload<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    data?: AxiosRequestConfig<P>,
    config?: PureHttpRequestConfig
  ): Promise<T> {
    return this.request<T>(
      "post",
      url,
      { data, params },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        ...config
      }
    );
  }
}

export const http = new PureHttp();
