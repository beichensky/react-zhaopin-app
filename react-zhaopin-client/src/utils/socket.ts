/**
 * filanme: socket
 * overview: socket.io 相关工具函数
 */

import io from 'socket.io-client';

interface EventFun {
    funName: string;
    fun: (data: any) => void;
}

const socket = io('http://localhost:8080');
const onChatFuns: EventFun[] = [];

socket.on('connect', function() {
    console.log('Connect');
});
socket.on('exception', function(data: any) {
    console.log('exception', data);
});
socket.on('disconnect', function() {
    console.log('Disconnected');
});

socket.on('chat', function(data: any) {
    onChatFuns.forEach(({fun}) => {
        fun(data);
    })
    console.log('chat', data);
});

/**
 * 向服务端 chat 事件发送数据的函数
 * @param data 发送给服务端的数据
 */
export const sendChatSocket = (data: any) => {
    socket.emit('chat', data);
}

/**
 * 将 eventFun 添加到 onChatFuns 集合中，客户端触发 chat 事件时会进行调用
 * @param eventFun 客户端 chat 事件接收到服务端发送的数据时调用的方法
 */
export const onChatSocket = (eventFun: EventFun) => {
    const index = onChatFuns.findIndex(item => item.funName === eventFun.funName);
    if (index >= 0) {
        onChatFuns.splice(index, 1, eventFun);
    } else {
        onChatFuns.push(eventFun);
    }
}

/**
 * 移除 onChatFuns 中对应的函数
 * @param funName 函数名
 */
export const removeChatSocket = (funName: string) => {
    const index = onChatFuns.findIndex(item => item.funName === funName);
    onChatFuns.splice(index, 1);
}


export default socket;
