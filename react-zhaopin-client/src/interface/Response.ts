/*
 * filename: Response
 * overview: 网络请求返回数据接口
 */

export default interface Response<T> {
    code: number;
    data: T;
    message: string;
    page?: number;
    pageSize?: number;
    totalCount? : number;
    [propName: string]: any;
}
