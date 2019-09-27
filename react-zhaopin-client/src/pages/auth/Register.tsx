/*
 * filename：Register
 * overview：用户注册界面 
 */

import React, { useState, FC } from 'react';
import { WingBlank, List, WhiteSpace, InputItem, Radio, Button, NoticeBar, Icon, Toast } from 'antd-mobile';
import { RouteComponentProps } from 'react-router-dom';
import { inject } from 'mobx-react';
import { RoleType } from 'utils/enums';
import styles from './index.module.less';
import { AuthModel } from 'common/authModel';

const ListItem = List.Item;

const { Boss, Candidate } = RoleType;

const radioData = [
    { type: Boss, name: '老板'},
    { type: Candidate, name: '求职者'},
]

type Props = {
    authModel: AuthModel;
} & RouteComponentProps;

const Register: FC<Props> = ({ history, authModel }) => {

    const [loading, setLoading] = useState<boolean>(false);

    const [errMessage, setErrMessage] = useState<string>('');

    const [type, setType] = useState<RoleType>(RoleType.Candidate);

    const [username, setUsername] = useState<string>('');

    const [password, setPassword] = useState<string>('');

    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const register = () => {
        if (!username.trim()) {
            setErrMessage('请输入账号');
            return;
        }
        if (!password.trim()) {
            setErrMessage('请输入密码');
            return;
        }
        if (password !== confirmPassword.trim()) {
            setErrMessage('两次密码不一致，请重新输入！');
            return;
        }
        setErrMessage('');
        setLoading(true)
        authModel.register(username, password, type, (result) => {
            if (typeof result === 'string') {
                setErrMessage(result);
            } else {
                Toast.success('注册并登录成功', 2);
                history.replace('/info');
            }
            setLoading(false);
        })
    };
    const toLogin = () => {
        history.replace('/auth');
    }

    return (
        <div>
            <WingBlank>
                <List>
                    {
                        errMessage ? 
                            <NoticeBar mode="closable" icon={<Icon type="" size="xxs" />}>
                                { errMessage }
                            </NoticeBar> : null
                    }
                    <WhiteSpace />
                    <InputItem placeholder='请输入用户名' value={ username } onChange={ val => setUsername(val) }>用户名：</InputItem>
                    <WhiteSpace />
                    <InputItem placeholder='请输入密码' type="password" value={ password } onChange={ val => setPassword(val) }>密&nbsp;&nbsp;&nbsp;&nbsp;码：</InputItem>
                    <WhiteSpace />
                    <InputItem placeholder='请输入确认密码' type="password" value={ confirmPassword } onChange={ val => setConfirmPassword(val) }>确认密码：</InputItem>
                    <WhiteSpace />
                    <ListItem>
                    <span>用户类型:</span>
                    &nbsp;&nbsp;&nbsp;
                    {
                        radioData.map(({ type: roleType, name }) => 
                            <Radio 
                                key={ roleType }
                                className={ styles.radio }
                                checked={ type=== roleType }
                                onChange={ () => setType(roleType) }
                            >
                                { name }
                            </Radio>
                        )
                    }
                    </ListItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={ register } loading={ loading }>注&nbsp;&nbsp;&nbsp;册</Button>
                    <WhiteSpace />
                    <Button onClick={ toLogin }>已有账户</Button>
                </List>
            </WingBlank>
        </div>
    )
}

export default inject('authModel')(Register);
