/*
 * filename: Pagination
 * overview: 分页信息接口
 */

export default interface Pagination {
    page: number;
    pageSize: number;
    total?: number;
}
