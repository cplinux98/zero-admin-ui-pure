import { http } from "@/utils/http";
import { baseURLApiV1, type Result } from "@/api/utils";

export const getAsyncRoutes = () => {
  return http.request<Result>("get", baseURLApiV1("/system/route"));
};
