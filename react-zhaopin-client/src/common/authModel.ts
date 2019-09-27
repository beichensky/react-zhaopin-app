/*
 * 存放用户信息的公共 Model
 */
import { observable, action } from 'mobx';
import { RoleType } from 'utils/enums';
import { errorCaptured, canGetUser } from 'utils';
import Response from 'interface/Response';
import User from 'interface/User';
import { History } from 'history';
import { isEmpty } from 'lodash';
import Cookies from 'js-cookie';
import { fetchLogin, fetchRegister, fetchUser } from './authService';

export class AuthModel {
    // 错误信息
    @observable
    errMessage: string = '';

    // 当前用户信息
    @observable
    _currentUser: Partial<User> = { };

    // 是否保存在 cookie 中
    expires = false;

    public get currentUser() : Partial<User> {
        return this._currentUser;
    }
    
    public set currentUser(user: Partial<User>) {
        // 保存在 sessionStorage 中
        sessionStorage.setItem("userId", `${user._id}`);
        // 如果需要免登陆则保存在 cookie 中
        this.expires ? Cookies.set('userId', `${user._id}`, { expires: 7 }) : Cookies.remove('userId');
        this._currentUser = user;
    }

    /**
     * 登录功能
     */
    @action
    login = async (username: string, password: string, fn?: (user: User | string) => void) => {
        const [, result]: [any, Response<User> | null] = await errorCaptured<User>(fetchLogin, username, password);
        this.callback(result, fn);
    }

    /**
     * 注册功能
     */
    @action
    register = async (username: string, password: string, type: RoleType, fn?: (user: User | string) => void) => {
        const [, result]: [any, Response<User> | null] = await errorCaptured<User>(fetchRegister, username, password, type);
        this.callback(result, fn);
    }

    /**
     * 获取用户信息
     */
    @action
    getUser = async (fn?: (user: User | string) => void) => {
        const [, result]: [any, Response<User> | null] = await errorCaptured<User>(fetchUser);
        this.callback(result, fn);
    }

    @action
    callback = (result: Response<User> | null, fn?: (user: User | string) => void) => {
        let msg: User | string = '';
        if (result) {
            const { code, data, message } = result;
            if (code === 0) {
                this.currentUser = data;
                msg = data;
            } else {
                msg = message;
            }
        } else {
            msg = '请求错误，请稍后重试';
        }
        fn && fn(msg);
    }

    /**
     * 进行路由验证跳转
     */
    @action
    authRoute = (history: History) => {
        if (isEmpty(this.currentUser)) {
            if (canGetUser()) {
                this.getUser();
            } else {
                history.replace('/auth');
            }
        } else if (!this.currentUser.header) {
            history.replace('/auth/info');
        } else {
            if (['/auth', '/auth/info'].includes(window.location.pathname)) {
                history.replace('/');
            }
        }
    }

    /**
     * 设置 expires 值
     */
    public setExpires = (expires: boolean) => {
        this.expires = expires;
    }
}

export default new AuthModel();
