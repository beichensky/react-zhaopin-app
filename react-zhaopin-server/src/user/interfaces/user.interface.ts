/*
 * filename: User
 * overview: 用户信息接口
 */

export interface User {
    username: string;
    password: string;
    type: string;
    header: string;
    post: string;
    info: string;
    company: string;
    salary: string;
    del: number;
}
