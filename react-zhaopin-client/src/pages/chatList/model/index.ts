/*
 * filename: ChatModel
 * overview: 承载会话列表界面相关数据
 */

import { observable, action, runInAction } from 'mobx';
import { fetchChatList } from '../service';
import User from 'interface/User';
import Chat from 'interface/Chat';
import { errorCaptured } from 'utils';
import Response from 'interface/Response';

/**
 * 后端返回的数据类型
 */
type ChatResult = {
    user: User;
    chat: Chat;
    unReadCount: number;
}

class ChatModel {

    // 未读信息总条数
    @observable
    unReadTotal = 0;

    // 会话列表数据集合
    @observable
    chatList: ChatResult[] = [];

    // 获取会话列表数据
    @action
    getChatList = async (id: string) => {
        const [, result]: [any, Response<ChatResult[]> | null] = await errorCaptured<ChatResult[]>(fetchChatList, id);
        runInAction(() => {
            if (result) {
                const { code, data, unReadTotal } = result;
                if (code === 0 && data) {
                    this.unReadTotal = unReadTotal;
                    this.chatList = data;
                }
            }
        })
    }
}

export default new ChatModel();
