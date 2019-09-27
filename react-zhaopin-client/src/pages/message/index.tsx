/*
 * filename: Message
 * overview: 聊天界面
 */

import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AuthModel } from 'common/authModel';
import { inject, observer } from 'mobx-react';
import { NavBar } from 'components';
import { Icon, List, InputItem, Grid } from 'antd-mobile';
import MessageModel from './model';
import { isEmpty } from 'lodash';
import styles from './index.module.less';
import Chat from 'interface/Chat';
import { onChatSocket, removeChatSocket } from 'utils/socket';
import Response from 'interface/Response';

const Item = List.Item;

const model = new MessageModel();

type Props = {
    authModel: AuthModel;
} & RouteComponentProps<{ id: string; }>;

let emojis: any[] = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
    ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
    ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
    ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'];
emojis = emojis.map(emoji => ({text: emoji}));

const Message: FC<Props> = ({ history, match, authModel }) => {

    const { _id: id, header: userHeader } = authModel.currentUser;
    const { readMsg, sendMsg, chat, resetChat } = model;
    const targetId = match.params.id

    // 发送内容
    const [content, setContent] = useState<string>('');
    // 是否展示表情表格
    const [isShow, setShow] = useState<boolean>(false);

    useEffect(() => {
        // 进入界面滚动到最底部
        window.scrollTo(0, document.body.scrollHeight);
    })

    useEffect(() => {
        const targetId = match.params.id;
        // 获取聊天信息
        model.getChat(id!, targetId);
        return () => {
            // 设置相关消息为已读
            readMsg(targetId, id!);
            resetChat();
        }
    }, [match.params.id, id, readMsg, resetChat])
    
    /**
     * 切换表情展示
     */
    const toggleShow = () => {
        if(!isShow) {
            // 异步手动派发resize事件,解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
        setShow(!isShow);
    }
    
    /**
     * 点击发送按钮触发函数
     */
    const handleSend = () => {
        // 收集数据
        const from = id || ''
        const to = match.params.id
        // 发送请求(发消息)
        if(content) {
            sendMsg({ from, to, content: content.trim() });
        }
        // 清除输入数据
        setContent('');
        setShow(false);
    }
    const {user: targetUser, messages} = chat;

    useEffect(() => {
        // 添加函数事件
        onChatSocket({
            funName: 'message', 
            fun: ({ data }: Response<Chat>) => {
                if ([data.to, data.from].sort().join('_') === [targetId, id!].sort().join('_')) {
                    messages.push(data);
                }
            }
        })

        return () => {
            // 移除函数
            removeChatSocket('message');
        }
    }, [messages, targetId, id])
    
    // 如果还没有获取目标用户数据, 直接不做任何展示
    if(isEmpty(targetUser)) {
        return null;
    }

    // 得到目标用户的header图片对象
    const targetHeader = targetUser.header

    return (
        <div className={ styles.chatPage }>
            <NavBar
                icon={<Icon type='left'/>}
                onLeftClick={()=> history.goBack()}
            >
                {targetUser.username}
            </NavBar>
            <List style={{ paddingBottom: isShow ? 230 : 50 }}>
                {
                    messages.map((msg: any) => {
                        if(targetId === msg.from) { // 对方发给我的
                            return (
                                <Item
                                    wrap
                                    key={msg._id}
                                    thumb={require(`assets/images/${targetHeader || "头像1"}.png`)}
                                >
                                    {msg.content}
                                </Item>
                            )
                        } else { // 我发给对方的
                            return (
                                <Item
                                    wrap
                                    key={msg._id}
                                    className={ styles.chatMe }
                                    extra={ <img src={require(`assets/images/${userHeader || "头像1"}.png`)} alt="头像" /> }
                                >
                                    {msg.content}
                                </Item>
                            )
                        }
                    })
                }
            </List>
            <div className={ styles['input-bar'] }>
                <InputItem
                    placeholder="请输入"
                    value={content}
                    onChange={ val => setContent(val) }
                    onFocus={ () => setShow(false) }
                    extra={
                        <span>
                            {/* // eslint-disable-next-line */}
                            <span onClick={ toggleShow } style={{ marginRight:5 }} role="img">😊</span>
                            <span onClick={ handleSend }>发送</span>
                        </span>
                    }
                />
                {
                    // 显示表情的表格
                    isShow ? (
                        <Grid
                            data={ emojis }
                            columnNum={ 8 }
                            carouselMaxRow={ 4 }
                            isCarousel
                            onClick={(item) => {
                                setContent(content + item!.text);
                            }}
                        />) : null
                }
            </div>
        </div>
    )
}


export default inject('authModel')(observer(Message));
