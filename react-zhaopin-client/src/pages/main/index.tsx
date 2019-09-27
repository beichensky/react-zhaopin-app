/*
 * filename: Main
 * overview: 应用主界面
 */
import React, { FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, Switch, Route } from 'react-router-dom';
import { AuthModel } from 'common/authModel';
import { isEmpty } from 'lodash';
import TabPage from './components/tabPage';
import Message from 'pages/message';

type Props = {
    authModel: AuthModel,
} & RouteComponentProps;

const Main: FC<Props> = ({ authModel, history }) => {
    useEffect(() => {
        authModel.authRoute(history);
    }, [authModel.currentUser, authModel, history]);

    if (isEmpty(authModel.currentUser)) {
        return null;
    }

    return (
        <>
            <Switch>
                <Route path="/message/:id" component={ Message } />
                <Route path="/" component={ TabPage }/>
            </Switch>
        </>
    )
}

export default inject('authModel')(observer((Main)));
