/*
 * filename: UserController
 * overview: 用户相关路由控制器
 */

import { Controller, Post, HttpCode, Body, UseGuards, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { RolesGuard } from '../common/guard/roles.guard';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * 更新用户信息
     * @param createCatDto 用户对象
     */
    @Post('update')
    @HttpCode(200)
    async update(@Body() createCatDto: CreateUserDto) {
        return await this.userService.update(createCatDto);
    }

    /**
     * 根据相应的条件查询用户列表
     * @param createCatDto 用户对象
     */
    @Get('list')
    @HttpCode(200)
    async find(@Query() createCatDto: CreateUserDto) {
        return await this.userService.find(createCatDto);
    }

}
