/*
 * filename: Personal
 * overview: 个人中心
 */

import React, { FC } from 'react';
import { NavBar } from 'components';
import { inject, observer } from 'mobx-react';
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import { AuthModel } from 'common/authModel';
import { redirectToLogin } from 'utils';

const Item = List.Item
const Brief = Item.Brief

type Props = {
    authModel: AuthModel
}

const Personal: FC<Props> = ({ authModel }) => {

    /**
     * 退出登录
     */
    const logout = () => {
        Modal.alert('退出', '确定退出登录吗?', [
            {text: '取消'},
            {
                text: '确定',
                onPress: ()=> {
                    /**
                     * 删除 sessionStorage 和 Cookies 中保存的用户信息
                     */
                    sessionStorage.removeItem('userId');
                    Cookies.remove('userId');
                    redirectToLogin();
                }
            }
        ])
    }

    const { username = '', header = '头像1', company = '', post = '', info = '', salary = '' } = authModel.currentUser;
    
    return (
        <>
            <NavBar>个人中心</NavBar>
            <div>
                <Result
                    img={<img src={require(`assets/images/${header}.png`)} style={{width: 50}} alt="header"/>}
                    title={username}
                    message={company}
                />
    
                <List renderHeader={() => '相关信息'}>
                <Item multipleLine>
                    <Brief>职位: {post}</Brief>
                    <Brief>简介: {info}</Brief>
                    {salary ? <Brief>薪资(K): {salary}</Brief> : null}
                </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={ logout }>退出登录</Button>
                </List>
            </div>
        </>
    )
}

export default inject('authModel')(observer(Personal));
