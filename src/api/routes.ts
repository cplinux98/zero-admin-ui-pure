import { http } from "@/utils/http";
import { baseURLApiV2, type Result } from "@/api/utils";

export const getAsyncRoutes = () => {
  return http.request<Result>("get", baseURLApiV2("/system/route"));
};
