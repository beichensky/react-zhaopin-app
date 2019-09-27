/*
 * filename: Response
 * overview: 返回给客户端的响应类型接口
 */

export interface Response<T> {
    code: number;
    message: string;
    data: T;
    page?: number;
    pageSize?: number;
    totalCount?: number;
}
