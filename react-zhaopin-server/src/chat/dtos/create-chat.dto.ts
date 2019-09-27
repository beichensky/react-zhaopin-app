/*
 * filename: CreateChatDto
 * overview: 创建会话内容的 dto 对象
 */

export class CreateChatDto {
    readonly from: string;
    readonly to: string;
    readonly chatId: string;
    readonly content: string;
    readonly read: boolean;
    readonly createTime: number;
    readonly del: number;
    readonly [propName: string]: any;
}
