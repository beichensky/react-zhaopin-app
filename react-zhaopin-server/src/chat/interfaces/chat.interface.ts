/*
 * filename: Chat
 * overview: 会话内容接口
 */

export interface Chat {
    from: string;
    to: string;
    chatId: string;
    content: string;
    read: boolean;
    createTime: number;
    del: number;
}
