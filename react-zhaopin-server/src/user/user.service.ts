/*
 * filename: UserService
 * overview: 用户相关数据 Service
 */

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { Response } from '../Response.interface';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    /**
     * 创建新用户
     * @param createUserDto
     */
    async create(createUserDto: CreateUserDto): Promise<Response<User | object>> {
        const createdCat = new this.userModel(createUserDto);
        const existsUser = await this.userModel.findOne({ username: createUserDto.username }, { password: 0 });
        if (existsUser) {
            return { code: 1, data: {}, message: '用户名已存在' };
        }
        return { code: 0, data: await createdCat.save(), message: '' };
    }

    /**
     * 登录
     * @param createUserDto
     */
    async login(createUserDto: CreateUserDto): Promise<Response<User | object>> {
        const existsUser = await this.userModel.findOne({ username: createUserDto.username });
        if (existsUser && existsUser.password === createUserDto.password) {
            return { code: 0, data: existsUser, message: '登录成功' };
        }
        return { code: 1, data: {}, message: '用户名或密码错误' };
    }

    /**
     * 更新用户
     * @param createUserDto
     */
    async update(createUserDto: CreateUserDto): Promise<Response<User | object>> {
        const user = await this.userModel.findOneAndUpdate({ username: createUserDto.username }, createUserDto, { new: true });
        if (user) {
            return { code: 0, data: user, message: '用户信息更新成功' };
        }
        return { code: 1, data: {}, message: '用户信息更新失败' };
    }

    /**
     * 获取当前用户信息
     * @param headers 用户 token 值，这里用 id 进行模拟
     */
    async getUser(headers): Promise<Response<User | object>> {
        const userId = headers['x-auth-token'];
        const user = userId ? await this.userModel.findById(userId) : '';
        if (user) {
            return { code: 0, data: user, message: '用户信息更新成功' };
        }
        return { code: 1, data: {}, message: '用户不存在' };
    }

    /**
     * 查询用户列表
     * @param createUserDto
     */
    async find(createUserDto: CreateUserDto): Promise<Response<User[]>> {
        const { page, pageSize, ...rest } = createUserDto;
        const totalCount = await this.userModel.find({ ...rest, __v: 0 }).countDocuments();
        const userList = await this.userModel.find({ ...rest, __v: 0 }, { password: 0, __v: 0 })
            .limit(+pageSize).skip((page - 1) * pageSize).exec();
        if (userList && userList.length > 0) {
            return { code: 0, data: userList, message: '用户列表查询成功', page, pageSize, totalCount };
        }
        return { code: 0, data: userList, message: '用户列表无数据', page: +page === 0 ? page : Math.ceil(totalCount / page), pageSize, totalCount };
    }

    /**
     * 供别的模块调用查询用户列表的方法
     * @param params 查询条件
     * @param filter 过滤条件
     */
    async modelFind(params: any, filter: any = { password: 0, _v: 0 }): Promise<Response<User[]>> {
        return this.userModel.find(params, filter);
    }

    /**
     * 根据 id 查询对应用户信息
     * @param id 用户 id
     */
    async findById(id: string): Promise<User> {
        return await this.userModel.findById(id, { password: 0 }).exec();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

}
