import http from "@/libs/http";

// api前缀
const checkgroup_api_prefix = "/api/checkgroup";

// 查询所有的检查项
export const findAllCheckItem = params =>
    http('GET', `/api/checkitem/findAll`)

// 新增或更新检查组
export const saveOrUpdate = params =>
    http("POST", `${checkgroup_api_prefix}/saveOrUpdate`, params);

// 分页查询 pageCurrent pageSize
export const findPage = params =>
    http("POST", `${checkgroup_api_prefix}/page`, params);

// 删除检查组
export const deleteCheckGroup = params =>
    http("DELETE", `${checkgroup_api_prefix}/delete/${params}`)

// 数据回显
export const findCheckGroupInfo = params =>
    http('GET', `${checkgroup_api_prefix}/findGroupInfoById/${params}`)
