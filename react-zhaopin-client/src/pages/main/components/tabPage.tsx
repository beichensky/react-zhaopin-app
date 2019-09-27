/*
 * filename: TabPage
 * overview: 应用主界面下方 Tab 组件
 */

import React, { FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { TabBar } from 'antd-mobile';
import ChatList from 'pages/chatList';
import Personal from 'pages/personal';
import { Route, RouteComponentProps } from 'react-router';
import { AuthModel } from 'common/authModel';
import { Boss, Candidate } from 'pages/userList';
import { RoleType } from 'utils/enums';
import chatModel from '../../chatList/model';

const TabItem = TabBar.Item;

interface Tab {
    path: string;
    component: any;
    title: string;
    icon: string;
    text: string;
    hidden?: boolean
}

type Props = {
    authModel: AuthModel
} & RouteComponentProps;

const TabPage: FC<Props> = ({ authModel, history, location }) => {

    // Tab 数组
    const tabs: Tab[] = [
        {
            path: '/candidate', // 路由路径
            component: Candidate,
            title: '求职者列表',
            icon: 'candidate',
            text: '求职者',
            hidden: authModel.currentUser.type === RoleType.Candidate
        },
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: 'Boss 列表',
            icon: 'boss',
            text: 'Boss',
            hidden: authModel.currentUser.type === RoleType.Boss
        },
        {
            path: '/chat', // 路由路径
            component: ChatList,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '我的',
        }
    ]

    // 需要展示 Tab 集合
    const tabList = tabs.filter((tab: Tab) => !tab.hidden);

    useEffect(() => {
        if (location.pathname === '/') {
            history.replace(tabList[0].path);
        }
    })
    
    return (
        <TabBar>
            {
                tabList.map((tab: Tab) => (
                    <TabItem key={ tab.path }
                        style={{ height: 'auto' }}
                        badge={ tab.path === '/chat' ? chatModel.unReadTotal : 0 }
                        title={ tab.text }
                        icon={{uri: require(`assets/images/${tab.icon}.png`)}}
                        selectedIcon={{ uri: require(`assets/images/${tab.icon}-selected.png`) }}
                        selected={ location.pathname === tab.path }
                        onPress={ () => history.replace(tab.path) }
                    >
                        <Route to={ tab.path } component={ tab.component } />
                    </TabItem>
                ))
            }
        </TabBar>
    )
}

export default inject('authModel')(observer(TabPage));
