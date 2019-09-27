/*
 * filename: ChatList
 * overview: 会话信息列表界面
 */

import React, { useEffect, FC, useState } from 'react';
import chatModel from './model';
import { inject, observer } from 'mobx-react';
import { AuthModel } from 'common/authModel';
import { List, Badge, PullToRefresh, ActivityIndicator, Result } from 'antd-mobile';
import { Brief } from 'antd-mobile/lib/list/ListItem';
import { RouteComponentProps } from 'react-router';
import { onChatSocket, removeChatSocket } from 'utils/socket';
import { isEmpty } from 'lodash';
import styles from './index.module.less';

const Item = List.Item;

// 渲染 Result 组件中的图片
const renderImg = (src: string) => <img src={src} style={{ width: 60, height: 60 }} alt="" />;

type Props = {
    authModel: AuthModel;
} & RouteComponentProps

const ChatList: FC<Props> = ({ authModel, history }) => {

    const { chatList } = chatModel;
    const { _id: id } = authModel.currentUser;

    const [ refreshing, setRefreshing ] = useState<boolean>(false);

    useEffect(() => {
        chatModel.getChatList(id!);
    }, [id])

    useEffect(() => {
        // 添加函数事件
        onChatSocket({
            funName: 'chatList', 
            fun: () => chatModel.getChatList(id!)
        })

        return () => {
            // 移除函数
            removeChatSocket('chatList');
        }
    }, [id])

    /**
     * 聊表下拉刷新时触发
     */
    const onRefresh = () => {
        if (refreshing) {
            return;
        }
        setRefreshing(true);
        chatModel.getChatList(id!).then(() => {
            setRefreshing(false);
        });
    };

    const indicator = {
        activate: <div>松开立即刷新</div>,
        release: <ActivityIndicator size="small" text="拼命刷新中。。" />,
        finish: <div>刷新完成</div>
    }

    return (
        <div className={ styles.list }>
            <PullToRefresh
                direction="down"
                getScrollContainer={ () => window.document.body }
                refreshing={ refreshing }
                onRefresh={ onRefresh }
                indicator={ indicator }
                distanceToRefresh={ 32 }
                damping={ 100 }
            >
                {
                    isEmpty(chatList) ? 
                    <Result
                        img={renderImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
                        title={ '暂时还没有聊天内容哦，快发起聊天吧' }
                    />
                    :
                    <List>
                        {
                            chatList.map(item =>{
                                const targetUser = item.user
                                return (
                                <Item
                                    key={targetUser._id}
                                    extra={<Badge text={item.unReadCount}/>}
                                    thumb={targetUser.header ? require(`assets/images/${targetUser.header}.png`) : null}
                                    arrow='horizontal'
                                    onClick={() => history.push(`/message/${targetUser._id}`)}
                                >
                                    {targetUser.username}
                                    <Brief>{item.chat.content}</Brief>
                                </Item>
                                )
                            })
                        }
                    </List>
                }
            </PullToRefresh>
        </div>
    )
}

export default inject('authModel')(observer(ChatList));
