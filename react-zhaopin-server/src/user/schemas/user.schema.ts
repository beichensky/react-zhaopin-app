/*
 * filename: UserSchema
 * overview: mongoose 生成的用户信息数据库格式
 */

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    type: String,
    header: String,
    post: String,
    info: String,
    company: String,
    salary: String,
    del: Number,
});
