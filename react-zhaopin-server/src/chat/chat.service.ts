/*
 * filename: ChatService
 * overview: 会话相关数据 Service
 */

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { uniq, uniqWith } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './interfaces/chat.interface';
import { CreateChatDto } from './dtos/create-chat.dto';
import { Response } from '../Response.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {

    constructor(@InjectModel('Chat') private readonly chatModel: Model<Chat>, private readonly userService: UserService) {}

    /**
     * 创建新用户
     * @param createChatDto
     */
    async create(createChatDto: CreateChatDto): Promise<Response<Chat | object>> {
        const createdCat = new this.chatModel(createChatDto);
        if (createChatDto.content) {
            return { code: 0, data: await createdCat.save() || {}, message: '' };
        }
        return { code: 1, data: {}, message: '请输入聊天内容' };
    }

    /**
     * 获取会话列表
     * @param id 当前登录用户 id
     */
    async getChatList(id: string) {
        // 根据 id 查询出相关对话信息
        let chats = await this.chatModel.find({$or: [{ from: id }, { to: id }]}).sort({ createTime: -1 });
        // 查询出当前用户所有未读消息总条数
        const unReadTotal = await this.chatModel.find({read: false, to: id }).countDocuments();
        // 对 chats 进行去重，两个用户的聊天信息只保留一条
        chats = uniqWith(chats, (item1: Chat, item2: Chat) => {
            return `${ item1.from }_${ item1.to }` === `${ item2.from }_${ item2.to }`
                || `${ item1.from }_${ item1.to }` === `${ item2.to }_${ item2.from }`;
        });
        // 提取出所有与当前用户聊过天，但不是当前用户的用户 id，保存在集合中
        let idList = [];
        chats.forEach(({ from, to }: Chat) => {
            if (from !== id) {
                idList.push(from);
            }
            if (to !== id) {
                idList.push(to);
            }
        });
        idList = uniq(idList);

        // 根据 id 查询出所有与当前用户聊过天的用户信息集合
        // tslint:disable-next-line: no-shadowed-variable
        const promiseList = idList.map((item: string) => this.userService.findById(item));
        const userList = await Promise.all(promiseList);

        // 根据 id 查询出当前用户与别的用户的未读消息条数，保存在集合中
        const promiseReadList = idList.map((item: string) => this.chatModel
            .find({ read: false, chatId: `${ item }_${ id }` })
            .countDocuments());
        const unReadList = await Promise.all(promiseReadList);

        // 循环组合，将数据保存在 data 中
        const data = chats.map((item: Chat, index: number) => ({ user: userList[index], chat: item, unReadCount: unReadList[index] }));
        return {
            code: 0,
            data,
            unReadTotal,
            message: '',
        };
    }

    /**
     * 获取聊天内容
     * @param id 当前用户 id
     * @param targetId 目标用户 id
     */
    async getMessages(id: string, targetId: string) {
        const targetUser = await this.userService.modelFind({_id: targetId});
        const messages = await this.chatModel.find({ $or: [{ from: id, to: targetId }, { from: targetId, to: id }]}, { password: 0, _v: 0 });
        const data = {
            user: targetUser,
            messages,
        };
        return {
            code: 0,
            data,
            message: '',
        };
    }

    /**
     * 设置聊天信息已读
     * @param from 发送信息用户 id
     * @param to 接受信息用户 id
     */
    async readMessage(from: string, to: string) {
        const result = await this.chatModel.updateMany({ from, to, read: false }, {read: true});
        return { code: 0, data: result.nModified, message: '未读信息状态修改成功' };
    }

}
