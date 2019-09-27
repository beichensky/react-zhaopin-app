import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { EventsModule } from './events/events.module';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/zhaopin', { useNewUrlParser: true, useFindAndModify: false }),
        UserModule,
        ChatModule,
        EventsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
