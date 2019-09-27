/*
 * filename: ChatController
 * overview: 会话相关路由控制器
 */

import { Controller, Post, HttpCode, Body, UseGuards, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { RolesGuard } from '../common/guard/roles.guard';

@Controller('chat')
@UseGuards(RolesGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    /**
     * 获取会话列表
     * @param id 当前用户 id
     */
    @Get('list')
    async getChatList(@Query('id') id: string) {
        return await this.chatService.getChatList(id);
    }

    /**
     * 获取聊天信息
     * @param id 当前用户 id
     * @param targetId 目标用户 id
     */
    @Get('messages')
    async getMessages(@Query('id') id: string, @Query('targetId') targetId: string) {
        return this.chatService.getMessages(id, targetId);
    }

    /**
     * 设置消息已读
     * @param from 信息发送者 id
     * @param to 信息接受者 id
     */
    @Post('read')
    @HttpCode(200)
    async readMessage(@Body('from') from: string, @Body('to') to: string) {
        return this.chatService.readMessage(from, to);
    }

}
