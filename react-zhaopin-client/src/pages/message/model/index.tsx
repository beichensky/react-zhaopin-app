/*
 * filename: MessageModel
 * overview: Message 界面相关数据 Model
 */

import { observable, action, runInAction } from 'mobx';
import User from 'interface/User';
import { fetchChat, fetchReadMessage } from '../service';
import Chat from 'interface/Chat';
import { errorCaptured } from 'utils';
import Response from 'interface/Response';
import { sendChatSocket } from 'utils/socket';

export default class MessageModel {

    /**
     * 对话信息：包含目标用户信息和所有对话信息
     */
    @observable 
    chat = {
        user: {} as User,
        messages: [] as Chat[]
    }

    /**
     * 获取对话相关信息
     */
    @action
    getChat = async (id: string, targetId: string) => {
        const [, result]: [any, Response<{ user: User[], messages: Chat[] }> | null] = await errorCaptured<{ user: User[], messages: Chat[] }>(fetchChat, id, targetId);
        runInAction(() => {
            const { code, data } = result!;
            if (code === 0) {
                this.chat = data ? {
                    messages: data.messages,
                    user: data.user[0]
                } : { 
                    messages: [] as Chat[],
                    user: {} as User
                };
            }
        })
    }

    /**
     * 设置消息为已读
     */
    @action
    readMsg = (from: string, to: string) => {
        fetchReadMessage(from, to);
    }

    /**
     * 发送消息
     */
    @action
    sendMsg = ({ from, to, content }: Partial<Chat>) => {
        sendChatSocket({ from, to, content });
    }

    /**
     * 重置 chat 数据
     */
    resetChat = () => {
        this.chat = {
            messages: [] as Chat[],
            user: {} as User
        }
    }

}
