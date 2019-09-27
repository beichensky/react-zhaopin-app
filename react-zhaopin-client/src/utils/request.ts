/*
 * @file: request
 * @description: 用来进行网络请求的工具类
 */

import 'whatwg-fetch';
import { stringify } from 'qs';
import Cookie from 'js-cookie'; 
import { redirectToLogin } from 'utils';

// 用户 token 值，用于验证
const token = () => Cookie.get('userId') || sessionStorage.getItem('userId') || '';

/**
 * 使用 Get 方式进行网络请求
 * @param {*} url 
 * @param {*} data 
 */
export const get = (url: string, data: object) => {
    const newUrl = url + '?' + stringify(data);
    return fetch(newUrl, {
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'X-Auth-Token': token()
            },
            method: 'GET',
        })
        .then(response => response.json())
        .then(result => {
            if (result && result.code === 403) {
                redirectToLogin();
            }
            return result;
        });
};

/**
 * 进行 Post 方式进行网络请求
 * @param {*} url 
 * @param {*} data 
 */
export const post = (url: string, data: object) => {
    return fetch(url, {
        body: JSON.stringify(data), 
        cache: 'no-cache',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'X-Auth-Token': token()
        },
        method: 'POST',
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.code === 403) {
            redirectToLogin();
        }
        return result;
    });
};
