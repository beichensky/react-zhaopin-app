/*
 * filename：Info
 * overview：更新用户信息路由界面 
 */

import React, { FC, useState, useEffect } from 'react';
import { InputItem, TextareaItem, Button, Toast } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import { useLocalStore } from 'mobx-react-lite'
import { HeaderSelector } from 'components';
import { RouteComponentProps } from 'react-router-dom';
import { AuthModel } from 'common/authModel';
import { keys, values, zipObject } from 'lodash';
import { fetchUpdateUser } from 'common/authService';
import User from 'interface/User';
import Response from 'interface/Response';
import { RoleType } from 'utils/enums';

type Props = {
    authModel: AuthModel,
} & RouteComponentProps

const Info: FC<Props> = ({ authModel, history }) => {

    useEffect(() => {
        authModel.authRoute(history);
    }, [authModel.currentUser, authModel, history]);

    const [loading, setLoading] = useState<boolean>(false);

    const { type } = authModel.currentUser; 

    // 本地数据，用来保存老板或求职者的完善信息
    const model = type === RoleType.Boss ? {
        header: '',
        post: '',
        company: '',
        salary: '',
        info: '',
    }: {
        header: '',
        post: '',
        info: '',
    }

    // 使用 useLocalStore 将 model 数据转换为可被监听的数据
    const store = useLocalStore(() => model);

    /**
     * 更新用户信息操作
     */
    const save = () => {
        const { username = '' } = authModel.currentUser;
        if (!values(store).every(Boolean)) {
            Toast.fail('请将信息填写完整');
            return;
        }
        const user: Partial<User> = zipObject([...keys(store), "username"], [...values(store), username]);
        setLoading(true);
        fetchUpdateUser(user).then((result: Response<User>) => {
            const { code, data, message } = result;
            if (code === 0) {
                Toast.success(message);
                authModel.currentUser = data;
                history.replace('/');
            } else {
                Toast.fail(message);
            }
        })
        .catch(() => Toast.fail('请求错误，请稍后重试'))
        .finally(() => setLoading(false));
    }

    const setHeader = (header: string) => {
        store.header = header;
    }

    return (
        <div>
            <HeaderSelector setHeader={setHeader}/>
            {
                type === RoleType.Boss ? 
                    <>
                        <InputItem
                            placeholder='请输入招聘职位'
                            value={ store.post }
                            onChange={ val => store.post = val }
                        >
                            招聘职位:
                        </InputItem>
                        <InputItem
                            placeholder='请输入公司名称'
                            value={ store.company }
                            onChange={ val => store.company = val }
                        >
                            公司名称:
                        </InputItem>
                        <InputItem
                            placeholder='请输入职位薪资'
                            labelNumber={ 7 }
                            value={ store.salary }
                            onChange={ val => store.salary = val }
                        >
                            职位薪资(K):
                        </InputItem>
                        <TextareaItem
                            title="职位要求:"
                            placeholder='请输入职位要求'
                            rows={ 3 }
                            value={ store.info }
                            onChange={ val => store.info = val || '' }
                        />
                    </>
                    : 
                    <>
                        <InputItem 
                            placeholder='请输入求职岗位'
                            value={ store.post }
                            onChange={ val => store.post = val }
                        >
                            求职岗位:
                        </InputItem>
                        <TextareaItem
                            title="个人介绍:"
                            placeholder='请输入个人介绍'
                            rows={ 3 }
                            value={ store.info }
                            onChange={ val => store.info = val || '' }
                        />
                    </>
            }
            <Button type="primary" onClick={save} loading={ loading }>保&nbsp;&nbsp;&nbsp;存</Button>
        </div>
    )
};

export default inject('authModel')(observer(Info));
