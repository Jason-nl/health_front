import http from "@/libs/http";

// api前缀
const setmeal_api_prefix = "/api/setmeal";

export const findAllCheckGroup = params =>
    http('GET','/api/checkgroup/findAll')

// 新增或更新套餐
export const saveOrUpdate = params =>
    http("POST", `${setmeal_api_prefix}/saveOrUpdate`, params);

// 分页查询 pageCurrent pageSize
export const findSetmealPage = params =>
    http("POST", `${setmeal_api_prefix}/page`, params);

// 删除套餐
export const deleteSetmeal = params =>
    http("DELETE", `${setmeal_api_prefix}/delete/${params}`);

//查询套餐回显数据
export const findSetmealInfoById = params =>
    http("GET", `${setmeal_api_prefix}/findSetmealInfoById/${params}`);
