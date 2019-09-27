/*
 * filename: EventsModule
 * overview: socket 通讯模块
 */

import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ChatModule } from '../chat/chat.module';

@Module({
    imports: [ChatModule],
    providers: [EventsGateway],
})
export class EventsModule {}
