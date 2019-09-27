/*
 * filename：Login
 * overview：用户登录界面 
 */

import React, { useEffect, useState, FC } from 'react';
import { WingBlank, List, WhiteSpace, InputItem, Button, NoticeBar, Icon, Toast, Checkbox } from 'antd-mobile';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { AuthModel } from 'common/authModel';
import User from 'interface/User';
import { OnChangeParams } from 'antd-mobile/lib/checkbox/PropsType';

const CheckboxItem = Checkbox.CheckboxItem;

type Props = {
    authModel: AuthModel
} & RouteComponentProps;

const Login: FC<Props> = ({ history, authModel }) => {

    useEffect(() => {
        authModel.authRoute(history);
    }, [authModel.currentUser, authModel, history]);

    const [loading, setLoading] = useState<boolean>(false);
    
    const [errMessage, setErrMessage] = useState<string>('');

    const [username, setUsername] = useState<string>('');

    const [password, setPassword] = useState<string>('');

    const toRegister = () => {
        history.replace('/auth/register');
    }

    const login = () => {
        if (!username.trim()) {
            setErrMessage('请输入用户名');
            return;
        }
        if (!password.trim()) {
            setErrMessage('请输入密码');
            return;
        }
        setErrMessage('');
        setLoading(true);
        authModel.login(username, password, (result: string | User) => {
            if (typeof result === 'string') {
                setErrMessage(result);
            } else {
                Toast.success('登录成功', 2);
                history.replace('/');
            }
            setLoading(false);
        });
    }

    return (
        <div>
            <WingBlank>
                <List>
                    {
                        errMessage ? 
                            <NoticeBar mode="closable" icon={<Icon type="check-circle-x" size="xxs" />}>
                                { errMessage }
                            </NoticeBar> : null
                    }
                    <WhiteSpace />
                    <InputItem placeholder='请输入用户名' value={ username } clear onChange={ val => setUsername(val) }>用户名:</InputItem>
                    <WhiteSpace />
                    <InputItem placeholder='请输入密码' type="password" clear value={ password } onChange={ val => setPassword(val) }>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                    <WhiteSpace />
                    <CheckboxItem onChange={ (e: OnChangeParams) => authModel.setExpires(e.target.checked)}>
                        七天免登陆
                    </CheckboxItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={ login } loading={ loading }>登&nbsp;&nbsp;&nbsp;录</Button>
                    <WhiteSpace />
                    <Button onClick={toRegister}>还没有账户</Button>
                </List>
            </WingBlank>
        </div>
    )
}

export default inject('authModel')(observer((Login)));
