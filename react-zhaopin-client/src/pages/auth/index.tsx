/*
 * filename: Auth
 * overview：用户登录、注册、更新界面
 */

import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import logo from '../../logo.svg';
import Login from './Login';
import Register from './Register'
import Info from './Info'
import { NavBar } from 'components';
import styles from './index.module.less';

const Auth: FC<RouteComponentProps> = ({ location }) => {

    const infoPage = location.pathname.includes('info')

    return (
        <div>
            <NavBar>{ infoPage ? '完善信息' : 'React 招聘' }</NavBar>
            { infoPage ? null : <img src={logo} className={ styles.logo } alt="logo" /> }
            <Switch>
                <Route path="/auth/register" component={ Register } />
                <Route path="/auth/info" component={ Info } />
                <Route path="/" component={ Login } />
            </Switch>
        </div>
    )
}

export default Auth;
