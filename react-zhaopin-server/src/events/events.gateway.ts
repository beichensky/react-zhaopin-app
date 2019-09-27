/*
 * filename: EventsGateway
 * overview: socket 通讯器
 */

import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from '../chat/chat.service';
import { CreateChatDto } from '../chat/dtos/create-chat.dto';

@WebSocketGateway()
export class EventsGateway {

    constructor(private readonly chatService: ChatService) {}

    @WebSocketServer()
    server: Server;

    /**
     * 服务端触发 chat 事件时
     * @param client 客户端对象
     * @param data 客户端传递过来的数据
     */
    @SubscribeMessage('chat')
    async create(client, data: CreateChatDto) {
        const chat: CreateChatDto = { ...data, createTime: Date.now(), chatId: `${ data.from }_${ data.to }`, read: false };
        const message = await this.chatService.create(chat);
        // 通知对应客户端 chat 事件
        client.emit('chat', message);
        // 通知其他客户端 chat 事件
        client.broadcast.emit('chat', message);
    }

}
