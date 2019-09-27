/*
 * filename: CreateUserDto
 * overview: 创建用户信息的 dto 对象
 */

export class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly type: string;
    readonly header: string;
    readonly post: string;
    readonly info: string;
    readonly company: string;
    readonly salary: string;
    readonly del: number;
    readonly [propName: string]: any;
}
