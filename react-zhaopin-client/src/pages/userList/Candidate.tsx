/*
 * filename: Candidate
 * overview: Candidate 列表
 */

import React from 'react';
import { RoleType } from 'utils/enums';
import UserList from './components/UserList';
import { NavBar } from 'components';
import LoadAndRefreshModel from 'components/loadAndRefresh/model';
import User from 'interface/User';

const refreshModel = new LoadAndRefreshModel<User>();

const Candidate = () => {

    return (
        <>
            <NavBar>求职者列表</NavBar>
            <UserList type={ RoleType.Candidate } refreshModel={ refreshModel } />
        </>
    )
}

export default Candidate;
