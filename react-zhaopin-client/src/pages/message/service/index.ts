import { get, post } from "utils/request"

/**
 * 获取聊天信息
 * @param id 
 * @param targetId 
 */
export const fetchChat = (id: string, targetId: string) => {
    return get('/api/chat/messages', {
        id,
        targetId,
    });
}

/**
 * 设置消息已读
 * @param from 
 * @param to 
 */
export const fetchReadMessage = (from: string, to: string) => {
    return post('/api/chat/read', {
        from,
        to
    });
}