/*
 * filename: Chat
 * overview: 会话信息接口
 */

export default interface Chat {
    _id: string;
    from: string;
    to: string;
    content: string;
    chatId: string;
}
