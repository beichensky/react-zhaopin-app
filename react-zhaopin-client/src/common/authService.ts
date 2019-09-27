import { post, get } from 'utils/request';
import { RoleType } from 'utils/enums';
import User from 'interface/User';

/**
 * 登录接口
 * @param username 用户名
 * @param password 密码
 */
export const fetchLogin = (username: string, password: string) => {
    return post('/api/login', {username, password})
}

/**
 * 注册接口
 * @param username 用户名
 * @param password 密码
 * @param type 用户类型
 */
export const fetchRegister = (username: string, password: string, type: RoleType) => {
    return post('/api/register', {username, password, type});
}

/**
 * 更新用户信息
 * @param user 
 */
export const fetchUpdateUser = (user: Partial<User>) => {
    return post('/api/user/update', user);
}

/**
 * 获取当前用户
 */
export const fetchUser = () => {
    return get('/api/user', {});
}