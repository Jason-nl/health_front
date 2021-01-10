import http from "@/libs/http";

// api前缀
const checkitem_api_prefix = "/api/checkitem";

// 新增或更新检查项
export const saveOrUpdate = params =>
    http("POST", `${checkitem_api_prefix}/saveOrUpdate`, params);

// 分页查询 pageCurrent pageSize
export const findPage = params =>
    http("POST", `${checkitem_api_prefix}/page`, params);

// 删除检查项
export const deleteCheckItem = params =>
    http("DELETE", `${checkitem_api_prefix}/delete/${params}`)
