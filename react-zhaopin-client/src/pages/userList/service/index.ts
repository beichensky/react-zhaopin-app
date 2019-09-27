import { get } from "utils/request"
import Pagination from "interface/Pagination";

/**
 * 请求用户列表
 * @param type 用户 type
 * @param page 当前页
 * @param pageSize 每页条数
 */
export const fetchUserList = (type: string, pagination: Pagination) => {
    const { page, pageSize } = pagination;
    return get('/api/user/list', {
        type,
        page,
        pageSize
    });
}