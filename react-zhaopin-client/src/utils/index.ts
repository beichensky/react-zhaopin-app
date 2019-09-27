import Response from "interface/Response";
import Cookie from 'js-cookie';
import qs from 'qs';

/**
 * 异常捕获函数
 * @param asyncFunc 异步函数
 * @param params 函数参数集合
 */
export const errorCaptured: <T>(asyncFunc: Function, ...params: any[]) => Promise<[any, Response<T> | null]> 
    = async (asyncFunc: Function, ...params: any[]) => {
    try {
        let res = await asyncFunc(...params);
        return [null, res];
    } catch (e) {
        return [e, null]
    }
}

/**
 * 是否可以获取用户信息
 */
export const canGetUser = () => {
    const token = sessionStorage.getItem('userId') || Cookie.get('userId');
    return token;
}

export const safePath = (path: string) => `/${path}`.replace(/\/+/g, '/');

/**
 * 重定向函数
 * @param path 新路径
 * @param query 参数
 */
export const redirectTo = (path: string, query = {}) => {
    path = `${safePath(path)}`;
    query = qs.stringify(query);
    if (query) {
        path += `?${query}`;
    }
    window.location.href = path;
};

/**
 * 重定向到登录界面
 */
export const redirectToLogin = () => {
    const pathname = window.location.pathname || '';
    const search = window.location.search || '';
    const matchers = pathname + search;
    const redirect = encodeURIComponent(matchers ? matchers : '/');
    redirectTo('/auth', { redirect });
};
