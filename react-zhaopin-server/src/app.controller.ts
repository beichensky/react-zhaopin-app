import { Controller, Get, Post, Body, HttpCode, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dtos/create-user.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly userService: UserService) {}

    /**
     * Hello World
     */
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    /**
     * 用户注册
     * @param createUserDto 用户对象
     */
    @Post('register')
    @HttpCode(200)
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    /**
     * 用户登录
     * @param createUserDto 用户对象
     */
    @Post('login')
    @HttpCode(200)
    async login(@Body() createUserDto: CreateUserDto) {
        return await this.userService.login(createUserDto);
    }

    /**
     * 通过请求头中属性获取用户信息
     * @param headers 请求头
     */
    @Get('user')
    @HttpCode(200)
    async getUser(@Headers() headers) {
        return await this.userService.getUser(headers);
    }
}
