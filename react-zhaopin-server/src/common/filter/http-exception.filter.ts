/*
 * filename: HttpExceptionFilter
 * overview: 异常过滤器
 */

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
            code: exception.getStatus(),
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message.message,
            });
    }
}
