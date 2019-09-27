/*
 * filename: Boss
 * overview: Boss 列表
 */
import React from 'react';
import UserList from './components/UserList';
import { NavBar } from 'components';
import { RoleType } from 'utils/enums';
import LoadAndRefreshModel from 'components/loadAndRefresh/model';
import User from 'interface/User';

const refreshModel = new LoadAndRefreshModel<User>();

const Boss = () => {

    return (
        <>
            <NavBar>Boss 列表</NavBar>
            <UserList type={ RoleType.Boss } refreshModel={ refreshModel } />
        </>
    )
}

export default Boss;
