import http from "@/libs/http";

// api前缀
const ordersetting_api_prefix = "/api/ordersetting";

// 新增或更新套餐
export const findSettingData = (...params) =>
  http("GET", `${ordersetting_api_prefix}/findSettingData/${params[0]}/${params[1]}`);

export const updateNumberAndOrderDate = (...params) =>
  http('PUT',`${ordersetting_api_prefix}/updateNumberAndOrderDate/${params[0]}/${params[1]}`)