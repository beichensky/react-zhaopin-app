/*
 * filename: User
 * overview: 用户信息接口
 */

import { RoleType } from "utils/enums";

/**
 * 用户数据接口
 */
export default interface User {
    _id: string;
    username: string;
    password: string;
    type: RoleType;
    header: string;
    post: string;
    info: string;
    company: string;
    salary: string;
}
