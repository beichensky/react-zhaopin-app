import { get } from "utils/request"

/**
 * 获取会话列表
 * @param id 当前用户 id
 */
export const fetchChatList = (id: string) => {
    return get('/api/chat/list', {
        id
    })
}