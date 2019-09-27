/*
 * filename: UserList
 * overview: 显示指定用户列表的UI组件
 */

import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Card } from 'antd-mobile';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import User from 'interface/User';
import { RoleType } from 'utils/enums';
import { LoadAndRefresh } from 'components';
import { fetchUserList } from '../service';
import Pagination from 'interface/Pagination';
import LoadAndRefreshModel from 'components/loadAndRefresh/model';
import RcQueueAnim from 'rc-queue-anim';


const Header = Card.Header
const Body = Card.Body

type Props = {
    type: RoleType,
    refreshModel: LoadAndRefreshModel<User>
} & RouteComponentProps;

const UserList: FC<Props> = ({ type, refreshModel, history }) => {

    const row = (user: User) => {
        return (
            <RcQueueAnim type='left'>
                <div key={user._id} style={{ padding: '0 6px', background: '#F5F5F9' }}>
                    <Card onClick={() => history.push(`/message/${user._id}`) }>
                    <Header
                        thumb={require(`assets/images/${user.header || "头像1"}.png`)}
                        extra={user.username}
                    />
                    <Body>
                        <div>职位: {user.post || '暂无'}</div>
                        { user.company ? <div>公司: {user.company}</div> : null }
                        { user.salary ? <div>月薪(K): {user.salary}</div> : null }
                        <div>描述: {user.info || '暂无'}</div>
                    </Body>
                    </Card>
                </div>
            </RcQueueAnim>
        )
    }

    return (
        <LoadAndRefresh
            row={ row }
            fetchListData={ (pagination: Pagination) => fetchUserList(type, pagination) }
            resultTitle={ type === RoleType.Boss ? '暂无相关 Boss 信息' : '暂无相关求职者信息' }
            refreshModel={ refreshModel }
        />
    )
}

export default withRouter(observer(UserList));
