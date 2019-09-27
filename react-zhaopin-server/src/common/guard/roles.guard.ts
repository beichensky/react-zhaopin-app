/*
 * filename: RolesGuard
 * overview: 角色拦截器
 */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        // 这里就是进行模拟一下，判断请求头中是否有 x-auth-token 属性，没有的话说明没有权限，有则默认有请求权限
        const headers = request.headers;

        return !!headers['x-auth-token'];
    }
}
